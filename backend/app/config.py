from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Application
    app_name: str = "Auralis"
    app_version: str = "0.1.0"
    environment: str = "development"

    # API
    api_prefix: str = "/api"

    # Frontend
    frontend_url: str = "http://localhost:5173"

    # Audio
    sample_rate: int = 48000
    audio_channels: int = 2
    audio_codec: str = "opus"

    # AI Models
    whisper_model: str = "faster-whisper"
    emotion_model: str = "wav2vec2"
    llm_model: str = "llama3"
    llm_runtime: str = "ollama"
    tts_model: str = "xtts-v2"

    # Performance
    target_latency_ms: int = 800

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )


settings = Settings()