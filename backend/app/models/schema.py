from typing import Dict, List, Optional, Any, Union
from pydantic import BaseModel, Field
from enum import Enum
from datetime import datetime

class ColumnType(str, Enum):
    VARCHAR = "VARCHAR"
    INTEGER = "INTEGER"
    DOUBLE = "DOUBLE"
    TIMESTAMP = "TIMESTAMP"
    BOOLEAN = "BOOLEAN"
    DATE = "DATE"

class ColumnDefinition(BaseModel):
    name: str
    type: ColumnType
    nullable: bool = True
    primary_key: bool = False
    unique: bool = False
    default: Optional[Any] = None
    description: Optional[str] = None

class TableSchema(BaseModel):
    name: str
    columns: List[ColumnDefinition]
    description: Optional[str] = None
    version: str = "1.0"
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)
    composite_primary_key: Optional[List[str]] = None

    def get_create_table_sql(self) -> str:
        """Generate CREATE TABLE SQL statement"""
        column_defs = []
        for col in self.columns:
            col_def = f"{col.name} {col.type.value}"
            if not col.nullable:
                col_def += " NOT NULL"
            if col.unique:
                col_def += " UNIQUE"
            if col.default is not None:
                col_def += f" DEFAULT {col.default}"
            column_defs.append(col_def)
        
        # Add composite primary key if specified
        if self.composite_primary_key:
            pk_columns = ", ".join(self.composite_primary_key)
            column_defs.append(f"PRIMARY KEY ({pk_columns})")
        
        return f"""
            CREATE TABLE IF NOT EXISTS {self.name} (
                {', '.join(column_defs)}
            )
        """

# Predefined schemas
PRODUCTION_SCHEMA = TableSchema(
    name="field_monthly_production",
    description="Monthly production data for oil and gas fields",
    composite_primary_key=["field_code", "production_period"],
    columns=[
        ColumnDefinition(
            name="field_code",
            type=ColumnType.VARCHAR,
            nullable=False,
            description="Unique identifier for the field"
        ),
        ColumnDefinition(
            name="field_name",
            type=ColumnType.VARCHAR,
            nullable=False,
            description="Name of the field"
        ),
        ColumnDefinition(
            name="production_period",
            type=ColumnType.TIMESTAMP,
            nullable=False,
            description="Production period timestamp"
        ),
        ColumnDefinition(
            name="oil_production_kbd",
            type=ColumnType.DOUBLE,
            description="Oil production in thousands of barrels per day"
        ),
        ColumnDefinition(
            name="gas_production_mmcfd",
            type=ColumnType.DOUBLE,
            description="Gas production in million cubic feet per day"
        ),
        ColumnDefinition(
            name="created_at",
            type=ColumnType.TIMESTAMP,
            default="CURRENT_TIMESTAMP",
            description="Record creation timestamp"
        )
    ]
)

# Example of another schema
WELL_SCHEMA = TableSchema(
    name="well_production",
    description="Daily well production data",
    composite_primary_key=["well_id", "production_date"],
    columns=[
        ColumnDefinition(
            name="well_id",
            type=ColumnType.VARCHAR,
            nullable=False,
            description="Unique well identifier"
        ),
        ColumnDefinition(
            name="field_code",
            type=ColumnType.VARCHAR,
            nullable=False,
            description="Reference to field_monthly_production"
        ),
        ColumnDefinition(
            name="production_date",
            type=ColumnType.DATE,
            nullable=False,
            description="Production date"
        ),
        ColumnDefinition(
            name="oil_rate",
            type=ColumnType.DOUBLE,
            description="Oil production rate"
        ),
        ColumnDefinition(
            name="gas_rate",
            type=ColumnType.DOUBLE,
            description="Gas production rate"
        ),
        ColumnDefinition(
            name="water_rate",
            type=ColumnType.DOUBLE,
            description="Water production rate"
        ),
        ColumnDefinition(
            name="created_at",
            type=ColumnType.TIMESTAMP,
            default="CURRENT_TIMESTAMP",
            description="Record creation timestamp"
        )
    ]
) 