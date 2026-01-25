# React Native Mobile Setup Instructions

This monorepo contains both the web (Solid.js) and mobile (React Native) versions of the Barbell Load Calculator.

## Project Structure

```
packages/
├── web/          # Solid.js web app
├── mobile/       # React Native iOS app
└── shared/       # Shared utilities (calculators, constants, types)
```

## Initial Setup

### 1. Install Dependencies (Root)

```bash
pnpm install
```

This installs dependencies for all packages in the monorepo.

### 2. Setup Mobile App

```bash
cd packages/mobile
pnpm install
```

### 3. Install iOS Pods

```bash
cd packages/mobile/ios
pod install
cd ../..
```

## Development

### Run Web App
```bash
pnpm web:dev
```

### Run Mobile App (Dev Server)
```bash
pnpm mobile:start
```

### Run on iOS Simulator
```bash
pnpm mobile:ios
```

## Project Notes

**Shared Package** (`@barbell-calc/shared`)
- `calculators.ts` - Core plate calculation logic
- `constants.ts` - App constants (MIN_PERCENTAGE, MAX_WEIGHT, etc.)
- `types.ts` - TypeScript type definitions

**Mobile App** (`@barbell-calc/mobile`)
- Stores: Context-based state management (AppContext, ThemeContext)
- Screens: Calculator, Plates, Settings
- Navigation: Bottom tab navigator
- Theme: Light/dark mode with AsyncStorage persistence
- Icons: react-native-vector-icons (MaterialCommunityIcons)

## Features (Identical to Web)

- ✓ Target weight input with ±5 lb increments
- ✓ Training percentage control (40-100%, ±5%)
- ✓ Plate distribution calculation
- ✓ Plate counter (manual weight building)
- ✓ Barbell type selection (33 lb or 45 lb)
- ✓ Available plates configuration
- ✓ Light/dark theme toggle
- ✓ All data persisted to AsyncStorage

## Building for Production

### iOS Build
```bash
cd packages/mobile/ios
xcodebuild -scheme BarbellCalc -configuration Release
```

## Common Issues

**Pod install fails:**
```bash
cd packages/mobile/ios
rm Podfile.lock
pod repo update
pod install
```

**Metro bundler issues:**
```bash
pnpm mobile:start -- --reset-cache
```

**Module not found errors:**
Ensure workspace dependencies are linked:
```bash
pnpm install
```
