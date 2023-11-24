from datetime import datetime, date
from pydantic import BaseModel, Field
from typing import Optional, List
from typing_extensions import Annotated
from ..database import PyObjectId
from bson import ObjectId

class HouseBase(BaseModel):
    id: Optional[PyObjectId] = Field(alias='_id', default=None)

    class config:
        json_encoders = {ObjectId: str}


class HouseDB(HouseBase):
    list_year: date
    date_recorded: date
    town: str 
    address: str 
    proposed_value: float 
    sale_amount: float 
    property_type: str 


class HouseCollection(BaseModel):
    houses: List[HouseDB]


class HouseUpdate(BaseModel):
    town: Optional[str] 
    address: Optional[str] 
    proposed_value: Optional[float] 
    sale_amount: Optional[float] 
    property_type: Optional[str]

class HouseFilter(BaseModel):
    title: str