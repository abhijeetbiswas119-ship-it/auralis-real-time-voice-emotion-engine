import React from 'react';
import { 
  LayoutDashboard, 
  Mic, 
  MessageSquare, 
  Activity, 
  Cpu, 
  Layers, 
  Gauge, 
  Sliders, 
  Settings, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'live-session', label: 'Live Session', icon: Mic, badge: 'LIVE' },
  { id: 'conversations', label: 'Conversations', icon: MessageSquare },
  { id: 'emotion-analytics', label: 'Emotion Analytics', icon: Activity },
  { id: 'audio-pipeline', label: 'Audio Pipeline', icon: Layers },
  { id: 'models', label: 'Models', icon: Cpu },
  { id: 'performance', label: 'Performance', icon: Gauge },
  { id: 'sessions', label: 'Sessions', icon: Sliders },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ 
  currentTab = 'overview', 
  setTab = () => {}, 
  collapsed = false, 
  setCollapsed = () => {} 
}) {
  const toggleCollapse = () => {
    if (typeof setCollapsed === 'function') {
      setCollapsed(!collapsed);
    }
  };

  return (
    <aside 
      className={`fixed top-0 left-0 bottom-0 z-30 flex flex-col bg-[#090B0E] border-r border-white/10 transition-all duration-300 select-none ${
        collapsed ? 'w-18' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-14 flex items-center justify-between px-3.5 border-b border-white/10">
        <div 
          className="flex items-center gap-2.5 overflow-hidden cursor-pointer" 
          onClick={() => setTab('overview')}
        >
          {/* Abstract Soundwave Intelligence Glyph */}
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-violet-600 to-cyan-500 p-[1px] flex-shrink-0 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <div className="w-full h-full bg-[#090B0E] rounded-[5px] flex items-center justify-center gap-0.5 px-1">
              <span className="w-0.5 h-2.5 bg-violet-400 rounded-full animate-pulse" />
              <span className="w-0.5 h-4 bg-cyan-300 rounded-full" />
              <span className="w-0.5 h-3 bg-violet-300 rounded-full" />
              <span className="w-0.5 h-1.5 bg-cyan-400 rounded-full" />
            </div>
          </div>

          {!collapsed && (
            <div className="flex flex-col truncate">
              <span className="text-xs font-bold tracking-widest text-[#F4F5F7] font-mono">
                AURALIS
              </span>
              <span className="text-[10px] text-zinc-400 tracking-tight truncate">
                Voice Intelligence
              </span>
            </div>
          )}
        </div>

        {!collapsed && (
          <button
            type="button"
            onClick={toggleCollapse}
            className="p-1 rounded text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            title="Collapse sidebar"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
        <div className={`px-2 mb-2 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider font-mono ${collapsed ? 'text-center' : ''}`}>
          {collapsed ? '•••' : 'Command Center'}
        </div>

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-all relative group text-left ${
                isActive 
                  ? 'bg-violet-500/15 text-violet-300 border-l-2 border-violet-500' 
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon 
                className={`w-4 h-4 flex-shrink-0 transition-colors ${
                  isActive ? 'text-violet-400' : 'text-zinc-500 group-hover:text-zinc-300'
                }`} 
              />
              
              {!collapsed && (
                <div className="flex items-center justify-between flex-1 truncate">
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer System Status */}
      <div className="p-3 border-t border-white/10 bg-[#07080B]">
        {collapsed ? (
          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={toggleCollapse}
              className="p-1 rounded text-zinc-400 hover:text-white hover:bg-white/5"
              title="Expand sidebar"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="System Online" />
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-zinc-300 font-mono">System Online</span>
              </div>
              <span className="text-[10px] text-zinc-500 font-mono">v0.1.4</span>
            </div>
            <div className="text-[10px] text-zinc-500 font-mono leading-tight truncate">
              Auralis Engine · RTX 4090
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;