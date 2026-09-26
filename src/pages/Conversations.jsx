
import React, { useState } from 'react';
import { MessageSquare, Clock, User, Sparkles, ChevronRight, Activity } from 'lucide-react';
import { RECENT_SESSIONS, CONVERSATION_TRANSCRIPT } from '../data/mockData';
import { Badge, Card, SectionHeader } from '../components/common/UIComponents';

export function Conversations() {
  const [selectedSession, setSelectedSession] = useState(RECENT_SESSIONS[0]);

  return (
    <div className="space-y-5">
      <SectionHeader
        title="Conversation Intelligence"
        subtitle="Turn-by-turn dialogue review with emotional classification and latency tracking"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Conversation List */}
        <div className="bg-[#0D0F13] border border-white/[0.07] rounded-lg p-3 space-y-2">
          <div className="text-[11px] font-mono-code text-[#68707D] px-2 py-1 uppercase">
            Active & Archived Dialogues
          </div>
          {RECENT_SESSIONS.map((session) => (
            <div
              key={session.id}
              onClick={() => setSelectedSession(session)}
              className={`p-3 rounded-md cursor-pointer border transition-all ${
                selectedSession.id === session.id
                  ? 'bg-violet-500/10 border-violet-500/30 text-[#F4F5F7]'
                  : 'bg-[#11141A] border-white/[0.05] text-[#A1A7B3] hover:border-white/[0.14]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono-code font-semibold text-xs text-[#F4F5F7]">{session.id}</span>
                <span className="text-[10px] font-mono-code text-[#68707D]">{session.time}</span>
              </div>
              <div className="text-xs truncate">{session.caller}</div>
              <div className="mt-2 flex items-center justify-between text-[10px] font-mono-code">
                <span className="text-zinc-500">Duration: {session.duration}</span>
                <Badge variant={session.emotion === 'Panicked' ? 'rose' : session.emotion === 'Anxious' ? 'amber' : 'neutral'} size="xs">
                  {session.emotion}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Dialogue Detail Inspector */}
        <div className="lg:col-span-2 bg-[#0D0F13] border border-white/[0.07] rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-[#F4F5F7] font-mono-code">{selectedSession.id}</h3>
                <Badge variant="violet" size="xs">Scenario: Crisis Negotiation</Badge>
              </div>
              <p className="text-xs text-[#A1A7B3] mt-0.5">Caller: {selectedSession.caller} · {selectedSession.turns} Turns recorded</p>
            </div>
            <div className="text-right text-xs font-mono-code text-[#A1A7B3]">
              <div>Avg Latency: <strong className="text-emerald-400">{selectedSession.avgLatency}</strong></div>
              <div className="text-[10px] text-zinc-500">Model: {selectedSession.model}</div>
            </div>
          </div>

          {/* Transcript bubbles */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {CONVERSATION_TRANSCRIPT.map((turn) => {
              const isAI = turn.speaker === 'assistant';
              return (
                <div 
                  key={turn.turn} 
                  className={`flex flex-col ${isAI ? 'items-start' : 'items-end'}`}
                >
                  <div className="flex items-center gap-2 mb-1 text-[10px] font-mono-code text-[#68707D]">
                    <span>{isAI ? 'Auralis Voice AI' : 'User'}</span>
                    <span>•</span>
                    <span>{turn.timestamp}</span>
                    {turn.emotion && (
                      <span className={`px-1 rounded ${isAI ? 'text-violet-400 bg-violet-500/10' : 'text-rose-400 bg-rose-500/10'}`}>
                        {turn.emotion}
                      </span>
                    )}
                  </div>
                  
                  <div className={`max-w-lg p-3 rounded-lg text-xs leading-relaxed border ${
                    isAI 
                      ? 'bg-[#11141A] border-white/[0.08] text-[#F4F5F7]' 
                      : 'bg-violet-600/10 border-violet-500/20 text-violet-100'
                  }`}>
                    {turn.text}
                  </div>

                  {turn.latency && (
                    <span className="text-[9px] font-mono-code text-zinc-500 mt-1">
                      TTFT: {turn.latency} · {turn.tokens} tokens
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

