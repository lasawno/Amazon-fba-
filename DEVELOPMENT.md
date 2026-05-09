# Development Guide

## Quick Start

### Option 1: Using Docker Compose (Recommended)

```bash
# Start all services
docker-compose up --build

# In another terminal, run database migrations (if needed)
docker-compose exec backend alembic upgrade head
```

Services will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs
- Database: localhost:5432
- Redis: localhost:6379

### Option 2: Local Development

#### Backend

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at http://localhost:8000

#### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will be available at http://localhost:5173

## Project Structure Details

### Frontend Components

#### MetricCard (`src/components/MetricCard.tsx`)
Displays a single metric with trend indicator and icon. Features:
- Animated entrance with Framer Motion
- Trend indicators (up/down arrows)
- Color-coded sentiment
- Icon support

#### Header (`src/components/Header.tsx`)
Top navigation bar with:
- Menu toggle for mobile
- Notification bell with badge
- Settings button
- User profile

#### Sidebar (`src/components/Sidebar.tsx`)
Navigation sidebar with:
- Menu items for Dashboard, Orders, Inventory, Analytics
- Active state highlighting
- Settings and logout buttons
- Mobile responsiveness with animation

#### OrdersTable (`src/components/OrdersTable.tsx`)
Displays recent orders with:
- Order number, customer name, amount
- Status badge with color coding
- Relative date formatting
- Responsive table design

#### InventoryHealth (`src/components/InventoryHealth.tsx`)
Shows inventory status with:
- Health indicators (healthy, warning, critical)
- Stock quantity and utilization %
- Animated progress bars
- Top 5 items display

#### SalesChart (`src/components/SalesChart.tsx`)
Interactive sales visualization with:
- Bar chart showing revenue and orders
- 30-day trend line
- Average calculations
- Responsive sizing

### Backend Services

#### DashboardService (`app/services/dashboard.py`)
Core business logic for:
- Fetching metrics from Amazon API (or mock data)
- Getting orders, inventory, and sales data
- Caching frequently accessed data

#### Mock Data Generator (`app/services/mock_data.py`)
Generates realistic mock data for:
- Dashboard metrics
- Orders with various statuses
- Inventory items with health status
- Sales history with trends

#### API Endpoints

**Dashboard**
```
GET /api/v1/dashboard/metrics
  - Returns: DashboardMetrics

GET /api/v1/dashboard
  - Query params: orders_limit (default 10), days (default 30)
  - Returns: Full dashboard response with all data

POST /api/v1/dashboard/refresh
  - Force refresh dashboard data
```

**Orders**
```
GET /api/v1/orders?limit=10
  - Returns: List[Order]

GET /api/v1/orders/{order_id}
  - Returns: Order
  - Status: 404 if not found
```

**Inventory**
```
GET /api/v1/inventory
  - Returns: List[InventoryItem]

GET /api/v1/inventory/{sku_or_id}
  - Returns: InventoryItem
  - Status: 404 if not found
```

**Sales**
```
GET /api/v1/sales/history?days=30
  - Returns: List[SalesData]
```

## Adding Amazon API Integration

### Step 1: Install Amazon SP-API Library

```bash
cd backend
pip install python-amazon-sp-api
```

### Step 2: Update Configuration

Add your credentials to `.env`:
```env
AMAZON_CLIENT_ID=amzn1.application-xxxxxxx
AMAZON_CLIENT_SECRET=your_secret
AMAZON_REGION=US
AMAZON_SELLER_ID=AXXXXXXXXXX
AMAZON_REFRESH_TOKEN=Atz.xxxxx
```

### Step 3: Create Amazon API Service

Create `app/services/amazon.py`:

```python
from amazon_sp_api import Client
from app.core.config import settings

class AmazonSellerAPI:
    def __init__(self):
        self.client = Client(
            client_id=settings.AMAZON_CLIENT_ID,
            client_secret=settings.AMAZON_CLIENT_SECRET,
            region=settings.AMAZON_REGION,
            refresh_token=settings.AMAZON_REFRESH_TOKEN
        )

    async def get_orders(self, limit: int = 10):
        response = self.client.Orders.get_orders()
        # Parse and return orders

    async def get_inventory(self):
        response = self.client.FulfillmentInventory.get_inventory_summary_marketplace()
        # Parse and return inventory
```

### Step 4: Update DashboardService

Replace mock data with Amazon API calls:

```python
from app.services.amazon import AmazonSellerAPI

class DashboardService:
    def __init__(self):
        self.amazon_api = AmazonSellerAPI()

    async def get_orders(self, limit: int = 10):
        return await self.amazon_api.get_orders(limit)
```

## Database Setup

### Create PostgreSQL Database

```sql
CREATE DATABASE amazon_fba_db;
CREATE USER amazon_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE amazon_fba_db TO amazon_user;
```

### Run Migrations

```bash
cd backend
alembic init migrations
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head
```

## Common Tasks

### Update Frontend Dependencies

```bash
cd frontend
npm update
npm audit fix
```

### Update Backend Dependencies

```bash
cd backend
pip install --upgrade -r requirements.txt
pip freeze > requirements.txt
```

### Run Linting

```bash
# Frontend
cd frontend
npm run lint

# Backend
cd backend
pylint app/
```

### Build for Production

```bash
# Frontend
cd frontend
npm run build
# Output in frontend/dist/

# Backend
cd backend
pip install -r requirements.txt
# Use production server: gunicorn or uvicorn with workers
```

## Testing

### Frontend Testing (Optional Setup)

```bash
cd frontend
npm install --save-dev vitest @testing-library/react
```

### Backend Testing

```bash
cd backend
pip install pytest pytest-asyncio
pytest
```

## Debugging

### Frontend Debugging

- Use React DevTools browser extension
- Check browser console for errors
- Use Vite debug mode: `npm run dev -- --debug`

### Backend Debugging

```bash
# Add to main.py
import logging
logging.basicConfig(level=logging.DEBUG)

# Or use breakpoints with Python debugger
import pdb; pdb.set_trace()
```

## Performance Tips

### Frontend
- Use React DevTools Profiler to identify slow components
- Implement code splitting with React.lazy()
- Optimize images with WebP format
- Use Tailwind's purge for production CSS

### Backend
- Use async/await for I/O operations
- Implement database query optimization
- Cache with Redis frequently accessed data
- Use pagination for large result sets

## Troubleshooting

### Port Conflicts

```bash
# Find process using port 8000
lsof -i :8000
kill -9 <PID>
```

### Module Not Found Errors

```bash
# Frontend
npm install

# Backend
pip install -r requirements.txt
```

### Database Connection Error

```bash
# Check PostgreSQL is running
psql -U user -d amazon_fba_db

# Check connection string in .env
DATABASE_URL=postgresql://user:password@localhost:5432/amazon_fba_db
```

### CORS Issues

Check `.env` CORS_ORIGINS includes your frontend URL:
```env
CORS_ORIGINS=["http://localhost:5173", "http://localhost:3000"]
```

## Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Amazon Seller Partner API](https://developer.amazon.com/amazon-seller-partner-api)
