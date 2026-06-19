# workers/queue.py

from rq import Queue
from core.redis import redis_conn

queue = Queue(connection=redis_conn)
