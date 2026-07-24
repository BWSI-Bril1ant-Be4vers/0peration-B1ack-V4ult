"use client";
import { Check, ChevronRight, Lock } from "lucide-react";
import type { GameState } from "@/types/game";
import { ROOMS } from "@/data/rooms";

type Props = { state: GameState; activeRoom: number; onSelect: (id: number) => void };

export default function RoomList({ state, activeRoom, onSelect }: Props) {
  return (
    <nav aria-label="Network access" className="space-y-1">
      <div className="text-xs font-mono tracking-widest text-slate-500 uppercase px-2 pb-2">Network access</div>
      {ROOMS.map((r) => {
        const done = state.completedRooms.includes(r.id);
        const unlocked = r.id <= state.currentRoom;
        const active = r.id === activeRoom;
        return (
          <button
            key={r.id}
            disabled={!unlocked}
            onClick={() => onSelect(r.id)}
            aria-current={active ? "true" : undefined}
            className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-left font-mono text-xs transition-colors border
              ${active ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-200"
                : done ? "border-transparent text-emerald-400/90 hover:bg-slate-800/60"
                : unlocked ? "border-transparent text-slate-300 hover:bg-slate-800/60"
                : "border-transparent text-slate-600 cursor-not-allowed"}`}
          >
            <span className="w-4 shrink-0">
              {done ? <Check size={13} /> : unlocked ? <ChevronRight size={13} /> : <Lock size={12} />}
            </span>
            <span className="tracking-wide">{String(r.id).padStart(2, "0")}</span>
            <span className="truncate">{r.codename}</span>
          </button>
        );
      })}
    </nav>
  );
}
