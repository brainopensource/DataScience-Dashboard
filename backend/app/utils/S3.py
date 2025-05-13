import time
import boto3
import pandas as pd
from io import BytesIO
from credentials import AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_SESSION_TOKEN


# Disable all warnings
#warnings.filterwarnings("ignore")
DPC_ENVIRON = 'dpc-transform-iprod'
#BUCKET_NAME = 'wood-mackenzie--upstream-data-dashboard-well-production-latest-view--transform'
#BUCKET_BATCH = 'latest'
#FILENAME = 'well_production_2024.parquet'
BUCKET_NAME = '303e1f90-1639-11f0-a14f-d74aa5b55076'   # this is 'anp--field-reference-prices-oil--transform'
BUCKET_BATCH = '2025-04-29'
FILENAME = 'field_reference_prices_1998-2020-1.parquet'


def extract_s3_info(environ, bucket, batch, filename):
    return environ, f"{bucket}/{batch}/{filename}"


def load_parquet_from_s3_boto(bucket_name, object_key, aws_access_key, aws_secret_key, aws_session_token=None):
    session = boto3.session.Session()
    s3_client = session.client(
        's3',
        aws_access_key_id=aws_access_key,
        aws_secret_access_key=aws_secret_key,
        aws_session_token=aws_session_token,
        region_name='us-east-1',
        verify=False  # Disable SSL verification for testing only
    )

    try:
        response = s3_client.get_object(Bucket=bucket_name, Key=object_key)
        parquet_data = response['Body'].read()
        df = pd.read_parquet(BytesIO(parquet_data), engine='pyarrow')
        return df
    except Exception as e:
        print(f"Error fetching or loading the Parquet file: {e}")
        return None


def main():

    print('\n Starting')
    start_time = time.time()
    
    #s3_uri = "s3://dpc-transform-iprod/wood-mackenzie--upstream-data-dashboard-well-production-latest-view--transform/latest/well_production_2024.parquet"
    object_key = f"{BUCKET_NAME}/{BUCKET_BATCH}/{FILENAME}"
    #prefix = "/".join(object_key.split("/")[:-1])  # Get prefix (directory)

    df = load_parquet_from_s3_boto(DPC_ENVIRON, object_key, AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_SESSION_TOKEN)

    if df is not None:
        print("\nParquet file content:")
        print(df.shape)
        print(df.head(2))
        return df
    else:
        print("Failed to load the Parquet file.")


    end_time = time.time()
    print(f"\nExecution time for load_parquet_from_s3: {end_time - start_time:.4f} seconds")


df = main()
print(df.head(5))