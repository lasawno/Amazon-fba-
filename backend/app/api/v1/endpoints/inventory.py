from fastapi import APIRouter, HTTPException
from app.services.dashboard import dashboard_service
from app.schemas.dashboard import InventoryItem

router = APIRouter(prefix="/inventory", tags=["inventory"])


@router.get("", response_model=list[InventoryItem])
async def get_inventory():
    """Get current FBA inventory status.

    Returns all inventory items with quantities, health status, and turnover metrics.
    """
    inventory = await dashboard_service.get_inventory()
    return inventory


@router.get("/{sku_or_id}", response_model=InventoryItem)
async def get_inventory_item(sku_or_id: str):
    """Get details for a specific inventory item by SKU or ID."""
    item = await dashboard_service.get_inventory_by_sku_or_id(sku_or_id)
    if not item:
        raise HTTPException(status_code=404, detail="Inventory item not found")
    return item
