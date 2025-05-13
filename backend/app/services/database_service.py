import duckdb
import pandas as pd
from pathlib import Path
from typing import List, Dict, Optional, Any, Union
from datetime import datetime
import asyncio
from concurrent.futures import ThreadPoolExecutor
from app.models.schema import TableSchema, ColumnType

class DatabaseService:
    def __init__(self, db_path: str = "data/anp_production.duckdb"):
        self.db_path = Path(db_path)
        self._executor = ThreadPoolExecutor(max_workers=4)
        self._schemas: Dict[str, TableSchema] = {}
    
    def _get_connection(self):
        """Get a DuckDB connection"""
        return duckdb.connect(str(self.db_path))
    
    def register_schema(self, schema: TableSchema):
        """Register a table schema"""
        self._schemas[schema.name] = schema
    
    async def initialize_tables(self):
        """Initialize all registered tables"""
        def _init():
            with self._get_connection() as conn:
                for schema in self._schemas.values():
                    conn.execute(schema.get_create_table_sql())
        
        await asyncio.get_event_loop().run_in_executor(self._executor, _init)
    
    async def save_data(
        self,
        table_name: str,
        data: List[Dict],
        batch_size: int = 10000
    ) -> bool:
        """
        Save data to a table efficiently using batch processing
        """
        if table_name not in self._schemas:
            raise ValueError(f"Table {table_name} not registered")
        
        schema = self._schemas[table_name]
        
        try:
            # Convert to DataFrame
            df = pd.DataFrame(data)
            
            # Ensure datetime columns are properly formatted
            for col in schema.columns:
                if col.type in [ColumnType.TIMESTAMP, ColumnType.DATE]:
                    if col.name in df.columns:
                        df[col.name] = pd.to_datetime(df[col.name])
            
            # Add created_at if not present
            if 'created_at' in [col.name for col in schema.columns] and 'created_at' not in df.columns:
                df['created_at'] = datetime.now()
            
            # Process in batches
            def _save_batch(batch_df):
                with self._get_connection() as conn:
                    # Ensure table exists
                    conn.execute(schema.get_create_table_sql())
                    
                    # Create temporary table with explicit schema
                    temp_table = f"temp_{table_name}"
                    column_defs = []
                    for col in schema.columns:
                        col_def = f"{col.name} {col.type.value}"
                        if not col.nullable:
                            col_def += " NOT NULL"
                        column_defs.append(col_def)
                    
                    create_temp_sql = f"""
                        CREATE TEMPORARY TABLE {temp_table} (
                            {', '.join(column_defs)}
                        )
                    """
                    conn.execute(create_temp_sql)
                    
                    # Insert batch data
                    conn.register('temp_df', batch_df)
                    conn.execute(f"INSERT INTO {temp_table} SELECT * FROM temp_df")
                    
                    # Merge with main table
                    pk_columns = schema.composite_primary_key or [col.name for col in schema.columns if col.primary_key]
                    pk_str = ", ".join(pk_columns)
                    
                    update_columns = [col.name for col in schema.columns 
                                    if col.name not in pk_columns and col.name != 'created_at']
                    update_str = ", ".join(f"{col} = EXCLUDED.{col}" for col in update_columns)
                    
                    merge_sql = f"""
                        INSERT INTO {table_name}
                        SELECT * FROM {temp_table}
                        ON CONFLICT ({pk_str})
                        DO UPDATE SET {update_str}
                    """
                    conn.execute(merge_sql)
            
            # Process in batches
            for i in range(0, len(df), batch_size):
                batch_df = df.iloc[i:i + batch_size]
                await asyncio.get_event_loop().run_in_executor(
                    self._executor, 
                    lambda: _save_batch(batch_df)
                )
            
            return True
            
        except Exception as e:
            print(f"Error saving data to {table_name}: {e}")
            return False
    
    async def query_data(
        self,
        table_name: str,
        filters: Dict[str, Any],
        limit: int = 1000,
        offset: int = 0,
        order_by: Optional[str] = None
    ) -> List[Dict]:
        """
        Query data from a table with filters
        """
        if table_name not in self._schemas:
            raise ValueError(f"Table {table_name} not registered")
        
        try:
            def _query():
                with self._get_connection() as conn:
                    where_clauses = []
                    param_values = []
                    
                    for key, value in filters.items():
                        if value is not None:
                            if isinstance(value, dict) and 'start' in value and 'end' in value:
                                where_clauses.append(f"{key} >= ? AND {key} <= ?")
                                param_values.extend([value['start'], value['end']])
                            else:
                                where_clauses.append(f"{key} = ?")
                                param_values.append(value)
                    
                    where_sql = " AND ".join(where_clauses) if where_clauses else "1=1"
                    order_sql = f"ORDER BY {order_by}" if order_by else ""
                    
                    query = f"""
                        SELECT *
                        FROM {table_name}
                        WHERE {where_sql}
                        {order_sql}
                        LIMIT ? OFFSET ?
                    """
                    
                    param_values.extend([limit, offset])
                    return conn.execute(query, param_values).fetchdf().to_dict('records')
            
            return await asyncio.get_event_loop().run_in_executor(self._executor, _query)
            
        except Exception as e:
            print(f"Error querying {table_name}: {e}")
            raise
    
    async def aggregate_data(
        self,
        table_name: str,
        group_by_columns: List[str],
        aggregate_columns: List[str],
        filters: Optional[Dict[str, Any]] = None
    ) -> List[Dict]:
        """
        Aggregate data from a table
        """
        if table_name not in self._schemas:
            raise ValueError(f"Table {table_name} not registered")
        
        try:
            def _aggregate():
                with self._get_connection() as conn:
                    where_clauses = []
                    param_values = []
                    
                    if filters:
                        for key, value in filters.items():
                            if value is not None:
                                if isinstance(value, dict) and 'start' in value and 'end' in value:
                                    where_clauses.append(f"{key} >= ? AND {key} <= ?")
                                    param_values.extend([value['start'], value['end']])
                                else:
                                    where_clauses.append(f"{key} = ?")
                                    param_values.append(value)
                    
                    where_sql = " AND ".join(where_clauses) if where_clauses else "1=1"
                    group_by_sql = ", ".join(group_by_columns)
                    
                    agg_exprs = []
                    for col in aggregate_columns:
                        agg_exprs.append(f"SUM({col}) as total_{col}")
                    
                    agg_sql = ", ".join(agg_exprs)
                    
                    query = f"""
                        SELECT 
                            {group_by_sql},
                            {agg_sql},
                            COUNT(*) as record_count
                        FROM {table_name}
                        WHERE {where_sql}
                        GROUP BY {group_by_sql}
                        ORDER BY {group_by_sql}
                    """
                    
                    return conn.execute(query, param_values).fetchdf().to_dict('records')
            
            return await asyncio.get_event_loop().run_in_executor(self._executor, _aggregate)
            
        except Exception as e:
            print(f"Error aggregating {table_name}: {e}")
            raise 