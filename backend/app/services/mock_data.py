from datetime import datetime, timedelta
import random
from app.schemas.dashboard import Order, OrderStatus, InventoryItem, InventoryHealth, SalesData, DashboardMetrics


def generate_mock_metrics() -> DashboardMetrics:
    return DashboardMetrics(
        totalOrders=1247,
        pendingOrders=23,
        totalRevenue=47820.50,
        revenueChange=12.5,
        totalUnits=3456,
        unitsChange=8.3,
        inventoryHealth=87.5,
        inventoryHealthChange=5.2,
        avgOrderValue=38.35,
        avgOrderValueChange=2.1,
    )


def generate_mock_orders(limit: int = 10) -> list[Order]:
    statuses = list(OrderStatus)
    customers = [
        "John Smith", "Jane Doe", "Michael Johnson", "Sarah Williams",
        "Robert Brown", "Emily Davis", "James Miller", "Lisa Anderson"
    ]

    orders = []
    for i in range(limit):
        orders.append(
            Order(
                id=f"order-{i+1}",
                orderNumber=f"AMZ-{1000000+i}",
                status=random.choice(statuses),
                amount=round(random.uniform(10, 200), 2),
                units=random.randint(1, 5),
                date=datetime.now() - timedelta(days=random.randint(0, 30)),
                customerName=random.choice(customers),
            )
        )
    return sorted(orders, key=lambda x: x.date, reverse=True)


def generate_mock_inventory() -> list[InventoryItem]:
    skus = [
        "SKU-001", "SKU-002", "SKU-003", "SKU-004", "SKU-005",
        "SKU-006", "SKU-007", "SKU-008", "SKU-009", "SKU-010"
    ]
    products = [
        "Wireless Earbuds", "Phone Case", "USB-C Cable", "Screen Protector",
        "Power Bank", "Laptop Stand", "Mouse Pad", "Keyboard", "Monitor", "Webcam"
    ]
    healths = [InventoryHealth.HEALTHY, InventoryHealth.WARNING, InventoryHealth.CRITICAL]

    inventory = []
    for i, (sku, product) in enumerate(zip(skus, products)):
        qty = random.randint(10, 1000)
        inventory.append(
            InventoryItem(
                id=f"inv-{i+1}",
                sku=sku,
                name=product,
                quantity=qty,
                reservedQuantity=random.randint(0, qty//2),
                minimumThreshold=50,
                health=random.choice(healths),
                turnover=round(random.uniform(0.5, 5.0), 2),
            )
        )
    return inventory


def generate_mock_sales_history(days: int = 30) -> list[SalesData]:
    sales = []
    base_revenue = 1500
    base_orders = 25

    for i in range(days):
        date = datetime.now() - timedelta(days=days-i-1)
        # Add some randomness and trend
        variance_revenue = random.uniform(-200, 300)
        variance_orders = random.randint(-5, 10)

        sales.append(
            SalesData(
                date=date,
                orders=max(10, int(base_orders + variance_orders + (i * 0.5))),
                revenue=round(base_revenue + variance_revenue + (i * 20), 2),
                units=random.randint(40, 120),
            )
        )
    return sales
