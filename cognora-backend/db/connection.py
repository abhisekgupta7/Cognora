import os
import psycopg_pool
from psycopg.rows import dict_row
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

pool = psycopg_pool.ConnectionPool(
    DATABASE_URL,
    min_size=1,
    max_size=10,
    kwargs={"row_factory": dict_row, "autocommit": True}
)

def get_conn():
    return pool.connection()