from datetime import datetime
from app.schemas.dashboard import DashboardMetrics, Order, InventoryItem, SalesData
from app.services.mock_data import (
    generate_mock_metrics,
    generate_mock_orders,
    generate_mock_inventory,
    generate_mock_sales_history,
)


class DashboardService:
    """Service for dashboard-related operations.

    In production, this would connect to real Amazon Seller Partner API
    and database. Currently uses mock data for demonstration.
    """

    async def get_metrics(self) -> DashboardMetrics:
        """Fetch dashboard metrics from Amazon API or cache."""
        # TODO: Replace with actual Amazon API call
        # from app.services.amazon import AmazonSellerAPI
        # return await AmazonSellerAPI.get_metrics()
        return generate_mock_metrics()

    async def get_orders(self, limit: int = 10) -> list[Order]:
        """Fetch recent orders from Amazon API."""
        # TODO: Replace with actual Amazon API call
        return generate_mock_orders(limit)

    async def get_order_by_id(self, order_id: str) -> Order | None:
        """Fetch a specific order by ID."""
        # TODO: Replace with actual Amazon API call
        orders = generate_mock_orders(20)
        return next((o for o in orders if o.id == order_id), None)

    async def get_inventory(self) -> list[InventoryItem]:
        """Fetch inventory from Amazon FBA API."""
        # TODO: Replace with actual Amazon FBA Inventory API
        return generate_mock_inventory()

    async def get_inventory_by_sku_or_id(self, sku_or_id: str) -> InventoryItem | None:
        """Fetch specific inventory item by SKU or ID."""
        # TODO: Replace with actual Amazon API call
        inventory = generate_mock_inventory()
        return next(
            (i for i in inventory if i.sku == sku_or_id or i.id == sku_or_id),
            None,
        )

    async def get_sales_history(self, days: int = 30) -> list[SalesData]:
        """Fetch sales history from Amazon API."""
        # TODO: Replace with actual Amazon API call
        return generate_mock_sales_history(days)


dashboard_service = DashboardService()
