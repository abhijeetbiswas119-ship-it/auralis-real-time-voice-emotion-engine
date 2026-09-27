from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.api.health import router as health_router
from app.api.websocket import router as websocket_router


app = FastAPI(
    title=f"{settings.app_name} API",
    description="Real-Time Voice Intelligence Backend",
    version=settings.app_version,
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.frontend_url,
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(
    health_router,
    prefix=settings.api_prefix,
)

app.include_router(
    websocket_router,
    prefix=settings.api_prefix,
)


@app.get("/")
async def root():
    return {
        "name": settings.app_name,
        "message": "Real-Time Voice Intelligence API",
        "version": settings.app_version,
        "environment": settings.environment,
        "status": "online",
    }