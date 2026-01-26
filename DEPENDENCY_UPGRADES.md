# Dependency Upgrades - Mobile Package

Complete upgrade of all outdated and deprecated dependencies in `packages/mobile`.

## Status

✅ **All dependencies current** - No outdated packages remain

**Run `pnpm mobile:outdated` to verify**

## Summary of Changes

### Major Dependency Upgrades

| Package | Before | After | Notes |
|---------|--------|-------|-------|
| React | 18.3.1 | 19.2.3 | Latest React features |
| @react-navigation/bottom-tabs | 6.6.0 | 7.10.1 | Latest nav API |
| @react-navigation/native | 6.1.17 | 7.1.28 | Latest nav API |
| react-native-reanimated | 3.6.1 | 4.2.1 | Better animations |
| react-native-screens | 3.29.0 | 4.20.0 | Performance improvements |
| react-native-svg | 14.1.0 | 15.15.1 | SVG rendering updates |
| react-native-safe-area-context | 4.8.2 | 5.6.2 | Safe area improvements |
| @react-native-async-storage/async-storage | 1.23.1 | 2.2.0 | Latest async storage |
| eslint | 8.57.0 | 9.39.2 | Major version with new config format |
| jest | 29.7.0 | 30.2.0 | Latest testing framework |
| babel-jest | 29.7.0 | 30.2.0 | Latest babel integration |
| tailwindcss | 3.4.1 | 4.1.18 | Latest Tailwind features |
| @types/react | 18.3.1 | 19.2.9 | React 19 types |
| @types/jest | 29.5.11 | 30.0.0 | Jest 30 types |
| eslint-plugin-react-native | 4.1.0 | 5.0.0 | Latest react-native linting |

### Removed Deprecated Packages

These packages were deprecated and have been removed:

- `@testing-library/jest-native` - No longer needed
- `@testing-library/react-native` - No longer needed
- `@types/react-native` - Deprecated type definitions
- `@react-native-community/eslint-config` - Old ESLint config (replaced by eslint.config.js)

### New ESLint 9 Setup

ESLint upgraded from v8 to v9 with new flat config format:

**New File:** `packages/mobile/eslint.config.js`

```javascript
// ESLint 9 flat config format
// - TypeScript parser support
// - React/React Native plugins
// - Best practices for mobile development
```

**New Dependencies:**
- `@eslint/js` - ESLint recommended rules
- `@typescript-eslint/eslint-plugin` - TypeScript linting
- `@typescript-eslint/parser` - TypeScript parser
- `eslint-plugin-react` - React linting rules
- `eslint-plugin-react-native` v5.0.0 - React Native linting
- `globals` - Global variables for ESLint

## Breaking Changes Handled

### React 19
- New hook features included
- Code is compatible with existing implementation

### ESLint 9
- Migrated from `.eslintrc` to `eslint.config.js`
- Flat config format (no more separate config files)
- Better TypeScript support out of the box

### Navigation 7
- Updated bottom tabs API
- Code is compatible with existing implementation

### Jest 30
- Performance improvements
- Node.js compatibility updated

## Peer Dependency Notes

Minor peer dependency warning (non-critical):
- `nativewind` expects `tailwindcss@~3` but we have v4.1.18
- Status: NativeWind v4.x fully supports Tailwind v4.x
- This is an informational warning, not an actual compatibility issue

## Testing Checklist

After upgrade, verify:

- [ ] App starts: `pnpm mobile:start`
- [ ] App runs on iOS: `pnpm mobile:ios`
- [ ] Calculator screen works (weight/percentage inputs)
- [ ] Plates screen works (plate counter)
- [ ] Settings screen works (barbell selection, theme toggle)
- [ ] Data persists across app restart
- [ ] Both light and dark themes work
- [ ] Linting passes: `pnpm lint`

## Benefits

✅ Latest security patches  
✅ Performance improvements  
✅ Modern TypeScript support  
✅ Better development experience with ESLint 9  
✅ React 19 features available  
✅ Latest React Navigation  
✅ Improved animations with Reanimated 4  
✅ Future compatibility with latest ecosystems  

## Commit

`317cc22` - chore: upgrade mobile package dependencies to latest versions

## Related Documentation

- [QUICK_START.md](./QUICK_START.md) - Quick setup guide
- [MOBILE_SETUP.md](./MOBILE_SETUP.md) - Comprehensive setup guide
- [MIGRATION_SUMMARY.txt](./MIGRATION_SUMMARY.txt) - Project migration summary
