from rq import Worker
from core.redis import redis_conn
from workers.job_queue import queue

if __name__ == "__main__":
    worker = Worker([queue], connection=redis_conn)
    worker.work()