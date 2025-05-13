from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from typing import List, Dict, Optional, Any
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from app.services.database_service import DatabaseService
from app.services.production_service import ProductionService
from app.models.schema import PRODUCTION_SCHEMA, WELL_SCHEMA

# Load environment variables
load_dotenv()

# Initialize services
db_service = DatabaseService()
production_service = ProductionService(db_service)

class SyncDataRequest(BaseModel):
    start_date: str
    end_date: str

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan context manager for database initialization
    """
    # Initialize database tables
    await db_service.initialize_tables()
    yield
    # Cleanup (if needed)

app = FastAPI(
    title="ANP Production API",
    description="API for accessing ANP production data",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/sync-data")
async def sync_data(request: SyncDataRequest):
    """
    Sync data from external API
    """
    try:
        success = await production_service.sync_production_data(
            start_date=request.start_date,
            end_date=request.end_date
        )
        if not success:
            raise HTTPException(status_code=500, detail="Failed to sync data")
        return {"message": "Data synced successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/query")
async def query_data(
    field_code: Optional[str] = None,
    field_name: Optional[str] = None,
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    limit: int = 1000,
    offset: int = 0,
    order_by: Optional[str] = None
):
    """
    Query production data with filters
    """
    try:
        data = await production_service.query_production_data(
            field_id=field_code,  # Map field_code to field_id
            start_date=start_date,
            end_date=end_date,
            limit=limit,
            offset=offset,
            order_by=order_by
        )
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/aggregate")
async def aggregate_data(
    group_by_columns: List[str],
    aggregate_columns: List[str],
    filters: Optional[Dict[str, Any]] = None
):
    """
    Aggregate production data
    """
    try:
        data = await production_service.aggregate_production_data(
            group_by_columns=group_by_columns,
            aggregate_columns=aggregate_columns,
            filters=filters
        )
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Example of adding a new endpoint for well data
@app.get("/wells")
async def get_wells(
    well_id: Optional[str] = None,
    field_code: Optional[str] = None,
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    limit: int = 1000,
    offset: int = 0
):
    """
    Query well production data
    """
    # Register well schema if not already registered
    if WELL_SCHEMA.name not in db_service._schemas:
        db_service.register_schema(WELL_SCHEMA)
    
    filters = {}
    if well_id:
        filters['well_id'] = well_id
    if field_code:
        filters['field_code'] = field_code
    if start_date or end_date:
        filters['production_date'] = {}
        if start_date:
            filters['production_date']['start'] = start_date
        if end_date:
            filters['production_date']['end'] = end_date
    
    try:
        data = await db_service.query_data(
            WELL_SCHEMA.name,
            filters=filters,
            limit=limit,
            offset=offset
        )
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
