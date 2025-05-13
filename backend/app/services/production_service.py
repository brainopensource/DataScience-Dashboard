from typing import List, Dict, Optional, Any
from app.services.database_service import DatabaseService
from app.models.schema import PRODUCTION_SCHEMA
from app.utils.odata import fetch_all_data_paginated

class ProductionService:
    def __init__(self, db_service: DatabaseService):
        self.db = db_service
        # Register the production schema
        self.db.register_schema(PRODUCTION_SCHEMA)
    
    async def save_production_data(self, data: List[Dict]) -> bool:
        """
        Save production data to the database
        """
        return await self.db.save_data(PRODUCTION_SCHEMA.name, data)
    
    async def sync_production_data(self) -> bool:
        """
        Fetch and save production data from the external API
        """
        try:
            # Fetch data from external API
            username = ''
            password = ''
            
            if not username or not password:
                print("API credentials not configured")
                return False
            
            data = fetch_all_data_paginated(username, password)
            if "error" in data:
                print(f"Error fetching data: {data['error']}")
                return False
            
            # Save to database
            return await self.save_production_data(data)
            
        except Exception as e:
            print(f"Error syncing production data: {e}")
            return False
    
    async def query_production_data(
        self,
        filters: Dict[str, Any],
        limit: int = 1000,
        offset: int = 0,
        order_by: Optional[str] = None
    ) -> List[Dict]:
        """
        Query production data with filters
        """
        return await self.db.query_data(
            PRODUCTION_SCHEMA.name,
            filters,
            limit,
            offset,
            order_by
        )
    
    async def aggregate_production_data(
        self,
        group_by_columns: List[str],
        aggregate_columns: List[str],
        filters: Optional[Dict[str, Any]] = None
    ) -> List[Dict]:
        """
        Aggregate production data
        """
        return await self.db.aggregate_data(
            PRODUCTION_SCHEMA.name,
            group_by_columns,
            aggregate_columns,
            filters
        ) 