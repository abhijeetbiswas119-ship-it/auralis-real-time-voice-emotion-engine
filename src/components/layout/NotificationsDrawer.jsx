
import React from 'react';
import { X, CheckCircle2, AlertTriangle, Info } from 'lucide-react';

export function NotificationsDrawer({ isOpen, onClose }) {
  if (!isOpen) return null;

  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Arousal Spike Detected (>85%)',
      desc: 'Session SES-8F31 classified PANICKED state with 91% confidence.',
      time: '2 mins ago'
    },
    {
      id: 2,
      type: 'info',
      title: 'XTTSv2 Streaming Optimized',
      desc: 'Dynamic latency reduced to 26ms per chunk via DeepSpeed kernel.',
      time: '14 mins ago'
    },
    {
      id: 3,
      type: 'success',
      title: 'WebRTC Peer ICE Connected',
      desc: 'Transport negotiated with opus/48000/2, RTT 18ms.',
      time: '32 mins ago'
    }
  ];

  return (
    <div className="fixed top-14 right-0 bottom-0 w-80 bg-[#0D0F13] border-l border-white/[0.08] z-30 shadow-2xl flex flex-col">
      <div className="p-3.5 border-b border-white/[0.08] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#F4F5F7] font-mono-code">
            Pipeline Alerts
          </span>
          <span className="text-[10px] font-mono-code bg-violet-500/10 text-violet-300 px-1.5 py-0.2 rounded border border-violet-500/20">
            3 new
          </span>
        </div>
        <button onClick={onClose} className="text-[#68707D] hover:text-[#F4F5F7]">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 p-3 space-y-2.5 overflow-y-auto">
        {alerts.map((alert) => (
          <div key={alert.id} className="p-3 rounded bg-[#11141A] border border-white/[0.05] space-y-1">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-medium text-[#F4F5F7]">
                {alert.type === 'warning' && <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />}
                {alert.type === 'success' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                {alert.type === 'info' && <Info className="w-3.5 h-3.5 text-cyan-400" />}
                {alert.title}
              </span>
            </div>
            <p className="text-[11px] text-[#A1A7B3] leading-relaxed">{alert.desc}</p>
            <div className="text-[10px] text-[#68707D] font-mono-code text-right">{alert.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
