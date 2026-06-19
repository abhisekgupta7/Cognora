# core/redis.py

import redis

redis_conn = redis.Redis(
    host="redis",  # Use the service name defined in docker-compose.yml
    port=6379,
    decode_responses=False
)