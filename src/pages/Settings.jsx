
import React, { useState } from 'react';
import { Sliders, Save, Check } from 'lucide-react';
import { SectionHeader } from '../components/common/UIComponents';

export function Settings() {
  const [saved, setSaved] = useState(false);
  const [sampleRate, setSampleRate] = useState('48000');
  const [webrtcCodec, setWebrtcCodec] = useState('opus');
  const [vadSensitivity, setVadSensitivity] = useState(0.85);
  const [targetLatency, setTargetLatency] = useState(600);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <SectionHeader
        title="Engine Configuration & Hardware Parameters"
        subtitle="Manage DSP, acoustic thresholds, low-latency buffers, and local Ollama runtimes"
      />

      <div className="bg-[#0D0F13] border border-white/[0.07] rounded-lg p-5 space-y-6">
        {/* Audio Driver Settings */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#F4F5F7] font-mono-code pb-1 border-b border-white/[0.05]">
            Audio Signal & WebRTC Transport
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono-code">
            <div>
              <label className="text-[#A1A7B3] block mb-1">PCM Sampling Rate</label>
              <select 
                value={sampleRate} 
                onChange={(e) => setSampleRate(e.target.value)}
                className="w-full bg-[#11141A] border border-white/[0.08] rounded p-2 text-[#F4F5F7] focus:outline-none"
              >
                <option value="48000">48,000 Hz (Fullband Recommended)</option>
                <option value="24000">24,000 Hz</option>
                <option value="16000">16,000 Hz (Narrowband)</option>
              </select>
            </div>

            <div>
              <label className="text-[#A1A7B3] block mb-1">WebRTC Codec Profile</label>
              <select 
                value={webrtcCodec} 
                onChange={(e) => setWebrtcCodec(e.target.value)}
                className="w-full bg-[#11141A] border border-white/[0.08] rounded p-2 text-[#F4F5F7] focus:outline-none"
              >
                <option value="opus">Opus 128 kbps (Low-Delay Full-Duplex)</option>
                <option value="pcm">Raw PCM L16 (Zero Compression)</option>
              </select>
            </div>
          </div>
        </div>

        {/* VAD & Latency Budget */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#F4F5F7] font-mono-code pb-1 border-b border-white/[0.05]">
            Silero VAD & Budget SLA
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <div className="flex justify-between font-mono-code mb-1">
                <span className="text-[#A1A7B3]">Speech Threshold Confidence</span>
                <span className="text-emerald-400">{vadSensitivity}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.99"
                step="0.01"
                value={vadSensitivity}
                onChange={(e) => setVadSensitivity(parseFloat(e.target.value))}
                className="w-full accent-violet-500"
              />
            </div>

            <div>
              <div className="flex justify-between font-mono-code mb-1">
                <span className="text-[#A1A7B3]">Target SLA Latency Budget</span>
                <span className="text-violet-300">{targetLatency} ms</span>
              </div>
              <input
                type="range"
                min="300"
                max="1200"
                step="50"
                value={targetLatency}
                onChange={(e) => setTargetLatency(parseInt(e.target.value))}
                className="w-full accent-violet-500"
              />
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-md bg-violet-600 hover:bg-violet-500 text-xs font-semibold text-[#F4F5F7] inline-flex items-center gap-2 transition-all shadow-[0_0_12px_rgba(139,92,246,0.3)]"
          >
            {saved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
            <span>{saved ? 'Parameters Saved' : 'Apply Configuration'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}


