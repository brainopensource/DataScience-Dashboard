from fastapi import APIRouter, HTTPException, Query, Depends
from typing import List, Optional
from pydantic import BaseModel
import duckdb
from datetime import datetime
import pandas as pd
from app.services.production_service import ProductionService
from app.utils.odata import fetch_all_data_paginated
import os
from dotenv import load_dotenv


load_dotenv()

router = APIRouter()
production_service = ProductionService()

class AggregationRequest(BaseModel):
    group_by_columns: List[str]
    aggregate_columns: List[str]
    filters: Optional[dict] = None

@router.post("/sync-data")
async def sync_production_data():
    """
    Sync data from the external API to DuckDB
    """
    try:
        username = ''
        password = ''
        
        if not username or not password:
            raise HTTPException(status_code=500, detail="API credentials not configured")
        
        # Fetch data from external API
        data = fetch_all_data_paginated(username, password)
        
        if "error" in data:
            raise HTTPException(status_code=500, detail=data["error"])
        
        # Save to DuckDB
        success = await production_service.save_production_data(data)
        
        if not success:
            raise HTTPException(status_code=500, detail="Failed to save data to database")
        
        return {"message": "Data synchronized successfully", "records": len(data)}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/query")
async def query_production_data(
    field_code: Optional[str] = None,
    field_name: Optional[str] = None,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    limit: int = Query(default=1000, le=10000),
    offset: int = Query(default=0, ge=0)
):
    """
    Query production data with filters
    """
    try:
        filters = {
            "field_code": field_code,
            "field_name": field_name,
            "start_date": start_date,
            "end_date": end_date
        }
        
        # Remove None values
        filters = {k: v for k, v in filters.items() if v is not None}
        
        results = await production_service.query_production_data(filters, limit, offset)
        return results
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/aggregate")
async def aggregate_production_data(request: AggregationRequest):
    """
    Aggregate production data based on specified columns
    """
    try:
        results = await production_service.aggregate_production_data(
            request.group_by_columns,
            request.aggregate_columns,
            request.filters
        )
        return results
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 