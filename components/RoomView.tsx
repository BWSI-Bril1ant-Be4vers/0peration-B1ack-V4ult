"use client";
import { useEffect, useState } from "react";
import { AlertTriangle, Check, Lightbulb } from "lucide-react";
import type { GameState, Room } from "@/types/game";
import { normalize } from "@/lib/game";
import ChallengeContent from "@/components/ChallengeContent";

type Props = {
  room: Room;
  state: GameState;
  onCorrect: (room: Room) => void;
  onWrong: () => void;
  onHint: (roomId: number) => void;
};

export default function RoomView({ room, state, onCorrect, onWrong, onHint }: Props) {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const completed = state.completedRooms.includes(room.id);
  const hintRevealed = state.revealedHints.includes(room.id);

  useEffect(() => {
    setAnswer("");
    setFeedback(null);
  }, [room.id]);

  const submit = () => {
    if (completed || !answer.trim()) return;
    const ok = room.answers.some((a) => normalize(a) === normalize(answer));
    if (ok) {
      setFeedback("correct");
      onCorrect(room);
    } else {
      setFeedback("wrong");
      onWrong();
    }
  };

  const Icon = room.icon;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="w-10 h-10 rounded-lg border border-cyan-500/30 bg-cyan-500/10 flex items-center justify-center">
          <Icon size={18} className="text-cyan-300" />
        </div>
        <div>
          <div className="font-mono text-xs text-slate-500 tracking-widest">
            ROOM {String(room.id).padStart(2, "0")} · {room.category.toUpperCase()} · {room.difficulty.toUpperCase()}
          </div>
          <h2 className="text-xl font-semibold text-slate-100">{room.title}</h2>
        </div>
        {completed && (
          <span className="ml-auto flex items-center gap-1.5 text-emerald-400 text-xs font-mono border border-emerald-500/30 bg-emerald-500/10 rounded-full px-3 py-1">
            <Check size={13} /> BYPASSED
          </span>
        )}
      </div>

      <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">{room.story}</p>

      <ChallengeContent room={room} />

      <div className="border border-slate-800 rounded-lg bg-slate-900/60 p-4 space-y-3">
        <div className="text-xs font-mono tracking-widest text-slate-400 uppercase">Objective</div>
        <p className="text-slate-200 text-sm">{room.question}</p>

        {!completed ? (
          <>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                value={answer}
                onChange={(e) => { setAnswer(e.target.value); setFeedback(null); }}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                placeholder="Enter answer…"
                aria-label="Challenge answer"
                spellCheck={false}
                autoComplete="off"
                className="flex-1 bg-slate-950 border border-slate-700 focus:border-cyan-500 outline-none rounded-md px-3 py-2 font-mono text-sm text-slate-100 placeholder-slate-600"
              />
              <button
                onClick={submit}
                className="px-5 py-2 rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm tracking-wide transition-colors"
              >
                Submit
              </button>
            </div>

            {feedback === "wrong" && (
              <div className="flex items-center gap-2 text-red-400 text-sm font-mono border border-red-500/30 bg-red-500/10 rounded-md px-3 py-2" role="alert">
                <AlertTriangle size={15} /> ACCESS DENIED — incorrect attempt detected. AEGIS alert +5%.
              </div>
            )}

            <div>
              {!hintRevealed ? (
                <button
                  onClick={() => onHint(room.id)}
                  className="flex items-center gap-2 text-xs text-amber-300/90 hover:text-amber-200 border border-amber-400/30 bg-amber-400/5 rounded-md px-3 py-2"
                >
                  <Lightbulb size={14} /> Reveal hint (AEGIS alert +5%)
                </button>
              ) : (
                <div className="flex items-start gap-2 text-amber-200/90 text-sm border border-amber-400/30 bg-amber-400/10 rounded-md px-3 py-2">
                  <Lightbulb size={15} className="mt-0.5 shrink-0" /> <span>{room.hint}</span>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-start gap-2 text-emerald-300 text-sm font-mono border border-emerald-500/30 bg-emerald-500/10 rounded-md px-3 py-2">
            <Check size={15} className="mt-0.5 shrink-0" />
            <span>
              ACCESS GRANTED — system bypassed. Evidence recovered: {room.evidence.name}.
              {room.id < 10 && " Next room unlocked."}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
