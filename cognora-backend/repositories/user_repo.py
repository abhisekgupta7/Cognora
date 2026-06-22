from db.connection import get_conn
class UserRepository:
    def get_user_by_id(self, user_id): 
        query = "SELECT * FROM users WHERE id = %s"
        with get_conn() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (user_id,))
                return cursor.fetchone()
