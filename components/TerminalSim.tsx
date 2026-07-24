"use client";
import { useEffect, useRef, useState } from "react";

export type TerminalConfig = {
  user: string;
  host: string;
  banner: string[];
  files: Record<string, string>;
  /** exact-match commands (e.g. "ps aux", "crontab -l") -> output lines */
  commands?: Record<string, string[]>;
  helpExtra?: string;
};

const DEFAULT_CONFIG: TerminalConfig = {
  user: "ceo",
  host: "blackvault",
  banner: ["BLACK VAULT BANK — EXECUTIVE SHELL v3.1", "Session hijacked. Type 'help' for commands."],
  files: {
    "notes.txt": "Meeting with AEGIS team.\n\nAccess code:\nBLACKBOX2026",
    "todo.txt": "1. Approve purge schedule\n2. Delete Chicago archive\n3. Golf, 3pm",
  },
};

export default function TerminalSim({ config = DEFAULT_CONFIG }: { config?: TerminalConfig }) {
  const [lines, setLines] = useState<string[]>([...config.banner, ""]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const prompt = `${config.user}@${config.host}:~$`;

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    const out = [`${prompt} ${cmd}`];
    const exact = config.commands?.[cmd];
    if (exact) {
      setLines((l) => [...l, ...out, ...exact, ""]);
      setInput("");
      return;
    }
    const parts = cmd.split(/\s+/);
    const base = (parts[0] || "").toLowerCase();
    switch (base) {
      case "":
        break;
      case "help":
        out.push(
          `Available: ls, cat <file>, grep <pattern> <file>, pwd, whoami, clear, help${
            config.helpExtra ? ", " + config.helpExtra : ""
          }`
        );
        break;
      case "ls":
        out.push(Object.keys(config.files).filter((f) => !f.startsWith("/")).join("    ") || "(empty)");
        break;
      case "pwd":
        out.push(`/home/${config.user}`);
        break;
      case "whoami":
        out.push(config.user);
        break;
      case "cat": {
        const arg = parts[1];
        if (!arg) out.push("cat: missing filename");
        else if (config.files[arg] !== undefined) out.push(...config.files[arg].split("\n"));
        else out.push(`cat: ${arg}: No such file`);
        break;
      }
      case "grep": {
        const pattern = parts[1];
        const file = parts[2];
        if (!pattern || !file) out.push("usage: grep <pattern> <file>");
        else if (config.files[file] === undefined) out.push(`grep: ${file}: No such file`);
        else {
          const hits = config.files[file]
            .split("\n")
            .filter((ln) => ln.toLowerCase().includes(pattern.toLowerCase()));
          out.push(...(hits.length ? hits : [`(no matches for '${pattern}')`]));
        }
        break;
      }
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
        <span className="ml-2 text-xs text-slate-500">ssh {config.user}@{config.host} — simulated</span>
      </div>
      <div className="p-3 h-56 overflow-y-auto text-emerald-300/90">
        {lines.map((l, i) => (
          <div key={i} className="whitespace-pre-wrap break-words min-h-[1.25rem]">{l}</div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="flex items-center gap-2 border-t border-slate-800 px-3 py-2">
        <span className="text-cyan-400 shrink-0">{prompt}</span>
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
