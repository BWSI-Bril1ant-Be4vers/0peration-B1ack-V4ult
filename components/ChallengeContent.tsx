"use client";
import { useState } from "react";
import { Eye, ImageOff, MapPin } from "lucide-react";
import type { Room } from "@/types/game";
import { Mono, Panel } from "@/components/ui";
import TerminalSim, { TerminalConfig } from "@/components/TerminalSim";


const AUTH_TERMINAL: TerminalConfig = {
  user: "root",
  host: "bv-authsrv",
  banner: ["BV AUTH SERVER — FORENSIC SNAPSHOT (read-only)", "Type 'help' for commands."],
  files: {
    "auth.log": `Jul 21 02:11:04 sshd: Failed password for admin from 185.220.14.66
Jul 21 02:11:09 sshd: Failed password for admin from 185.220.14.66
Jul 21 02:11:15 sshd: Failed password for root from 185.220.14.66
Jul 21 02:11:22 sshd: Failed password for finance from 185.220.14.66
Jul 21 02:11:31 sshd: Failed password for svc-backup from 185.220.14.66
Jul 21 02:11:38 sshd: Accepted password for svc-backup from 185.220.14.66
Jul 21 02:12:02 sudo: svc-backup : TTY=pts/0 ; COMMAND=/bin/tar -czf /tmp/ledgers.tgz /finance`,
    "readme.txt": "Forensic snapshot taken Jul 21 03:00. Logs are intact.",
  },
};

const PROC_TERMINAL: TerminalConfig = {
  user: "analyst",
  host: "bv-core",
  banner: ["BV CORE — LIVE SESSION", "Type 'help' for commands."],
  helpExtra: "ps aux",
  files: {
    "hint.txt": "Something is running on this box that shouldn't be.\nList the processes.",
  },
  commands: {
    "ps": ["usage: ps aux"],
    "ps aux": [
      "PID    USER     COMMAND",
      "1      root     /sbin/init",
      "211    root     /usr/sbin/sshd",
      "642    aegis    /opt/aegis/monitor --level 4",
      "913    root     /tmp/.systemd-helper --target 10.10.50.50 --key K3YSTONE",
      "1044   analyst  -bash",
    ],
  },
};

const CRON_TERMINAL: TerminalConfig = {
  user: "aegis",
  host: "bv-sched",
  banner: ["BV SCHEDULER — MAINTENANCE SHELL", "Type 'help' for commands."],
  helpExtra: "crontab -l",
  files: {
    "readme.txt": "Scheduled jobs are managed via cron. Do not edit manually.",
    "/opt/aegis/purge.sh": `#!/bin/sh
# AEGIS scheduled evidence purge
# manual abort requires code:
ABORT_CODE="COLDSTOP-77"
wipe --all --confirm $ABORT_CODE`,
  },
  commands: {
    "crontab": ["usage: crontab -l"],
    "crontab -l": ["0 * * * * /opt/aegis/purge.sh    # evidence purge"],
  },
};

const TAP_TERMINAL: TerminalConfig = {
  user: "netops",
  host: "bv-tap",
  banner: ["BV NETWORK TAP — FINANCE VLAN", "Type 'help' for commands."],
  files: {
    "capture.txt": `# tap capture — finance VLAN — session 4471
10.10.20.15:52144 -> 10.10.10.20:21   [FTP]
> USER auditor
< 331 Password required
> PASS r3dline9
< 230 Login successful
> RETR ledgers_q3.csv
< 150 Opening data connection`,
    "readme.txt": "Raw session reassembly in capture.txt.",
  },
};

function SurveillancePhoto() {
  const [missing, setMissing] = useState(false);
  if (missing) {
    return (
      <div className="flex items-center gap-3 text-sm text-slate-400 border border-dashed border-slate-700 rounded-lg p-4">
        <ImageOff size={18} className="text-slate-500 shrink-0" />
        <span>
          Image not found. Add the surveillance photo at <code className="text-cyan-300">public/room14.jpg</code> and redeploy.
        </span>
      </div>
    );
  }
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src="/room14.jpg"
      alt="Surveillance capture — location unknown. Reverse image search to geolocate."
      className="rounded-lg border border-slate-800 w-full"
      onError={() => setMissing(true)}
    />
  );
}

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
    case 11:
      return <TerminalSim config={AUTH_TERMINAL} />;
    case 12:
      return (
        <Panel label="reconstructed ledger page — print spooler">
          <Mono className="text-violet-300/90">{`SHADOW [??????] — Q3 RECONCILIATION

ciphertext:  LIJOWR
cipher:      polyalphabetic (not a simple shift)
key:         the name of the system hunting you`}</Mono>
        </Panel>
      );
    case 13:
      return <TerminalSim config={PROC_TERMINAL} />;
    case 14:
      return (
        <div className="space-y-3">
          <Panel label="surveillance capture — source image">
            <SurveillancePhoto />
          </Panel>
          <Panel label="analyst observations">
            <div className="space-y-3 text-sm">
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  "Drive-thru fast food restaurant, timber frontage",
                  "Large supermarket across the car park",
                  "Licensed taxi parked in marked bay",
                  "Red compact hatchback — courier vehicle",
                ].map((c) => (
                  <div key={c} className="flex items-center gap-2 border border-slate-800 rounded px-3 py-2 bg-slate-950/60 text-slate-300">
                    <Eye size={14} className="text-cyan-400 shrink-0" /> {c}
                  </div>
                ))}
              </div>
              <p className="text-xs text-amber-300/80 font-mono">
                NOTE: This objective requires real-world research (reverse image search + maps). It is the only room that sends you outside the game.
              </p>
            </div>
          </Panel>
        </div>
      );
    case 15:
      return (
        <Panel label="relay intercept — firmware key recovered">
          <Mono className="text-amber-300/90">{`ciphertext bytes:   43 46 41 54 56
xor key (1 byte):   0x13

decrypt: plaintext[i] = byte[i] XOR 0x13`}</Mono>
        </Panel>
      );
    case 16:
      return <TerminalSim config={CRON_TERMINAL} />;
    case 17:
      return (
        <Panel label="recovered key material — sticky note, vault office">
          <Mono className="text-cyan-200/90">{`RSA PUBLIC KEY (do not share!!)

n = 3233
e = 17

"nobody can factor this" — J.`}</Mono>
        </Panel>
      );
    case 18:
      return <TerminalSim config={TAP_TERMINAL} />;
    case 19:
      return (
        <Panel label="final transmission — triple wrapped">
          <Mono className="text-violet-300/90">{`NGM0NTRlNDk1NDRlNDU1Mw==

layer 1: ????
layer 2: ????
layer 3: ????`}</Mono>
        </Panel>
      );
    case 20:
      return (
        <Panel label="aegis prime — composite lock">
          <Mono className="text-red-400">{`AEGIS PRIME — FINAL VERIFICATION

The lock validates a composite key:

  [ PART 1 ]  Room 09 — the override word
  [ PART 2 ]  Rooms 11–19 — evidence acrostic
  [ PART 3 ]  Room 05 — the backup key

FORMAT: PART1-PART2-PART3

ENTER COMPOSITE KEY`}</Mono>
        </Panel>
      );
    default:
      return null;
  }
}
