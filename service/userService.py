from DAO.database import Database
from DAO.userDAO import UserDao

from fastapi import HTTPException, status

class userService:
    myDatabase = Database()

    def userServiceTemplate(self, operation):
        database = Database()

        try:
            connection = database.get_connection()
            DAO = UserDao(connection)
            return operation(DAO)
        
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"An error occurred: {str(e)}"
            )
        
        finally:
            database.close_connection()

    def register(self, user):
        return self.userServiceTemplate(lambda DAO: DAO.register(user))
    
    def login(self, user_name):
        return self.userServiceTemplate(lambda DAO: DAO.login(user_name))
    
    def get_user(self, user_id):
        return self.userServiceTemplate(lambda DAO: DAO.get_user(user_id))
    
    def update_user(self, user):
        return self.userServiceTemplate(lambda DAO: DAO.update_user(user))
    
    def delete_user(self, user_id):
        return self.userServiceTemplate(lambda DAO: DAO.delete_user(user_id))
