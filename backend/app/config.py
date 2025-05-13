from pydantic_settings import BaseSettings
from functools import lru_cache
from typing import Optional

class Settings(BaseSettings):
    """Application settings"""
    # Database settings
    DATABASE_URL: str = "data/anp_production.duckdb"
    
    # OData API settings
    ODATA_USERNAME: Optional[str] = None
    ODATA_PASSWORD: Optional[str] = None
    
    # Server settings
    API_HOST: str = "127.0.0.1"
    API_PORT: int = 8000
    DEBUG: bool = False
    
    # Uvicorn settings (used by run.py)
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    WORKERS: int = 4
    RELOAD: bool = True
    
    class Config:
        env_file = ".env"
        case_sensitive = True

@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance"""
    return Settings()

# Create a global settings instance
settings = get_settings() 