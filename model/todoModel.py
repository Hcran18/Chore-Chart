from pydantic import BaseModel

class Todo(BaseModel):
    id: int
    user_id: int
    todo: str
    points: int
