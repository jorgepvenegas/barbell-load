# Barbell Load Calculator - React Native Mobile

iOS app for calculating barbell plate weight distribution using React Native.

## Setup

1. Install dependencies:
```bash
cd packages/mobile
pnpm install
cd ios
pod install
cd ../..
```

2. Start dev server:
```bash
pnpm mobile:start
```

3. Run on iOS:
```bash
pnpm mobile:ios
```

## Development

- **Stores:** `src/stores/` - AppContext and ThemeContext
- **Screens:** `src/screens/` - Calculator, Plates, Settings
- **Navigation:** `src/navigation/` - Bottom tab navigator
- **Theme:** `src/theme/colors.ts` - Light/dark theme definitions
- **Hooks:** `src/hooks/` - Custom hooks like useAsyncStorage

## Architecture

- State management via React Context + useReducer
- Theme switching with AsyncStorage persistence
- Shared utilities via `@barbell-calc/shared` package
- React Navigation for tab-based navigation
- NativeWind styling support (future enhancement)
