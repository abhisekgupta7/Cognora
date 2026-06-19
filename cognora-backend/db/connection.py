import os
import psycopg
from psycopg.rows import dict_row
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# Create ONE shared connection
conn = psycopg.connect(
    DATABASE_URL,
     autocommit=True,
     row_factory=dict_row
     )

def get_conn():
    return conn
