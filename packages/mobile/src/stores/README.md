# Zustand Stores

State management for mobile app using Zustand with AsyncStorage persistence.

## useStore

Main app state for weight calculations.

**State:**
- `weight` - Target weight (persisted)
- `percentage` - Training percentage (persisted)
- `percentageWeight` - Calculated weight (computed, not persisted)
- `barWeight` - 33 or 45 lb (persisted)
- `selectedPlates` - Available plates (persisted)
- `isHydrated` - AsyncStorage loaded flag

**Actions:**
- `setWeight(weight)`
- `setPercentage(percentage)`
- `setPercentageWeight(percentageWeight)`
- `setBarWeight(barWeight)`
- `setSelectedPlates(plates)`
- `resetStore()`

**Usage:**
```tsx
import { useStore } from '@/src/stores/useStore';

const { weight, setWeight, isHydrated } = useStore();

if (!isHydrated) return <Loading />;
```

## useThemeStore

Theme state for light/dark mode.

**State:**
- `theme` - 'light' | 'dark' (persisted)
- `isHydrated` - AsyncStorage loaded flag

**Actions:**
- `setTheme(theme)`
- `toggleTheme()`

**Usage:**
```tsx
import { useThemeStore } from '@/src/stores/useThemeStore';

const { theme, toggleTheme } = useThemeStore();
```

## Persistence

Both stores use Zustand's persist middleware with AsyncStorage:
- Storage key: `@mobile/barbell-store` and `@mobile/theme`
- Partial persistence (computed values excluded)
- Hydration tracking with `isHydrated` flag

**Important:** Always check `isHydrated` before rendering to avoid flash of default state.
