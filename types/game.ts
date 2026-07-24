import type { LucideIcon } from "lucide-react";

export type Evidence = { name: string; desc: string };

export type Room = {
  id: number;
  codename: string;
  title: string;
  category: string;
  icon: LucideIcon;
  difficulty: "Easy" | "Medium" | "Hard";
  story: string;
  question: string;
  hint: string;
  answers: string[];
  evidence: Evidence;
};

export type GameStatus = "not_started" | "active" | "won" | "lost";

export type GameState = {
  currentRoom: number;
  completedRooms: number[];
  collectedEvidence: string[];
  hintsUsed: number[];
  revealedHints: number[];
  startTime: number | null;
  endTime: number | null;
  aegisAlert: number;
  gameStatus: GameStatus;
};
