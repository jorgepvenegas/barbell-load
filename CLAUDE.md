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
pnpm install

# Start development server (runs on http://localhost:3000)
pnpm dev
# or
pnpm start

# Build for production
pnpm build

# Preview production build locally
pnpm serve
```

## Project Architecture

### Core Structure

```
src/
├── components/          # Solid.js components for UI
│   ├── Calculator.tsx   # Main calculator page
│   ├── plates/          # Plate visualization components
│   │   └── Plates.tsx   # Plate configuration/visualization page
│   ├── PlateSelector.tsx # Component for selecting available plates
│   ├── BarbellSelector.tsx # Component for selecting barbell weight (33lb or 45lb)
│   ├── WeightControls.tsx # Input controls for weight/percentage
│   ├── PlateResults.tsx # Display calculated plate distribution
│   ├── Navbar.tsx       # Navigation component with theme toggle
│   └── ThemeToggle.tsx  # Dark/light mode toggle component
├── stores/
│   ├── store.ts         # Main app store with createStore (calculator state)
│   └── themeStore.ts    # Theme store with createSignal (dark/light mode)
├── utils/
│   ├── calculators.ts   # Core plate calculation logic
│   ├── constants.ts     # App constants (storage keys, etc)
│   └── useLocalStorage.ts # Local storage persistence utility
├── App.tsx              # Router setup (Calculator and Plates routes)
├── index.tsx            # Entry point
└── index.css            # Global styles, Tailwind imports, custom DaisyUI theme
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

### Theme System

The app includes a dark/light mode theme system:

- **Theme store location**: `src/stores/themeStore.ts` (themeStore.ts:32)
- **Theme types**: `"emerald"` (light mode) | `"carbonsocks"` (dark mode)
- **Store exports**:
  - `ThemeStore`: Singleton instance created with `createRoot`
  - `useTheme()`: Get current theme
  - `useIsDark()`: Check if dark mode is active
  - `useToggleTheme()`: Toggle between light/dark
  - `useSetTheme()`: Set specific theme
- **Implementation details**:
  - Uses `createSignal` for reactive theme state
  - Applies theme via `data-theme` attribute on document root
  - Persists to localStorage with key `"barbell-theme"`
  - Detects system preference on initial load
  - Custom "carbonsocks" theme defined in `src/index.css` (index.css:4-37)
- **UI Component**: `ThemeToggle.tsx` integrated in `Navbar.tsx` (Navbar.tsx:22)

### Key Files and Their Responsibilities

**Core Calculation Logic** (`src/utils/calculators.ts`):

- `calculatePlates()`: Main algorithm that distributes plates to reach target weight
- `availablePlates`: Array of plate weights (65, 55, 45, 35, 25, 15, 10, 5, 2.5, 1, 0.5, 0.25)
- Types: `BarWeight` (33 | 45), `PlateWeight`, `PlatePair`

**Routing** (`src/App.tsx`):

- Route `/`: Calculator component (main view)
- Route `/plates`: Plates component (plate configuration/visualization)

**Styling** (`src/index.css`):

- Tailwind CSS v4 + DaisyUI classes for styling
- PostCSS configured with @tailwindcss/postcss plugin
- Tailwind v4 uses new import syntax via `@import 'tailwindcss'` and `@plugin` directives
- DaisyUI themes:
  - `emerald`: Built-in DaisyUI theme for light mode
  - `carbonsocks`: Custom dark theme defined in index.css:4-37
- Custom theme defined using `@plugin "daisyui/theme"` directive with custom OKLCH color values
- Border color compatibility layer added for Tailwind v4 (default changed from explicit colors to currentcolor)
- Configuration in `postcss.config.js` (tailwind.config.js removed in v4)
- Touch action manipulation applied globally for better mobile UX

## Important Development Notes

### Solid.js Specifics

- **Not React**: This is Solid.js, not React. Key differences:
  - No hooks like `useState`, but uses `createSignal`, `createStore`
  - Components are functions that return JSX but don't re-render on state changes (fine-grained reactivity)
  - JSX imports from `"solid-js"` (configured in `jsxImportSource` in tsconfig.json)
  - No dependency arrays needed for fine-grained reactivity

- **Store patterns**: Use `useStore()` and `useStoreActions()` from `src/stores/store.ts` to access state and mutations
- **Local storage**: Already integrated in store for selectedPlates via `useLocalStorage()` hook

### Theme System Implementation

- **Pattern**: Uses `createSignal` with `createRoot` for singleton pattern (themeStore.ts:60)
- **Why createRoot**: Ensures the theme store is created outside component lifecycle, making it a true singleton that persists across route changes
- **Theme switching**: Directly access `ThemeStore.toggleTheme()` or use exported hooks
- **localStorage integration**: Automatic via `createEffect` that watches theme changes (themeStore.ts:39-43)
- **System preference detection**: Uses `window.matchMedia("(prefers-color-scheme: dark)")` on initialization
- **DOM integration**: Applies theme by setting `data-theme` attribute on `document.documentElement`

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

### DaisyUI Theme Customization

- **Built-in theme**: Uses DaisyUI's `emerald` theme for light mode (no customization needed)
- **Custom theme**: "carbonsocks" dark theme defined in `src/index.css` using Tailwind v4 plugin syntax
- **Theme definition syntax**: Use `@plugin "daisyui/theme"` with configuration object
- **Color format**: OKLCH color space for consistent perceptual brightness
- **Theme properties**: Includes base colors, primary/secondary/accent, semantic colors (info/success/warning/error), border radius, and visual effects (noise, depth)
- **Applying themes**: DaisyUI reads `data-theme` attribute from HTML element (set by themeStore)
