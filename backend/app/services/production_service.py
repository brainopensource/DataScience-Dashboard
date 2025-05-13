import asyncio
from typing import List, Dict, Optional, Any
from datetime import datetime
from app.services.database_service import DatabaseService
from app.models.schema import PRODUCTION_SCHEMA
from app.config import settings
from app.utils.odata import fetch_all_data_paginated, get_with_retries

class ProductionService:
    def __init__(self, db_service: DatabaseService):
        self.db_service = db_service
        self.db_service.register_schema(PRODUCTION_SCHEMA)
        self.username = settings.ODATA_USERNAME
        self.password = settings.ODATA_PASSWORD
    
    def _validate_api_credentials(self) -> None:
        """Validate API credentials are available"""
        if not self.username or not self.password:
            raise ValueError("OData API credentials not configured")
    
    async def _fetch_api_data(self, start_date: str, end_date: str) -> List[Dict]:
        """Fetch data from OData API using basic authentication"""
        self._validate_api_credentials()
        
        # Convert dates to OData filter format
        filter_expr = f"production_period ge {start_date}T00:00:00.000Z and production_period le {end_date}T23:59:59.999Z"
        
        # Define the base URL and parameters for the OData request
        params = {
            "$select": "field_code,_field_name,production_period,oil_production_kbd,gas_production_mmcfd",
            "$filter": filter_expr,
            "$top": 1000  # Number of records per page
        }
        
        # Use the OData implementation with basic auth and pagination
        # This will fetch ALL pages of data automatically
        data = fetch_all_data_paginated(
            username=self.username,
            password=self.password,
            params=params  # Pass our custom parameters
        )
        
        if "error" in data:
            raise ValueError(f"API request failed: {data['error']}")
        
        print(f"Fetched {len(data)} records from OData API")
        return data
    
    def _prepare_production_data(self, data: List[Dict]) -> List[Dict]:
        """Prepare production data for database insertion"""
        prepared_data = []
        
        for record in data:
            try:
                # Create a new record with mapped columns
                prepared_record = {
                    'field_code': record['field_code'],
                    'field_name': record['_field_name'],  # Map _field_name to field_name
                    'production_period': None,  # Will be set below
                    'oil_production_kbd': float(record['oil_production_kbd']) if record['oil_production_kbd'] is not None else None,
                    'gas_production_mmcfd': float(record['gas_production_mmcfd']) if record['gas_production_mmcfd'] is not None else None,
                    'created_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                }
                
                # Handle production_period date
                if 'production_period' in record:
                    date_str = record['production_period']
                    if '+' in date_str:
                        date_str = date_str.split('+')[0]
                    elif 'Z' in date_str:
                        date_str = date_str.replace('Z', '')
                    
                    try:
                        dt = datetime.strptime(date_str, '%Y-%m-%dT%H:%M:%S')
                        prepared_record['production_period'] = dt.strftime('%Y-%m-%d %H:%M:%S')
                    except ValueError as e:
                        print(f"Error parsing date {date_str}: {e}")
                        continue
                
                prepared_data.append(prepared_record)
                
            except (KeyError, ValueError) as e:
                print(f"Error processing record: {e}")
                print(f"Record data: {record}")
                continue
        
        return prepared_data
    
    async def save_production_data(self, data: List[Dict]) -> bool:
        """Save production data to the database"""
        try:
            prepared_data = self._prepare_production_data(data)
            return await self.db_service.save_data(PRODUCTION_SCHEMA.name, prepared_data)
        except Exception as e:
            print(f"Error saving production data: {e}")
            return False
    
    async def sync_production_data(self, start_date: str, end_date: str) -> bool:
        """Sync production data from OData API"""
        try:
            # Fetch data from API
            data = await self._fetch_api_data(start_date, end_date)
            
            # Save to database
            return await self.save_production_data(data)
            
        except Exception as e:
            print(f"Error syncing production data: {e}")
            return False
    
    def _build_production_filters(
        self,
        field_id: Optional[str] = None,
        start_date: Optional[str] = None,
        end_date: Optional[str] = None
    ) -> Dict[str, Any]:
        """Build filters for production data query"""
        filters = {}
        
        if field_id:
            filters['field_code'] = field_id
        
        if start_date or end_date:
            filters['production_period'] = {}
            if start_date:
                filters['production_period']['start'] = start_date
            if end_date:
                filters['production_period']['end'] = end_date
        
        return filters
    
    async def query_production_data(
        self,
        field_id: Optional[str] = None,
        start_date: Optional[str] = None,
        end_date: Optional[str] = None,
        limit: int = 1000,
        offset: int = 0,
        order_by: Optional[str] = None
    ) -> List[Dict]:
        """Query production data with filters"""
        try:
            filters = self._build_production_filters(field_id, start_date, end_date)
            return await self.db_service.query_data(
                PRODUCTION_SCHEMA.name,
                filters,
                limit,
                offset,
                order_by
            )
        except Exception as e:
            print(f"Error querying production data: {e}")
            raise
    
    async def aggregate_production_data(
        self,
        group_by_columns: List[str],
        field_id: Optional[str] = None,
        start_date: Optional[str] = None,
        end_date: Optional[str] = None
    ) -> List[Dict]:
        """Aggregate production data"""
        try:
            filters = self._build_production_filters(field_id, start_date, end_date)
            aggregate_columns = ['oil_production_kbd', 'gas_production_mmcfd']
            
            return await self.db_service.aggregate_data(
                PRODUCTION_SCHEMA.name,
                group_by_columns,
                aggregate_columns,
                filters
            )
        except Exception as e:
            print(f"Error aggregating production data: {e}")
            raise 