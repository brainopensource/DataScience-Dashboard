import time
import requests
from requests.auth import HTTPBasicAuth
import pandas as pd


BASE_URL = 'https://data.iprod.woodmac.com/query-internal/anp/all/odata'
DATASET_ID = 'anp__field_monthly_production_aggregation__transform'
WOODMAC_FIELD_MONTHLY_PRODUCTION = f"{BASE_URL}/{DATASET_ID}"

def get_with_retries(url, username, password, params, max_retries=2, delay=5):
    """
    Attempts to perform a GET request with basic authentication up to 'max_retries' times.
    Returns the JSON response if status_code is 200.
    Otherwise, returns an error message.
    """
    response = None
    for attempt in range(1, max_retries + 1):
        try:
            print(f'\n[Try {attempt}] Connecting to: {url}')
            response = requests.get(url, params=params, auth=HTTPBasicAuth(username, password))
            print(f"Status: {response.status_code}")
            if response.status_code == 200:
                return response.json()
            else:
                delay += attempt * 3
                print(f"[Attempt {attempt}] Error {response.status_code}. Retrying in {delay}s...")
                time.sleep(delay)
        except Exception as e:
            print(f"[Attempt {attempt}] Exception: {e} - Retrying in {delay}s...")
            time.sleep(delay)

    if response:
        return {"error": f"Request failed with status code {response.status_code}: {response.text}"}
    return {"error": "No response received after multiple attempts."}

def fetch_all_data_paginated(username, password, odata_url=WOODMAC_FIELD_MONTHLY_PRODUCTION):
    """
    Fetches all data from the OData API using filters and pagination.
    Returns a list of all results.
    """
    start_time = time.time()
    all_data = []

    # Construct OData $filter
    filter_expr = "production_period ge 2024-01-01T00:00:00.000Z"

    params = {
        "$select": "field_code,_field_name,production_period,oil_production_kbd,gas_production_mmcfd",
        "$filter": filter_expr
    }

    data = get_with_retries(odata_url, username, password, params)
    
    if "error" not in data:
        all_data.extend(data.get('value', []))
        while '@odata.nextLink' in data:
            next_url = data['@odata.nextLink']
            print(f"Fetching next page of data from: {next_url}")
            data = get_with_retries(next_url, username, password, params={})  # nextLink already includes filters
            if "error" not in data:
                all_data.extend(data.get('value', []))
            else:
                break

    elapsed_time = time.time() - start_time
    print(f"[⏱] Paginated fetch took: {elapsed_time:.2f} seconds. Records fetched: {len(all_data)}")

    return all_data



"""
start_time = time.time()

# Replace with your credentials
USERNAME = ''
PASSWORD = ''
# Fetch filtered and paginated data
data = fetch_all_data_paginated(USERNAME, PASSWORD)
print('data', str(data)[:100])
df = pd.DataFrame(data)
print(df.head(5))

elapsed = time.time() - start_time
print(f"\nExecution time: {elapsed:.2f} seconds")
"""