# Quick Start Guide

Get the iOS app running in 5 minutes.

## Prerequisites

- macOS Monterey+
- Xcode 14+
- Node.js 18+
- pnpm 8+ (`npm install -g pnpm@latest`)

## Setup (First Time Only)

```bash
# 1. Install dependencies
pnpm install

# 2. Setup iOS
cd packages/mobile/ios
pod install
cd ../..
```

## Run the App

**Terminal 1:** Start the bundler
```bash
pnpm mobile:start
```

**Terminal 2:** Run on simulator
```bash
pnpm mobile:ios
```

The app opens automatically in iOS Simulator.

## Make Changes

Edit files in `packages/mobile/src/` and press **Cmd+R** in the simulator to reload.

## Common Tasks

| Task | Command |
|------|---------|
| Stop app | Ctrl+C in bundler terminal |
| Reload app | Cmd+R in simulator |
| Open dev menu | Cmd+D in simulator |
| Run on device | Connect iPhone, then `pnpm mobile:ios` |
| Reset cache | `pnpm mobile:start -- --reset-cache` |
| Open in Xcode | `open packages/mobile/ios/BarbellCalc.xcworkspace` |

## Folder Structure

```
src/
├── screens/        # Calculator, Plates, Settings
├── stores/         # State & theme management
├── navigation/     # Bottom tab navigation
├── theme/          # Colors
└── App.tsx         # Root component
```

## Next Steps

- Read [MOBILE_SETUP.md](./MOBILE_SETUP.md) for detailed setup
- Check `packages/mobile/src/` for code
- Review [packages/shared/src/](./packages/shared/src/) for shared logic

---

Need help? Check the troubleshooting section in [MOBILE_SETUP.md](./MOBILE_SETUP.md#troubleshooting)
