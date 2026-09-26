
import React from 'react';
import { 
  ResponsiveContainer, AreaChart, Area, LineChart, Line, 
  XAxis, YAxis, Tooltip, CartesianGrid 
} from 'recharts';
import { Activity, ShieldAlert, Zap, Filter } from 'lucide-react';
import { EMOTION_TIMELINE } from '../data/mockData';
import { SectionHeader, Badge } from '../components/common/UIComponents';

export function EmotionAnalytics() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Acoustic Emotion Analytics"
        subtitle="Dimensional emotion classification (Russell Circumplex Model) via Wav2Vec2"
        action={
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono-code text-zinc-400">Model: Wav2Vec2-HQ</span>
            <Badge variant="rose" size="xs">Panicked Dominant</Badge>
          </div>
        }
      />

      {/* Arousal & Valence Timeline Chart */}
      <div className="bg-[#0D0F13] border border-white/[0.07] rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#F4F5F7] font-mono-code">
              Arousal & Valence Dynamics Over Time
            </h3>
            <p className="text-[11px] text-[#A1A7B3]">
              Arousal (Acoustic energy / pitch gradient) vs Valence (Pleasantness polarity)
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono-code">
            <span className="flex items-center gap-1.5 text-rose-400">
              <span className="w-2 h-2 rounded-full bg-rose-500" /> Arousal (%)
            </span>
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400" /> Valence (%)
            </span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={EMOTION_TIMELINE} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="arousalGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FB7185" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FB7185" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="valenceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22D3EE" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F242F" vertical={false} />
              <XAxis dataKey="time" stroke="#52525B" tick={{ fontSize: 10, fill: '#71717A' }} tickLine={false} />
              <YAxis stroke="#52525B" tick={{ fontSize: 10, fill: '#71717A' }} domain={[-100, 100]} tickLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#11141A', 
                  borderColor: 'rgba(255,255,255,0.1)', 
                  fontSize: '11px',
                  borderRadius: '6px'
                }} 
              />
              <Area type="monotone" dataKey="arousal" stroke="#FB7185" strokeWidth={2} fillOpacity={1} fill="url(#arousalGrad)" />
              <Area type="monotone" dataKey="valence" stroke="#22D3EE" strokeWidth={2} fillOpacity={1} fill="url(#valenceGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Feature telemetry breakdown cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#0D0F13] border border-white/[0.07] rounded-lg p-3.5 space-y-1">
          <span className="text-[10px] font-mono-code text-[#68707D] uppercase">F0 Pitch Variance</span>
          <div className="text-xl font-semibold font-mono-code text-[#F4F5F7]">242 Hz</div>
          <span className="text-[10px] text-rose-400 font-mono-code">↑ High acoustic tension</span>
        </div>
        <div className="bg-[#0D0F13] border border-white/[0.07] rounded-lg p-3.5 space-y-1">
          <span className="text-[10px] font-mono-code text-[#68707D] uppercase">Jitter (Local)</span>
          <div className="text-xl font-semibold font-mono-code text-[#F4F5F7]">1.84%</div>
          <span className="text-[10px] text-amber-400 font-mono-code">Micro-tremor elevated</span>
        </div>
        <div className="bg-[#0D0F13] border border-white/[0.07] rounded-lg p-3.5 space-y-1">
          <span className="text-[10px] font-mono-code text-[#68707D] uppercase">Shimmer (APQ3)</span>
          <div className="text-xl font-semibold font-mono-code text-[#F4F5F7]">3.12%</div>
          <span className="text-[10px] text-zinc-400 font-mono-code">Nominal vocal tract</span>
        </div>
        <div className="bg-[#0D0F13] border border-white/[0.07] rounded-lg p-3.5 space-y-1">
          <span className="text-[10px] font-mono-code text-[#68707D] uppercase">Harmonic-to-Noise (HNR)</span>
          <div className="text-xl font-semibold font-mono-code text-[#F4F5F7]">18.4 dB</div>
          <span className="text-[10px] text-emerald-400 font-mono-code">Clear acoustic signal</span>
        </div>
      </div>
    </div>
  );
}


