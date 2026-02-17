export type ExerciseType = "weight" | "cardio";

export type Exercise = {
  id: string;
  name: string;
  type: ExerciseType;
  unit?: string;
};

export type WeightSet = {
  reps: number;
  weight: number;
};

export type CardioSet = {
  value: number;
  duration?: number;
};

export type ExerciseEntry = {
  exerciseId: string;
  sets: WeightSet[] | CardioSet[];
};

export type TrainingSession = {
  id: string;
  date: string;
  entries: ExerciseEntry[];
};

export const exercises: Exercise[] = [
  { id: "bench-press", name: "Bench Press", type: "weight" },
  { id: "squat", name: "Squat", type: "weight" },
  { id: "front-squat", name: "Front Squat", type: "weight" },
  { id: "deadlift", name: "Deadlift", type: "weight" },
  { id: "overhead-press", name: "Overhead Press", type: "weight" },
  { id: "barbell-row", name: "Barbell Row", type: "weight" },
  { id: "dumbbell-curl", name: "Dumbbell Curl", type: "weight" },
  { id: "tricep-extension", name: "Tricep Extension", type: "weight" },
  { id: "lat-pulldown", name: "Lat Pulldown", type: "weight" },
  { id: "leg-press", name: "Leg Press", type: "weight" },
  { id: "romanian-deadlift", name: "Romanian Deadlift", type: "weight" },
  { id: "hip-thrust", name: "Hip Thrust", type: "weight" },
  { id: "lateral-raise", name: "Lateral Raise", type: "weight" },
  { id: "face-pull", name: "Face Pull", type: "weight" },
  { id: "cable-fly", name: "Cable Fly", type: "weight" },
  { id: "200m-run", name: "200m Run", type: "cardio", unit: "seconds" },
  { id: "400m-run", name: "400m Run", type: "cardio", unit: "seconds" },
  { id: "800m-run", name: "800m Run", type: "cardio", unit: "seconds" },
  { id: "1600m-run", name: "1600m Run", type: "cardio", unit: "seconds" },
  { id: "laps", name: "Laps", type: "cardio", unit: "laps" },
  { id: "jump-rope", name: "Jump Rope", type: "cardio", unit: "seconds" },
  { id: "rowing-machine", name: "Rowing Machine", type: "cardio", unit: "seconds" },
];

export const getExerciseById = (id: string): Exercise | undefined =>
  exercises.find((e) => e.id === id);

export const generateSessionId = (): string =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
