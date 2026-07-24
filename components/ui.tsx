import type { ReactNode } from "react";

export const Mono = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <pre className={`font-mono text-sm leading-relaxed whitespace-pre-wrap break-words ${className}`}>{children}</pre>
);

export const Panel = ({ label, children, className = "" }: { label?: string; children: ReactNode; className?: string }) => (
  <div className={`border border-slate-800 rounded-lg bg-slate-900/60 overflow-hidden ${className}`}>
    {label && (
      <div className="px-4 py-2 border-b border-slate-800 bg-slate-900 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
        <span className="text-xs font-mono tracking-widest text-slate-400 uppercase">{label}</span>
      </div>
    )}
    <div className="p-4">{children}</div>
  </div>
);
