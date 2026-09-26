
import React, { useState } from 'react';
import { Cpu, RefreshCw, Layers, CheckCircle2, Zap } from 'lucide-react';
import { MODEL_REGISTRY } from '../data/mockData';
import { SectionHeader, Badge } from '../components/common/UIComponents';

export function Models() {
  const [reloadingId, setReloadingId] = useState(null);

  const handleReload = (id) => {
    setReloadingId(id);
    setTimeout(() => setReloadingId(null), 1000);
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Models & Inference Engines"
        subtitle="Manage active neural speech, acoustic classification, and LLM reasoning runtimes"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {MODEL_REGISTRY.map((model) => (
          <div 
            key={model.id}
            className="bg-[#0D0F13] border border-white/[0.07] rounded-lg p-4 flex flex-col justify-between hover:border-white/[0.12] transition-colors"
          >
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-[#F4F5F7] font-mono-code">{model.name}</h3>
                    <Badge variant="violet" size="xs">{model.type}</Badge>
                  </div>
                  <span className="text-[11px] font-mono-code text-[#68707D] mt-0.5 block">{model.version}</span>
                </div>
                <span className="flex items-center gap-1 text-[11px] font-mono-code text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {model.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4 text-xs font-mono-code">
                <div className="p-2 rounded bg-[#11141A] border border-white/[0.04]">
                  <span className="text-[#68707D] text-[10px] block">Runtime Engine</span>
                  <span className="text-[#F4F5F7]">{model.runtime}</span>
                </div>
                <div className="p-2 rounded bg-[#11141A] border border-white/[0.04]">
                  <span className="text-[#68707D] text-[10px] block">Compute Device</span>
                  <span className="text-[#F4F5F7] truncate">{model.device}</span>
                </div>
                <div className="p-2 rounded bg-[#11141A] border border-white/[0.04]">
                  <span className="text-[#68707D] text-[10px] block">Latency Profile</span>
                  <span className="text-violet-300 font-semibold">{model.latency}</span>
                </div>
                <div className="p-2 rounded bg-[#11141A] border border-white/[0.04]">
                  <span className="text-[#68707D] text-[10px] block">VRAM Usage</span>
                  <span className="text-cyan-300 font-semibold">{model.vram}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-white/[0.05] flex items-center justify-between">
              <span className="text-[10px] font-mono-code text-[#68707D]">
                Max Concurrency: {model.concurrency}
              </span>
              <button
                onClick={() => handleReload(model.id)}
                disabled={reloadingId === model.id}
                className="px-2.5 py-1 text-xs font-mono-code rounded bg-white/[0.05] hover:bg-white/[0.08] text-[#A1A7B3] hover:text-[#F4F5F7] border border-white/[0.08] flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className={`w-3 h-3 ${reloadingId === model.id ? 'animate-spin' : ''}`} />
                <span>{reloadingId === model.id ? 'Reloading...' : 'Reload Weights'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

