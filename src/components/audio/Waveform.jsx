
import React, { useEffect, useState } from 'react';

export function Waveform({ 
  isActive = false, 
  state = 'IDLE', 
  rms = -18.4, 
  sampleRate = '48 kHz', 
  channels = 'Stereo', 
  codec = 'Opus' 
}) {
  const [bars, setBars] = useState(() => Array.from({ length: 42 }, () => 14));

  useEffect(() => {
    if (!isActive || state === 'PAUSED' || state === 'IDLE' || state === 'ENDED') {
      setBars(Array.from({ length: 42 }, () => 10));
      return;
    }

    const interval = setInterval(() => {
      setBars(() =>
        Array.from({ length: 42 }, (_, i) => {
          if (state === 'LISTENING') {
            const centerFactor = 1 - Math.abs(21 - i) / 25;
            const variance = Math.random() * 45 * Math.max(0.3, centerFactor);
            return Math.min(94, Math.max(12, variance + 18));
          } else if (state === 'AI_SPEAKING') {
            const wave = Math.sin(Date.now() / 140 + i * 0.4) * 25 + 40;
            return Math.min(88, Math.max(16, wave + Math.random() * 12));
          } else if (state === 'AI_THINKING') {
            const ripple = Math.sin(Date.now() / 200 + i * 0.25) * 14 + 20;
            return Math.max(8, ripple);
          } else if (state === 'INTERRUPTED') {
            return 8 + Math.random() * 8;
          }
          return 14;
        })
      );
    }, 70);

    return () => clearInterval(interval);
  }, [isActive, state]);

  const getBarColor = (index) => {
    if (!isActive || state === 'IDLE' || state === 'PAUSED') return 'bg-zinc-700/50';
    if (state === 'INTERRUPTED') return 'bg-rose-500/60';
    if (state === 'AI_SPEAKING') return 'bg-cyan-400';
    if (state === 'AI_THINKING') return 'bg-violet-400/80';
    // LISTENING
    if (index % 4 === 0) return 'bg-violet-400';
    return 'bg-violet-500/80';
  };

  return (
    <div className="bg-[#090B0E] border border-white/[0.07] rounded-lg p-4 flex flex-col justify-between">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.05]">
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-[#F4F5F7] tracking-wider uppercase font-mono-code">
            Audio I/O Signal
          </span>
          <span className={`text-[11px] font-mono-code px-2 py-0.5 rounded border ${
            state === 'LISTENING' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
            state === 'AI_SPEAKING' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' :
            state === 'AI_THINKING' ? 'bg-violet-500/10 text-violet-400 border-violet-500/20' :
            state === 'INTERRUPTED' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
            'bg-zinc-800/40 text-zinc-400 border-zinc-700/40'
          }`}>
            {state}
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-mono-code text-[#A1A7B3]">
          <span>RMS <strong className="text-[#F4F5F7]">{isActive ? `${rms} dB` : '-∞ dB'}</strong></span>
          <span className="hidden sm:inline text-zinc-600">|</span>
          <span className="hidden sm:inline">{sampleRate}</span>
          <span className="hidden sm:inline text-zinc-600">|</span>
          <span className="hidden sm:inline">{channels}</span>
          <span className="hidden sm:inline text-zinc-600">|</span>
          <span className="text-violet-400">{codec}</span>
        </div>
      </div>

      {/* Visualizer bars */}
      <div className="h-28 flex items-center justify-between gap-[3px] py-4 px-1">
        {bars.map((height, i) => (
          <div
            key={i}
            className="flex-1 flex flex-col items-center justify-center h-full"
          >
            <div
              className={`w-full rounded-full transition-all duration-75 ${getBarColor(i)}`}
              style={{
                height: `${height}%`,
                minHeight: '4px'
              }}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-white/[0.05] text-[10px] text-[#68707D] font-mono-code">
        <span>-48 dB</span>
        <span>-36 dB</span>
        <span>-24 dB</span>
        <span>-12 dB</span>
        <span>-6 dB</span>
        <span className="text-rose-400">0 dB (PEAK)</span>
      </div>
    </div>
  );
}


