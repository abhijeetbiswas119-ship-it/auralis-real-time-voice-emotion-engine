
import React, { useState } from 'react';
import { Search, Filter, Download } from 'lucide-react';
import { RECENT_SESSIONS } from '../data/mockData';
import { Badge, SectionHeader } from '../components/common/UIComponents';

export function Sessions({ onSelectSession }) {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredSessions = RECENT_SESSIONS.filter((s) => {
    if (filter !== 'All' && s.status !== filter) return false;
    if (search && !s.id.toLowerCase().includes(search.toLowerCase()) && !s.caller.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-5">
      <SectionHeader
        title="Session Telemetry Management"
        subtitle="Historical archive of voice-to-voice dialogues, acoustic markers, and latencies"
      />

      {/* Filter and Search Bar */}
      <div className="bg-[#0D0F13] border border-white/[0.07] rounded-lg p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Filter by session ID or caller..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#11141A] border border-white/[0.08] rounded-md pl-8 pr-3 py-1.5 text-xs text-[#F4F5F7] placeholder-[#68707D] font-mono-code focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-1 font-mono-code text-xs">
          {['All', 'Active', 'Completed', 'Failed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 rounded transition-colors ${
                filter === status ? 'bg-violet-500/20 text-violet-300 font-semibold' : 'text-[#68707D] hover:text-[#F4F5F7]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0D0F13] border border-white/[0.07] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.07] text-[#68707D] font-mono-code bg-white/[0.01]">
                <th className="p-3 font-medium">Session ID</th>
                <th className="p-3 font-medium">Caller / Target</th>
                <th className="p-3 font-medium">Timestamp</th>
                <th className="p-3 font-medium">Duration</th>
                <th className="p-3 font-medium">Emotion</th>
                <th className="p-3 font-medium">Avg Latency</th>
                <th className="p-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredSessions.map((s) => (
                <tr 
                  key={s.id} 
                  className="hover:bg-white/[0.02] cursor-pointer transition-colors"
                  onClick={() => onSelectSession && onSelectSession(s)}
                >
                  <td className="p-3 font-mono-code text-[#F4F5F7] font-semibold">{s.id}</td>
                  <td className="p-3 text-[#A1A7B3]">{s.caller}</td>
                  <td className="p-3 font-mono-code text-[#68707D]">{s.time}</td>
                  <td className="p-3 font-mono-code text-[#A1A7B3]">{s.duration}</td>
                  <td className="p-3">
                    <Badge 
                      variant={s.emotion === 'Panicked' ? 'rose' : s.emotion === 'Anxious' ? 'amber' : 'neutral'} 
                      size="xs"
                    >
                      {s.emotion}
                    </Badge>
                  </td>
                  <td className="p-3 font-mono-code text-[#A1A7B3]">{s.avgLatency}</td>
                  <td className="p-3">
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-mono-code ${
                      s.status === 'Active' ? 'text-emerald-400' :
                      s.status === 'Completed' ? 'text-[#A1A7B3]' : 'text-rose-400'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
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
    </div>
  );
}



