from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # API
    PROJECT_NAME: str = "Amazon FBA Dashboard"
    API_V1_STR: str = "/api"

    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:8080",
        "https://localhost",
    ]

    # Database
    DATABASE_URL: str = "postgresql://user:password@localhost/amazon_fba_db"

    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"

    # Amazon API
    AMAZON_CLIENT_ID: str = ""
    AMAZON_CLIENT_SECRET: str = ""
    AMAZON_REGION: str = "us-east-1"
    AMAZON_SELLER_ID: str = ""
    AMAZON_MWS_AUTH_TOKEN: str = ""

    # JWT
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # Features
    DEBUG: bool = False
    ENVIRONMENT: str = "development"

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
