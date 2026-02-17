import { describe, it, expect } from "vitest";
import {
  getExerciseMaxWeight,
  getExerciseTotalVolume,
  getCardioBestValue,
  getExercisesWithData,
  type DataPoint,
} from "../progress";
import type { TrainingSession, WeightSet, CardioSet } from "../training";

const makeSessions = (): TrainingSession[] => [
  {
    id: "1",
    date: "2026-02-10",
    entries: [
      {
        exerciseId: "bench-press",
        sets: [
          { reps: 10, weight: 135 },
          { reps: 8, weight: 155 },
          { reps: 5, weight: 185 },
        ] as WeightSet[],
      },
      {
        exerciseId: "200m-run",
        sets: [{ value: 32 }, { value: 29, duration: 29 }] as CardioSet[],
      },
    ],
  },
  {
    id: "2",
    date: "2026-02-12",
    entries: [
      {
        exerciseId: "bench-press",
        sets: [
          { reps: 10, weight: 145 },
          { reps: 8, weight: 165 },
          { reps: 3, weight: 195 },
        ] as WeightSet[],
      },
    ],
  },
  {
    id: "3",
    date: "2026-02-14",
    entries: [
      {
        exerciseId: "laps",
        sets: [{ value: 4 }, { value: 6 }] as CardioSet[],
      },
    ],
  },
  {
    id: "4",
    date: "2026-02-15",
    entries: [{ exerciseId: "squat", sets: [] }],
  },
];

describe("getExerciseMaxWeight", () => {
  it("returns max weight per session sorted by date", () => {
    const result = getExerciseMaxWeight(makeSessions(), "bench-press");
    expect(result).toEqual([
      { date: "2026-02-10", value: 185 },
      { date: "2026-02-12", value: 195 },
    ]);
  });

  it("returns empty for exercise not in sessions", () => {
    expect(getExerciseMaxWeight(makeSessions(), "deadlift")).toEqual([]);
  });

  it("returns empty for empty sessions", () => {
    expect(getExerciseMaxWeight([], "bench-press")).toEqual([]);
  });

  it("skips entries with no sets", () => {
    expect(getExerciseMaxWeight(makeSessions(), "squat")).toEqual([]);
  });
});

describe("getExerciseTotalVolume", () => {
  it("returns total volume (reps * weight) per session", () => {
    const result = getExerciseTotalVolume(makeSessions(), "bench-press");
    expect(result).toEqual([
      { date: "2026-02-10", value: 10 * 135 + 8 * 155 + 5 * 185 },
      { date: "2026-02-12", value: 10 * 145 + 8 * 165 + 3 * 195 },
    ]);
  });

  it("returns empty for missing exercise", () => {
    expect(getExerciseTotalVolume(makeSessions(), "deadlift")).toEqual([]);
  });
});

describe("getCardioBestValue", () => {
  it("returns best (lowest) time for time-based cardio", () => {
    const result = getCardioBestValue(makeSessions(), "200m-run");
    expect(result).toEqual([{ date: "2026-02-10", value: 29 }]);
  });

  it("returns total laps for lap-based cardio", () => {
    const result = getCardioBestValue(makeSessions(), "laps");
    expect(result).toEqual([{ date: "2026-02-14", value: 10 }]);
  });

  it("returns empty for weight exercise", () => {
    expect(getCardioBestValue(makeSessions(), "bench-press")).toEqual([]);
  });

  it("returns empty for unknown exercise", () => {
    expect(getCardioBestValue(makeSessions(), "nonexistent")).toEqual([]);
  });
});

describe("getExercisesWithData", () => {
  it("returns exercise ids that have at least one set", () => {
    const result = getExercisesWithData(makeSessions());
    expect(result).toContain("bench-press");
    expect(result).toContain("200m-run");
    expect(result).toContain("laps");
    expect(result).not.toContain("squat");
  });

  it("returns empty for no sessions", () => {
    expect(getExercisesWithData([])).toEqual([]);
  });
});
