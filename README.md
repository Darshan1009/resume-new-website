# DARSHAN SHINDE // CYBER COMMAND CENTER

A cinematic, gamer-HUD style portfolio for a SOC Analyst / Web-App Pentester. Pure-black canvas, bottom-left command menu, giant glitch-scramble title flashes in the center, and per-section background videos.

## Stack

- **Next.js 14 (App Router)** + TypeScript
- **Tailwind CSS** — pure black with terminal green `#00FF66` and cyber blue `#00E5FF` accents
- **Framer Motion** — page transitions, layout animations, video crossfade

## Run

```powershell
cd d:\resume_new_website
npm install
npm run dev
```

Open http://localhost:3000

## Controls

- Click any menu item to open the content panel for that section
- Hover a menu item to preview-flash its title in the center viewport
- Keyboard: `1`–`4` jump to a section, `↑`/`↓` cycle, `Esc` closes the panel

## Sections

| Code | Slug | Title flash |
| --- | --- | --- |
| 01 | OVERVIEW | OPERATOR_ID.SYS |
| 02 | BREACH LOGS | THREAT_HISTORY.LOG |
| 03 | CYBER LABS | PROJECTS.REPO |
| 04 | ARSENAL | LOADOUT.CFG |

## Background videos (optional but recommended)

Drop loopable MP4s into [public/videos/](public/videos/) named:

- `overview.mp4`
- `breach-logs.mp4`
- `cyber-labs.mp4`
- `arsenal.mp4`

The site `HEAD`-checks each path on load. Missing files fall back to the matrix grid + a section-tinted radial glow — no errors thrown.

Free clips on [Pexels Videos](https://www.pexels.com/videos/) — search:
"matrix code looping", "cyber security abstract", "dark abstract network nodes".

## Structure

```
app/
  layout.tsx          — global shell, fonts, scanlines + noise
  page.tsx            — command-center composition + keyboard nav
  globals.css         — HUD panel, glitch RGB-split, scanlines, grid matrix
components/
  BackgroundLayer.tsx — per-section video crossfade + grid fallback
  CommandMenu.tsx     — bottom-left HUD nav with active indicator
  CenterTitle.tsx     — giant glitch-scramble title flash
  ContentPanel.tsx    — right-side panel that slides in on click
  GlitchText.tsx      — text-scramble effect (no external libs)
  sections/
    Overview.tsx      — operator profile + contact fields
    BreachLogs.tsx    — incident-response timeline (experience)
    CyberLabs.tsx     — repository index (projects)
    Arsenal.tsx       — tooling command grid (skills)
lib/
  data.ts             — single source of truth for resume content
public/
  videos/             — drop section background MP4s here
```

## Editing content

All resume content lives in [lib/data.ts](lib/data.ts) — `profile`, `experience`, `projects`, `arsenal`, and `navItems`. Change strings; the UI follows.
