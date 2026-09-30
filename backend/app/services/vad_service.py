from typing import Optional

import torch
from silero_vad import load_silero_vad


class VADService:
    """
    Silero Voice Activity Detection service for Auralis.

    Detects whether incoming audio contains human speech.
    """

    def __init__(self) -> None:
        self.model = load_silero_vad()
        self.sample_rate = 16000
        self.threshold = 0.5

    def detect_speech(
        self,
        audio: torch.Tensor,
    ) -> bool:
        """
        Detect whether the supplied audio contains speech.

        Audio must be a mono torch Tensor sampled at 16 kHz.
        """

        if audio.numel() == 0:
            return False

        audio = audio.float()

        with torch.no_grad():
            speech_probability = self.model(
                audio,
                self.sample_rate,
            )

        return float(speech_probability.detach()) >= self.threshold


vad_service = VADService()