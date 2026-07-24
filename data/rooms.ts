import {
  Network, Mail, Box, Fingerprint, FileText, MapPin, Terminal, Binary, Cpu, KeyRound, Radio,
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
      "The central evidence vault. AEGIS has begun its purge sequence. One key stands between you and the archive — built from fragments you've already recovered.",
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
      desc: "Fraud ledgers, laundering routes, surveillance logs, destruction orders. But the archive index references a second system: AEGIS PRIME. The operation goes deeper.",
    },
  },
  {
    id: 11,
    codename: "BREACH LOG",
    title: "Breach Log",
    category: "DFIR / Terminal",
    icon: Terminal,
    difficulty: "Medium",
    story:
      "The archive index pointed to a second network segment — AEGIS PRIME. Someone else broke in before you and left tracks. A forensic snapshot of the auth server is mounted read-only. Work out what they did.",
    question: "Which account did the intruder successfully compromise?",
    hint: "cat auth.log — or grep Accepted auth.log to cut through the noise.",
    answers: ["svc-backup", "svc backup"],
    evidence: {
      name: "Breach Access Log",
      desc: "SSH logs proving the svc-backup service account was brute-forced from 185.220.14.66 and used to stage the finance ledgers for exfiltration.",
    },
  },
  {
    id: 12,
    codename: "CIPHER LEDGER",
    title: "Cipher Ledger",
    category: "Cryptography",
    icon: KeyRound,
    difficulty: "Medium",
    story:
      "A shredded ledger page was reconstructed from the print spooler. One word is enciphered — polyalphabetic this time, not a simple shift. The key is hiding in plain sight.",
    question: "Decrypt the ciphertext. What is the plaintext word?",
    hint: "Vigenère cipher. The key is the name of the system hunting you (5 letters).",
    answers: ["ledger"],
    evidence: {
      name: "Ledger Cipher Key",
      desc: "The Vigenère key AEGIS decrypts LIJOWR to LEDGER — confirming the shadow ledger's existence and that AEGIS itself signs the fraud records.",
    },
  },
  {
    id: 13,
    codename: "GHOST PROCESS",
    title: "Ghost Process",
    category: "Forensics / Terminal",
    icon: Cpu,
    difficulty: "Medium",
    story:
      "A core server is running something it shouldn't. The process hides in /tmp with a name meant to look legitimate — and it's shipping data to the vault subnet with a hardcoded key.",
    question: "What exfiltration key is the rogue process using?",
    hint: "List running processes (ps aux) and read the command line arguments carefully.",
    answers: ["k3ystone"],
    evidence: {
      name: "Anomalous Process Dump",
      desc: "A rogue /tmp/.systemd-helper process exfiltrating to 10.10.50.50 using key K3YSTONE. The bank is stealing from itself.",
    },
  },
  {
    id: 14,
    codename: "STREET LEVEL",
    title: "Street Level",
    category: "OSINT / GEOINT",
    icon: MapPin,
    difficulty: "Medium",
    story:
      "A courier for the bank was photographed making a hand-off. Your team geolocated the capture: Crawley Avenue, Crawley, UK. Intelligence says the courier had ID photos taken at the nearest photo booth minutes earlier. This one requires real-world map research — open your OSINT toolkit.",
    question: "What is the name of the nearest ID photo booth / photo service to the capture location?",
    hint: "Check what photo services operate inside the supermarket next to the capture point.",
    answers: ["max spielmann", "max spielman", "maxspielmann"],
    evidence: {
      name: "Courier Surveillance Photo",
      desc: "The courier's ID photos were taken at the Max Spielmann counter near Crawley Avenue. The booth's records tie the courier to a Black Vault shell company.",
    },
  },
  {
    id: 15,
    codename: "XOR RELAY",
    title: "XOR Relay",
    category: "Cryptography",
    icon: Binary,
    difficulty: "Medium",
    story:
      "You tapped an internal relay. Messages are 'encrypted' with a single-byte XOR — the kind of crypto that gets people indicted. The key was recovered from the relay's firmware.",
    question: "XOR each byte with the key and read the plaintext. What does the message say?",
    hint: "For each byte: byte XOR 0x13, then interpret as ASCII. 0x43 XOR 0x13 = 0x50 = 'P'…",
    answers: ["purge"],
    evidence: {
      name: "Keyed Transmission Intercept",
      desc: "The decrypted relay message — PURGE — is the go-signal AEGIS broadcasts to every branch when evidence destruction begins.",
    },
  },
  {
    id: 16,
    codename: "PURGE SCHEDULER",
    title: "Purge Scheduler",
    category: "Terminal",
    icon: Terminal,
    difficulty: "Medium",
    story:
      "AEGIS PRIME doesn't purge on a whim — it purges on a schedule. You've reached the scheduler host. Find the purge job, read the script it runs, and pull the manual abort code.",
    question: "What is the manual abort code for the scheduled purge?",
    hint: "crontab -l shows the schedule. cat the script it points to (full path).",
    answers: ["coldstop-77", "coldstop77", "coldstop 77"],
    evidence: {
      name: "Lockdown Cron Schedule",
      desc: "The hourly purge job and its abort code COLDSTOP-77 — proof the destruction of evidence was automated, scheduled, and signed off.",
    },
  },
  {
    id: 17,
    codename: "WEAK RSA",
    title: "Weak RSA",
    category: "Cryptography",
    icon: KeyRound,
    difficulty: "Hard",
    story:
      "The vault's key-exchange uses RSA — with a modulus small enough to fit on a sticky note. Factor it and the private key falls out. Textbook, in every sense.",
    question: "Factor the modulus n. What is the SMALLER prime factor?",
    hint: "n = 3233. Trial division is enough — check primes under 60.",
    answers: ["53"],
    evidence: {
      name: "Intercepted RSA Factors",
      desc: "n = 3233 = 53 × 61. With p and q recovered, the vault's private key is trivially reconstructed. Their crypto is theater.",
    },
  },
  {
    id: 18,
    codename: "WIRE TAP",
    title: "Wire Tap",
    category: "Network Forensics / Terminal",
    icon: Radio,
    difficulty: "Medium",
    story:
      "A network tap on the finance VLAN captured a file transfer — over plaintext FTP, in 2026. The credentials crossed the wire in the clear. Read the capture and lift them.",
    question: "What password was captured in plaintext?",
    hint: "cat capture.txt and look for the PASS command in the FTP session.",
    answers: ["r3dline9"],
    evidence: {
      name: "Sniffed Credentials",
      desc: "Plaintext FTP credentials (auditor / r3dline9) used to pull ledgers_q3.csv off the finance server. The audit account was the leak.",
    },
  },
  {
    id: 19,
    codename: "TRIPLE CIPHER",
    title: "Triple Cipher",
    category: "Cryptography",
    icon: Box,
    difficulty: "Hard",
    story:
      "The last transmission before the vault is wrapped in three layers. Peel them in the right order and the callsign of AEGIS PRIME's watchdog falls out.",
    question: "Decode the transmission through all three layers. What is the final word?",
    hint: "Layer 1: Base64. Layer 2: the result is hex — decode it. Layer 3: read it backwards.",
    answers: ["sentinel"],
    evidence: {
      name: "Triple-Layer Cipher Text",
      desc: "The watchdog callsign SENTINEL, buried under Base64, hex, and a reversal. Whoever built this thought layers equal strength.",
    },
  },
  {
    id: 20,
    codename: "VAULT PRIME",
    title: "The Vault Prime",
    category: "Final Meta Puzzle",
    icon: KeyRound,
    difficulty: "Hard",
    story:
      "Behind the Black Vault: AEGIS PRIME and the true master archive. The final lock checks everything — a composite key assembled from intelligence recovered across the entire operation. Every room you cleared contributed a piece.",
    question:
      "Assemble the composite key: [the AEGIS override word from Room 09] - [the acrostic spelled by the first letters of evidence items 11 through 19] - [the backup key from Room 05]. Separate the three parts with dashes.",
    hint: "Part 2: open your evidence archive and read the first letter of each item recovered in Rooms 11–19, in order (9 letters).",
    answers: [
      "override-blacklist-bvlt",
      "override blacklist bvlt",
      "overrideblacklistbvlt",
    ],
    evidence: {
      name: "AEGIS Prime Master Archive",
      desc: "The true archive: every ledger, every wire, every purge order, every name. AEGIS PRIME is offline. Black Vault Bank is finished.",
    },
  },
];

export const TOTAL_ROOMS = ROOMS.length;
