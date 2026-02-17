import type { TrainingSession, WeightSet, CardioSet } from "./training";
import { getExerciseById } from "./training";

export type ProgressMetric = "max_weight" | "total_volume" | "best_value";

export type DataPoint = {
  date: string;
  value: number;
};

export const getExerciseMaxWeight = (
  sessions: TrainingSession[],
  exerciseId: string
): DataPoint[] => {
  const points: DataPoint[] = [];
  for (const session of sessions) {
    for (const entry of session.entries) {
      if (entry.exerciseId !== exerciseId) continue;
      const sets = entry.sets as WeightSet[];
      if (sets.length === 0) continue;
      const max = Math.max(...sets.map((s) => s.weight));
      points.push({ date: session.date, value: max });
    }
  }
  return points.sort((a, b) => a.date.localeCompare(b.date));
};

export const getExerciseTotalVolume = (
  sessions: TrainingSession[],
  exerciseId: string
): DataPoint[] => {
  const points: DataPoint[] = [];
  for (const session of sessions) {
    for (const entry of session.entries) {
      if (entry.exerciseId !== exerciseId) continue;
      const sets = entry.sets as WeightSet[];
      if (sets.length === 0) continue;
      const volume = sets.reduce((sum, s) => sum + s.reps * s.weight, 0);
      points.push({ date: session.date, value: volume });
    }
  }
  return points.sort((a, b) => a.date.localeCompare(b.date));
};

export const getCardioBestValue = (
  sessions: TrainingSession[],
  exerciseId: string
): DataPoint[] => {
  const exercise = getExerciseById(exerciseId);
  if (!exercise || exercise.type !== "cardio") return [];

  const points: DataPoint[] = [];
  for (const session of sessions) {
    for (const entry of session.entries) {
      if (entry.exerciseId !== exerciseId) continue;
      const sets = entry.sets as CardioSet[];
      if (sets.length === 0) continue;
      if (exercise.unit === "laps") {
        const total = sets.reduce((sum, s) => sum + s.value, 0);
        points.push({ date: session.date, value: total });
      } else {
        const best = Math.min(...sets.map((s) => s.value));
        points.push({ date: session.date, value: best });
      }
    }
  }
  return points.sort((a, b) => a.date.localeCompare(b.date));
};

export const getExercisesWithData = (
  sessions: TrainingSession[]
): string[] => {
  const ids = new Set<string>();
  for (const session of sessions) {
    for (const entry of session.entries) {
      if (entry.sets.length > 0) ids.add(entry.exerciseId);
    }
  }
  return [...ids];
};
