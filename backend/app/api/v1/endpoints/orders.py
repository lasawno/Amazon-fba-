from fastapi import APIRouter, HTTPException, Query
from app.services.dashboard import dashboard_service
from app.schemas.dashboard import Order

router = APIRouter(prefix="/orders", tags=["orders"])


@router.get("", response_model=list[Order])
async def get_orders(limit: int = Query(10, ge=1, le=100)):
    """Get recent orders from FBA account.

    Fetches the most recent orders up to the specified limit.
    """
    orders = await dashboard_service.get_orders(limit)
    return orders


@router.get("/{order_id}", response_model=Order)
async def get_order(order_id: str):
    """Get details for a specific order."""
    order = await dashboard_service.get_order_by_id(order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order
