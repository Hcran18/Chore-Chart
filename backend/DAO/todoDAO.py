from model.todoModel import Todo
class todoDAO():
    connection = None

    def __init__(self, connection) -> None:
        self.connection = connection

    def create_todo(self, new_todo: Todo):
        cursor = self.connection.cursor()
        try:
            cursor.execute("SELECT * FROM user WHERE id = %s", (new_todo.user_id,))
            result = cursor.fetchone()
            if result is None:
                raise {"message": "User does not exist"}
            
            cursor.execute("INSERT INTO todo (id, user_id, todo, points) VALUES (%s, %s, %s, %s)", (new_todo.id, new_todo.user_id, new_todo.todo, new_todo.points))
            self.connection.commit()
        except Exception as e:
            raise {"message": "Database error: " + str(e)}
        finally:
            cursor.close()

        return {"message": "Todo created successfully", "todo": new_todo}
    
    def get_todo(self, todo_id):
        cursor = self.connection.cursor()
        try:
            cursor.execute("SELECT * FROM todo WHERE id = %s", (todo_id,))
            result = cursor.fetchone()
        except Exception as e:
            raise {"message": "Database error: " + str(e)}
        finally:
            cursor.close()

        return {"todo": result}
    
    def get_todos(self, user_id):
        cursor = self.connection.cursor()
        try:
            cursor.execute("SELECT * FROM todo WHERE user_id = %s", (user_id,))
            result = cursor.fetchall()
        except Exception as e:
            raise {"message": "Database error: " + str(e)}
        finally:
            cursor.close()

        return {"todos": result}
    
    def update_todo(self, todo: Todo):
        cursor = self.connection.cursor()
        try:
            cursor.execute("UPDATE todo SET todo = %s, points = %s WHERE id = %s", (todo.todo, todo.points, todo.id))
            self.connection.commit()
        except Exception as e:
            raise {"message": "Database error: " + str(e)}
        finally:
            cursor.close()

        return {"message": "Todo updated successfully", "todo": todo}
    
    def delete_todo(self, todo_id):
        cursor = self.connection.cursor()
        try:
            cursor.execute("DELETE FROM todo WHERE id = %s", (todo_id,))
            self.connection.commit()
        except Exception as e:
            raise {"message": "Database error: " + str(e)}
        finally:
            cursor.close()

        return {"message": "Todo deleted successfully", "todo_id": todo_id}