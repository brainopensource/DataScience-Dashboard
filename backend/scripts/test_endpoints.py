import requests
import pandas as pd
from datetime import datetime, timedelta
import json
from tabulate import tabulate
import os
from dotenv import load_dotenv
import time
from typing import Dict, Any, List, Optional

# Load environment variables
load_dotenv()

# API Configuration
BASE_URL = "http://localhost:8000"
#USERNAME = os.getenv("WOODMAC_USERNAME")
#PASSWORD = os.getenv("WOODMAC_PASSWORD")

class APITester:
    def __init__(self, base_url: str = BASE_URL):
        self.base_url = base_url
        self.session = requests.Session()
    
    def print_section(self, title: str):
        """Print a section title with formatting"""
        print("\n" + "="*80)
        print(f" {title} ".center(80, "="))
        print("="*80 + "\n")
    
    def print_dataframe(self, df: pd.DataFrame, title: str = "Data Preview"):
        """Print a dataframe with nice formatting"""
        if df.empty:
            print("No data returned")
            return
        
        print(f"\n{title}:")
        print(f"Total rows: {len(df)}")
        
        if len(df) > 0:
            print("\nFirst 5 rows:")
            print(tabulate(df.head(), headers='keys', tablefmt='psql', showindex=False))
            
            if len(df) > 5:
                print("\nLast 5 rows:")
                print(tabulate(df.tail(), headers='keys', tablefmt='psql', showindex=False))
    
    def test_endpoint(self, method: str, endpoint: str, **kwargs) -> Dict[str, Any]:
        """Test an endpoint and return the results"""
        url = f"{self.base_url}{endpoint}"
        print(f"\nTesting {method.upper()} {url}")
        print(f"Parameters: {json.dumps(kwargs, indent=2)}")
        
        start_time = time.time()
        try:
            if method.upper() == "GET":
                response = self.session.get(url, params=kwargs.get('params', {}))
            else:  # POST
                response = self.session.post(url, json=kwargs.get('json', {}))
            
            elapsed = time.time() - start_time
            print(f"Status Code: {response.status_code}")
            print(f"Time taken: {elapsed:.2f} seconds")
            
            if response.status_code == 200:
                return {
                    "success": True,
                    "data": response.json(),
                    "elapsed": elapsed
                }
            else:
                return {
                    "success": False,
                    "error": response.json(),
                    "elapsed": elapsed
                }
                
        except requests.exceptions.RequestException as e:
            elapsed = time.time() - start_time
            return {
                "success": False,
                "error": str(e),
                "elapsed": elapsed
            }
    
    def test_sync_data(self):
        """Test the sync-data endpoint"""
        self.print_section("Testing Sync Data Endpoint")
        
        result = self.test_endpoint("POST", "/sync-data")
        if result["success"]:
            print(f"Response: {result['data']}")
        else:
            print(f"Error: {result['error']}")
    
    def test_query_data(self):
        """Test the query endpoint with various filters"""
        self.print_section("Testing Query Endpoint")
        
        test_cases = [
            {
                "name": "Basic query (last 100 records)",
                "params": {}
            },
            {
                "name": "Query with date range",
                "params": {
                    "start_date": (datetime.now() - timedelta(days=90)).isoformat(),
                    "end_date": datetime.now().isoformat(),
                }
            },
            {
                "name": "Query with field name",
                "params": {
                    "field_name": "Tupi"
                }
            },
            {
                "name": "Query with ordering",
                "params": {
                    "order_by": "production_period DESC"
                }
            }
        ]
        
        for test in test_cases:
            print(f"\nTest Case: {test['name']}")
            result = self.test_endpoint("GET", "/query", params=test['params'])
            
            if result["success"]:
                df = pd.DataFrame(result["data"])
                self.print_dataframe(df, f"Results for {test['name']}")
            else:
                print(f"Error: {result['error']}")
    
    def test_aggregate_data(self):
        """Test the aggregate endpoint with different grouping options"""
        self.print_section("Testing Aggregate Endpoint")
        
        test_cases = [
            {
                "name": "Aggregate by field",
                "json": {
                    "group_by_columns": ["field_name"],
                    "aggregate_columns": ["oil_production_kbd", "gas_production_mmcfd"],
                    "filters": {
                        "field_name": "Tupi"
                    }
                }
            },
            {
                "name": "Aggregate by date range",
                "json": {
                    "group_by_columns": ["field_name", "production_period"],
                    "aggregate_columns": ["oil_production_kbd", "gas_production_mmcfd"],
                    "filters": {
                        "production_period": {
                            "start": (datetime.now() - timedelta(days=130)).isoformat(),
                            "end": datetime.now().isoformat()
                        }
                    }
                }
            },
            {
                "name": "Aggregate all fields",
                "json": {
                    "group_by_columns": ["field_name"],
                    "aggregate_columns": ["oil_production_kbd", "gas_production_mmcfd"]
                }
            }
        ]
        
        for test in test_cases:
            print(f"\nTest Case: {test['name']}")
            result = self.test_endpoint("POST", "/aggregate", json=test['json'])
            
            if result["success"]:
                df = pd.DataFrame(result["data"])
                self.print_dataframe(df, f"Results for {test['name']}")
            else:
                print(f"Error: {result['error']}")

def main():
    """Run all tests"""
    try:
        tester = APITester()
        
        # First sync the data
        # tester.test_sync_data()
        
        # Then test querying
        tester.test_query_data()
        
        # Finally test aggregation
        #tester.test_aggregate_data()
        
    except requests.exceptions.ConnectionError:
        print("\nError: Could not connect to the API. Make sure the server is running at http://localhost:8000")
    except Exception as e:
        print(f"\nError: {str(e)}")

if __name__ == "__main__":
    main()