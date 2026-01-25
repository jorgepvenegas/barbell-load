# React Native Mobile Setup Instructions

This monorepo contains both the web (Solid.js) and mobile (React Native) versions of the Barbell Load Calculator.

## Project Structure

```
packages/
├── web/          # Solid.js web app
├── mobile/       # React Native iOS app
└── shared/       # Shared utilities (calculators, constants, types)
```

---

## Development Environment Setup

### Prerequisites

Before starting development, ensure you have:

- **macOS** (Monterey 12+ recommended)
- **Node.js** 18+ ([download](https://nodejs.org))
- **pnpm** 8+ ([install](https://pnpm.io/installation))
- **Xcode** 14+ (from App Store)
- **Xcode Command Line Tools**
- **CocoaPods** (Ruby package manager)
- **Watchman** (optional but recommended, file watcher)

### 1. Install System Dependencies

```bash
# Install Xcode Command Line Tools
xcode-select --install

# Install Watchman (recommended for better file watching)
brew install watchman

# Install CocoaPods (if not already installed)
brew install cocoapods
```

### 2. Verify Xcode Setup

```bash
# Check Xcode installation
xcode-select -p
# Should output: /Applications/Xcode.app/Contents/Developer

# Accept Xcode license
sudo xcode-select --reset
sudo xcodebuild -license accept
```

### 3. Clone & Setup Monorepo

```bash
# Clone the repository (if not already cloned)
git clone <repo-url>
cd barbell-load-calculator

# Checkout the mobile branch
git checkout feat/react-native-migration
```

### 4. Install pnpm

```bash
npm install -g pnpm@latest

# Verify installation
pnpm --version
```

### 5. Install Dependencies (Root)

```bash
# Install all workspace dependencies
pnpm install

# This installs dependencies for:
# - packages/web
# - packages/mobile
# - packages/shared
```

### 6. Setup iOS Development

```bash
# Navigate to mobile package
cd packages/mobile

# Install CocoaPods dependencies for iOS
cd ios
pod install

# If you encounter pod issues, run:
# pod repo update
# rm Podfile.lock
# pod install

# Return to root
cd ../..
```

### 7. Verify Setup

```bash
# Check Node version
node --version
# Should be 18+

# Check pnpm version
pnpm --version
# Should be 8+

# Verify Xcode path
xcode-select -p

# Check CocoaPods
pod --version
```

---

## Running the iOS App

### Option A: Quick Start (Recommended)

```bash
# From root directory
# Terminal 1: Start Metro bundler
pnpm mobile:start

# Terminal 2 (new terminal): Build & run on iOS simulator
pnpm mobile:ios
```

The app will automatically open in the iOS Simulator.

### Option B: Using Xcode

```bash
# Open Xcode project
open packages/mobile/ios/BarbellCalc.xcworkspace

# In Xcode:
# 1. Select target device (top left dropdown)
# 2. Press Cmd+R or Product → Run
```

### Option C: Command Line Build & Run

```bash
cd packages/mobile

# Build for simulator
react-native run-ios --simulator "iPhone 15"

# Or with custom simulator
react-native run-ios --simulator "iPhone 15 Pro Max"
```

### Available iOS Simulators

```bash
# List available simulators
xcrun simctl list devices

# Common options:
# "iPhone 15"
# "iPhone 15 Pro"
# "iPhone 15 Pro Max"
```

### Testing on Physical Device

```bash
cd packages/mobile/ios

# Open Xcode workspace
open BarbellCalc.xcworkspace

# Steps in Xcode:
# 1. Connect iPhone via USB
# 2. Select your device from top dropdown (not Simulator)
# 3. Press Cmd+R or Product → Run
# 4. Trust developer certificate on device when prompted
# 5. Grant permissions when app launches
```

---

## Development Workflow

### Starting Development Session

```bash
# Terminal 1: Metro bundler (always running during development)
pnpm mobile:start

# Terminal 2: Run app in simulator
pnpm mobile:ios

# Terminal 3: Edit code (VS Code or preferred editor)
code packages/mobile
```

### Hot Reloading

After changes, the app automatically reloads:
- **Fast Refresh**: For JavaScript changes (automatic)
- **Full Rebuild**: For native module changes

Keyboard shortcuts in simulator:
- `Cmd+R` - Reload JavaScript
- `Cmd+D` - Open developer menu
- `Cmd+M` - Open menu on Android (iOS uses Cmd+D instead)

### Developer Menu

Press `Cmd+D` in simulator to access:
- Reload
- Debug
- Show Inspector
- Remote JS Debugging
- Show Perf Monitor

### Debugging

```bash
# JavaScript debugging in Xcode
# 1. Press Cmd+D in simulator
# 2. Select "Debug"
# 3. Opens Safari DevTools or Chrome DevTools

# Or use VS Code React Native debugger:
# Install extension: "React Native Tools"
# Press F5 to start debugging
```

---

## Project Organization

### Directory Structure

```
packages/mobile/
├── src/
│   ├── screens/           # App screens (Calculator, Plates, Settings)
│   ├── components/        # Reusable components (future)
│   ├── stores/            # Context providers (AppContext, ThemeContext)
│   ├── navigation/        # Navigation setup
│   ├── theme/             # Colors, styling
│   ├── hooks/             # Custom hooks (useAsyncStorage)
│   └── App.tsx            # Root component
├── ios/                   # iOS native code
├── package.json
├── tsconfig.json
├── babel.config.js
├── metro.config.js
└── index.js              # Entry point
```

### Key Files for Development

| File | Purpose |
|------|---------|
| `src/App.tsx` | Root app component with providers |
| `src/stores/AppContext.tsx` | State management (weight, percentage, plates) |
| `src/stores/ThemeContext.tsx` | Theme management (light/dark) |
| `src/screens/CalculatorScreen.tsx` | Main calculator interface |
| `src/screens/PlatesScreen.tsx` | Plate counter interface |
| `src/screens/SettingsScreen.tsx` | Settings interface |
| `src/navigation/RootNavigator.tsx` | Tab navigation setup |

### Modifying Features

#### Adding a New Screen

1. Create new file in `src/screens/`
2. Import in `src/navigation/RootNavigator.tsx`
3. Add `<Tab.Screen>` entry with icon

#### Modifying State

1. Update action type in `src/stores/AppContext.tsx`
2. Add handler in `appReducer`
3. Add action creator in context value

#### Styling Changes

1. Update `src/theme/colors.ts` for color changes
2. Use theme colors in component styles
3. Colors automatically apply to light/dark modes

---

## Features (Identical to Web)

- ✓ Target weight input with ±5 lb increments
- ✓ Training percentage control (40-100%, ±5%)
- ✓ Plate distribution calculation
- ✓ Plate counter (manual weight building)
- ✓ Barbell type selection (33 lb or 45 lb)
- ✓ Available plates configuration
- ✓ Light/dark theme toggle
- ✓ All data persisted to AsyncStorage

---

## Building for Production

### Create Release Build

```bash
cd packages/mobile

# Build for iOS release
react-native run-ios --configuration Release

# Or via Xcode:
# 1. Open ios/BarbellCalc.xcworkspace
# 2. Select Product → Scheme → Edit Scheme
# 3. Build Configuration: Release
# 4. Press Cmd+B to build
```

### Archive for TestFlight/App Store

```bash
cd packages/mobile/ios

# Archive the app
xcodebuild -workspace BarbellCalc.xcworkspace \
  -scheme BarbellCalc \
  -configuration Release \
  -archivePath ~/Desktop/BarbellCalc.xcarchive \
  archive

# Export archive
xcodebuild -exportArchive \
  -archivePath ~/Desktop/BarbellCalc.xcarchive \
  -exportOptionsPlist exportOptions.plist \
  -exportPath ~/Desktop/BarbellCalc_Release
```

---

## Troubleshooting

### Metro Bundler Issues

**Problem:** "Cannot find module" errors

```bash
# Clear cache and restart
pnpm mobile:start -- --reset-cache

# Or manually
cd packages/mobile
rm -rf node_modules/.cache
pnpm mobile:start
```

### Pod Installation Issues

**Problem:** `pod install` fails

```bash
cd packages/mobile/ios

# Update pod repo
pod repo update

# Remove lock file
rm Podfile.lock

# Reinstall
pod install

# If still failing:
pod install --repo-update
```

### Simulator Issues

**Problem:** Simulator won't start

```bash
# Restart Xcode and simulator
killall "iOS Simulator"
xcrun simctl erase all

# Then try again
pnpm mobile:ios
```

**Problem:** "Device is locked"

```bash
# In simulator, swipe up from bottom or press Cmd+L
# No passcode needed for development
```

### Build Failures

**Problem:** Xcode build fails

```bash
cd packages/mobile

# Clean build
react-native run-ios --clean

# Or in Xcode:
# Cmd+Shift+K (clean build folder)
# Cmd+B (rebuild)
```

**Problem:** "Could not find simulator"

```bash
# List available simulators
xcrun simctl list devices

# Use specific simulator
pnpm mobile:ios --simulator "iPhone 15"
```

### Workspace Linking Issues

**Problem:** "@barbell-calc/shared not found"

```bash
# Reinstall workspace dependencies
cd /path/to/repo/root
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

---

## Additional Resources

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [React Navigation Docs](https://reactnavigation.org/)
- [Xcode Documentation](https://developer.apple.com/xcode/)
- [AsyncStorage Docs](https://react-native-async-storage.github.io/async-storage/)
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)

---

## Quick Reference Commands

```bash
# Development
pnpm mobile:start              # Start Metro bundler
pnpm mobile:ios                # Run on simulator
pnpm web:dev                   # Run web app

# Building
pnpm mobile:build              # Build release app
pnpm mobile:test               # Run tests

# Utilities
pnpm mobile:start -- --reset-cache    # Reset bundler cache
pnpm install                   # Install all dependencies
pnpm install -F mobile         # Install only mobile package

# iOS specific
open packages/mobile/ios/BarbellCalc.xcworkspace    # Open in Xcode
cd packages/mobile && pod install                   # Update pods
```

---

## Tips for Efficient Development

1. **Keep Metro running**: Leave `pnpm mobile:start` running in dedicated terminal
2. **Use Hot Reload**: Cmd+R in simulator for quick feedback
3. **Monitor console**: Check Metro output for errors
4. **Enable Perf Monitor**: Cmd+D → Perf Monitor to track performance
5. **Use Xcode breakpoints**: For native code debugging
6. **Test both themes**: Toggle dark mode in Settings to verify both themes
7. **Check AsyncStorage**: Data persists across app restarts
