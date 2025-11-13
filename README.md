
# Aegis Assault  

*The On‑Chain Arena Shooter with an AI‑Powered Strategist*  

![Cover Image](https://i.ibb.co/mC1J1s7n/Gemini-Generated-Image-w30l4uw30l4uw30l.png)

## 🚀 Overview  

You are the Aegis Core. Locked at the centre of the arena, you must defend yourself against endless, evolving waves of enemies. Aim with your mouse, destroy the swarm, and fight for your place on the blockchain. :contentReference[oaicite:0]{index=0}  
This isn't just another web shooter—built with modern tech (Phaser 3, Next.js, Zustand) and integrated with blockchain and AI, **Aegis Assault** proves that web‑games can be trustable, persistent, and strategic.

## 📍 Play Now  

Check out the live demo: [aegis-assault.vercel.app](https://aegis-assault.vercel.app/)

![Demo Gif](https://i.ibb.co/20nzSmkD/ezgif-77b4384b819f1e6c.gif)

## 🎮 Core Features  

### Game Mechanics

- Intuitive movement & shooting using Phaser.js  
- Wave‑based enemy spawning: dwarfs like **Darter**, **Brute**, **Splitter** join the fight.
- XP‑based leveling system: choose upgrades (temporary or permanent) as you progress  
- Health, collision detection, particle effects  
- Battle music and SFX for immersive gameplay  
- Tutorial and pause functionality built in  

### Web3 Integration

- Wallet authentication (session tracking via wallet address)  
- On‑chain score storage: every run is logged to Somnia blockchain via its Streams SDK, making leaderboards verifiable and immutable. :contentReference[oaicite:6]{index=6}  
- NFT ship‑skins and soul‑bound tokens (SBTs) for achievements  
- Real‑time, on‑chain leaderboard  

### AI Strategy Assistant (“Oracle”)  

- Tracks game statistics like `finalScore`, `timeSurvived`, `enemyKillCount`, `finalBuild`  
- Uses Amazon Q to analyse your performance data and offer personalised advice: upgrade priorities, survival tactics, improvement areas. :contentReference[oaicite:8]{index=8}  
- Helps you turn your run into a strategy, not just reflexes.  

### Data Management & UX  

- Local storage persistence (via your `gameDatabase` system) for cross‑session continuity  
- Real‑time leaderboard with wallet highlighting and ranking  
- Modern React UI components styled with Tailwind CSS (primary: `#E85C0D`, secondary: `#FABC3F`)  
- Zustand‑based state management for game & UI states  
- Responsive design, gradient themes, smooth animations  

## 🎯 Problem & Solution  

**Problem:** Web‑based games often lack verifiable scores, persistent player progress and strategic guidance. Leaderboards can be manipulated or untrusted.  
**Solution:** Aegis Assault gives you trustable leaderboards, persistent progress on‑chain and an AI guide to improve your play—all within a modern web experience.  

## 📦 Tech Stack  

- **Frontend:** Next.js + React, Tailwind CSS  
- **Game Engine:** Phaser 3  
- **State Management:** Zustand  
- **Blockchain:** Somnia (Streams SDK)  
- **Wallet / Auth:** iron‑session + viem  
- **AI:** Amazon Q  
- **Backend:** AWS Lambda (serverless functions)  
- **Stats Tracking:** Local + on‑chain sync  

## ✅ Next Steps / Roadmap  

1. Add a feature to stake SOMI with other players
2. Polish audio and visual feedback (particle effects, cinematics)  
3. Expand enemy types, upgrade tree, difficulty scaling  
4. Deepen AI assistant: longer‑term player tracking, custom recommendations  
5. Enable user‑generated skins + marketplace  
6. Add social features: clans, team leaderboards  
7. Launch on testnet → mainnet, invite early players  

## 🛠 Project Structure  

``` bash
└── 📁aegis-assault
    └── 📁actions
        ├── combat.ts
        ├── spawning.ts
        ├── state.ts
    └── 📁app
        └── 📁api
            └── 📁auth
                └── 📁logout
                    ├── route.ts
                └── 📁me
                    ├── route.ts
                └── 📁nonce
                    ├── route.ts
                └── 📁verify
                    ├── route.ts
            └── 📁leaderboard
                ├── route.ts
            └── 📁strategist
                ├── route.ts
            └── 📁submit-score
                ├── route.ts
        └── 📁leaderboard
            ├── page.tsx
        └── 📁login
            ├── page.tsx
        └── 📁play
            ├── page.tsx
        ├── favicon.ico
        ├── globals.css
        ├── layout.tsx
        ├── page.tsx
    └── 📁assets
        ├── hero-gameplay.jpg
    └── 📁components
        └── 📁game
            ├── Loader.tsx
        └── 📁home
            ├── FinalCTA.tsx
            ├── Gameplay.tsx
            ├── Hero.tsx
            ├── Innovation.tsx
            ├── Leaderboard.tsx
            ├── TechStack.tsx
        └── 📁ui
            ├── button.tsx
            ├── card.tsx
            ├── Img.tsx
            ├── table.tsx
        ├── GameCanvas.tsx
        ├── GameOverScreen.tsx
        ├── GameTutorial.tsx
        ├── LevelUpScreen.tsx
        ├── PauseScreen.tsx
    └── 📁config
        ├── gameConfig.ts
        ├── upgrades.ts
    └── 📁contexts
        ├── UserContext.tsx
    └── 📁lib
        ├── button-variants.ts
        ├── gameDatabase.ts
        ├── server.ts
        ├── session.ts
        ├── somnia.ts
        ├── utils.ts
    └── 📁providers
        ├── index.tsx
    └── 📁public
        └── 📁assets
        └── 📁icons
        └── 📁img
        └── 📁music
    └── 📁scenes
        ├── MainScene.ts
    └── 📁stores
        ├── gameStore.ts
    └── 📁types
        ├── leaderboard.ts
    └── 📁utils
        ├── config.ts
        ├── gameVariables.ts
    ├── .env
    ├── .gitignore
    ├── components.json
    ├── eslint.config.mjs
    ├── next-env.d.ts
    ├── next.config.ts
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.mjs
    ├── README.md
    └── tsconfig.json
```

## 🧑‍💻 Contributors  

- **Abraham Ebijuni** – Game design, Web3 integration, AI strategy assistant  
- Amazon Q

---

Feel free to fork, build and contribute. Defend the core. Secure your legacy.

This was greatly inspired by [a video on Chris Courses](https://youtu.be/eI9idPTT0c4?si=qQy2jPRZj-QibQYi)
