# Operation BLACK VAULT

https://operation-black-vault.vercel.app/

A browser-based cybersecurity escape-room CTF. You play an investigator infiltrating **Black Vault Bank**, a corrupt financial institution. Solve 10 cybersecurity challenges and exfiltrate the evidence before **AEGIS**, the bank's autonomous security system, wipes it — in 30 minutes.

## Features

- 10 interconnected challenge rooms with a shared storyline
- 30-minute countdown with persistent, refresh-proof game state
- AEGIS alert meter (wrong answers and hints raise it; 100% = purge)
- Evidence archive with lore cards recovered per room
- Live network map showing locked / active / completed nodes
- Simulated in-browser terminal (no real commands ever execute)
- Scoring with time bonus, hint penalties, and operator ranks
- Responsive layout (desktop-first, mobile nav drawer)

## Challenge Categories

Recon · Cryptography · Reverse Engineering · OSINT · Forensics · GEOINT · Command Line · Binary Exploitation · Logic · Meta Puzzle

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
4. Room 09 and Room 10 are meta-puzzles built from evidence you've already collected — check the archive.
5. Reach the Black Vault before 30:00 elapses (or AEGIS hits 100%).

## Architecture

```
app/            Next.js App Router entry (layout, page, globals)
components/     Game shell, room view, terminal sim, map, archive, screens
data/rooms.ts   All 10 rooms as structured data (single source of truth)
lib/game.ts     Timer/score/alert logic and constants
types/game.ts   Room + GameState types
```

Rooms are pure data — adding or editing a challenge means editing `data/rooms.ts` (and, for custom visuals, one switch case in `components/ChallengeContent.tsx`).

## Security

Every challenge is fully simulated in the browser. The app never executes user input, runs system commands, touches the filesystem, or performs network scanning. It is safe to deploy publicly.

## Deployment

Zero-config deploy on [Vercel](https://vercel.com) (or any Node host):

```bash
npm run build
```
