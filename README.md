# Barbell Load Calculator

Cross-platform application that helps weightlifters calculate optimal plate distribution for barbell exercises. Available as a web app (Solid.js) and mobile app (React Native/Expo).

## Features

- Calculate plate distribution for target weight
- Select available plate weights
- Choose barbell type (45 lb or 33 lb)
- Percentage calculator for training programs
- Manual plate counter
- Light/dark theme support
- State persistence across sessions

## Monorepo Structure

```
packages/
  shared/      # Framework-agnostic calculation logic & types
  web/         # Solid.js web application
  mobile/      # React Native + Expo mobile application
```

### Shared Package (`@barbell/shared`)
- Pure TypeScript calculation logic
- Type definitions (BarWeight, PlateWeight, PlatePair)
- Constants (storage keys, input constraints)
- Framework-agnostic, used by both web and mobile

### Web Package (`@barbell/web`)
- Solid.js 1.9.10
- TypeScript 5.9.3 (strict mode)
- Vite 5.4.21
- Tailwind CSS 4.1.17 + DaisyUI 5.4.7

### Mobile Package (`@barbell/mobile`)
- React Native 0.76.9
- Expo SDK 52
- Expo Router 4.0 (file-based routing)
- Zustand 5.0.3 (state management)
- NativeWind 4.1.28 (Tailwind for RN)
- AsyncStorage persistence

## Development

### Prerequisites
- Node.js 18+
- pnpm 8+

### Installation
```bash
pnpm install
```

### Available Scripts

**Run Web App:**
```bash
pnpm dev:web
```
Opens at http://localhost:5173

**Run Mobile App:**
```bash
pnpm dev:mobile
```
Then press `i` for iOS simulator or `a` for Android emulator

**Build All Packages:**
```bash
pnpm build:all
```

**TypeScript Check:**
```bash
pnpm typecheck
```

**Run Tests:**
```bash
pnpm test
```

### Package-Specific Commands

**Web:**
```bash
pnpm --filter @barbell/web dev
pnpm --filter @barbell/web build
pnpm --filter @barbell/web serve
```

**Mobile:**
```bash
pnpm --filter @barbell/mobile start
pnpm --filter @barbell/mobile ios
pnpm --filter @barbell/mobile android
```

**Shared:**
```bash
pnpm --filter @barbell/shared test
pnpm --filter @barbell/shared test:watch
```

## Testing

Unit tests for shared calculation logic:
```bash
cd packages/shared
pnpm test
```

15 test cases covering:
- Basic calculations (135, 225, 315 lb)
- Edge cases (target < barbell, no plates)
- Multiple plate types
- Barbell weight variations (33/45 lb)
- Disabled plates
- Greedy algorithm verification
- Fractional plates (0.25, 0.5 lb)
- Max weight scenarios

## Deployment

### Web
Deploy `packages/web/dist` to Vercel, Netlify, or any static host.

### Mobile
Use EAS Build:
```bash
cd packages/mobile
eas build --platform ios
eas build --platform android
```

## Architecture

### State Management
- **Web**: Solid.js createStore with localStorage
- **Mobile**: Zustand with AsyncStorage persistence

### Shared Logic
Both platforms import from `@barbell/shared`:
```ts
import { calculatePlates, type PlateWeight } from '@barbell/shared';
```

### Calculation Algorithm
Greedy algorithm using largest plates first:
1. Sort enabled plates by weight (descending)
2. For each plate, add as many pairs as fit
3. Return plate distribution per side

## License

MIT
