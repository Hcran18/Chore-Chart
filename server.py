from fastapi import FastAPI

from model.userModel import User
from model.todoModel import Todo
from model.itemModel import Item

from service.userService import userService

app = FastAPI()

# @app.get("/")
# def read_root():
#     return {"message": "Hello World"}

# Routes for user
@app.post("/register/{user_id}/{user_name}")
def register(user_id: int, user_name: str):
    service = userService()
    user = User(id=user_id, name=user_name, points=0)
    return service.register(user)

@app.post("/login/{user_name}")
def login(user_name: str):
    service = userService()
    return service.login(user_name)

@app.get("/get-user/{user_id}")
def get_user(user_id: int):
    service = userService()
    return service.get_user(user_id)

@app.put("/update-user/{user_id}/{user_name}/{points}")
def update_user(user_id: int, user_name: str, points: int):
    service = userService()
    user = User(id=user_id, name=user_name, points=points)
    return service.update_user(user)

@app.delete("/delete-user/{user_id}")
def delete_user(user_id: int):
    service = userService()
    return service.delete_user(user_id)

# Routes for todo
@app.post("/create-todo")
def create_todo():
    return {"message": "Create todo"}

@app.get("/get-todo")
def get_todo():
    return {"message": "Get todo"}

@app.put("/update-todo")
def update_todo():
    return {"message": "Update todo"}

@app.delete("/delete-todo")
def delete_todo():
    return {"message": "Delete todo"}

# Routes for items
@app.post("/create-item")
def create_item():
    return {"message": "Create item"}

@app.get("/get-item")
def get_item():
    return {"message": "Get item"}

@app.put("/update-item")
def update_item():
    return {"message": "Update item"}

@app.delete("/delete-item")
def delete_item():
    return {"message": "Delete item"}


