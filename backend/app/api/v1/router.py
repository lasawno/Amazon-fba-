from fastapi import APIRouter
from app.api.v1.endpoints import dashboard, orders, inventory, sales

api_router = APIRouter(prefix="/v1")

api_router.include_router(dashboard.router)
api_router.include_router(orders.router)
api_router.include_router(inventory.router)
api_router.include_router(sales.router)
