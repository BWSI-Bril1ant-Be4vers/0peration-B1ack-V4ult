"use client";
import { useState } from "react";
import { KeyRound, X } from "lucide-react";

/* Dev/test backdoor: unlocks all rooms for playtesting.
   NOTE: credentials live in the client bundle — this is a testing
   convenience, not a security control. Remove before judging if you
   don't want players finding it. */
const ADMIN_USER = "h4ckm3";
const ADMIN_PASS = "n0tt0d7t";

export default function AdminAccess({ onUnlock }: { onUnlock: () => void }) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);

  const submit = () => {
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      setOpen(false);
      setUser("");
      setPass("");
      setError(false);
      onUnlock();
    } else {
      setError(true);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Admin access"
        className="fixed bottom-3 right-3 z-40 flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-slate-600 hover:text-cyan-400 border border-slate-800 hover:border-cyan-500/40 rounded-md px-2.5 py-1.5 bg-slate-950/80 backdrop-blur transition-colors"
      >
        <KeyRound size={11} /> ADMIN
      </button>
      {open && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Admin access">
          <div className="w-full max-w-xs border border-slate-700 rounded-xl bg-slate-900 shadow-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="font-mono text-xs tracking-widest text-slate-300">ADMIN ACCESS</div>
              <button onClick={() => { setOpen(false); setError(false); }} aria-label="Close" className="text-slate-500 hover:text-slate-200">
                <X size={16} />
              </button>
            </div>
            <input
              value={user}
              onChange={(e) => { setUser(e.target.value); setError(false); }}
              placeholder="username"
              aria-label="Admin username"
              spellCheck={false}
              autoComplete="off"
              className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-500 outline-none rounded-md px-3 py-2 font-mono text-sm text-slate-100 placeholder-slate-600"
            />
            <input
              value={pass}
              onChange={(e) => { setPass(e.target.value); setError(false); }}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder="password"
              type="password"
              aria-label="Admin password"
              autoComplete="off"
              className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-500 outline-none rounded-md px-3 py-2 font-mono text-sm text-slate-100 placeholder-slate-600"
            />
            {error && <div className="text-xs font-mono text-red-400">ACCESS DENIED</div>}
            <button
              onClick={submit}
              className="w-full px-4 py-2 rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm tracking-wide transition-colors"
            >
              Unlock all rooms
            </button>
          </div>
        </div>
      )}
    </>
  );
}
