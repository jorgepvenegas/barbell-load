# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Barbell Load Calculator is a Solid.js web application that helps users calculate and visualize the weight distribution of barbell plates. The app calculates which plates to use given a target weight and barbell type.

## Tech Stack

- **Framework**: Solid.js 1.9.10 (reactivity library, not React)
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 5.4.21
- **Styling**: Tailwind CSS 4.1.17 + DaisyUI 5.4.7
- **Routing**: @solidjs/router 0.15.3
- **State Management**: Solid.js store with createStore
- **Package Manager**: pnpm
- **Analytics**: Vercel Analytics 1.5.0
- **Vite Plugin**: vite-plugin-solid 2.11.10

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:3000)
npm run dev
# or
npm start

# Build for production
npm run build

# Preview production build locally
npm run serve
```

## Project Architecture

### Core Structure

```
src/
├── components/          # Solid.js components for UI
│   ├── Calculator.tsx   # Main calculator page
│   ├── plates/          # Plate visualization page
│   ├── PlateSelector.tsx # Component for selecting available plates
│   ├── BarbellSelector.tsx # Component for selecting barbell weight (33lb or 45lb)
│   ├── WeightControls.tsx # Input controls for weight/percentage
│   ├── PlateResults.tsx # Display calculated plate distribution
│   └── Navbar.tsx       # Navigation component
├── stores/
│   └── store.ts         # Solid.js store with createStore (state management)
├── utils/
│   ├── calculators.ts   # Core plate calculation logic
│   ├── constants.ts     # App constants (storage keys, etc)
│   └── useLocalStorage.ts # Local storage persistence utility
├── App.tsx              # Router setup (Calculator and Plates routes)
└── index.tsx            # Entry point
```

### State Management Pattern

The app uses Solid.js `createStore` for state management:

- **Store location**: `src/stores/store.ts` (stores/store.ts:34)
- **Store exports**:
  - `CustomStore`: The store singleton instance
  - `useStore()`: Hook to access state
  - `useStoreActions()`: Hook to access mutations
- **State includes**: weight, percentage, barWeight (33 or 45), selectedPlates, percentageWeight
- **Persistence**: selectedPlates persist to localStorage via `useLocalStorage()` hook

### Key Files and Their Responsibilities

**Core Calculation Logic** (`src/utils/calculators.ts`):

- `calculatePlates()`: Main algorithm that distributes plates to reach target weight
- `availablePlates`: Array of plate weights (65, 55, 45, 35, 25, 15, 10, 5, 2.5, 1, 0.5, 0.25)
- Types: `BarWeight` (33 | 45), `PlateWeight`, `PlatePair`

**Routing** (`src/App.tsx`):

- Route `/`: Calculator component (main view)
- Route `/plates`: Plates component (plate configuration/visualization)

**Styling**:

- Tailwind CSS v4 + DaisyUI classes for styling
- PostCSS configured with @tailwindcss/postcss plugin
- Tailwind v4 uses new import syntax via `@import 'tailwindcss'` and `@plugin` directives
- Border color compatibility layer added for Tailwind v4 (default changed from explicit colors to currentcolor)
- Configuration in `postcss.config.js` (tailwind.config.js removed in v4)

## Important Development Notes

### Solid.js Specifics

- **Not React**: This is Solid.js, not React. Key differences:

  - No hooks like `useState`, but uses `createSignal`, `createStore`
  - Components are functions that return JSX but don't re-render on state changes (fine-grained reactivity)
  - JSX imports from `"solid-js"` (configured in `jsxImportSource` in tsconfig.json)
  - No dependency arrays needed for fine-grained reactivity

- **Store patterns**: Use `useStore()` and `useStoreActions()` from `src/stores/store.ts` to access state and mutations
- **Local storage**: Already integrated in store for selectedPlates via `useLocalStorage()` hook

### Plate Calculation Algorithm

The `calculatePlates()` function in `src/utils/calculators.ts`:

- Takes target weight, bar weight, and selected plates (filtered by enabled status)
- Uses a greedy algorithm: iterates through largest to smallest plates
- For each plate weight, adds pairs (left + right side) until remaining weight is less than 2x the plate weight
- Returns array of `PlatePair` objects with weight and count

### TypeScript Configuration

- Strict mode enabled
- JSX preserved and sourced from solid-js
- No emit (type checking only, build handled by Vite)
