
import React from 'react';
import { Layers, Activity, Radio, Cpu, Volume2, Shield } from 'lucide-react';
import { SectionHeader, Badge } from '../components/common/UIComponents';

export function AudioPipeline() {
  const specs = [
    { label: 'Sample Rate', val: '48,000 Hz (Fullband)' },
    { label: 'Audio Channels', val: '2 (Stereo L/R interleaved)' },
    { label: 'Codec & Bitrate', val: 'Opus @ 128 kbps CBR' },
    { label: 'Frame Size', val: '10 ms (480 samples/frame)' },
    { label: 'WebRTC Jitter Buffer', val: '2.4 ms (Adaptive target)' },
    { label: 'Packet Loss', val: '0.18% (Forward Error Correction active)' },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Audio Pipeline Observability"
        subtitle="Low-level audio driver telemetry, WebRTC transport, and Silero VAD state"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {specs.map((s) => (
          <div key={s.label} className="bg-[#0D0F13] border border-white/[0.07] rounded-lg p-3">
            <span className="text-[10px] font-mono-code text-[#68707D] uppercase block">{s.label}</span>
            <span className="text-xs font-semibold font-mono-code text-[#F4F5F7] mt-1 block">{s.val}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Silero VAD Activity Visualizer */}
        <div className="bg-[#0D0F13] border border-white/[0.07] rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.05]">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#F4F5F7] font-mono-code">
                Silero VAD Speech Probability
              </span>
            </div>
            <Badge variant="emerald" size="xs">Speech Active (0.92)</Badge>
          </div>

          <p className="text-xs text-[#A1A7B3]">
            Voice Activity Detection running at 512 samples per chunk with 30ms hangover time.
          </p>

          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-xs font-mono-code">
              <span className="text-[#68707D]">VAD Threshold (0.50)</span>
              <span className="text-emerald-400">Current: 0.92</span>
            </div>
            <div className="h-2 w-full bg-white/[0.05] rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full" style={{ width: '92%' }} />
            </div>
          </div>
        </div>

        {/* WebRTC RTP Transport Stream */}
        <div className="bg-[#0D0F13] border border-white/[0.07] rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.05]">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#F4F5F7] font-mono-code">
                WebRTC RTP Transport Health
              </span>
            </div>
            <span className="text-[10px] font-mono-code text-cyan-300">ICE Nominated</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono-code">
            <div className="bg-[#11141A] p-2 rounded border border-white/[0.04]">
              <span className="text-[#68707D] text-[10px] block">Round Trip Time (RTT)</span>
              <span className="text-emerald-400 font-semibold">18.2 ms</span>
            </div>
            <div className="bg-[#11141A] p-2 rounded border border-white/[0.04]">
              <span className="text-[#68707D] text-[10px] block">Jitter Variance</span>
              <span className="text-[#F4F5F7] font-semibold">1.1 ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

