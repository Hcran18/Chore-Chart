from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from model.userModel import User
from model.todoModel import Todo
from model.itemModel import Item

from service.userService import userService
from service.todoService import todoService
from service.itemService import itemService

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# To run the server, use the command: uvicorn server:app --reload

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

@app.put("/update-user/{user_id}/{user_name}/{given_points}")
def update_user(user_id: int, user_name: str, given_points: int):
    service = userService()
    user = User(id=user_id, name=user_name, points=given_points)
    return service.update_user(user)

@app.delete("/delete-user/{user_id}")
def delete_user(user_id: int):
    service = userService()
    return service.delete_user(user_id)

# Routes for todo
@app.post("/create-todo/{todo_id}/{user_id}/{new_todo}/{given_points}")
def create_todo(todo_id: int, user_id: int, new_todo: str, given_points: int):
    service = todoService()
    new_todo = Todo(id=todo_id, user_id=user_id, todo=new_todo, points=given_points)
    return service.create_todo(new_todo)

@app.get("/get-todo/{todo_id}")
def get_todo(todo_id: int):
    service = todoService()
    return service.get_todo(todo_id)

@app.get("/get-todos/{user_id}")
def get_todos(user_id: int):
    service = todoService()
    return service.get_todos(user_id)

@app.put("/update-todo/{todo_id}/{user_id}/{new_todo}/{given_points}")
def update_todo(todo_id: int, user_id: int, given_todo: str, given_points: int):
    service = todoService()
    new_todo = Todo(id=todo_id, user_id=user_id, todo=given_todo, points=given_points)
    return service.update_todo(new_todo)

@app.delete("/delete-todo/{todo_id}")
def delete_todo(todo_id: int):
    service = todoService()
    return service.delete_todo(todo_id)

# Routes for items
@app.post("/create-item/{item_id}/{user_id}/{new_item}/{given_cost}")
def create_item(item_id: int, user_id: int, new_item: str, given_cost: int):
    service = itemService()
    new_item = Item(id=item_id, user_id=user_id, item=new_item, cost=given_cost)
    return service.create_item(new_item)

@app.get("/get-item/{item_id}")
def get_item(item_id: int):
    service = itemService()
    return service.get_item(item_id)

@app.get("/get-items/{user_id}")
def get_items(user_id: int):
    service = itemService()
    return service.get_items(user_id)

@app.put("/update-item/{item_id}/{user_id}/{new_item}/{given_cost}")
def update_item(item_id: int, user_id: int, new_item: str, given_cost: int):
    service = itemService()
    new_item = Item(id=item_id, user_id=user_id, item=new_item, cost=given_cost)
    return service.update_item(new_item)

@app.delete("/delete-item/{item_id}")
def delete_item(item_id: int):
    service = itemService()
    return service.delete_item(item_id)

# Other logic

# Delete a todo and update the user's points
@app.delete("/complete-todo/{todo_id}")
def complete_todo(todo_id: int):
    todoServ = todoService()
    userServ = userService()

    todo = todoServ.get_todo(todo_id)
    assert todo is not None

    userID = todo['todo'][1]
    user = userServ.get_user(userID)
    assert user is not None

    todoPoints = todo['todo'][3]
    userPoints = user['user'][2]
    userPoints += todoPoints
    newUser = User(id=user['user'][0], name=user['user'][1], points=userPoints)

    updatedUser = userServ.update_user(newUser)
    assert updatedUser['user'].points == userPoints

    deletedTodo = todoServ.delete_todo(todo_id)
    assert deletedTodo['message'] == "Todo deleted successfully"

    return {"message": updatedUser['message'], "user": updatedUser['user']}

@app.delete("/purchase-item/{user_id}/{item_id}")
def purchase_item(user_id: int, item_id: int):
    itemServ = itemService()
    userServ = userService()

    item = itemServ.get_item(item_id)
    assert item is not None

    itemCost = item['item'][3]

    user = userServ.get_user(user_id)
    assert user is not None

    userPoints = user['user'][2]

    if userPoints < itemCost:
        return {"message": "Insufficient points to purchase this item", "user": user['user']}
    
    userPoints -= itemCost
    newUser = User(id=user['user'][0], name=user['user'][1], points=userPoints)

    updatedUser = userServ.update_user(newUser)
    assert updatedUser['user'].points == userPoints

    deletedItem = itemServ.delete_item(item_id)
    assert deletedItem['message'] == "Item deleted successfully"

    return {"message": updatedUser['message'], "user": updatedUser['user']}
