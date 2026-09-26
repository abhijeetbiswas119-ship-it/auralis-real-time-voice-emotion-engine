
import React from 'react';
import { Search, Bell, Settings, Command } from 'lucide-react';

export function Topbar({ 
  currentTab, 
  collapsed, 
  onOpenSearch, 
  onToggleNotifications,
  unreadCount = 2,
  onNavigateSettings
}) {
  const getBreadcrumbTitle = (tab) => {
    const titles = {
      overview: 'Overview / Command Center',
      'live-session': 'Real-Time / Live Voice Session',
      conversations: 'Intelligence / Conversations',
      'emotion-analytics': 'Acoustics / Emotion Analytics',
      'audio-pipeline': 'Observability / Audio Pipeline',
      models: 'Inference / Models Registry',
      performance: 'Telemetry / Performance & Latency',
      sessions: 'Operations / Sessions History',
      settings: 'System / Configuration'
    };
    return titles[tab] || 'Overview';
  };

  return (
    <header className="sticky top-0 z-20 h-14 bg-[#07080B]/90 backdrop-blur-md border-b border-white/[0.07] px-4 sm:px-6 flex items-center justify-between">
      {/* Left Breadcrumb */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono-code text-[#68707D] uppercase tracking-wider">
          {getBreadcrumbTitle(currentTab)}
        </span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Search button trigger */}
        <button
          onClick={onOpenSearch}
          className="hidden md:flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-[#0D0F13] border border-white/[0.08] text-xs text-[#A1A7B3] hover:border-white/[0.18] transition-colors"
        >
          <Search className="w-3.5 h-3.5 text-[#68707D]" />
          <span>Search telemetry, sessions...</span>
          <span className="flex items-center gap-0.5 text-[10px] font-mono-code bg-white/[0.06] text-[#A1A7B3] px-1.5 py-0.5 rounded ml-2">
            <Command className="w-2.5 h-2.5" /> K
          </span>
        </button>

        {/* WebRTC Live Status */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono-code">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden sm:inline">WebRTC Connected</span>
          <span className="text-[10px] text-emerald-400/70 font-mono-code">18ms</span>
        </div>

        {/* Notifications button */}
        <button
          onClick={onToggleNotifications}
          className="relative p-1.5 rounded-md text-[#A1A7B3] hover:text-[#F4F5F7] hover:bg-white/[0.05] transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-violet-400" />
          )}
        </button>

        {/* Settings button */}
        <button
          onClick={onNavigateSettings}
          className="p-1.5 rounded-md text-[#A1A7B3] hover:text-[#F4F5F7] hover:bg-white/[0.05] transition-colors"
          title="Settings"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* Operator Profile Avatar */}
        <div className="w-7 h-7 rounded-full bg-zinc-800 border border-white/[0.1] flex items-center justify-center text-[11px] font-mono-code text-zinc-300 font-semibold cursor-pointer">
          OP
        </div>
      </div>
    </header>
  );
}

