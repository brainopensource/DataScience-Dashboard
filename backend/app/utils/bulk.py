import time
import os
import glob
import zipfile
import io
import pandas as pd
import requests

BASE_URL = "https://data.iprod.woodmac.com/bulk-internal/job"

# --- Build the POST Payload with filters ---
def build_payload() -> dict:
    return {
        "dataset": "anp",
        "unitSetting": "imp-met",
        "resource": "anp__field_monthly_production_aggregation__transform",
        "select": "_field_name,production_period,oil_production_kbd",
        "filter": "_field_name eq 'Tupi' and production_period ge 2024-01-01T00:00:00.000Z"
    }

# --- Send POST and Poll for Results ---
def get_bulk_data(auth: tuple, payload: dict, pause: int = 5) -> pd.DataFrame:
    # Step 1: Submit job
    resp = requests.post(BASE_URL, json=payload, auth=auth)
    resp.raise_for_status()
    execution_id = resp.json()["executionId"]

    # Step 2: Poll until job is done
    status_url = f"{BASE_URL}/{execution_id}"
    while True:
        status_resp = requests.get(status_url, auth=auth, verify=False)
        status_resp.raise_for_status()
        status_json = status_resp.json()

        if status_json.get("status") == "FAILED":
            raise RuntimeError("API job failed")

        elif status_json.get("status") == "SUCCEEDED":
            interim_url = status_json["savedDownloadUrl"]
            break

        print("Still processing...")
        time.sleep(pause)

    # Step 3: Get final download URL
    print('\n\n Interim URL:', interim_url)
    download_resp = requests.get(interim_url, auth=auth, verify=False)
    download_resp.raise_for_status()
    final_url = download_resp.json()["url"]

    print('\n\n Final URL:', final_url)
    # Step 4: Download zip and extract CSV
    file_resp = requests.get(final_url, verify=False)
    file_resp.raise_for_status()

    output_dir = "bulk_output"
    os.makedirs(output_dir, exist_ok=True)

    with zipfile.ZipFile(io.BytesIO(file_resp.content)) as z:
        z.extractall(output_dir)

    csv_file = glob.glob(f"{output_dir}/*.csv")[0]
    df = pd.read_csv(csv_file)
    return df

# --- Run ---

AUTH = ("", "")  # Replace with actual credentials
start_time = time.time()

payload = build_payload()
df = get_bulk_data(AUTH, payload)
print(df.head(5))

elapsed = time.time() - start_time
print(f"\nExecution time: {elapsed:.2f} seconds")
