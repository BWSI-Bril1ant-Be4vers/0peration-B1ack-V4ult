"use client";
import { Eye, MapPin } from "lucide-react";
import type { Room } from "@/types/game";
import { Mono, Panel } from "@/components/ui";
import TerminalSim from "@/components/TerminalSim";

export default function ChallengeContent({ room }: { room: Room }) {
  switch (room.id) {
    case 1:
      return (
        <Panel label="recovered file — netconfig.yml">
          <Mono className="text-cyan-200/90">{`# Black Vault Internal Network

gateway:  10.10.0.1
web:      10.10.10.20
finance:  10.10.20.15
vault:    10.10.50.50

admin_username: analyst`}</Mono>
        </Panel>
      );
    case 2:
      return (
        <Panel label="intercepted message — mail relay 02">
          <Mono className="text-slate-300">{`From:    d.crane@bvbank.example
To:      m.holt@bvbank.example
Subject: re: the program

Codename confirmed. Do not write it in plaintext again.

>> QmFua1ZhdWx0`}</Mono>
        </Panel>
      );
    case 3:
      return (
        <Panel label="disassembly — blackbox.exe">
          <Mono className="text-violet-300/90">{`main:
    read   input
    cmp    input, "VAULT_ACCESS"
    jne    .failure
    print  "ACCESS GRANTED"
    jmp    .exit
.failure:
    print  "ACCESS DENIED"`}</Mono>
        </Panel>
      );
    case 4:
      return (
        <Panel label="public profile — connectsphere.example">
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center font-bold text-white">
                AM
              </div>
              <div>
                <div className="font-semibold text-slate-100">Alex Mercer</div>
                <div className="text-slate-400 text-xs">Senior Infrastructure Engineer · BVBank</div>
              </div>
            </div>
            <p className="text-slate-300 italic">
              &quot;I&apos;ve worked at BVBank since 2019. My favorite city is the place where our first branch opened.&quot;
            </p>
            <div className="space-y-2">
              <div className="border border-slate-800 rounded p-3 bg-slate-950/60">
                <div className="text-xs text-slate-500 font-mono">2019</div>
                <div className="text-slate-300">Excited to join BVBank!</div>
              </div>
              <div className="border border-slate-800 rounded p-3 bg-slate-950/60">
                <div className="text-xs text-slate-500 font-mono">2020</div>
                <div className="text-slate-300">First trip to our original branch.</div>
                <div className="text-xs text-cyan-400 mt-1 flex items-center gap-1">
                  <MapPin size={12} /> Chicago
                </div>
              </div>
            </div>
          </div>
        </Panel>
      );
    case 5:
      return (
        <Panel label="recovered file — backup_notes.txt">
          <Mono className="text-slate-300">{`Nothing important here.



system reminder:
backup key = 42 56 4c 54`}</Mono>
        </Panel>
      );
    case 6:
      return (
        <Panel label="photo analysis — visual markers extracted">
          <div className="grid sm:grid-cols-2 gap-2 text-sm">
            {[
              "Red double-decker buses",
              "Traffic driving on the left",
              "Large clock tower visible",
              "Historic government buildings",
            ].map((c) => (
              <div key={c} className="flex items-center gap-2 border border-slate-800 rounded px-3 py-2 bg-slate-950/60 text-slate-300">
                <Eye size={14} className="text-cyan-400 shrink-0" /> {c}
              </div>
            ))}
          </div>
        </Panel>
      );
    case 7:
      return <TerminalSim />;
    case 8:
      return (
        <div className="space-y-3">
          <Panel label="login service — vulnerable build">
            <Mono className="text-slate-300">{`Buffer size: 16 bytes  (no bounds check)

Expected memory layout after overflow:
[ USERNAME ][ 16 bytes padding ][ ACCESS CODE ]`}</Mono>
          </Panel>
          <Panel label="memory map">
            <Mono className="text-amber-300/90">{`ADDR     BYTE
0x4010   42
0x4011   56
0x4012   4C
0x4013   54`}</Mono>
          </Panel>
        </div>
      );
    case 9:
      return (
        <Panel label="aegis — system integrity check">
          <Mono className="text-red-300/90">{`ROOM 01 … COMPLETE      ROOM 05 … COMPLETE
ROOM 02 … COMPLETE      ROOM 06 … COMPLETE
ROOM 03 … COMPLETE      ROOM 07 … COMPLETE
ROOM 04 … COMPLETE      ROOM 08 … COMPLETE

FINAL KEY REQUIRED
> Derive from recovered evidence. Check your archive.`}</Mono>
        </Panel>
      );
    case 10:
      return (
        <Panel label="black vault — purge sequence armed">
          <Mono className="text-red-400">{`AEGIS PURGE SEQUENCE
Evidence archives detected.

10  09  08  07  06  05  04  03  02  01

ENTER FINAL ACCESS KEY`}</Mono>
        </Panel>
      );
    default:
      return null;
  }
}
