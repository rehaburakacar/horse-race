# 🐎 Horse Racing Game – Vue 3 + Naive UI

Welcome to the interactive Horse Racing Game – a fun and animated racing simulation built with **Vue 3**, **TypeScript**, and **Naive UI**. Designed with a sleek and dynamic user experience in mind, this app simulates a multi-round horse race with real-time progress tracking and historical race results.

## ✨ Features

- In order to apply micro-frontend layout in future, src/packages usage is implemented.
- 🐴 10 animated horses per race, each with unique condition scores.
- ⏳ Countdown animation before each round.
- 📊 Real-time race progress with animated position tracking.
- Lint commands help to make sure there is not any syntax/usage error.
- 📜 Side drawer showing live race results.
- 🧾 Historical drawer storing past round summaries.
- 🎨 Fully themed with a custom color palette for a visually cohesive experience.

## 🛠 Tech Stack

- **Vue 3** + **Vite**
- **TypeScript**
- **Naive UI**
- **Vuex** (for state management)
- **CSS Grid & Flexbox** (for responsive layout)
- **Custom Theming** (global palette integration)

## 📁 Project Structure

```
src/
├── assets/                # Game visuals and backgrounds
├── components/            # Reusable UI components
├── pages/
│   └── RaceTrack.vue      # Main racing game logic and layout
├── results/
│   ├── CurrentResults.vue # Live drawer (left)
│   └── RaceHistory.vue    # History drawer (right)
├── store/                 # Vuex store
├── utils/                 # Race logic, horse generation, helpers
└── App.vue
```

## 👨‍💻 Current Commands

```
yarn dev
yarn build
yarn fix:prettier
yarn lint
```

## 👤 Author

Made with 💙 by **Reha Burak Acar**
