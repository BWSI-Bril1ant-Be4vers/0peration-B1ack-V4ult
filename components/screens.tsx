"use client";
import { useState } from "react";
import { AlertTriangle, Play, Radio, RotateCcw, Shield } from "lucide-react";
import type { GameState } from "@/types/game";
import { TOTAL_TIME, computeScore, fmtTime, rankFor } from "@/lib/game";
import { TOTAL_ROOMS } from "@/data/rooms";
import { Mono, Panel } from "@/components/ui";

export function Landing({ onStart, hasSave, onContinue }: { onStart: () => void; hasSave: boolean; onContinue: () => void }) {
  const [showHow, setShowHow] = useState(false);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(8,145,178,0.12), transparent), radial-gradient(ellipse 50% 40% at 80% 100%, rgba(220,38,38,0.06), transparent)",
        }}
      />
      <div className="relative max-w-2xl w-full text-center space-y-6">
        <div className="inline-flex items-center gap-2 border border-slate-800 rounded-full px-4 py-1.5 font-mono text-xs text-slate-400 tracking-widest">
          <Radio size={13} className="text-red-400" /> LIVE OPERATION · CLASSIFIED
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-slate-50">
          OPERATION<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500">BLACK VAULT</span>
        </h1>
        <p className="font-mono text-sm tracking-[0.3em] text-slate-400 uppercase">Infiltrate · Investigate · Exfiltrate</p>
        <p className="text-slate-300 leading-relaxed max-w-xl mx-auto">
          Black Vault Bank has been hiding something. An internal breach has uncovered evidence of financial
          crimes, corporate corruption, and illegal surveillance. Now the bank&apos;s autonomous security system,
          AEGIS, is preparing to erase everything.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={onStart}
            className="flex items-center gap-2 px-7 py-3 rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold tracking-wide transition-colors"
          >
            <Play size={16} /> {hasSave ? "New operation" : "Start operation"}
          </button>
          {hasSave && (
            <button
              onClick={onContinue}
              className="px-7 py-3 rounded-md border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 font-semibold tracking-wide transition-colors"
            >
              Continue operation
            </button>
          )}
          <button
            onClick={() => setShowHow((s) => !s)}
            className="px-7 py-3 rounded-md border border-slate-700 text-slate-300 hover:bg-slate-800/60 font-semibold tracking-wide transition-colors"
          >
            How it works
          </button>
        </div>

        {showHow && (
          <div className="text-left border border-slate-800 rounded-lg bg-slate-900/70 p-5 text-sm text-slate-300 space-y-2">
            <p>Move through 20 security rooms. Each one holds a self-contained cybersecurity challenge.</p>
            <p>Read the clues, work out the answer, submit it. A correct answer recovers evidence and unlocks the next room.</p>
            <p>Wrong answers and hints raise the AEGIS alert level. The clock never stops: reach the Vault Prime before the 45-minute purge completes.</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-3 max-w-md mx-auto pt-2">
          {[["20", "ROOMS"], ["45", "MINUTES"], ["1", "MISSION"]].map(([n, l]) => (
            <div key={l} className="border border-slate-800 rounded-lg py-4 bg-slate-900/50">
              <div className="text-2xl font-bold text-cyan-300 font-mono">{n}</div>
              <div className="text-xs font-mono tracking-widest text-slate-500">{l}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-2 pt-1">
          {["Cryptography", "Reverse Engineering", "OSINT", "GEOINT", "Binary Exploitation", "Miscellaneous"].map((c) => (
            <span key={c} className="font-mono text-xs text-slate-400 border border-slate-800 rounded-full px-3 py-1 bg-slate-900/40">
              {c}
            </span>
          ))}
        </div>

        <p className="text-xs text-slate-600 pt-2">
          All cybersecurity challenges are simulated and contained within the game environment.
        </p>
      </div>
    </div>
  );
}

export function Briefing({ onBegin }: { onBegin: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="max-w-xl w-full space-y-6">
        <Panel label="mission briefing — top secret">
          <Mono className="text-slate-200">{`OPERATION BLACK VAULT
CLASSIFICATION: TOP SECRET

TARGET:     BLACK VAULT BANK
THREAT:     AEGIS AUTONOMOUS SECURITY SYSTEM
OBJECTIVE:  Recover evidence of Black Vault Bank's
            illegal operations before AEGIS
            completes the purge.

TIME REMAINING: 45:00`}</Mono>
        </Panel>
        <div className="text-sm text-slate-300 leading-relaxed space-y-2">
          <p>You have gained temporary access to the bank&apos;s internal investigation portal.</p>
          <p>Each security room contains a challenge protecting another layer of the network. Solve it to advance. Recover evidence. Reach the Black Vault.</p>
        </div>
        <button
          onClick={onBegin}
          className="w-full flex items-center justify-center gap-2 px-7 py-3 rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold tracking-widest transition-colors"
        >
          <Shield size={16} /> BEGIN INFILTRATION
        </button>
      </div>
    </div>
  );
}

type EndProps = {
  won: boolean;
  state: GameState;
  elapsed: number;
  onRestart: () => void;
  onReview: () => void;
};

export function EndScreen({ won, state, elapsed, onRestart, onReview }: EndProps) {
  const score = computeScore(state, elapsed);
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="max-w-xl w-full space-y-6 text-center">
        <div className={`text-3xl sm:text-4xl font-bold tracking-tight ${won ? "text-emerald-400" : "text-red-400"}`}>
          {won ? "OPERATION COMPLETE" : "OPERATION FAILED"}
        </div>
        <Mono className={`text-left border rounded-lg p-5 ${won ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-200" : "border-red-500/30 bg-red-500/5 text-red-200"}`}>
          {won
            ? `EVIDENCE SUCCESSFULLY EXFILTRATED

AEGIS STATUS:        OFFLINE
BLACK VAULT STATUS:  COMPROMISED
EVIDENCE RECOVERED:  ${state.collectedEvidence.length} / ${TOTAL_ROOMS}`
            : `AEGIS HAS COMPLETED THE PURGE.
ALL REMAINING EVIDENCE HAS BEEN DESTROYED.

MISSION STATUS:      FAILED
ROOMS COMPLETED:     ${state.completedRooms.length} / ${TOTAL_ROOMS}
EVIDENCE RECOVERED:  ${state.collectedEvidence.length} / ${TOTAL_ROOMS}`}
        </Mono>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            [won ? "Completion time" : "Time survived", fmtTime(Math.min(elapsed, TOTAL_TIME))],
            ["Hints used", String(state.hintsUsed.length)],
            ["AEGIS alert", `${Math.min(100, state.aegisAlert)}%`],
            ["Final score", String(score)],
          ].map(([l, v]) => (
            <div key={l} className="border border-slate-800 rounded-lg py-3 px-2 bg-slate-900/50">
              <div className="text-lg font-bold text-slate-100 font-mono">{v}</div>
              <div className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">{l}</div>
            </div>
          ))}
        </div>
        {won && (
          <div className="inline-block border border-cyan-500/40 rounded-lg px-6 py-3 bg-cyan-500/10">
            <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Operator rank</div>
            <div className="text-xl font-bold text-cyan-300 font-mono">{rankFor(score)}</div>
          </div>
        )}
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <button
            onClick={onRestart}
            className="flex items-center gap-2 px-6 py-3 rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold tracking-wide transition-colors"
          >
            <RotateCcw size={15} /> {won ? "Play again" : "Restart operation"}
          </button>
          {won && (
            <button
              onClick={onReview}
              className="px-6 py-3 rounded-md border border-slate-700 text-slate-300 hover:bg-slate-800/60 font-semibold tracking-wide transition-colors"
            >
              Review evidence
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
