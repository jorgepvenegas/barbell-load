# Barbell Load Calculator

Monorepo for barbell plate weight distribution calculator. 3 packages: web (Solid.js), mobile (React Native/Expo), shared (utils).

## Communication

**BE ULTRA-CONCISE.** Sacrifice grammar. Brief responses only.

## Monorepo Structure

```
packages/
  ├── web/          Solid.js web app (Vite)
  ├── mobile/       React Native app (Expo)
  └── shared/       Shared utilities (TS library)
```

## Packages

**web** (`@barbell/web`):
- Solid.js 1.9.10, Vite 5.4.21
- Tailwind CSS 4.1.17, DaisyUI 5.4.7
- `npm` scripts: `dev`, `build`, `serve`, `typecheck`
- Key: fine-grained reactivity, `createSignal`/`createStore`, no comments

**mobile** (`@barbell/mobile`):
- React Native 0.81.5, Expo 54
- NativeWind for styling
- Scripts: `start`, `android`, `ios`, `web`, `lint`, `format`
- Uses zustand for state, async-storage for persistence

**shared** (`@barbell/shared`):
- Pure TS library, no framework dependencies
- Exports via `src/index.ts`
- Scripts: `typecheck`, `test`, `test:watch`
- Uses Vitest for tests

## Critical Rules

**MUST use pnpm** for all operations.

**NEVER run pnpm commands** - user manages deps.

Use workspace protocol `workspace:*` in dependencies.

Run from root: `pnpm dev:web`, `pnpm dev:mobile`, `pnpm build:all`, `pnpm typecheck`

## Development

Root scripts: `dev:web`, `dev:mobile`, `build:web`, `build:all`, `typecheck`, `test`

Each package has own `src/`, `package.json`, `tsconfig.json`.

## Plan Mode

- Make extremely concise. Sacrifice grammar.
- List unresolved questions at end if any.
