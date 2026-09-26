
export const KPI_DATA = [
  {
    id: "active-sessions",
    label: "Active Sessions",
    value: "04",
    change: "+2 from last hour",
    trend: "up",
    icon: "Radio",
    tag: "Full-duplex"
  },
  {
    id: "avg-latency",
    label: "Average Latency",
    value: "428 ms",
    change: "↓ 8.2% vs previous",
    trend: "down",
    icon: "Gauge",
    tag: "P95: 512ms"
  },
  {
    id: "emotion-confidence",
    label: "Emotion Confidence",
    value: "91.4%",
    change: "Acoustic model",
    trend: "neutral",
    icon: "Activity",
    tag: "Wav2Vec2"
  },
  {
    id: "webrtc-quality",
    label: "WebRTC Quality",
    value: "Excellent",
    change: "RTT 18 ms · 0.2% loss",
    trend: "good",
    icon: "Zap",
    tag: "Opus RTP"
  },
  {
    id: "audio-processing",
    label: "Audio Processing",
    value: "48 kHz",
    change: "Stereo · Opus 128 kbps",
    trend: "neutral",
    icon: "AudioWaveform",
    tag: "10ms frames"
  },
  {
    id: "ai-model",
    label: "AI Model",
    value: "Llama 3",
    change: "Local runtime · Ollama",
    trend: "neutral",
    icon: "Brain",
    tag: "8B Instruct"
  }
];

export const PIPELINE_NODES = [
  { id: "mic", name: "Microphone", latency: "0 ms", status: "operational", detail: "48kHz Raw PCM" },
  { id: "webrtc_in", name: "WebRTC In", latency: "32 ms", status: "operational", detail: "Opus 128kbps" },
  { id: "vad", name: "Silero VAD", latency: "12 ms", status: "active", detail: "Speech detected" },
  { id: "whisper", name: "Faster-Whisper", latency: "126 ms", status: "streaming", detail: "Streaming STT" },
  { id: "wav2vec2", name: "Wav2Vec2", latency: "48 ms", status: "active", detail: "Emotion Classifier" },
  { id: "context", name: "Context Engine", latency: "14 ms", status: "operational", detail: "Turn Memory #14" },
  { id: "llama3", name: "Llama 3", latency: "184 ms", status: "streaming", detail: "TTFT 184ms" },
  { id: "xtts", name: "XTTSv2", latency: "26 ms", status: "streaming", detail: "Calm / Chunk 08" },
  { id: "webrtc_out", name: "WebRTC Out", latency: "18 ms", status: "operational", detail: "Auralis Neutral" }
];

export const LATENCY_HISTORY = [
  { time: "10:38:00", total: 420, target: 800, stt: 124, llm: 180, tts: 28 },
  { time: "10:38:30", total: 435, target: 800, stt: 130, llm: 190, tts: 26 },
  { time: "10:39:00", total: 418, target: 800, stt: 122, llm: 182, tts: 25 },
  { time: "10:39:30", total: 447, target: 800, stt: 138, llm: 194, tts: 29 },
  { time: "10:40:00", total: 432, target: 800, stt: 128, llm: 186, tts: 27 },
  { time: "10:40:30", total: 428, target: 800, stt: 126, llm: 184, tts: 26 },
  { time: "10:41:00", total: 440, target: 800, stt: 132, llm: 191, tts: 28 },
  { time: "10:41:30", total: 425, target: 800, stt: 125, llm: 183, tts: 25 },
  { time: "10:42:00", total: 419, target: 800, stt: 121, llm: 180, tts: 26 },
  { time: "10:42:30", total: 428, target: 800, stt: 126, llm: 184, tts: 26 }
];

export const LATENCY_BREAKDOWN = [
  { component: "WebRTC In", latency: 32, percentage: 7.2, color: "#22D3EE" },
  { component: "Silero VAD", latency: 12, percentage: 2.7, color: "#34D399" },
  { component: "Faster-Whisper", latency: 126, percentage: 28.2, color: "#8B5CF6" },
  { component: "Emotion (Wav2Vec2)", latency: 48, percentage: 10.8, color: "#FB7185" },
  { component: "Llama 3 TTFT", latency: 184, percentage: 41.3, color: "#F59E0B" },
  { component: "XTTSv2 Gen", latency: 26, percentage: 5.8, color: "#EC4899" },
  { component: "WebRTC Out", latency: 18, percentage: 4.0, color: "#3B82F6" }
];

export const RECENT_SESSIONS = [
  {
    id: "SES-8F31",
    time: "10:42 AM",
    duration: "04:18",
    emotion: "Panicked",
    arousal: "87%",
    valence: "-72%",
    avgLatency: "428 ms",
    model: "Llama 3",
    status: "Completed",
    turns: 14,
    caller: "Client Stream 01"
  },
  {
    id: "SES-8F32",
    time: "10:35 AM",
    duration: "02:51",
    emotion: "Anxious",
    arousal: "64%",
    valence: "-45%",
    avgLatency: "462 ms",
    model: "Llama 3",
    status: "Completed",
    turns: 8,
    caller: "Inbound Dispatch #44"
  },
  {
    id: "SES-8F33",
    time: "10:29 AM",
    duration: "06:12",
    emotion: "Neutral",
    arousal: "32%",
    valence: "+12%",
    avgLatency: "391 ms",
    model: "Llama 3",
    status: "Active",
    turns: 22,
    caller: "Operator 12 (Training)"
  },
  {
    id: "SES-8F34",
    time: "10:14 AM",
    duration: "08:45",
    emotion: "Angry",
    arousal: "92%",
    valence: "-84%",
    avgLatency: "445 ms",
    model: "Llama 3",
    status: "Completed",
    turns: 31,
    caller: "Escalation Desk 3"
  },
  {
    id: "SES-8F35",
    time: "09:58 AM",
    duration: "01:22",
    emotion: "Calm",
    arousal: "18%",
    valence: "+68%",
    avgLatency: "402 ms",
    model: "Llama 3",
    status: "Completed",
    turns: 4,
    caller: "System Validation"
  },
  {
    id: "SES-8F36",
    time: "09:40 AM",
    duration: "00:45",
    emotion: "Neutral",
    arousal: "28%",
    valence: "0%",
    avgLatency: "520 ms",
    model: "Llama 3",
    status: "Failed",
    turns: 2,
    caller: "Test Harness RT"
  }
];

export const SYSTEM_SERVICES = [
  { name: "WebRTC Gateway", status: "Operational", latency: "18 ms", cpu: "14%", memory: "1.2 GB", vram: "—" },
  { name: "Silero VAD", status: "Operational", latency: "12 ms", cpu: "4%", memory: "320 MB", vram: "180 MB" },
  { name: "Faster-Whisper", status: "Operational", latency: "126 ms", cpu: "28%", memory: "3.4 GB", vram: "4.8 GB" },
  { name: "Wav2Vec2 Emotion", status: "Operational", latency: "48 ms", cpu: "18%", memory: "1.8 GB", vram: "2.6 GB" },
  { name: "Ollama Runtime", status: "Operational", latency: "4 ms", cpu: "8%", memory: "840 MB", vram: "—" },
  { name: "Llama 3 8B", status: "Operational", latency: "184 ms", cpu: "42%", memory: "5.1 GB", vram: "7.9 GB" },
  { name: "XTTSv2 Engine", status: "Operational", latency: "26 ms", cpu: "34%", memory: "2.8 GB", vram: "4.2 GB" }
];

export const LIVE_LOGS = [
  { time: "10:42:18", event: "WebRTC peer connection established", level: "info" },
  { time: "10:42:19", event: "Audio stream started: 48kHz Opus stereo", level: "info" },
  { time: "10:42:20", event: "VAD detected speech onset (0.84 conf)", level: "speech" },
  { time: "10:42:20", event: "Whisper partial received (14 words)", level: "stt" },
  { time: "10:42:21", event: "Emotion classified: PANICKED (0.91 conf)", level: "emotion" },
  { time: "10:42:21", event: "Context updated: Turn #14 committed", level: "info" },
  { time: "10:42:22", event: "Llama 3 streaming chunk 1 (TTFT 184ms)", level: "llm" },
  { time: "10:42:22", event: "XTTSv2 generation started: chunk_001", level: "tts" },
  { time: "10:42:23", event: "Full duplex packet dispatched via WebRTC", level: "info" }
];

export const EMOTION_TIMELINE = [
  { time: "00:00", arousal: 45, valence: -10, confidence: 85 },
  { time: "00:30", arousal: 58, valence: -30, confidence: 89 },
  { time: "01:00", arousal: 72, valence: -55, confidence: 94 },
  { time: "01:30", arousal: 88, valence: -78, confidence: 92 },
  { time: "02:00", arousal: 87, valence: -72, confidence: 91 },
  { time: "02:30", arousal: 79, valence: -60, confidence: 88 },
  { time: "03:00", arousal: 65, valence: -40, confidence: 93 },
  { time: "03:30", arousal: 52, valence: -20, confidence: 90 },
  { time: "04:00", arousal: 40, valence: 5, confidence: 95 }
];

export const CONVERSATION_TRANSCRIPT = [
  {
    turn: 1,
    speaker: "user",
    text: "Can someone tell me what is going on here? The sirens haven't stopped.",
    timestamp: "00:03.12",
    emotion: "Anxious",
    confidence: "94.2%",
    final: true
  },
  {
    turn: 2,
    speaker: "assistant",
    text: "I am right here with you. The emergency services have established a safe perimeter. Keep your phone line open and stay away from the north glass exit.",
    timestamp: "00:05.40",
    emotion: "Calm / Direct",
    latency: "412 ms",
    tokens: 38
  },
  {
    turn: 3,
    speaker: "user",
    text: "I don't know what to do anymore... they're not listening to me.",
    timestamp: "00:14.28",
    emotion: "Panicked",
    confidence: "98.2%",
    final: true
  },
  {
    turn: 4,
    speaker: "assistant",
    text: "Take a breath. I'm listening to you. We can work through this one step at a time. Tell me who is in the room with you right now.",
    timestamp: "00:16.80",
    emotion: "Calm / Reassuring",
    latency: "428 ms",
    tokens: 42
  }
];

export const MODEL_REGISTRY = [
  {
    id: "faster-whisper",
    name: "Faster-Whisper",
    version: "v1.0.2 (large-v3-turbo)",
    type: "Streaming STT",
    runtime: "CTranslate2",
    device: "CUDA 12.2 · RTX 4090",
    status: "Operational",
    latency: "126 ms",
    vram: "4.8 GB",
    concurrency: "16 streams"
  },
  {
    id: "wav2vec2",
    name: "Wav2Vec2-Emotion",
    version: "v2.4-Acoustic-HQ",
    type: "Acoustic Emotion",
    runtime: "PyTorch / ONNX",
    device: "CUDA 12.2 · RTX 4090",
    status: "Operational",
    latency: "48 ms",
    vram: "2.6 GB",
    concurrency: "32 streams"
  },
  {
    id: "llama3",
    name: "Llama 3 8B Instruct",
    version: "8B-Q4_K_M",
    type: "Contextual Reasoning",
    runtime: "Ollama / llama.cpp",
    device: "GPU Accelerated",
    status: "Operational",
    latency: "184 ms (TTFT)",
    vram: "7.9 GB",
    concurrency: "8 streams"
  },
  {
    id: "xtts",
    name: "XTTSv2 Low-Latency",
    version: "v2.0.3-Auralis-Tuned",
    type: "Neural Voice Synthesizer",
    runtime: "DeepSpeed / PyTorch",
    device: "CUDA 12.2 · RTX 4090",
    status: "Operational",
    latency: "26 ms / chunk",
    vram: "4.2 GB",
    concurrency: "12 streams"
  }
];


