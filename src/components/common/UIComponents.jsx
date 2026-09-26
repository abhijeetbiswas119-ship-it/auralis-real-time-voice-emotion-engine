
import React from 'react';
import { 
  Radio, Gauge, Activity, Zap, AudioWaveform, Brain, 
  ArrowUpRight, ArrowDownRight, Minus 
} from 'lucide-react';

const iconMap = {
  Radio,
  Gauge,
  Activity,
  Zap,
  AudioWaveform,
  Brain
};

export function Card({ children, className = '', glow = false }) {
  return (
    <div 
      className={`relative bg-[#0D0F13] border border-white/[0.07] rounded-lg p-4 transition-all duration-200 ${
        glow ? 'shadow-[0_0_24px_rgba(139,92,246,0.06)] border-violet-500/30' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function StatusDot({ status = 'online', ping = false, size = 'md' }) {
  const sizeClasses = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5'
  };

  const colorClasses = {
    online: 'bg-emerald-400',
    busy: 'bg-amber-400',
    danger: 'bg-rose-400',
    offline: 'bg-zinc-600',
    active: 'bg-cyan-400',
    violet: 'bg-violet-400'
  };

  return (
    <span className="relative flex items-center justify-center">
      {ping && (
        <span 
          className={`absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping ${colorClasses[status] || colorClasses.online}`} 
        />
      )}
      <span className={`relative inline-flex rounded-full ${sizeClasses[size]} ${colorClasses[status] || colorClasses.online}`} />
    </span>
  );
}

export function Badge({ children, variant = 'neutral', size = 'sm', className = '' }) {
  const styles = {
    neutral: 'bg-white/[0.05] text-[#A1A7B3] border-white/[0.08]',
    violet: 'bg-violet-500/10 text-violet-300 border-violet-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    rose: 'bg-rose-500/10 text-rose-300 border-rose-500/20'
  };

  const sizes = {
    xs: 'px-1.5 py-0.5 text-[10px]',
    sm: 'px-2 py-0.5 text-[11px]',
    md: 'px-2.5 py-1 text-xs'
  };

  return (
    <span className={`inline-flex items-center font-mono-code font-medium border rounded ${styles[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
}

export function SectionHeader({ title, subtitle, badge, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold tracking-wide text-[#F4F5F7] uppercase">{title}</h2>
          {badge && <Badge variant="violet" size="xs">{badge}</Badge>}
        </div>
        {subtitle && <p className="text-xs text-[#A1A7B3] mt-0.5">{subtitle}</p>}
      </div>
      {action && <div className="flex items-center gap-2">{action}</div>}
    </div>
  );
}

export function MetricCard({ item }) {
  const IconComponent = iconMap[item.icon] || Activity;
  const isUp = item.trend === 'up';
  const isDown = item.trend === 'down';

  return (
    <div className="bg-[#0D0F13] border border-white/[0.07] rounded-lg p-3.5 hover:border-white/[0.14] transition-colors">
      <div className="flex items-start justify-between">
        <span className="text-[11px] font-medium text-[#A1A7B3] tracking-wide">{item.label}</span>
        <div className="p-1.5 rounded bg-white/[0.04] text-[#A1A7B3]">
          <IconComponent className="w-3.5 h-3.5" />
        </div>
      </div>
      
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-semibold tracking-tight text-[#F4F5F7] font-mono-code">{item.value}</span>
      </div>

      <div className="mt-2.5 flex items-center justify-between text-[11px] pt-2 border-t border-white/[0.05]">
        <span className="text-[#68707D] flex items-center gap-1">
          {isUp && <ArrowUpRight className="w-3 h-3 text-emerald-400" />}
          {isDown && <ArrowDownRight className="w-3 h-3 text-cyan-400" />}
          {!isUp && !isDown && <Minus className="w-3 h-3 text-zinc-500" />}
          <span className="text-[#A1A7B3]">{item.change}</span>
        </span>
        <span className="text-[10px] font-mono-code text-[#68707D] bg-white/[0.03] px-1.5 py-0.5 rounded">
          {item.tag}
        </span>
      </div>
    </div>
  );
}

