
import React from 'react';
import { 
  Play, Radio, Cpu, Activity, Clock, ShieldCheck, 
  ArrowRight, Sparkles 
} from 'lucide-react';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, 
  Tooltip, ReferenceLine 
} from 'recharts';
import { 
  KPI_DATA, LATENCY_HISTORY, LATENCY_BREAKDOWN, 
  RECENT_SESSIONS, SYSTEM_SERVICES, LIVE_LOGS 
} from '../data/mockData';
import { MetricCard, Card, Badge, SectionHeader } from '../components/common/UIComponents';
import { ProcessingPipeline } from '../components/pipeline/ProcessingPipeline';

export function Overview({ onNavigate }) {
  return (
    <div className="space-y-6">
      {/* Restrained Hero Section */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-[#0D0F14] via-[#10131B] to-[#0D0F14] border border-white/[0.08] p-5 sm:p-6 shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono-code font-bold bg-violet-500/10 text-violet-300 border border-violet-500/20 uppercase tracking-widest">
                Real-Time AI Infrastructure
              </span>
              <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono-code">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Cluster Healthy
              </span>
            </div>
            
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F4F5F7]">
              Real-Time Voice Intelligence
            </h1>
            
            <p className="text-xs sm:text-sm text-[#A1A7B3] leading-relaxed">
              Emotion-aware voice-to-voice intelligence built for low-latency, full-duplex conversations. 
              Integrated with Faster-Whisper, Wav2Vec2 acoustic classification, Llama 3, and XTTSv2.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('live-session')}
              className="px-4 py-2 rounded-md bg-violet-600 hover:bg-violet-500 text-[#F4F5F7] text-xs font-semibold flex items-center gap-2 transition-all shadow-[0_0_16px_rgba(139,92,246,0.3)]"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Start Live Session</span>
            </button>
            <button
              onClick={() => onNavigate('sessions')}
              className="px-4 py-2 rounded-md bg-white/[0.05] hover:bg-white/[0.08] text-xs font-medium text-[#A1A7B3] hover:text-[#F4F5F7] border border-white/[0.08] transition-colors"
            >
              View Sessions
            </button>
          </div>
        </div>
      </div>

      {/* 6 KPI Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {KPI_DATA.map((kpi) => (
          <MetricCard key={kpi.id} item={kpi} />
        ))}
      </div>

      {/* Real-Time Processing Pipeline Flow */}
      <ProcessingPipeline activeSession={true} />

      {/* Latency Telemetry & Breakdown Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Latency Line Chart */}
        <div className="lg:col-span-2 bg-[#0D0F13] border border-white/[0.07] rounded-lg p-4">
          <SectionHeader
            title="End-to-End Latency"
            subtitle="Full-duplex turn-around time (Target < 800 ms)"
            badge="Target: <800 ms"
            action={
              <span className="text-xs font-mono-code font-bold text-violet-300">
                P95: 440 ms
              </span>
            }
          />
          <div className="h-52 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={LATENCY_HISTORY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis 
                  dataKey="time" 
                  stroke="#52525B" 
                  tick={{ fontSize: 10, fill: '#71717A' }} 
                  axisLine={{ stroke: '#27272A' }}
                  tickLine={false}
                />
                <YAxis 
                  stroke="#52525B" 
                  tick={{ fontSize: 10, fill: '#71717A' }} 
                  domain={[300, 900]} 
                  axisLine={{ stroke: '#27272A' }}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#11141A', 
                    borderColor: 'rgba(255,255,255,0.1)', 
                    fontSize: '11px',
                    borderRadius: '6px'
                  }} 
                />
                <ReferenceLine y={800} stroke="#EF4444" strokeDasharray="3 3" label={{ value: '800ms SLA', fill: '#EF4444', fontSize: 10, position: 'insideTopRight' }} />
                <Line type="monotone" dataKey="total" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 2, fill: '#8B5CF6' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Processing Breakdown Bars */}
        <div className="bg-[#0D0F13] border border-white/[0.07] rounded-lg p-4 flex flex-col justify-between">
          <div>
            <SectionHeader
              title="Pipeline Breakdown"
              subtitle="Per-module latency contributions (446 ms Total)"
            />
            <div className="space-y-2.5 mt-3">
              {LATENCY_BREAKDOWN.map((item) => (
                <div key={item.component} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#A1A7B3] font-medium">{item.component}</span>
                    <span className="font-mono-code text-[#F4F5F7]">{item.latency} ms</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full" 
                      style={{ width: `${item.percentage * 2}%`, backgroundColor: item.color }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-[#68707D] font-mono-code">
            <span>LLM TTFT Dominance</span>
            <span className="text-amber-400">41.3% of budget</span>
          </div>
        </div>
      </div>

      {/* Recent Sessions Table & Live Event Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Table of Sessions */}
        <div className="lg:col-span-2 bg-[#0D0F13] border border-white/[0.07] rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-semibold tracking-wide text-[#F4F5F7] uppercase">Recent Sessions</h2>
              <p className="text-xs text-[#A1A7B3]">Real-time dialogue telemetry across active clients</p>
            </div>
            <button 
              onClick={() => onNavigate('sessions')}
              className="text-xs font-mono-code text-violet-400 hover:text-violet-300 flex items-center gap-1"
            >
              All sessions <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/[0.07] text-[#68707D] font-mono-code">
                  <th className="pb-2 font-medium">Session ID</th>
                  <th className="pb-2 font-medium">Duration</th>
                  <th className="pb-2 font-medium">Dominant Emotion</th>
                  <th className="pb-2 font-medium">Avg Latency</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {RECENT_SESSIONS.slice(0, 5).map((s) => (
                  <tr key={s.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-2.5 font-mono-code text-[#F4F5F7] font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                      {s.id}
                    </td>
                    <td className="py-2.5 font-mono-code text-[#A1A7B3]">{s.duration}</td>
                    <td className="py-2.5">
                      <Badge 
                        variant={
                          s.emotion === 'Panicked' ? 'rose' :
                          s.emotion === 'Anxious' ? 'amber' :
                          s.emotion === 'Calm' ? 'emerald' : 'neutral'
                        }
                        size="xs"
                      >
                        {s.emotion}
                      </Badge>
                    </td>
                    <td className="py-2.5 font-mono-code text-[#A1A7B3]">{s.avgLatency}</td>
                    <td className="py-2.5">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-mono-code ${
                        s.status === 'Active' ? 'text-emerald-400' :
                        s.status === 'Completed' ? 'text-[#A1A7B3]' : 'text-rose-400'
                      }`}>
                        <span className={`w-1 h-1 rounded-full ${
                          s.status === 'Active' ? 'bg-emerald-400' :
                          s.status === 'Completed' ? 'bg-zinc-500' : 'bg-rose-400'
                        }`} />
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Event Stream */}
        <div className="bg-[#0D0F13] border border-white/[0.07] rounded-lg p-4 flex flex-col">
          <SectionHeader
            title="Live Event Stream"
            subtitle="Streaming microservice event dispatch"
          />
          <div className="flex-1 space-y-2 overflow-y-auto max-h-64 font-mono-code text-[11px]">
            {LIVE_LOGS.map((log, index) => (
              <div key={index} className="flex items-start gap-2.5 p-1.5 rounded hover:bg-white/[0.02]">
                <span className="text-[#68707D] flex-shrink-0">{log.time}</span>
                <span className={`truncate ${
                  log.level === 'emotion' ? 'text-rose-400' :
                  log.level === 'stt' ? 'text-cyan-300' :
                  log.level === 'llm' ? 'text-amber-300' :
                  log.level === 'tts' ? 'text-violet-300' : 'text-[#A1A7B3]'
                }`}>
                  {log.event}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Health Section */}
      <div className="bg-[#0D0F13] border border-white/[0.07] rounded-lg p-4">
        <SectionHeader
          title="System Microservices Health"
          subtitle="Subsystem status, inference memory allocation, and operational latencies"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2.5 mt-2">
          {SYSTEM_SERVICES.map((srv) => (
            <div key={srv.name} className="p-3 bg-[#11141A] border border-white/[0.05] rounded-md space-y-1">
              <div className="flex items-center justify-between">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] font-mono-code text-[#68707D]">{srv.latency}</span>
              </div>
              <div className="text-xs font-semibold text-[#F4F5F7] truncate">{srv.name}</div>
              <div className="text-[10px] text-[#A1A7B3] font-mono-code pt-1 border-t border-white/[0.04] flex justify-between">
                <span>CPU {srv.cpu}</span>
                <span>{srv.vram !== '—' ? srv.vram : srv.memory}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
