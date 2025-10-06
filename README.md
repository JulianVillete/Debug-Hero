Debug Hero

A lightweight coding game to practice finding and fixing bugs across multiple levels and topics. Built with React, Vite, TypeScript, and Prism.js.

Features
- 5 levels with topics: 1) JavaScript 2) TypeScript 3) React 4) CSS 5) Security
- Two modes: Find the bug (multiple choice) and Fix it (free text)
- Syntax-highlighted code samples with Prism.js
- Score tracking and level progression
- Mobile-friendly responsive UI
- Congrats modal after finishing level 5

Getting Started

Prerequisites
- Node.js 18+
- npm 9+

Install
```bash
npm install
```

Run (dev)
```bash
npm run dev
# open the URL from the terminal, e.g. http://localhost:5173
```

 Build (prod)
```bash
npm run build
npm run preview
```

 Deploy to Vercel
 1. Push the repo to GitHub (already done).
 2. Go to Vercel and import the repo `JulianVillete/Debug-Hero`.
 3. Framework Preset: Vite
 4. Build Command: `npm run build`
 5. Output Directory: `dist`
 6. Click Deploy. Your site will be live in seconds.

Project Structure
```
src/
  components/
    Game.tsx              # Main game logic & UI
    atoms/
      CodeCard.tsx        # Prism-highlighted code block
      ChoiceList.tsx      # Multiple-choice UI
      FixInput.tsx        # Free-text fix input
  data/
    questions.ts          # Questions, answers, and points per level/mode
  App.tsx                 # App shell
  main.tsx                # React entry
style.css                 # Global styles
vite.config.ts            # Vite + React plugin
```

Customization
- Add or edit questions in `src/data/questions.ts`.
- Add new topics/levels by updating the `level` field and UI mapping in `src/components/Game.tsx`.
- Swap Prism for Monaco if you need an in-editor experience.


Credits
Message and concept by Julian Villete.

