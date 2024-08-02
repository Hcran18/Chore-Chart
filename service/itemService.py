from DAO.database import Database
from DAO.itemDAO import ItemDAO

from fastapi import HTTPException, status

class itemService:
    myDatabase = Database()

    def itemServiceTemplate(self, operation):
        database = Database()

        try:
            connection = database.get_connection()
            DAO = ItemDAO(connection)
            return operation(DAO)
        
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"An error occurred: {str(e)}"
            )
        
        finally:
            database.close_connection()

    def create_item(self, item):
        return self.itemServiceTemplate(lambda DAO: DAO.create_item(item))
    
    def get_item(self, item_id):
        return self.itemServiceTemplate(lambda DAO: DAO.get_item(item_id))
    
    def get_items(self, user_id):
        return self.itemServiceTemplate(lambda DAO: DAO.get_items(user_id))
    
    def update_item(self, item):
        return self.itemServiceTemplate(lambda DAO: DAO.update_item(item))
    
    def delete_item(self, item_id):
        return self.itemServiceTemplate(lambda DAO: DAO.delete_item(item_id))