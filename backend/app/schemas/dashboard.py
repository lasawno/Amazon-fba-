from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from enum import Enum


class OrderStatus(str, Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    SHIPPED = "shipped"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"


class Order(BaseModel):
    id: str
    orderNumber: str
    status: OrderStatus
    amount: float
    units: int
    date: datetime
    customerName: str

    class Config:
        from_attributes = True


class InventoryHealth(str, Enum):
    HEALTHY = "healthy"
    WARNING = "warning"
    CRITICAL = "critical"


class InventoryItem(BaseModel):
    id: str
    sku: str
    name: str
    quantity: int
    reservedQuantity: int
    minimumThreshold: int
    health: InventoryHealth
    turnover: float

    class Config:
        from_attributes = True


class SalesData(BaseModel):
    date: datetime
    orders: int
    revenue: float
    units: int

    class Config:
        from_attributes = True


class DashboardMetrics(BaseModel):
    totalOrders: int
    pendingOrders: int
    totalRevenue: float
    revenueChange: float
    totalUnits: int
    unitsChange: float
    inventoryHealth: float
    inventoryHealthChange: float
    avgOrderValue: float
    avgOrderValueChange: float


class DashboardResponse(BaseModel):
    metrics: DashboardMetrics
    orders: List[Order]
    inventory: List[InventoryItem]
    salesHistory: List[SalesData]
    lastUpdated: datetime
