# Barbell Load Calculator - Mobile

React Native mobile app built with Expo.

## Tech Stack

- React Native 0.76.6
- Expo SDK 52
- Expo Router 4.0 (file-based routing)
- NativeWind 4.1 (Tailwind for RN)
- Zustand 5.0 (state management)

## Development

```bash
# Start dev server
pnpm dev:mobile

# Run on iOS
pnpm --filter @barbell/mobile ios

# Run on Android
pnpm --filter @barbell/mobile android

# Type check
pnpm --filter @barbell/mobile typecheck
```

## Structure

```
app/
  _layout.tsx          # Root layout
  (tabs)/
    _layout.tsx        # Tab navigation
    index.tsx          # Calculator screen
    settings.tsx       # Settings screen
    plates.tsx         # Plates screen
src/
  components/          # React Native components
  stores/              # Zustand stores
```

## Next Steps

1. Add app icons (icon.png, adaptive-icon.png, favicon.png) to assets/
2. Implement Zustand stores (Phase 3)
3. Build components (Phase 4-5)
