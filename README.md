# Operation BLACK VAULT

A browser-based cybersecurity escape-room CTF. You play an investigator infiltrating **Black Vault Bank**, a corrupt financial institution. Solve 20 cybersecurity challenges and exfiltrate the evidence before **AEGIS**, the bank's autonomous security system, wipes it — in 45 minutes.

## Features

- 20 interconnected challenge rooms with a shared storyline (5 terminal-based)
- 45-minute countdown with persistent, refresh-proof game state
- AEGIS alert meter (wrong answers and hints raise it; 100% = purge)
- Evidence archive with lore cards recovered per room
- Live network map showing locked / active / completed nodes
- Configurable simulated in-browser terminals — ls, cat, grep, ps, crontab (no real commands ever execute)
- Scoring with time bonus, hint penalties, and operator ranks
- Responsive layout (desktop-first, mobile nav drawer)

## Challenge Categories

Recon · Cryptography (Base64, Vigenère, XOR, weak RSA, layered encodings) · Reverse Engineering · OSINT / GEOINT (incl. one real-world map-research room) · DFIR / Log Analysis · Network Forensics · Command Line · Binary Exploitation · Logic · Meta Puzzles

## Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- React 18 + TypeScript
- Tailwind CSS
- lucide-react icons
- localStorage for save-game persistence

## Running Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Production build:

```bash
npm run build
npm start
```

## Gameplay

1. **Start Operation** → mission briefing → **Begin Infiltration** (timer starts).
2. Each room: read the story, investigate the clues, submit the answer.
3. Correct answers recover evidence and unlock the next room. Wrong answers and hints add +5% AEGIS alert.
4. Rooms 09, 10, and 20 are meta-puzzles built from evidence you've already collected — check the archive.
5. Room 14 (Street Level) intentionally requires real-world map research — the only room that sends you outside the game.
6. Reach the Vault Prime before 45:00 elapses (or AEGIS hits 100%).

## Architecture

```
app/            Next.js App Router entry (layout, page, globals)
components/     Game shell, room view, configurable terminal sim, map, archive, screens
data/rooms.ts   All 10 rooms as structured data (single source of truth)
lib/game.ts     Timer/score/alert logic and constants
types/game.ts   Room + GameState types
```

Rooms are pure data — adding or editing a challenge means editing `data/rooms.ts` (and, for custom visuals, one switch case in `components/ChallengeContent.tsx`). Terminal rooms pass a `TerminalConfig` (user, host, files, exact-match commands) to the shared `TerminalSim` component.

Room 14 renders the surveillance photo from `public/room14.jpg` — drop your image at that path (a placeholder message shows if it's missing). Players are expected to reverse image search it to geolocate the scene.

### Admin / test access

A small **ADMIN** button (bottom-right, landing page and dashboard) opens a login that unlocks all 20 rooms for playtesting without solving them in order. Credentials are set in `components/AdminAccess.tsx`. They ship in the client bundle, so this is a testing convenience, not a security control — remove the component before judging if you don't want players finding it.

## Security

Every challenge is fully simulated in the browser. The app never executes user input, runs system commands, touches the filesystem, or performs network scanning. Room 14's real-world component is passive map research only. The app is safe to deploy publicly.

## Deployment

Zero-config deploy on [Vercel](https://vercel.com) (or any Node host):

```bash
npm run build
```
