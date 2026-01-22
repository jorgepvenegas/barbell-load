# UI Improvement Plan - Multi Phase

## Overview
Improve DaisyUI component usage, remove hard-coded colors, and implement clean & minimal design with consistent card wrappers.

## Phase 1: Foundation Components
**Priority: High** - Core visual consistency fixes

### 1.1 PlateResults (`src/components/PlateResults.tsx`)
- Replace hard-coded colors (`bg-amber-100`, `border-amber-300`)
- Use `card card-compact bg-base-200`
- Wrap content in `card-body`
- Convert heading to `card-title`
- Maintain all logic and accessibility

### 1.2 Navbar (`src/components/Navbar.tsx`)
- Wrap entire navbar in `navbar bg-base-200 shadow-sm`
- Keep existing menu and theme toggle structure
- Add subtle bottom border
- Maintain navigation and theme functionality

---

## Phase 2: Selection Components
**Priority: High** - Interactive input consistency

### 2.1 BarbellSelector (`src/components/BarbellSelector.tsx`)
- Remove `checked:bg-red-500` and `checked:bg-blue-500` (use default radio)
- Remove collapse pattern (expand by default)
- Wrap in `card card-compact bg-base-200`
- Use `card-title` for heading
- Improve radio button spacing with `flex gap-4`
- Maintain 33lb/45lb selection logic

### 2.2 PlateSelector (`src/components/PlateSelector.tsx`)
- Remove checkbox-inside-button pattern
- Use `btn btn-outline btn-sm` for each plate toggle
- Show enabled state with solid color (`btn-primary` or `btn-active`)
- Remove collapse pattern (expand by default)
- Wrap in `card card-compact bg-base-200`
- Use `card-title` for heading
- Maintain grid layout (`grid-cols-3 gap-2`)
- Preserve plate selection logic

---

## Phase 3: Control Components
**Priority: Medium** - Input refinement

### 3.1 WeightControls (`src/components/WeightControls.tsx`)
- Wrap entire section in `card card-compact bg-base-200`
- Use `card-title` for section heading
- Keep existing join/input pattern for percentage controls
- Ensure consistent button sizing
- Maintain all weight/percentage logic and validation

---

## Phase 4: Layout Structure
**Priority: Medium** - Visual hierarchy

### 4.1 Calculator Layout (`src/components/Calculator.tsx`)
- Wrap each section (`PlateSelector`, `BarbellSelector`, `WeightControls`, `PlateResults`) in individual card wrappers
- Remove individual component card wrappers (move card structure to parent)
- OR keep cards in components (decide based on reusability preference)
- Maintain accessibility attributes (`aria-labelledby`)
- Keep consistent vertical gaps

### 4.2 Plates Page (`src/components/plates/Plates.tsx`)
- Refine total weight sticky card: `card card-compact bg-primary text-primary-content`
- Add `card-body` wrapper
- Improve individual plate cards: `card card-compact bg-base-200`
- Enhance shadow consistency
- Maintain all increment/decrement logic

---

## Design Principles (Clean & Minimal)

- **Consistent theming**: Use DaisyUI theme colors only (no hard-coded colors)
- **Card containment**: All sections wrapped in `card card-compact bg-base-200`
- **Subtle shadows**: `shadow-sm` for navbar, standard card shadows
- **Spacing**: Consistent gaps using `gap-4` or `gap-5`
- **Typography**: Clear hierarchy with `card-title`, `text-xl`, `text-lg`
- **Colors**: Use `btn-primary`, `bg-base-200`, alert components
- **Borders**: Minimal, use card components instead of manual borders

---

## Implementation Order

1. Start with Phase 1 (foundation)
2. Move to Phase 2 (selection components)
3. Complete Phase 3 (control components)
4. Finish with Phase 4 (layout structure)

Test after each phase to ensure functionality is preserved.
