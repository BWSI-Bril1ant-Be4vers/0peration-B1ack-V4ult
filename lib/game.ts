import type { GameState } from "@/types/game";

export const TOTAL_TIME = 45 * 60; // seconds
export const STORAGE_KEY = "blackvault-save-v2";

export const normalize = (s: string) =>
  (s || "").toString().trim().toLowerCase().replace(/\s+/g, " ");

export const RANKS = [
  { min: 0, name: "ROOKIE" },
  { min: 4000, name: "ANALYST" },
  { min: 8000, name: "CYBER OPERATIVE" },
  { min: 12000, name: "ELITE OPERATOR" },
  { min: 15000, name: "BLACK VAULT LEGEND" },
];

export const alertLabel = (a: number) =>
  a >= 100 ? "PURGE" : a >= 75 ? "CRITICAL" : a >= 50 ? "HIGH ALERT" : a >= 25 ? "ELEVATED" : "NORMAL";

export const alertColor = (a: number) =>
  a >= 75 ? "text-red-400" : a >= 50 ? "text-orange-400" : a >= 25 ? "text-amber-300" : "text-emerald-400";

export const fmtTime = (s: number) => {
  const m = Math.floor(Math.max(0, s) / 60);
  const sec = Math.max(0, s) % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
};

export const computeScore = (state: GameState, elapsed: number) => {
  const roomPts = state.completedRooms.length * 500;
  const hintPenalty = state.hintsUsed.length * 150;
  const alertPenalty = Math.floor(state.aegisAlert * 8);
  const timeBonus = state.gameStatus === "won" ? Math.max(0, TOTAL_TIME - elapsed) * 3 : 0;
  return Math.max(0, roomPts - hintPenalty - alertPenalty + Math.floor(timeBonus));
};

export const rankFor = (score: number) => {
  let r = RANKS[0].name;
  for (const rk of RANKS) if (score >= rk.min) r = rk.name;
  return r;
};

export const FRESH_STATE: GameState = {
  currentRoom: 1,
  completedRooms: [],
  collectedEvidence: [],
  hintsUsed: [],
  revealedHints: [],
  startTime: null,
  endTime: null,
  aegisAlert: 10,
  gameStatus: "not_started",
};
