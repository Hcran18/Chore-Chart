from model.itemModel import Item

class ItemDAO:
    connection = None

    def __init__(self, connection) -> None:
        self.connection = connection

    def create_item(self, item: Item):
        cursor = self.connection.cursor()
        try:
            cursor.execute("SELECT * FROM user WHERE id = %s", (item.user_id,))
            result = cursor.fetchone()
            if result is None:
                raise {"message": "User does not exist"}
            
            cursor.execute("INSERT INTO item (id, user_id, item, cost) VALUES (%s, %s, %s, %s)", (item.id, item.user_id, item.item, item.cost))
            self.connection.commit()
        except Exception as e:
            raise {"message": "Database error: " + str(e)}
        finally:
            cursor.close()

        return {"message": "Item created successfully", "item": item}
    
    def get_item(self, item_id):
        cursor = self.connection.cursor()
        try:
            cursor.execute("SELECT * FROM item WHERE id = %s", (item_id,))
            result = cursor.fetchone()
        except Exception as e:
            raise {"message": "Database error: " + str(e)}
        finally:
            cursor.close()

        return {"item": result}
    
    def get_items(self, user_id):
        cursor = self.connection.cursor()
        try:
            cursor.execute("SELECT * FROM item WHERE user_id = %s", (user_id,))
            result = cursor.fetchall()
        except Exception as e:
            raise {"message": "Database error: " + str(e)}
        finally:
            cursor.close()

        return {"items": result}
    
    def update_item(self, item):
        cursor = self.connection.cursor()
        try:
            cursor.execute("UPDATE item SET user_id = %s, item = %s, cost = %s WHERE id = %s", (item.user_id, item.item, item.cost, item.id))
            self.connection.commit()
        except Exception as e:
            raise {"message": "Database error: " + str(e)}
        finally:
            cursor.close()

        return {"message": "Item updated successfully", "item": item}
    
    def delete_item(self, item_id):
        cursor = self.connection.cursor()
        try:
            cursor.execute("DELETE FROM item WHERE id = %s", (item_id,))
            self.connection.commit()
        except Exception as e:
            raise {"message": "Database error: " + str(e)}
        finally:
            cursor.close()

        return {"message": "Item deleted successfully", "item_id": item_id}