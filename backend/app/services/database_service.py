import duckdb
import pandas as pd
from pathlib import Path
from typing import List, Dict, Optional, Any, Union, Tuple
from datetime import datetime
import asyncio
from concurrent.futures import ThreadPoolExecutor
from app.models.schema import TableSchema, ColumnType

class DatabaseService:
    def __init__(self, db_path: str = "data/anp_production.duckdb"):
        self.db_path = Path(db_path)
        self._executor = ThreadPoolExecutor(max_workers=4)
        self._schemas: Dict[str, TableSchema] = {}
    
    def _get_connection(self) -> duckdb.DuckDBPyConnection:
        """Get a DuckDB connection"""
        return duckdb.connect(str(self.db_path))
    
    def register_schema(self, schema: TableSchema) -> None:
        """Register a table schema"""
        self._schemas[schema.name] = schema
    
    async def initialize_tables(self) -> None:
        """Initialize all registered tables"""
        def _init():
            with self._get_connection() as conn:
                for schema in self._schemas.values():
                    # Drop and recreate each table
                    conn.execute(f"DROP TABLE IF EXISTS {schema.name}")
                    conn.execute(schema.get_create_table_sql())
        
        await asyncio.get_event_loop().run_in_executor(self._executor, _init)
    
    def _prepare_dataframe(self, df: pd.DataFrame, schema: TableSchema) -> pd.DataFrame:
        """Prepare DataFrame for database insertion"""
        # Create a copy to avoid modifying the original
        df = df.copy()
        
        # Format datetime columns
        for col in schema.columns:
            if col.type in [ColumnType.TIMESTAMP, ColumnType.DATE] and col.name in df.columns:
                try:
                    # First convert to pandas datetime
                    df[col.name] = pd.to_datetime(df[col.name])
                    # Then convert to ISO format string for DuckDB
                    df[col.name] = df[col.name].dt.strftime('%Y-%m-%d %H:%M:%S')
                except Exception as e:
                    print(f"Error converting column {col.name} to datetime: {e}")
                    # If conversion fails, drop the column to prevent errors
                    df = df.drop(columns=[col.name])
        
        # Add created_at if needed
        if 'created_at' in [col.name for col in schema.columns] and 'created_at' not in df.columns:
            df['created_at'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        
        return df
    
    def _create_temp_table_sql(self, table_name: str, schema: TableSchema) -> str:
        """Generate SQL for creating temporary table"""
        column_defs = [
            f"{col.name} {col.type.value}{' NOT NULL' if not col.nullable else ''}"
            for col in schema.columns
        ]
        return f"""
            CREATE TEMPORARY TABLE temp_{table_name} (
                {', '.join(column_defs)}
            )
        """
    
    def _generate_merge_sql(self, table_name: str, schema: TableSchema) -> str:
        """Generate SQL for merging data into main table"""
        pk_columns = schema.composite_primary_key or [col.name for col in schema.columns if col.primary_key]
        pk_str = ", ".join(pk_columns)
        
        update_columns = [
            col.name for col in schema.columns 
            if col.name not in pk_columns and col.name != 'created_at'
        ]
        update_str = ", ".join(f"{col} = EXCLUDED.{col}" for col in update_columns)
        
        return f"""
            INSERT INTO {table_name}
            SELECT * FROM temp_{table_name}
            ON CONFLICT ({pk_str})
            DO UPDATE SET {update_str}
        """
    
    def _process_batch(self, batch_df: pd.DataFrame, table_name: str, schema: TableSchema) -> None:
        """Process a single batch of data"""
        with self._get_connection() as conn:
            # Ensure table exists
            conn.execute(schema.get_create_table_sql())
            
            # Create and populate temporary table
            temp_table = f"temp_{table_name}"
            conn.execute(self._create_temp_table_sql(table_name, schema))
            conn.register('temp_df', batch_df)
            conn.execute(f"INSERT INTO {temp_table} SELECT * FROM temp_df")
            
            # Merge with main table
            conn.execute(self._generate_merge_sql(table_name, schema))
    
    async def save_data(
        self,
        table_name: str,
        data: List[Dict],
        batch_size: int = 10000
    ) -> bool:
        """Save data to a table efficiently using batch processing"""
        if table_name not in self._schemas:
            raise ValueError(f"Table {table_name} not registered")
        
        try:
            schema = self._schemas[table_name]
            df = self._prepare_dataframe(pd.DataFrame(data), schema)
            
            # Process in batches
            for i in range(0, len(df), batch_size):
                batch_df = df.iloc[i:i + batch_size]
                await asyncio.get_event_loop().run_in_executor(
                    self._executor,
                    lambda: self._process_batch(batch_df, table_name, schema)
                )
            
            return True
            
        except Exception as e:
            print(f"Error saving data to {table_name}: {e}")
            return False
    
    def _build_where_clause(
        self,
        filters: Dict[str, Any]
    ) -> Tuple[str, List[Any]]:
        """Build WHERE clause and parameter values from filters"""
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
        
        return (
            " AND ".join(where_clauses) if where_clauses else "1=1",
            param_values
        )
    
    def _build_query(
        self,
        table_name: str,
        where_sql: str,
        order_by: Optional[str] = None,
        limit: int = 1000,
        offset: int = 0
    ) -> str:
        """Build SQL query string"""
        order_sql = f"ORDER BY {order_by}" if order_by else ""
        return f"""
            SELECT *
            FROM {table_name}
            WHERE {where_sql}
            {order_sql}
            LIMIT ? OFFSET ?
        """
    
    async def query_data(
        self,
        table_name: str,
        filters: Dict[str, Any],
        limit: int = 1000,
        offset: int = 0,
        order_by: Optional[str] = None
    ) -> List[Dict]:
        """Query data from a table with filters"""
        if table_name not in self._schemas:
            raise ValueError(f"Table {table_name} not registered")
        
        try:
            def _query():
                with self._get_connection() as conn:
                    where_sql, param_values = self._build_where_clause(filters)
                    query = self._build_query(table_name, where_sql, order_by, limit, offset)
                    param_values.extend([limit, offset])
                    return conn.execute(query, param_values).fetchdf().to_dict('records')
            
            return await asyncio.get_event_loop().run_in_executor(self._executor, _query)
            
        except Exception as e:
            print(f"Error querying {table_name}: {e}")
            raise
    
    def _build_aggregate_query(
        self,
        table_name: str,
        group_by_columns: List[str],
        aggregate_columns: List[str],
        where_sql: str
    ) -> str:
        """Build SQL query for aggregation"""
        group_by_sql = ", ".join(group_by_columns)
        agg_exprs = [f"SUM({col}) as total_{col}" for col in aggregate_columns]
        agg_sql = ", ".join(agg_exprs)
        
        return f"""
            SELECT 
                {group_by_sql},
                {agg_sql},
                COUNT(*) as record_count
            FROM {table_name}
            WHERE {where_sql}
            GROUP BY {group_by_sql}
            ORDER BY {group_by_sql}
        """
    
    async def aggregate_data(
        self,
        table_name: str,
        group_by_columns: List[str],
        aggregate_columns: List[str],
        filters: Optional[Dict[str, Any]] = None
    ) -> List[Dict]:
        """Aggregate data from a table"""
        if table_name not in self._schemas:
            raise ValueError(f"Table {table_name} not registered")
        
        try:
            def _aggregate():
                with self._get_connection() as conn:
                    where_sql, param_values = self._build_where_clause(filters or {})
                    query = self._build_aggregate_query(
                        table_name,
                        group_by_columns,
                        aggregate_columns,
                        where_sql
                    )
                    return conn.execute(query, param_values).fetchdf().to_dict('records')
            
            return await asyncio.get_event_loop().run_in_executor(self._executor, _aggregate)
            
        except Exception as e:
            print(f"Error aggregating {table_name}: {e}")
            raise
    
    async def recreate_table(self, table_name: str) -> None:
        """Drop and recreate a table"""
        if table_name not in self._schemas:
            raise ValueError(f"Table {table_name} not registered")
        
        def _recreate():
            with self._get_connection() as conn:
                # Drop table if exists
                conn.execute(f"DROP TABLE IF EXISTS {table_name}")
                # Create table using schema
                conn.execute(self._schemas[table_name].get_create_table_sql())
        
        await asyncio.get_event_loop().run_in_executor(self._executor, _recreate) 