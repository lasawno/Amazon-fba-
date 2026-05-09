from fastapi import APIRouter, HTTPException, Query
from datetime import datetime
import asyncio
from app.services.dashboard import dashboard_service
from app.schemas.dashboard import (
    DashboardMetrics,
    Order,
    InventoryItem,
    SalesData,
    DashboardResponse,
)

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("/metrics", response_model=DashboardMetrics)
async def get_dashboard_metrics():
    """Get dashboard metrics summary.

    Returns key performance indicators including revenue, orders, inventory health, etc.
    """
    metrics = await dashboard_service.get_metrics()
    return metrics


@router.get("/", response_model=DashboardResponse)
async def get_full_dashboard(
    orders_limit: int = Query(10, ge=1, le=100),
    days: int = Query(30, ge=1, le=365),
):
    """Get complete dashboard data.

    Returns metrics, recent orders, inventory status, and sales history.
    """
    metrics, orders, inventory, sales = await asyncio.gather(
        dashboard_service.get_metrics(),
        dashboard_service.get_orders(orders_limit),
        dashboard_service.get_inventory(),
        dashboard_service.get_sales_history(days),
    )

    return DashboardResponse(
        metrics=metrics,
        orders=orders,
        inventory=inventory,
        salesHistory=sales,
        lastUpdated=datetime.now(),
    )


@router.post("/refresh")
async def refresh_dashboard():
    """Manually refresh dashboard data from Amazon API."""
    try:
        metrics = await dashboard_service.get_metrics()
        return {
            "status": "success",
            "message": "Dashboard data refreshed",
            "lastUpdated": datetime.now(),
            "metrics": metrics,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
