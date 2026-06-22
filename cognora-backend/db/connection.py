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
    reconnect_timeout=30,
    max_idle=300,
    max_lifetime=600,
    kwargs={"row_factory": dict_row, "autocommit": True},
    open=True,
)

pool.check()

def get_conn():
    return pool.connection()