import os
from dotenv import load_dotenv
import mysql.connector

load_dotenv()

class Database():
    __connection = None

    def open_connection():
        return mysql.connector.connect(
            host=os.getenv("DATABASE_HOST"),
            port=int(os.getenv("DATABASE_PORT")),
            user=os.getenv("DATABASE_USER"),
            password=os.getenv("DATABASE_PASSWORD"),
            database=os.getenv("DATABASE_NAME")
        )

    def get_connection(self):
        if Database.__connection is None:
            Database.__connection = Database.open_connection()

        return Database.__connection

    def close_connection(self):
        if Database.__connection is not None:
            Database.__connection.close()
        
        Database.__connection = None