from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Optional
from uuid import uuid4


@dataclass
class AudioSession:
    """
    Represents one active Auralis real-time audio session.

    This is the foundation for the future pipeline:

    WebRTC
        ↓
    Audio chunks
        ↓
    VAD
        ↓
    Whisper
        ↓
    Emotion
        ↓
    LLM
        ↓
    TTS
    """

    session_id: str = field(
        default_factory=lambda: str(uuid4())
    )

    created_at: datetime = field(
        default_factory=lambda: datetime.now(timezone.utc)
    )

    sample_rate: int = 48000
    channels: int = 2
    codec: str = "opus"

    is_active: bool = False
    is_speaking: bool = False
    ai_speaking: bool = False

    audio_chunks_received: int = 0
    audio_bytes_received: int = 0

    current_transcript: str = ""
    emotion: Optional[str] = None
    emotion_confidence: Optional[float] = None

    ai_response: str = ""

    def start(self) -> None:
        """Start the audio session."""
        self.is_active = True

    def stop(self) -> None:
        """Stop the audio session."""
        self.is_active = False
        self.is_speaking = False
        self.ai_speaking = False

    def register_audio_chunk(self, size_bytes: int) -> None:
        """
        Register an incoming audio chunk.

        Actual audio processing will be added later.
        """
        self.audio_chunks_received += 1
        self.audio_bytes_received += size_bytes

    def interrupt_ai(self) -> None:
        """
        Interrupt current AI speech.

        This will later be connected to the XTTSv2/WebRTC
        playback cancellation mechanism.
        """
        self.ai_speaking = False
        self.ai_response = ""

    def to_dict(self) -> dict:
        """Return a frontend-friendly session representation."""
        return {
            "session_id": self.session_id,
            "created_at": self.created_at.isoformat(),
            "audio": {
                "sample_rate": self.sample_rate,
                "channels": self.channels,
                "codec": self.codec,
                "chunks_received": self.audio_chunks_received,
                "bytes_received": self.audio_bytes_received,
            },
            "state": {
                "active": self.is_active,
                "user_speaking": self.is_speaking,
                "ai_speaking": self.ai_speaking,
            },
            "transcript": self.current_transcript,
            "emotion": {
                "label": self.emotion,
                "confidence": self.emotion_confidence,
            },
            "ai_response": self.ai_response,
        }


class AudioSessionManager:
    """
    Maintains active Auralis audio sessions.

    The manager will eventually coordinate WebRTC audio,
    VAD, STT, emotion analysis, LLM responses and TTS.
    """

    def __init__(self) -> None:
        self._sessions: dict[str, AudioSession] = {}

    def create_session(self) -> AudioSession:
        session = AudioSession()
        self._sessions[session.session_id] = session
        return session

    def get_session(self, session_id: str) -> Optional[AudioSession]:
        return self._sessions.get(session_id)

    def remove_session(self, session_id: str) -> None:
        self._sessions.pop(session_id, None)

    def active_sessions(self) -> list[AudioSession]:
        return [
            session
            for session in self._sessions.values()
            if session.is_active
        ]


audio_session_manager = AudioSessionManager()