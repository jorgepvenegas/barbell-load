# Barbell Load Calculator

Solid.js app for calculating barbell plate weight distribution.

## Communication

**BE ULTRA-CONCISE.** Sacrifice grammar. Brief responses only.

## Tech Stack

- Solid.js 1.9.10
- TypeScript 5.9.3 (strict mode)
- Vite 5.4.21
- Tailwind CSS 4.1.17
- DaisyUI 5.4.7
- pnpm

## Critical Rules

**MUST use pnpm** for all package operations.

**NEVER run pnpm commands** - user manages dependencies.

This is **Solid.js NOT React**:

- Uses `createSignal`, `createStore` (no `useState`)
- Fine-grained reactivity (no dependency arrays)
- JSX from `"solid-js"`

Add **ZERO code comments** unless requested.

## Architecture

**State:** `src/stores/store.ts`

- Uses `createStore`
- Export hooks: `useStore()`, `useStoreActions()`
- LocalStorage persistence already integrated

**Theme:** `src/stores/themeStore.ts`

- Uses `createSignal` + `createRoot` for singleton
- Themes: `"emerald"` (light), `"carbonsocks"` (dark)
- Via `data-theme` attribute

**Styling:** `src/index.css`

- Tailwind v4 syntax: `@import 'tailwindcss'`
- No `tailwind.config.js`
- DaisyUI themes via `data-theme`

## Development

Run dev: `pnpm dev` or `pnpm start`
Build: `pnpm build`
Preview: `pnpm serve`

Run lint/typecheck after changes if available.

## Key Files

- `src/stores/store.ts` - Main state
- `src/stores/themeStore.ts` - Theme state
- `src/utils/calculators.ts` - Core logic
- `src/components/Calculator.tsx` - Main UI
- `src/App.tsx` - Routes

## Plan Mode

- Make the plan extremely concise. Sacrifice grammar for the sake of concision.
- At the end of each plan, give me a list of unresolved questions to answer, if any.
