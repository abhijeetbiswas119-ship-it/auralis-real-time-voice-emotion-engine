from fastapi import APIRouter

from app.config import settings


router = APIRouter()


@router.get("/health")
async def health():
    return {
        "status": "healthy",
        "service": "auralis-backend",
        "version": settings.app_version,
        "services": {
            "websocket": "ready",
            "whisper": "not_loaded",
            "emotion": "not_loaded",
            "llm": "not_loaded",
            "tts": "not_loaded",
        },
    }