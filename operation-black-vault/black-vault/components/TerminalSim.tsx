"use client";
import { useEffect, useRef, useState } from "react";

const FILES: Record<string, string> = {
  "notes.txt": "Meeting with AEGIS team.\n\nAccess code:\nBLACKBOX2026",
  "todo.txt": "1. Approve purge schedule\n2. Delete Chicago archive\n3. Golf, 3pm",
};

export default function TerminalSim() {
  const [lines, setLines] = useState<string[]>([
    "BLACK VAULT BANK — EXECUTIVE SHELL v3.1",
    "Session hijacked. Type 'help' for commands.",
    "",
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    const out = [`ceo@blackvault:~$ ${cmd}`];
    const [base, arg] = cmd.split(/\s+/);
    switch ((base || "").toLowerCase()) {
      case "":
        break;
      case "help":
        out.push("Available: ls, cat <file>, pwd, whoami, clear, help");
        break;
      case "ls":
        out.push(Object.keys(FILES).join("    "));
        break;
      case "pwd":
        out.push("/home/ceo");
        break;
      case "whoami":
        out.push("ceo");
        break;
      case "cat":
        if (!arg) out.push("cat: missing filename");
        else if (FILES[arg]) out.push(...FILES[arg].split("\n"));
        else out.push(`cat: ${arg}: No such file`);
        break;
      case "clear":
        setLines([]);
        setInput("");
        return;
      default:
        out.push(`${base}: command not found (this shell is restricted)`);
    }
    setLines((l) => [...l, ...out, ""]);
    setInput("");
  };

  return (
    <div className="border border-slate-800 rounded-lg bg-black/80 font-mono text-sm">
      <div className="px-3 py-1.5 border-b border-slate-800 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
        <span className="ml-2 text-xs text-slate-500">ssh ceo@10.10.20.15 — simulated</span>
      </div>
      <div className="p-3 h-56 overflow-y-auto text-emerald-300/90">
        {lines.map((l, i) => (
          <div key={i} className="whitespace-pre-wrap break-words min-h-[1.25rem]">{l}</div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="flex items-center gap-2 border-t border-slate-800 px-3 py-2">
        <span className="text-cyan-400 shrink-0">ceo@blackvault:~$</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && run(input)}
          className="flex-1 bg-transparent outline-none text-slate-100 placeholder-slate-600"
          placeholder="type a command…"
          aria-label="Terminal command input"
          spellCheck={false}
          autoComplete="off"
        />
        <button
          onClick={() => run(input)}
          className="text-xs text-slate-400 hover:text-cyan-300 border border-slate-700 rounded px-2 py-1"
        >
          run
        </button>
      </div>
    </div>
  );
}
