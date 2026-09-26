
import React, { useState } from 'react';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, 
  Tooltip, CartesianGrid, Legend 
} from 'recharts';
import { Gauge, Cpu, Zap, Activity } from 'lucide-react';
import { LATENCY_HISTORY } from '../data/mockData';
import { SectionHeader } from '../components/common/UIComponents';

export function Performance() {
  const [timeRange, setTimeRange] = useState('15m');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <SectionHeader
          title="Cluster Performance & Latency Telemetry"
          subtitle="Real-time end-to-end response budgeting and compute resource load"
        />

        {/* Time filters */}
        <div className="flex items-center gap-1 bg-[#0D0F13] p-1 border border-white/[0.08] rounded-md font-mono-code text-xs">
          {['5m', '15m', '1h', '24h'].map((t) => (
            <button
              key={t}
              onClick={() => setTimeRange(t)}
              className={`px-2.5 py-1 rounded transition-colors ${
                timeRange === t ? 'bg-violet-500/20 text-violet-300 font-semibold' : 'text-[#68707D] hover:text-[#F4F5F7]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Latency Components Multi-Line Graph */}
      <div className="bg-[#0D0F13] border border-white/[0.07] rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#F4F5F7] font-mono-code">
            Component Latencies Over Time (ms)
          </span>
          <div className="flex items-center gap-4 text-xs font-mono-code">
            <span className="text-violet-400">■ Total E2E</span>
            <span className="text-amber-400">■ Llama 3 TTFT</span>
            <span className="text-cyan-400">■ Faster-Whisper</span>
            <span className="text-rose-400">■ XTTSv2 Chunk</span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={LATENCY_HISTORY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F242F" vertical={false} />
              <XAxis dataKey="time" stroke="#52525B" tick={{ fontSize: 10, fill: '#71717A' }} tickLine={false} />
              <YAxis stroke="#52525B" tick={{ fontSize: 10, fill: '#71717A' }} tickLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#11141A', 
                  borderColor: 'rgba(255,255,255,0.1)', 
                  fontSize: '11px',
                  borderRadius: '6px'
                }} 
              />
              <Line type="monotone" dataKey="total" stroke="#8B5CF6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="llm" stroke="#F59E0B" strokeWidth={1.5} dot={false} />
              <Line type="monotone" dataKey="stt" stroke="#22D3EE" strokeWidth={1.5} dot={false} />
              <Line type="monotone" dataKey="tts" stroke="#FB7185" strokeWidth={1.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* GPU / Hardware Resource Utilization */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#0D0F13] border border-white/[0.07] rounded-lg p-4 space-y-2">
          <div className="flex justify-between text-xs font-mono-code">
            <span className="text-[#A1A7B3]">NVIDIA RTX 4090 GPU Compute</span>
            <span className="text-violet-300 font-semibold">68%</span>
          </div>
          <div className="h-2 w-full bg-white/[0.04] rounded-full overflow-hidden">
            <div className="h-full bg-violet-500 rounded-full" style={{ width: '68%' }} />
          </div>
          <span className="text-[10px] text-[#68707D] font-mono-code block">2,410 MHz Core · 58°C</span>
        </div>

        <div className="bg-[#0D0F13] border border-white/[0.07] rounded-lg p-4 space-y-2">
          <div className="flex justify-between text-xs font-mono-code">
            <span className="text-[#A1A7B3]">VRAM Allocation</span>
            <span className="text-cyan-300 font-semibold">19.5 / 24 GB</span>
          </div>
          <div className="h-2 w-full bg-white/[0.04] rounded-full overflow-hidden">
            <div className="h-full bg-cyan-400 rounded-full" style={{ width: '81%' }} />
          </div>
          <span className="text-[10px] text-[#68707D] font-mono-code block">Unified CUDA Pool</span>
        </div>

        <div className="bg-[#0D0F13] border border-white/[0.07] rounded-lg p-4 space-y-2">
          <div className="flex justify-between text-xs font-mono-code">
            <span className="text-[#A1A7B3]">Host Memory (RAM)</span>
            <span className="text-emerald-300 font-semibold">14.2 / 64 GB</span>
          </div>
          <div className="h-2 w-full bg-white/[0.04] rounded-full overflow-hidden">
            <div className="h-full bg-emerald-400 rounded-full" style={{ width: '22%' }} />
          </div>
          <span className="text-[10px] text-[#68707D] font-mono-code block">Zero-Copy DMA Buffer</span>
        </div>
      </div>
    </div>
  );
}


