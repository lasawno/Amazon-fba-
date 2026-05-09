# Amazon FBA Seller Dashboard

A modern, full-stack dashboard for Amazon FBA sellers built with React, FastAPI, and Framer-style design. Monitor orders, inventory, and sales metrics in real-time.

## Features

- **Real-time Metrics**: Track revenue, orders, units sold, and inventory health at a glance
- **Modern UI**: Framer-style design with smooth animations and responsive layout
- **Order Management**: View and manage recent orders with detailed status tracking
- **Inventory Monitoring**: Monitor stock levels, health status, and turnover rates
- **Sales Analytics**: Interactive charts showing 30-day sales trends
- **API Integration**: Ready for Amazon Seller Partner API and Amazon MWS integration
- **Scalable Architecture**: FastAPI backend with PostgreSQL and Redis support

## Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type-safe development
- **Framer Motion** - Smooth animations and transitions
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Interactive charts and graphs
- **Vite** - Lightning-fast build tool
- **Axios** - HTTP client

### Backend
- **FastAPI** - Modern Python web framework
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation
- **PostgreSQL** - Primary database
- **Redis** - Caching and real-time data
- **SQLAlchemy** - ORM (optional, for database models)
- **Python 3.11+**

## Project Structure

```
.
├── frontend/                    # React application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Page components
│   │   ├── hooks/              # Custom React hooks
│   │   ├── services/           # API service layer
│   │   ├── types/              # TypeScript type definitions
│   │   ├── styles/             # Global styles
│   │   └── App.tsx             # Root app component
│   ├── index.html              # HTML entry point
│   ├── package.json            # Node dependencies
│   └── vite.config.ts          # Vite configuration
│
├── backend/                    # FastAPI application
│   ├── app/
│   │   ├── api/
│   │   │   └── v1/
│   │   │       ├── endpoints/  # API route handlers
│   │   │       └── router.py   # Route configuration
│   │   ├── core/               # Core configuration
│   │   ├── schemas/            # Pydantic models
│   │   ├── services/           # Business logic
│   │   └── main.py             # FastAPI app initialization
│   ├── requirements.txt        # Python dependencies
│   └── Dockerfile              # Backend Docker image
│
├── docker-compose.yml          # Multi-container orchestration
├── .env.example                # Environment variables template
└── README.md                   # This file
```

## Installation

### Prerequisites
- Node.js 18+
- Python 3.11+
- Docker & Docker Compose (for containerized deployment)
- PostgreSQL 15+ (if not using Docker)
- Redis 7+ (if not using Docker)

### Local Setup (Without Docker)

#### Backend Setup

1. Create and activate Python virtual environment:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Configure environment variables:
```bash
cp ../.env.example ../.env
# Edit .env with your Amazon API credentials
```

4. Run the backend:
```bash
uvicorn app.main:app --reload
```
Backend runs on `http://localhost:8000`

#### Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start development server:
```bash
npm run dev
```
Frontend runs on `http://localhost:5173`

### Docker Setup

1. Configure environment:
```bash
cp .env.example .env
# Edit .env with your credentials
```

2. Build and start services:
```bash
docker-compose up --build
```

Access the application:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8000`
- API Docs: `http://localhost:8000/docs`

## Configuration

### Environment Variables

Required variables in `.env`:

```env
# Amazon Seller Partner API
AMAZON_CLIENT_ID=your_client_id
AMAZON_CLIENT_SECRET=your_client_secret
AMAZON_REGION=us-east-1
AMAZON_SELLER_ID=your_seller_id
AMAZON_MWS_AUTH_TOKEN=your_token

# Database (if not using Docker)
DATABASE_URL=postgresql://user:password@localhost:5432/amazon_fba_db

# Redis (if not using Docker)
REDIS_URL=redis://localhost:6379/0

# Frontend API URL
VITE_API_URL=http://localhost:8000/api
```

## API Endpoints

### Dashboard
- `GET /api/v1/dashboard/metrics` - Get dashboard KPIs
- `GET /api/v1/dashboard` - Get full dashboard data
- `POST /api/v1/dashboard/refresh` - Refresh dashboard data

### Orders
- `GET /api/v1/orders` - Get recent orders
- `GET /api/v1/orders/{order_id}` - Get specific order details

### Inventory
- `GET /api/v1/inventory` - Get all inventory items
- `GET /api/v1/inventory/{sku_or_id}` - Get specific inventory item

### Sales
- `GET /api/v1/sales/history` - Get sales history

## Amazon API Integration

The dashboard is designed to integrate with:

1. **Amazon Seller Partner API**
   - Orders API for order data
   - Catalog API for product information
   - Fulfillment Inventory API for stock levels

2. **Amazon MWS (Legacy)**
   - Legacy support with Auth tokens

### Integration Points

Currently using mock data. Replace in:
- `backend/app/services/dashboard.py` - Service layer methods
- `backend/app/services/mock_data.py` - Mock data generation

Example Amazon API integration:
```python
from amazon_sp_api import Client

async def get_metrics(self) -> DashboardMetrics:
    client = Client(
        client_id=settings.AMAZON_CLIENT_ID,
        client_secret=settings.AMAZON_CLIENT_SECRET,
        region=settings.AMAZON_REGION,
        refresh_token=settings.AMAZON_REFRESH_TOKEN
    )
    # Fetch real data from API
    return fetch_amazon_metrics(client)
```

## Development

### Frontend Development

Hot reload with Vite:
```bash
cd frontend
npm run dev
```

Build for production:
```bash
npm run build
```

Type checking:
```bash
npx tsc --noEmit
```

### Backend Development

Auto-reload with Uvicorn:
```bash
cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

API documentation:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Deployment

### Deploy to AWS

1. **Frontend**: Deploy to S3 + CloudFront
2. **Backend**: Deploy to EC2, ECS, or Elastic Beanstalk
3. **Database**: Use RDS for PostgreSQL
4. **Cache**: Use ElastiCache for Redis

### Deploy to Dispatch

The application is ready for Dispatch deployment:

1. Configure Dispatch environment variables
2. Set up CI/CD pipeline
3. Deploy frontend and backend services
4. Configure database migrations

## Performance Considerations

- Frontend caching with browser cache policies
- Real-time updates every 30 seconds (configurable)
- Redis caching for frequently accessed data
- Database query optimization with indexes
- CDN for static assets in production

## Security

- CORS configured for trusted origins only
- JWT authentication ready (see core/config.py)
- Environment variables for sensitive data
- HTTPS recommended for production
- Rate limiting recommended on API endpoints

## Troubleshooting

### Port Already in Use
```bash
# Linux/Mac
lsof -i :8000      # Backend
lsof -i :5173      # Frontend
kill -9 <PID>

# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### Database Connection Issues
```bash
# Test PostgreSQL connection
psql postgresql://user:password@localhost:5432/amazon_fba_db

# Docker: Check database service
docker-compose logs postgres
```

### API Not Responding
```bash
# Check backend service
curl http://localhost:8000/health

# Docker: View backend logs
docker-compose logs backend
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## Future Enhancements

- [ ] Real Amazon API integration
- [ ] Advanced analytics with ML
- [ ] Automated reporting
- [ ] Multi-account support
- [ ] Mobile app
- [ ] Webhook support for real-time events
- [ ] Custom alerts and notifications
- [ ] Competitor analysis
- [ ] Recommendation engine

## License

MIT

## Support

For issues, questions, or contributions, please visit the repository issues page.