
import React from 'react';
import { 
  Mic, Radio, Activity, Workflow, Brain, Volume2, ShieldCheck, ChevronRight 
} from 'lucide-react';
import { PIPELINE_NODES } from '../../data/mockData';

const iconMap = {
  mic: Mic,
  webrtc_in: Radio,
  vad: Activity,
  whisper: Workflow,
  wav2vec2: Activity,
  context: ShieldCheck,
  llama3: Brain,
  xtts: Volume2,
  webrtc_out: Radio
};

export function ProcessingPipeline({ activeSession = true }) {
  return (
    <div className="bg-[#0D0F13] border border-white/[0.07] rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-semibold tracking-wide text-[#F4F5F7] uppercase">
            Real-Time Processing Pipeline
          </h2>
          <p className="text-xs text-[#A1A7B3] mt-0.5">
            Full-duplex zero-copy audio pipeline with streaming inference
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono-code text-[#A1A7B3]">Total End-to-End:</span>
          <span className="text-xs font-mono-code font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            446 ms
          </span>
        </div>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="flex items-center gap-2 min-w-[940px]">
          {PIPELINE_NODES.map((node, index) => {
            const Icon = iconMap[node.id] || Activity;
            const isLast = index === PIPELINE_NODES.length - 1;

            return (
              <React.Fragment key={node.id}>
                <div className={`flex-1 bg-[#11141A] border rounded-md p-3 relative transition-all duration-200 ${
                  activeSession && (node.status === 'active' || node.status === 'streaming')
                    ? 'border-violet-500/40 shadow-[0_0_12px_rgba(139,92,246,0.08)]'
                    : 'border-white/[0.06]'
                }`}>
                  <div className="flex items-center justify-between text-zinc-400 mb-1.5">
                    <Icon className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="text-[10px] font-mono-code text-[#A1A7B3]">
                      {node.latency}
                    </span>
                  </div>
                  
                  <div className="text-xs font-medium text-[#F4F5F7] truncate">{node.name}</div>
                  
                  <div className="mt-1 flex items-center justify-between text-[10px]">
                    <span className="text-[#68707D] truncate font-mono-code">{node.detail}</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      node.status === 'streaming' ? 'bg-cyan-400 animate-pulse' :
                      node.status === 'active' ? 'bg-emerald-400' : 'bg-zinc-600'
                    }`} />
                  </div>
                </div>

                {!isLast && (
                  <div className="text-zinc-600 flex-shrink-0">
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}



