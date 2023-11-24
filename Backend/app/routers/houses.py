from fastapi import APIRouter, HTTPException, Body, Response, Query
from ..models.houses import HouseDB, HouseUpdate
from ..database import house_collection
from bson import ObjectId
from typing import Optional


router = APIRouter(prefix="/houses", tags=["houses"])


# A route to get a list of all the houses
@router.get(
    "/",
    response_description="List all houses",
    response_model_by_alias=False,
)
async def list_houses(
    response: Response,
    page: int = Query(1, ge=1, description="Page number"),
    town: Optional[str] = Query(None, description="Filter by town"),
    min_price: Optional[int] = Query(None, description="Minimum price filter"),
    max_price: Optional[int] = Query(None, description="Maximum price filter"),
) -> list[HouseDB]:
    # Set the Content-Range header
    RESULT_PER_PAGE = 20
    skip = (page - 1) * RESULT_PER_PAGE

    # Define the filter based on query parameters
    filter_params = {}
    if town:
        filter_params["town"] = town
    if min_price is not None:
        filter_params["price"] = {"$gte": min_price}
    if max_price is not None:
        filter_params.setdefault("price", {})["$lte"] = max_price

    query = house_collection.find().skip(skip).limit(RESULT_PER_PAGE)

    query2 = house_collection.find().skip(skip).limit(RESULT_PER_PAGE)
    houses = await query2.to_list(RESULT_PER_PAGE)
    total_houses = await house_collection.count_documents({})
    content_range_header = f"houses {skip}-{skip + len(houses) - 1}/{total_houses}"
    response.headers["Content-Range"] = content_range_header
    return [house async for house in query]


# A route to handle the calculation of all the houses sold in each town
@router.get("/town/count", response_description="Count by town")
async def town_count():
    query = [{"$group": {"_id": "$town", "count": {"$sum": 1}}}]
    full_query = house_collection.aggregate(query)
    return [el async for el in full_query]


# A route to handle listing out all the town names
@router.get("/towns", response_description="Get List of towns")
async def town_list():
    full_query = house_collection.aggregate(
        [{"$group": {"_id": "$town"}}, {"$project": {"_id": 0, "town": "$_id"}}]
    )
    return [el async for el in full_query]


# A route to handle the count of all the property types
@router.get("/type/count", response_description="percentage of proprty type")
async def type_percent():
    query = [{"$group": {"_id": "$property_type", "count": {"$sum": 1}}}]
    full_query = house_collection.aggregate(query)
    return [el async for el in full_query]


# A route to get all the distinct types of properties sold in each town
@router.get(
    "/sample/{town}", response_description="Sum of different properties in each town"
)
async def get_property_per_town(town: str):
    query = [
        {"$match": {"town": town}},
        {
            "$group": {
                "_id": {"town": "$town", "property_type": "$property_type"},
                "count": {"$sum": 1},
            }
        },
        {
            "$project": {
                "_id": 0,
                "town": "$_id.town",
                "property_type": "$_id.property_type",
                "count": 1,
            }
        },
    ]
    full_query = house_collection.aggregate(query)
    return [el async for el in full_query]

@router.get("/summary")
async def dashboard_summary():
    pipeline = [
        {
            "$group": {
                "_id": None,
                "total": {"$sum": 1},
                "townsCount": {"$addToSet": "$town"},
                "propertyTypesCount": {"$addToSet": "$property_type"},
            }
        },
        {
            "$project": {
                "_id": 0,
                "total": 1,
                "townsCount": {"$size": "$townsCount"},
                "propertyTypesCount": {"$size": "$propertyTypesCount"},
            }
        },
    ]
    full_query = house_collection.aggregate(pipeline)
    result_list = [el async for el in full_query]

    # Check if there are elements in the result_list
    if result_list:
        # Return the first element (single object)
        return result_list[0]
    else:
        # Return an empty object or handle the case as needed
        return {}


# A detail route, responsible for serving the details of each house sale
@router.get(
    "/{id}",
    response_description="Get a single house",
    response_model=HouseDB,
    response_model_by_alias=False,
)
async def show_house(id: str):
    if (house := await house_collection.find_one({"_id": ObjectId(id)})) is not None:
        return HouseDB(**house)
    raise HTTPException(status_code=404, detail=f"House with {id} not found")


# An update route, to update a single house sale detail
@router.put(
    "/{id}",
    response_description="Update a house detail",
    response_model=HouseDB,
    response_model_by_alias=False,
)
async def update_house(id: str, data: HouseUpdate = Body(...)):
    update_data = data.model_dump(exclude_unset=True)
    updated_house = await house_collection.update_one(
        {"_id": ObjectId(id)}, {"$set": update_data}
    )
    if updated_house:
        house = await house_collection.find_one({"_id": ObjectId(id)})
        return house
    raise HTTPException(status_code=404, detail=f"House with {id} id was not found")
