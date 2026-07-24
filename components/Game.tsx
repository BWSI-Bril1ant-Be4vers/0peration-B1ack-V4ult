"use client";
import { useEffect, useRef, useState } from "react";
import { Archive, Clock, Network, Shield } from "lucide-react";
import type { GameState, Room } from "@/types/game";
import {
  FRESH_STATE, STORAGE_KEY, TOTAL_TIME, alertColor, alertLabel, fmtTime,
} from "@/lib/game";
import { ROOMS, TOTAL_ROOMS } from "@/data/rooms";
import RoomView from "@/components/RoomView";
import RoomList from "@/components/RoomList";
import NetworkMap from "@/components/NetworkMap";
import EvidenceArchive from "@/components/EvidenceArchive";
import { Briefing, EndScreen, Landing } from "@/components/screens";
import AdminAccess from "@/components/AdminAccess";

type Screen = "landing" | "briefing" | "game" | "end";

export default function Game() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [state, setState] = useState<GameState>(FRESH_STATE);
  const [activeRoom, setActiveRoom] = useState(1);
  const [now, setNow] = useState(() => Date.now());
  const [showArchive, setShowArchive] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [hasSave, setHasSave] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout>>();

  /* ---- load save (localStorage) ---- */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: GameState = JSON.parse(raw);
        if (parsed?.gameStatus === "active") {
          setHasSave(true);
          setState(parsed);
          setActiveRoom(parsed.currentRoom);
        }
      }
    } catch {
      /* no save / storage unavailable */
    }
    setLoaded(true);
  }, []);

  /* ---- persist (debounced) ---- */
  useEffect(() => {
    if (!loaded) return;
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {
        /* storage unavailable — game continues in memory */
      }
    }, 400);
    return () => clearTimeout(saveTimer.current);
  }, [state, loaded]);

  /* ---- clock ---- */
  useEffect(() => {
    if (state.gameStatus !== "active") return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [state.gameStatus]);

  const elapsed = state.startTime
    ? Math.floor(((state.endTime ?? now) - state.startTime) / 1000)
    : 0;
  const remaining = TOTAL_TIME - elapsed;

  /* ---- failure conditions ---- */
  useEffect(() => {
    if (state.gameStatus !== "active") return;
    if (remaining <= 0 || state.aegisAlert >= 100) {
      setState((s) => ({ ...s, gameStatus: "lost", endTime: Date.now() }));
      setScreen("end");
    }
  }, [remaining, state.aegisAlert, state.gameStatus]);

  /* ---- actions ---- */
  const newGame = () => {
    setState(FRESH_STATE);
    setActiveRoom(1);
    setScreen("briefing");
  };

  const beginInfiltration = () => {
    setState({ ...FRESH_STATE, startTime: Date.now(), gameStatus: "active" });
    setActiveRoom(1);
    setNow(Date.now());
    setScreen("game");
  };

  const continueGame = () => {
    setNow(Date.now());
    setScreen("game");
  };

  const onCorrect = (room: Room) => {
    setState((s) => {
      if (s.completedRooms.includes(room.id)) return s;
      const won = room.id === TOTAL_ROOMS;
      return {
        ...s,
        completedRooms: [...s.completedRooms, room.id],
        collectedEvidence: [...s.collectedEvidence, room.evidence.name],
        currentRoom: Math.max(s.currentRoom, Math.min(TOTAL_ROOMS, room.id + 1)),
        gameStatus: won ? "won" : s.gameStatus,
        endTime: won ? Date.now() : s.endTime,
      };
    });
    if (room.id === TOTAL_ROOMS) {
      setTimeout(() => setScreen("end"), 900);
    } else {
      setTimeout(() => setActiveRoom(room.id + 1), 900);
    }
  };

  const onWrong = () =>
    setState((s) => ({ ...s, aegisAlert: Math.min(100, s.aegisAlert + 5) }));

  const onHint = (roomId: number) =>
    setState((s) =>
      s.revealedHints.includes(roomId)
        ? s
        : {
            ...s,
            revealedHints: [...s.revealedHints, roomId],
            hintsUsed: [...s.hintsUsed, roomId],
            aegisAlert: Math.min(100, s.aegisAlert + 5),
          }
    );

  const selectRoom = (id: number) => {
    if (id <= state.currentRoom) {
      setActiveRoom(id);
      setShowMobileNav(false);
    }
  };

  const restart = () => {
    setState(FRESH_STATE);
    setActiveRoom(1);
    setScreen("landing");
    setHasSave(false);
  };

  const devUnlock = () => {
    setState({
      ...FRESH_STATE,
      startTime: Date.now(),
      gameStatus: "active",
      currentRoom: TOTAL_ROOMS, // all rooms selectable
    });
    setActiveRoom(1);
    setNow(Date.now());
    setScreen("game");
  };

  const room = ROOMS.find((r) => r.id === activeRoom)!;
  const timerDanger = remaining <= 300;

  if (screen === "landing")
    return (
      <>
        <Landing onStart={newGame} hasSave={hasSave && state.gameStatus === "active"} onContinue={continueGame} />
        <AdminAccess onUnlock={devUnlock} />
      </>
    );
  if (screen === "briefing") return <Briefing onBegin={beginInfiltration} />;
  if (screen === "end")
    return (
      <>
        <EndScreen
          won={state.gameStatus === "won"}
          state={state}
          elapsed={elapsed}
          onRestart={restart}
          onReview={() => setShowArchive(true)}
        />
        {showArchive && <EvidenceArchive state={state} onClose={() => setShowArchive(false)} />}
      </>
    );

  return (
    <div className="min-h-screen flex flex-col">
      {/* TOP BAR */}
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-40">
        <div className="flex items-center gap-3 px-4 py-2.5">
          <button
            onClick={() => setShowMobileNav((s) => !s)}
            className="lg:hidden text-slate-400 hover:text-slate-100 border border-slate-800 rounded p-1.5"
            aria-label="Toggle network navigation"
          >
            <Network size={16} />
          </button>
          <div className="font-mono text-sm tracking-widest text-slate-100 hidden sm:block">
            OPERATION <span className="text-cyan-400">BLACK VAULT</span>
          </div>
          <div className="ml-auto flex items-center gap-3 sm:gap-5">
            <div className="flex items-center gap-2 font-mono text-xs">
              <Shield size={14} className={alertColor(state.aegisAlert)} />
              <span className="hidden sm:inline text-slate-500">AEGIS</span>
              <span className={alertColor(state.aegisAlert)}>
                {state.aegisAlert}% {alertLabel(state.aegisAlert)}
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs">
              <Archive size={14} className="text-cyan-400" />
              <button onClick={() => setShowArchive(true)} className="hover:text-cyan-300 text-slate-300">
                {state.collectedEvidence.length}/{TOTAL_ROOMS}
              </button>
            </div>
            <div
              className={`flex items-center gap-2 font-mono text-sm font-bold rounded-md border px-3 py-1 ${
                timerDanger
                  ? "text-red-400 border-red-500/50 bg-red-500/10 animate-pulse motion-reduce:animate-none"
                  : "text-cyan-300 border-slate-700 bg-slate-900"
              }`}
              aria-live="polite"
            >
              <Clock size={14} /> {fmtTime(remaining)}
            </div>
          </div>
        </div>
        {/* alert meter */}
        <div className="h-0.5 bg-slate-900">
          <div
            className={`h-full transition-all duration-500 ${state.aegisAlert >= 75 ? "bg-red-500" : state.aegisAlert >= 50 ? "bg-orange-400" : state.aegisAlert >= 25 ? "bg-amber-400" : "bg-emerald-400"}`}
            style={{ width: `${state.aegisAlert}%` }}
          />
        </div>
      </header>

      <div className="flex-1 flex">
        {/* SIDEBAR */}
        <aside
          className={`${showMobileNav ? "block" : "hidden"} lg:block w-full lg:w-56 shrink-0 border-r border-slate-800 bg-slate-950/60 p-3 lg:min-h-full absolute lg:static z-30 lg:z-auto`}
        >
          <RoomList state={state} activeRoom={activeRoom} onSelect={selectRoom} />
        </aside>

        {/* MAIN */}
        <main className={`flex-1 p-4 sm:p-6 max-w-3xl mx-auto w-full ${showMobileNav ? "hidden lg:block" : ""}`}>
          <RoomView room={room} state={state} onCorrect={onCorrect} onWrong={onWrong} onHint={onHint} />
        </main>

        {/* RIGHT PANEL */}
        <aside className="hidden xl:block w-60 shrink-0 border-l border-slate-800 bg-slate-950/60 p-4 space-y-6">
          <div>
            <div className="text-xs font-mono tracking-widest text-slate-500 uppercase pb-2">Mission status</div>
            <div className="space-y-2 text-xs font-mono text-slate-300">
              <div className="flex justify-between"><span className="text-slate-500">Rooms</span><span>{state.completedRooms.length}/{TOTAL_ROOMS}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Evidence</span><span>{state.collectedEvidence.length}/{TOTAL_ROOMS}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Hints</span><span>{state.hintsUsed.length}</span></div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1">
                <div className="h-full bg-cyan-400 transition-all duration-500" style={{ width: `${(state.completedRooms.length / TOTAL_ROOMS) * 100}%` }} />
              </div>
            </div>
          </div>
          <NetworkMap state={state} activeRoom={activeRoom} onSelect={selectRoom} />
          <button
            onClick={() => setShowArchive(true)}
            className="w-full flex items-center justify-center gap-2 text-xs font-mono border border-slate-700 rounded-md py-2 text-slate-300 hover:bg-slate-800/60"
          >
            <Archive size={13} /> Open evidence archive
          </button>
        </aside>
      </div>

      {showArchive && <EvidenceArchive state={state} onClose={() => setShowArchive(false)} />}
      <AdminAccess onUnlock={devUnlock} />
    </div>
  );
}
