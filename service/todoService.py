from DAO.database import Database
from DAO.todoDAO import todoDAO

from fastapi import HTTPException, status

class todoService:
    myDatabase = Database()

    def todoServiceTemplate(self, operation):
        database = Database()

        try:
            connection = database.get_connection()
            DAO = todoDAO(connection)
            return operation(DAO)
        
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"An error occurred: {str(e)}"
            )
        
        finally:
            database.close_connection()

    def create_todo(self, todo):
        return self.todoServiceTemplate(lambda DAO: DAO.create_todo(todo))
    
    def get_todo(self, todo_id):
        return self.todoServiceTemplate(lambda DAO: DAO.get_todo(todo_id))
    
    def get_todos(self, user_id):
        return self.todoServiceTemplate(lambda DAO: DAO.get_todos(user_id))

    def update_todo(self, todo):
        return self.todoServiceTemplate(lambda DAO: DAO.update_todo(todo))
    
    def delete_todo(self, todo_id):
        return self.todoServiceTemplate(lambda DAO: DAO.delete_todo(todo_id))