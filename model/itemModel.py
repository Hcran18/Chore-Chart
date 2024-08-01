from pydantic import BaseModel

class Item(BaseModel):
    id: int
    user_id: int
    item: str
    cost: int