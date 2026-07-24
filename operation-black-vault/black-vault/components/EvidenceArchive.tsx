"use client";
import { useState } from "react";
import { Archive, Check, Lock, X } from "lucide-react";
import type { GameState } from "@/types/game";
import { ROOMS } from "@/data/rooms";

type Props = { state: GameState; onClose: () => void };

export default function EvidenceArchive({ state, onClose }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Evidence archive">
      <div className="w-full max-w-2xl max-h-[85vh] overflow-y-auto border border-slate-700 rounded-xl bg-slate-900 shadow-2xl">
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 sticky top-0 bg-slate-900">
          <div className="flex items-center gap-2 font-mono text-sm text-slate-200 tracking-widest">
            <Archive size={16} className="text-cyan-400" /> EVIDENCE ARCHIVE — {state.collectedEvidence.length} / 10
          </div>
          <button onClick={onClose} aria-label="Close archive" className="text-slate-400 hover:text-slate-100 p-1">
            <X size={18} />
          </button>
        </div>
        <div className="p-5 grid sm:grid-cols-2 gap-3">
          {ROOMS.map((r) => {
            const has = state.collectedEvidence.includes(r.evidence.name);
            const expanded = open === r.id;
            return (
              <button
                key={r.id}
                disabled={!has}
                onClick={() => setOpen(expanded ? null : r.id)}
                className={`text-left border rounded-lg p-3 transition-colors ${
                  has ? "border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/10" : "border-slate-800 bg-slate-950/50"
                } ${expanded ? "sm:col-span-2" : ""}`}
              >
                <div className="flex items-center gap-2 font-mono text-xs">
                  {has ? <Check size={13} className="text-emerald-400" /> : <Lock size={12} className="text-slate-600" />}
                  <span className={has ? "text-slate-100" : "text-slate-600"}>
                    {has ? r.evidence.name : "ENCRYPTED — evidence not recovered"}
                  </span>
                </div>
                {expanded && has && (
                  <div className="mt-2 text-sm text-slate-300 leading-relaxed">
                    <div className="text-xs font-mono text-slate-500 mb-1">Recovered from Room {String(r.id).padStart(2, "0")} — {r.title}</div>
                    {r.evidence.desc}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
