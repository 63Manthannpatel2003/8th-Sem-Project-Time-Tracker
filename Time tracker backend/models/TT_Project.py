from pydantic import BaseModel, Field
from bson import ObjectId
from typing import Optional

class ProjectOut(BaseModel):
    id: str = Field(alias="_id")
    name: str  # Ensure 'name' matches the field in your DB

    @classmethod
    def from_mongo(cls, data):
        """ Convert ObjectId to string """
        if "_id" in data:
            data["_id"] = str(data["_id"])
        return cls(**data)
