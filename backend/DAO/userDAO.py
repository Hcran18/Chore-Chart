from model.userModel import User

class UserDao():
    connection = None

    def __init__(self, connection) -> None:
        self.connection = connection

    def register(self, user: User):
        cursor = self.connection.cursor()
        try:
            cursor.execute("INSERT INTO user (id, name, points) VALUES (%s, %s, %s)", (user.id, user.name, user.points))
            self.connection.commit()
        except Exception as e:
            raise {"message": "Database error: " + str(e)}
        finally:
            cursor.close()

        return {"message": "User registered successfully", "user": user}

    def login(self, user_name):
        cursor = self.connection.cursor()
        try:
            cursor.execute("SELECT * FROM user WHERE name = %s", (user_name,))
            result = cursor.fetchone()
        except Exception as e:
            raise {"message": "Database error: " + str(e)}
        finally:
            cursor.close()

        return {"message": "User logged in successfully", "user": result}
    
    def get_user(self, user_id):
        cursor = self.connection.cursor()
        try:
            cursor.execute("SELECT * FROM user WHERE id = %s", (user_id,))
            result = cursor.fetchone()
        except Exception as e:
            raise {"message": "Database error: " + str(e)}
        finally:
            cursor.close()

        return {"user": result}
    
    def update_user(self, user):
        cursor = self.connection.cursor()
        try:
            cursor.execute("UPDATE user SET name = %s, points = %s WHERE id = %s", (user.name, user.points, user.id))
            self.connection.commit()
        except Exception as e:
            raise {"message": "Database error: " + str(e)}
        finally:
            cursor.close()

        return {"message": "User updated successfully", "user": user}

    def delete_user(self, user_id):
        cursor = self.connection.cursor()
        try:
            cursor.execute("DELETE FROM user WHERE id = %s", (user_id,))
            self.connection.commit()
        except Exception as e:
            raise {"message": "Database error: " + str(e)}
        finally:
            cursor.close()

        return {"message": "User deleted successfully", "user_id": user_id}