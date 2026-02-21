import { type TrainingSession, getExerciseById } from "./training";
import { type DataPoint } from "./progress";

const csvEscape = (str: string): string => {
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
};

export const sessionsToJSON = (sessions: TrainingSession[]): string =>
  JSON.stringify(sessions, null, 2);

export const sessionsToCSV = (sessions: TrainingSession[]): string => {
  const rows: string[] = ["date,exercise,set_number,type,reps,weight,value,duration"];

  for (const session of sessions) {
    for (const entry of session.entries) {
      const exercise = getExerciseById(entry.exerciseId);
      const name = exercise?.name ?? entry.exerciseId;
      const type = exercise?.type ?? "weight";

      entry.sets.forEach((set, i) => {
        if (type === "weight") {
          const ws = set as { reps: number; weight: number };
          rows.push(
            `${session.date},${csvEscape(name)},${i + 1},weight,${ws.reps},${ws.weight},,`
          );
        } else {
          const cs = set as { value: number; duration?: number };
          rows.push(
            `${session.date},${csvEscape(name)},${i + 1},cardio,,,${cs.value},${cs.duration ?? ""}`
          );
        }
      });
    }
  }

  return rows.join("\n");
};

export const dataPointsToJSON = (
  label: string,
  unit: string,
  data: DataPoint[]
): string =>
  JSON.stringify({ label, unit, data }, null, 2);

export const dataPointsToCSV = (
  label: string,
  unit: string,
  data: DataPoint[]
): string => {
  const header = `date,${csvEscape(label)} (${csvEscape(unit)})`;
  const rows = data.map((p) => `${p.date},${p.value}`);
  return [header, ...rows].join("\n");
};
