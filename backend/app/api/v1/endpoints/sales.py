from fastapi import APIRouter, Query
from app.services.dashboard import dashboard_service
from app.schemas.dashboard import SalesData

router = APIRouter(prefix="/sales", tags=["sales"])


@router.get("/history", response_model=list[SalesData])
async def get_sales_history(days: int = Query(30, ge=1, le=365)):
    """Get sales history for a specified number of days.

    Returns daily order count, revenue, and units sold.
    """
    sales = await dashboard_service.get_sales_history(days)
    return sales
