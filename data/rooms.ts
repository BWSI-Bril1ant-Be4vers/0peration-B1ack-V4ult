import {
  Network, Mail, Box, Fingerprint, FileText, MapPin, Terminal, Binary, Cpu, KeyRound,
} from "lucide-react";
import type { Room } from "@/types/game";

export const ROOMS: Room[] = [
  {
    id: 1,
    codename: "GATEWAY",
    title: "The Gateway",
    category: "Recon",
    icon: Network,
    difficulty: "Easy",
    story:
      "You've breached Black Vault Bank's external gateway. A developer left a configuration note on the public server — sloppy. It maps the internal network and leaks something more valuable.",
    question: "What is the administrator's username?",
    hint: "Read the last line of the configuration file carefully.",
    answers: ["analyst"],
    evidence: {
      name: "Operational Network Map",
      desc: "A full map of Black Vault Bank's internal network, recovered from an exposed gateway config. Marks the location of the vault subnet at 10.10.50.50.",
    },
  },
  {
    id: 2,
    codename: "ENCRYPTED MAIL",
    title: "Encrypted Mail",
    category: "Cryptography",
    icon: Mail,
    difficulty: "Easy",
    story:
      "Inside the mail relay you intercept a message between two executives. The body is scrambled — but the encoding is one you've seen a thousand times.",
    question: "Decode the message. What does it say?",
    hint: "The trailing pattern and character set look like Base64. Decode QmFua1ZhdWx0.",
    answers: ["bankvault"],
    evidence: {
      name: "Vault Executive Email",
      desc: "Decoded internal email referencing 'BankVault' — the codename for the evidence destruction program. Keep the decoded word. You may need it later.",
    },
  },
  {
    id: 3,
    codename: "THE BLACK BOX",
    title: "The Black Box",
    category: "Reverse Engineering",
    icon: Box,
    difficulty: "Easy",
    story:
      "A binary named blackbox.exe guards the next segment. You can't run it — but you pulled its disassembly. Somewhere in there is the string it compares against.",
    question: "What input string does the binary accept?",
    hint: "Look at the cmp instruction. What is the input compared to?",
    answers: ["vault_access"],
    evidence: {
      name: "Encrypted Access Key",
      desc: "The hardcoded access string extracted from blackbox.exe. Whoever compiled this never expected anyone to read the disassembly.",
    },
  },
  {
    id: 4,
    codename: "DIGITAL FOOTPRINT",
    title: "Digital Footprint",
    category: "OSINT",
    icon: Fingerprint,
    difficulty: "Easy",
    story:
      "A senior infrastructure engineer at the bank overshares online. His public profile leaks a detail about the bank's origins — the city where its first branch opened.",
    question: "What city is associated with the bank's first branch?",
    hint: "Check the location tag on the 2020 post about the 'original branch'.",
    answers: ["chicago"],
    evidence: {
      name: "Reconnaissance Profile",
      desc: "Intelligence assembled from Alex Mercer's public posts. Confirms the bank's original branch — and its oldest records — are in Chicago.",
    },
  },
  {
    id: 5,
    codename: "DEAD DROP",
    title: "Dead Drop",
    category: "Forensics",
    icon: FileText,
    difficulty: "Easy",
    story:
      "A discarded text file sits in a shared drive: backup_notes.txt. It claims there's nothing important inside. The 'system reminder' at the bottom says otherwise.",
    question: "Decode the backup key. What does it spell?",
    hint: "Those pairs are hexadecimal bytes. Convert each one to an ASCII character.",
    answers: ["bvlt"],
    evidence: {
      name: "Recovered Backup Key",
      desc: "The backup encryption key 'BVLT', hidden in plain sight as hex bytes. Hold onto this — vault systems reuse it.",
    },
  },
  {
    id: 6,
    codename: "GEOLOCATION",
    title: "Geolocation",
    category: "GEOINT",
    icon: MapPin,
    difficulty: "Easy",
    story:
      "An employee photo leaked from the bank's offshore operations site. The image itself is degraded, but your analysis toolkit extracted a set of visual markers.",
    question: "What city was this photo taken in?",
    hint: "Left-hand traffic, red double-decker buses, a famous clock tower. One city fits all three.",
    answers: ["london"],
    evidence: {
      name: "Intel: Offshore Location",
      desc: "Geolocation analysis places Black Vault's offshore shell operation in London. The laundering trail runs through it.",
    },
  },
  {
    id: 7,
    codename: "EXECUTIVE TERMINAL",
    title: "Executive Terminal",
    category: "Command Line",
    icon: Terminal,
    difficulty: "Easy",
    story:
      "You've hijacked an executive's terminal session. The shell is live. Explore the filesystem and find the access code buried in their notes.",
    question: "Submit the access code from the executive's notes.",
    hint: "Try running: ls — then read any files you find with: cat <filename>",
    answers: ["blackbox2026"],
    evidence: {
      name: "Development Notes: AEGIS",
      desc: "Meeting notes from the AEGIS development team, including the access code BLACKBOX2026. This code opens more than one door.",
    },
  },
  {
    id: 8,
    codename: "BINARY VAULT",
    title: "Binary Vault",
    category: "Binary Exploitation",
    icon: Binary,
    difficulty: "Easy",
    story:
      "The vault's login service has a 16-byte input buffer and no bounds checking. You can overflow past the padding — but you still need the access code sitting in the program's memory.",
    question: "Read the memory map. What is the access code?",
    hint: "The four bytes at 0x4010–0x4013 are hex. Decode them like you did in the dead drop.",
    answers: ["bvlt"],
    evidence: {
      name: "Executive Memory Signature",
      desc: "The vault's memory signature 'BVLT' — identical to the backup key. The same lazy engineering runs all the way down.",
    },
  },
  {
    id: 9,
    codename: "AEGIS CORE",
    title: "AEGIS Core",
    category: "Logic",
    icon: Cpu,
    difficulty: "Medium",
    story:
      "You're inside the AEGIS control system. It runs an integrity check and demands a final override key — one derived from everything you've recovered so far.",
    question:
      "Combine the first letter of each recovered evidence item, in order. What word do they spell?",
    hint: "Evidence 1–8: Operational…, Vault…, Encrypted…, Reconnaissance…, Recovered…, Intel…, Development…, Executive…",
    answers: ["override"],
    evidence: {
      name: "AEGIS Master Override",
      desc: "The master override key for AEGIS. The purge can no longer be accelerated — but the countdown is still running.",
    },
  },
  {
    id: 10,
    codename: "BLACK VAULT",
    title: "The Black Vault",
    category: "Final Meta Puzzle",
    icon: KeyRound,
    difficulty: "Medium",
    story:
      "The central evidence vault. AEGIS has begun its purge sequence. One final key stands between you and the master archive — built from fragments you've already recovered.",
    question:
      "Combine the decoded email (Room 02), the backup key (Room 05), and the executive access code (Room 07), separated by dashes.",
    hint: "Format: WORD-WORD-WORD, all caps or not — it doesn't matter. Room 02 decoded to BankVault…",
    answers: [
      "bankvault-bvlt-blackbox2026",
      "bankvault bvlt blackbox2026",
      "bankvaultbvltblackbox2026",
    ],
    evidence: {
      name: "Black Vault Master Archive",
      desc: "The complete archive: fraud ledgers, laundering routes, surveillance logs, destruction orders. Everything Black Vault Bank tried to erase.",
    },
  },
];
