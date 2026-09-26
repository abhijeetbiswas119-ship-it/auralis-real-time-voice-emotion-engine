
import React, { useState, useEffect } from 'react';
import { 
  Play, Pause, Square, Zap, Mic, MicOff, Volume2, 
  Activity, Sparkles, RefreshCw, AlertCircle, ShieldAlert 
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { Waveform } from '../components/audio/Waveform';
import { Badge, Card, SectionHeader } from '../components/common/UIComponents';
import { EMOTION_TIMELINE } from '../data/mockData';

export function LiveSession() {
  const [sessionState, setSessionState] = useState('LISTENING');
  const [duration, setDuration] = useState(258); // 04:18
  const [isMuted, setIsMuted] = useState(false);
  const [interruptedCount, setInterruptedCount] = useState(1);

  // Live timer tick
  useEffect(() => {
    let timer;
    if (sessionState === 'LISTENING' || sessionState === 'AI_SPEAKING' || sessionState === 'AI_THINKING') {
      timer = setInterval(() => setDuration((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [sessionState]);

  // Format seconds to mm:ss
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setSessionState('CONNECTING');
    setTimeout(() => setSessionState('LISTENING'), 750);
  };

  const handlePause = () => {
    setSessionState((prev) => (prev === 'PAUSED' ? 'LISTENING' : 'PAUSED'));
  };

  const handleInterrupt = () => {
    setSessionState('INTERRUPTED');
    setInterruptedCount((c) => c + 1);
    setTimeout(() => {
      setSessionState('LISTENING');
    }, 900);
  };

  const handleEnd = () => {
    setSessionState('ENDED');
  };

  return (
    <div className="space-y-5">
      {/* Session Top Status Bar */}
      <div className="bg-[#0D0F13] border border-white/[0.08] rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[#F4F5F7] font-mono-code">SES-8F31-LIVE</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono-code font-bold ${
                sessionState === 'LISTENING' || sessionState === 'AI_SPEAKING' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                sessionState === 'INTERRUPTED' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                sessionState === 'PAUSED' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                'bg-zinc-800 text-zinc-400'
              }`}>
                {sessionState}
              </span>
            </div>
            <p className="text-xs text-[#A1A7B3]">Full-duplex real-time monitoring · Scenario: Crisis Negotiation Training</p>
          </div>
        </div>

        {/* Telemetry metadata tags */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono-code">
          <div className="bg-[#11141A] px-2.5 py-1 rounded border border-white/[0.05]">
            <span className="text-[#68707D]">Duration: </span>
            <span className="text-[#F4F5F7] font-bold">{formatTime(duration)}</span>
          </div>
          <div className="bg-[#11141A] px-2.5 py-1 rounded border border-white/[0.05]">
            <span className="text-[#68707D]">WebRTC: </span>
            <span className="text-emerald-400">18 ms (0.2% loss)</span>
          </div>
          <div className="bg-[#11141A] px-2.5 py-1 rounded border border-white/[0.05]">
            <span className="text-[#68707D]">Interrupts: </span>
            <span className="text-amber-400">{interruptedCount}</span>
          </div>
        </div>
      </div>

      {sessionState === 'ENDED' ? (
        /* Empty / Ended state */
        <div className="bg-[#0D0F13] border border-white/[0.08] rounded-lg p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto text-[#68707D]">
            <Mic className="w-6 h-6" />
          </div>
          <div className="max-w-md mx-auto space-y-1">
            <h3 className="text-base font-semibold text-[#F4F5F7]">No active voice session</h3>
            <p className="text-xs text-[#A1A7B3]">
              Start a live session to monitor voice, emotion classification, LLM reasoning, and generated XTTSv2 audio in real time.
            </p>
          </div>
          <button
            onClick={handleStart}
            className="px-4 py-2 rounded-md bg-violet-600 hover:bg-violet-500 text-xs font-semibold text-[#F4F5F7] inline-flex items-center gap-2 transition-all shadow-[0_0_16px_rgba(139,92,246,0.3)]"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Start Session</span>
          </button>
        </div>
      ) : (
        /* Active Session Grid */
        <>
          {/* Waveform & Emotion Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Waveform Visualizer */}
            <div className="lg:col-span-2">
              <Waveform 
                isActive={sessionState !== 'PAUSED' && sessionState !== 'ENDED'} 
                state={sessionState}
                rms={-18.4}
                sampleRate="48 kHz"
                channels="Stereo"
                codec="Opus"
              />
            </div>

            {/* Acoustic Emotion Intelligence Panel */}
            <div className="bg-[#0D0F13] border border-white/[0.07] rounded-lg p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-rose-400" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#F4F5F7] font-mono-code">
                      Emotion Intelligence
                    </span>
                  </div>
                  <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold">
                    PANICKED
                  </span>
                </div>

                <div className="text-xs text-[#A1A7B3] mb-3">
                  Acoustic classification: <span className="text-zinc-200">High arousal · Negative valence</span>
                </div>

                {/* Primary Gauges */}
                <div className="grid grid-cols-3 gap-2 p-2 bg-[#11141A] rounded-md mb-3 text-center">
                  <div>
                    <span className="text-[10px] text-[#68707D] font-mono-code uppercase block">Arousal</span>
                    <span className="text-sm font-semibold font-mono-code text-rose-400">87%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#68707D] font-mono-code uppercase block">Valence</span>
                    <span className="text-sm font-semibold font-mono-code text-cyan-400">-72%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#68707D] font-mono-code uppercase block">Conf</span>
                    <span className="text-sm font-semibold font-mono-code text-emerald-400">91%</span>
                  </div>
                </div>

                {/* Horizontal Progress Bars */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-rose-300 font-medium">Panicked</span>
                    <span className="font-mono-code text-[#A1A7B3]">74%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: '74%' }} />
                  </div>

                  <div className="flex justify-between text-[11px] pt-1">
                    <span className="text-amber-300 font-medium">Anxious</span>
                    <span className="font-mono-code text-[#A1A7B3]">14%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: '14%' }} />
                  </div>

                  <div className="flex justify-between text-[11px] pt-1">
                    <span className="text-zinc-400 font-medium">Angry</span>
                    <span className="font-mono-code text-[#A1A7B3]">7%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
                    <div className="h-full bg-zinc-400 rounded-full" style={{ width: '7%' }} />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.05] flex items-center justify-between text-[10px] font-mono-code text-[#68707D]">
                <span>Wav2Vec2-EmotionHQ</span>
                <span>Inference: 48ms</span>
              </div>
            </div>
          </div>

          {/* Live Transcription Panel (Faster-Whisper) */}
          <div className="bg-[#0D0F13] border border-white/[0.07] rounded-lg p-4">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/[0.05]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#F4F5F7] font-mono-code">
                  Live Transcription
                </span>
                <span className="text-[10px] font-mono-code px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  Faster-Whisper Streaming
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono-code text-[#A1A7B3]">
                <span>Confidence: <strong className="text-emerald-400">98.2%</strong></span>
              </div>
            </div>

            <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
              <div className="flex items-start gap-3">
                <span className="text-[10px] font-mono-code text-[#68707D] mt-0.5 flex-shrink-0">00:14.28</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-semibold text-rose-300">Speaker (User)</span>
                    <span className="text-[9px] font-mono-code px-1 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                      Final
                    </span>
                  </div>
                  <p className="text-xs text-[#F4F5F7] leading-relaxed">
                    "I don't know what to do anymore... they're not listening to me."
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/[0.02] p-2 rounded">
                <span className="text-[10px] font-mono-code text-[#68707D] mt-0.5 flex-shrink-0">00:16.80</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-semibold text-violet-300">Auralis AI</span>
                    <span className="text-[9px] font-mono-code px-1 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20">
                      Spoken (XTTSv2)
                    </span>
                  </div>
                  <p className="text-xs text-[#A1A7B3] leading-relaxed">
                    "Take a breath. I'm listening to you. We can work through this one step at a time. Tell me who is in the room with you right now."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Context Engine & AI Response + Voice Generation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Llama 3 Context Engine & Response */}
            <div className="bg-[#0D0F13] border border-white/[0.07] rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.05]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#F4F5F7] font-mono-code">
                    AI Response Reasoning
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono-code">
                  <span className="text-zinc-500">Llama 3 8B</span>
                  <span className="text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                    TTFT 184 ms
                  </span>
                </div>
              </div>

              <div className="p-3 rounded bg-[#11141A] border border-white/[0.05] space-y-2">
                <p className="text-xs text-[#F4F5F7] leading-relaxed italic">
                  "Take a breath. I'm listening to you. You don't need to solve everything at once. Let's focus on what is happening right now."
                </p>
                <div className="flex items-center justify-between text-[10px] font-mono-code text-[#68707D] pt-1">
                  <span>Tokens: 42</span>
                  <span>Streaming · Ollama runtime</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono-code text-[#A1A7B3]">
                <div className="bg-[#11141A] p-2 rounded border border-white/[0.04]">
                  <span className="text-[#68707D] block text-[10px]">Context Scenario</span>
                  <span>Crisis Negotiation</span>
                </div>
                <div className="bg-[#11141A] p-2 rounded border border-white/[0.04]">
                  <span className="text-[#68707D] block text-[10px]">Current Turn</span>
                  <span>Turn #14 (Committed)</span>
                </div>
              </div>
            </div>

            {/* XTTSv2 Voice Generation */}
            <div className="bg-[#0D0F13] border border-white/[0.07] rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.05]">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#F4F5F7] font-mono-code">
                    Voice Generation (XTTSv2)
                  </span>
                </div>
                <span className="text-[10px] font-mono-code px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  Latency: 26 ms
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded bg-[#11141A] border border-white/[0.04] space-y-0.5">
                  <span className="text-[10px] text-[#68707D] font-mono-code uppercase">Voice Profile</span>
                  <span className="text-[#F4F5F7] font-medium block">Auralis Neutral</span>
                </div>
                <div className="p-2.5 rounded bg-[#11141A] border border-white/[0.04] space-y-0.5">
                  <span className="text-[10px] text-[#68707D] font-mono-code uppercase">Delivery Style</span>
                  <span className="text-cyan-300 font-medium block">Calm / Reassuring</span>
                </div>
                <div className="p-2.5 rounded bg-[#11141A] border border-white/[0.04] space-y-0.5">
                  <span className="text-[10px] text-[#68707D] font-mono-code uppercase">Audio Chunks</span>
                  <span className="font-mono-code text-[#F4F5F7]">08 Chunks Dispatched</span>
                </div>
                <div className="p-2.5 rounded bg-[#11141A] border border-white/[0.04] space-y-0.5">
                  <span className="text-[10px] text-[#68707D] font-mono-code uppercase">Bitrate</span>
                  <span className="font-mono-code text-[#F4F5F7]">128 kbps Opus</span>
                </div>
              </div>

              {/* Progress bar of synthesized chunk */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono-code text-[#68707D]">
                  <span>Chunk Synthesis</span>
                  <span className="text-emerald-400">Synced to WebRTC</span>
                </div>
                <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full w-4/5 animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Persistent Live Control Dock */}
          <div className="sticky bottom-4 z-20 bg-[#0D0F13]/95 backdrop-blur-md border border-white/[0.12] rounded-lg p-3 shadow-2xl flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono-code font-medium flex items-center gap-1.5 transition-colors border ${
                  isMuted 
                    ? 'bg-rose-500/10 text-rose-300 border-rose-500/30' 
                    : 'bg-white/[0.05] text-[#A1A7B3] hover:text-[#F4F5F7] border-white/[0.08]'
                }`}
              >
                {isMuted ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                <span>{isMuted ? 'Muted' : 'Mute Mic'}</span>
              </button>

              <button
                onClick={handlePause}
                className="px-3 py-1.5 rounded-md text-xs font-mono-code font-medium bg-white/[0.05] hover:bg-white/[0.08] text-[#A1A7B3] hover:text-[#F4F5F7] border border-white/[0.08] flex items-center gap-1.5 transition-colors"
              >
                <Pause className="w-3.5 h-3.5" />
                <span>{sessionState === 'PAUSED' ? 'Resume' : 'Pause'}</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              {/* Highlighted Interrupt AI Button */}
              <button
                onClick={handleInterrupt}
                className="px-4 py-2 rounded-md bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono-code font-semibold flex items-center gap-2 transition-all"
                title="Immediately halt AI speech output and yield turn to user"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Interrupt AI</span>
              </button>

              <button
                onClick={handleEnd}
                className="px-4 py-2 rounded-md bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-mono-code font-semibold flex items-center gap-2 transition-colors"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>End Session</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
