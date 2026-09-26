
import React, { useState, useEffect } from 'react';
import { Search, X, Mic, Cpu, Activity, MessageSquare } from 'lucide-react';

export function SearchModal({ isOpen, onClose, onNavigate }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose(!isOpen);
      }
      if (e.key === 'Escape' && isOpen) {
        onClose(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickLinks = [
    { label: 'Start Live Voice Session', tab: 'live-session', icon: Mic, cat: 'Action' },
    { label: 'Inspect Emotion Classifications', tab: 'emotion-analytics', icon: Activity, cat: 'Analytics' },
    { label: 'View Llama 3 & Faster-Whisper Models', tab: 'models', icon: Cpu, cat: 'System' },
    { label: 'Review Crisis Negotiation SES-8F31', tab: 'conversations', icon: MessageSquare, cat: 'Session' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-24 px-4">
      <div className="w-full max-w-xl bg-[#0D0F13] border border-white/[0.12] rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
        <div className="flex items-center px-3.5 border-b border-white/[0.08]">
          <Search className="w-4 h-4 text-zinc-500 mr-2.5" />
          <input
            type="text"
            autoFocus
            placeholder="Search telemetry, active sessions, models, acoustic events..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full py-3.5 bg-transparent text-sm text-[#F4F5F7] placeholder-[#68707D] focus:outline-none font-mono-code"
          />
          <button onClick={() => onClose(false)} className="text-zinc-500 hover:text-zinc-300">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-2 space-y-1 max-h-80 overflow-y-auto">
          <div className="px-2 py-1 text-[10px] font-mono-code text-[#68707D] uppercase">
            Quick Navigation & Commands
          </div>
          {quickLinks.map((link, idx) => {
            const Icon = link.icon;
            return (
              <button
                key={idx}
                onClick={() => {
                  onNavigate(link.tab);
                  onClose(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-md text-[#A1A7B3] hover:text-[#F4F5F7] hover:bg-white/[0.05] transition-colors text-left"
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-3.5 h-3.5 text-violet-400" />
                  <span>{link.label}</span>
                </div>
                <span className="text-[10px] font-mono-code text-[#68707D] bg-white/[0.04] px-1.5 py-0.5 rounded">
                  {link.cat}
                </span>
              </button>
            );
          })}
        </div>

        <div className="px-3 py-2 bg-[#090B0E] border-t border-white/[0.06] flex items-center justify-between text-[11px] text-[#68707D] font-mono-code">
          <span>Navigate with arrows</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
}

