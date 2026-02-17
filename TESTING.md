# Testing Instructions — Training Logger & Progress Charts

## Automated tests

```bash
pnpm test
```

Expect 40 tests passing (15 calculator + 13 training + 12 progress).

## Manual testing — Training tab

1. **Navigate to the Training tab** (clipboard icon in bottom nav)
2. **Empty state**: should show a "New Session" button and no past sessions
3. **Create a session**: tap "New Session"
   - Should see today's date at the top and a back arrow
   - Should see an "Add Exercise" button
4. **Add a weight exercise**:
   - Tap "Add Exercise" — exercise picker appears with search and filter (All/Weight/Cardio)
   - Search for "bench" — should filter to "Bench Press"
   - Select "Bench Press" — picker closes, exercise card appears
   - Enter reps: `10`, weight: `135`, tap the purple + button — set 1 appears (10 reps, 135 lb)
   - Add 2 more sets with different reps/weights
   - Verify set numbers display correctly (1, 2, 3)
   - Tap the X on a set — set is removed
5. **Add a cardio exercise**:
   - Tap "Add Exercise" — tap "Cardio" filter
   - Select "200m Run" — card shows Time + Duration inputs (not reps/weight)
   - Enter value `28`, duration `28`, tap + — set appears showing time and duration
   - Select "Laps" — card shows only "Laps" input (no duration field)
   - Enter `5`, tap + — set appears
6. **Remove an exercise**: tap "Remove" on an exercise card — entire entry removed
7. **Back to list**: tap the back arrow
   - Session should appear in "Past Sessions" with date and exercise tags (e.g. "Bench Press (3)")
8. **Edit a session**: tap "Edit" on a past session — returns to editor with all data intact
9. **Delete a session**: tap "Delete" — session removed from list
10. **Persistence**: refresh the page — past sessions should still be there (localStorage)

## Manual testing — Progress tab

1. **Empty state**: navigate to Progress tab (bar chart icon) with no sessions — should show "Log some training sessions to see your progress"
2. **With data**: after logging at least 2 sessions with the same weight exercise:
   - Exercise pills should appear (only exercises that have logged sets)
   - Selecting a weight exercise shows 2 charts: "Max Weight" (purple) and "Total Volume" (teal)
   - Charts should have Y-axis values, X-axis dates, data points, and gradient fill
   - Latest value shown in top-right of each chart
3. **Cardio progress**: log 2+ sessions with a cardio exercise
   - Selecting a cardio exercise shows 1 chart: "Best Time" or "Total Laps"
4. **Single data point**: with only 1 session for an exercise, chart shows "Need at least 2 sessions to plot"
5. **Switching exercises**: tap different exercise pills — charts update immediately

## Edge cases

- [ ] Adding a set with 0 or empty reps/weight should not create a set
- [ ] Creating a session and immediately going back shows it in the list (even with no exercises)
- [ ] Both light and dark themes render charts correctly
- [ ] Tab bar shows 5 tabs without layout issues on mobile viewport
