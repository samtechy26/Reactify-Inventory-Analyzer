from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import houses


origins = ["*"]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ['*'],
    allow_headers = ['*'],
    expose_headers=["Content-Range"]
)
app.include_router(houses.router)


@app.get("/")
async def root():
    return {"message": "welcome aboard"}