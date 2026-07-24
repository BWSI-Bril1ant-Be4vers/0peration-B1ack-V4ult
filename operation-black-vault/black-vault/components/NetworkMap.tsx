"use client";
import type { GameState } from "@/types/game";
import { ROOMS } from "@/data/rooms";

type Props = { state: GameState; activeRoom: number; onSelect: (id: number) => void };

export default function NetworkMap({ state, activeRoom, onSelect }: Props) {
  return (
    <div>
      <div className="text-xs font-mono tracking-widest text-slate-500 uppercase pb-3">Network map</div>
      <div className="flex flex-col items-start">
        {ROOMS.map((r, i) => {
          const done = state.completedRooms.includes(r.id);
          const unlocked = r.id <= state.currentRoom;
          const active = r.id === activeRoom;
          return (
            <div key={r.id} className="flex flex-col">
              <button
                disabled={!unlocked}
                onClick={() => onSelect(r.id)}
                className={`flex items-center gap-2 font-mono text-xs group ${unlocked ? "" : "cursor-not-allowed"}`}
              >
                <span
                  className={`w-3 h-3 rounded-full border-2 transition-colors shrink-0
                    ${done ? "bg-emerald-400 border-emerald-400"
                      : active ? "bg-cyan-400 border-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                      : unlocked ? "bg-slate-700 border-slate-500"
                      : "bg-slate-900 border-slate-700"}`}
                />
                <span className={done ? "text-emerald-400/80" : active ? "text-cyan-300" : unlocked ? "text-slate-400 group-hover:text-slate-200" : "text-slate-700"}>
                  {r.codename}
                </span>
              </button>
              {i < ROOMS.length - 1 && (
                <span className={`ml-[5px] w-0.5 h-4 ${done ? "bg-emerald-400/50" : "bg-slate-800"}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
