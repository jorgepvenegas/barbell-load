import { describe, it, expect } from "vitest";
import {
  exercises,
  getExerciseById,
  generateSessionId,
  type Exercise,
  type TrainingSession,
  type WeightSet,
  type CardioSet,
} from "../training";

describe("exercises", () => {
  it("contains both weight and cardio exercises", () => {
    const weightExercises = exercises.filter((e) => e.type === "weight");
    const cardioExercises = exercises.filter((e) => e.type === "cardio");
    expect(weightExercises.length).toBeGreaterThan(0);
    expect(cardioExercises.length).toBeGreaterThan(0);
  });

  it("has unique ids", () => {
    const ids = exercises.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("cardio exercises have a unit", () => {
    const cardio = exercises.filter((e) => e.type === "cardio");
    cardio.forEach((e) => {
      expect(e.unit).toBeDefined();
    });
  });

  it("weight exercises do not have a unit", () => {
    const weight = exercises.filter((e) => e.type === "weight");
    weight.forEach((e) => {
      expect(e.unit).toBeUndefined();
    });
  });
});

describe("getExerciseById", () => {
  it("returns exercise for valid id", () => {
    const result = getExerciseById("bench-press");
    expect(result).toBeDefined();
    expect(result!.name).toBe("Bench Press");
    expect(result!.type).toBe("weight");
  });

  it("returns undefined for invalid id", () => {
    expect(getExerciseById("nonexistent")).toBeUndefined();
  });

  it("returns cardio exercise with unit", () => {
    const result = getExerciseById("200m-run");
    expect(result).toBeDefined();
    expect(result!.type).toBe("cardio");
    expect(result!.unit).toBe("seconds");
  });
});

describe("generateSessionId", () => {
  it("returns a non-empty string", () => {
    const id = generateSessionId();
    expect(id.length).toBeGreaterThan(0);
  });

  it("generates unique ids", () => {
    const ids = new Set(Array.from({ length: 100 }, () => generateSessionId()));
    expect(ids.size).toBe(100);
  });
});

describe("types", () => {
  it("WeightSet shape is valid", () => {
    const set: WeightSet = { reps: 10, weight: 135 };
    expect(set.reps).toBe(10);
    expect(set.weight).toBe(135);
  });

  it("CardioSet shape is valid", () => {
    const set: CardioSet = { value: 200, duration: 30 };
    expect(set.value).toBe(200);
    expect(set.duration).toBe(30);
  });

  it("CardioSet duration is optional", () => {
    const set: CardioSet = { value: 5 };
    expect(set.value).toBe(5);
    expect(set.duration).toBeUndefined();
  });

  it("TrainingSession shape is valid", () => {
    const session: TrainingSession = {
      id: "test-123",
      date: "2026-02-17",
      entries: [
        {
          exerciseId: "bench-press",
          sets: [{ reps: 10, weight: 135 }] as WeightSet[],
        },
        {
          exerciseId: "200m-run",
          sets: [{ value: 200, duration: 28 }] as CardioSet[],
        },
      ],
    };
    expect(session.entries.length).toBe(2);
  });
});
