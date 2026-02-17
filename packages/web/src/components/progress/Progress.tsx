import { type Component, createSignal, createMemo, For, Show } from "solid-js";
import Layout from "../Layout";
import LineChart from "./LineChart";
import { useTrainingStore } from "../../stores/trainingStore";
import {
  getExerciseById,
  getExercisesWithData,
  getExerciseMaxWeight,
  getExerciseTotalVolume,
  getCardioBestValue,
} from "@barbell/shared";

const Progress: Component = () => {
  const store = useTrainingStore();
  const [selectedExercise, setSelectedExercise] = createSignal<string | null>(null);

  const exercisesWithData = createMemo(() =>
    getExercisesWithData(store.sessions)
  );

  const selected = createMemo(() => {
    const id = selectedExercise();
    if (id && exercisesWithData().includes(id)) return id;
    return exercisesWithData()[0] ?? null;
  });

  const exercise = createMemo(() => {
    const id = selected();
    return id ? getExerciseById(id) : undefined;
  });

  const isWeight = () => exercise()?.type === "weight";

  const maxWeightData = createMemo(() => {
    const id = selected();
    if (!id || !isWeight()) return [];
    return getExerciseMaxWeight(store.sessions, id);
  });

  const volumeData = createMemo(() => {
    const id = selected();
    if (!id || !isWeight()) return [];
    return getExerciseTotalVolume(store.sessions, id);
  });

  const cardioData = createMemo(() => {
    const id = selected();
    if (!id || isWeight()) return [];
    return getCardioBestValue(store.sessions, id);
  });

  const cardioLabel = createMemo(() => {
    const e = exercise();
    if (!e) return "";
    if (e.unit === "laps") return "Total Laps";
    return "Best Time";
  });

  const cardioUnit = createMemo(() => {
    const e = exercise();
    if (!e) return "";
    if (e.unit === "laps") return "laps";
    return "s";
  });

  return (
    <Layout>
      <header class="flex items-center justify-between py-4">
        <h1 class="text-4xl font-bold font-jakarta text-primary-color">
          Progress
        </h1>
      </header>

      <Show
        when={exercisesWithData().length > 0}
        fallback={
          <div class="flex flex-col items-center justify-center gap-3 py-16">
            <svg
              class="w-12 h-12 text-tertiary-color"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
              />
            </svg>
            <span class="text-sm font-inter text-tertiary-color text-center">
              Log some training sessions to see your progress
            </span>
          </div>
        }
      >
        <div class="flex flex-col gap-5">
          <div class="flex flex-col gap-2">
            <h2 class="text-base font-bold font-jakarta text-primary-color">
              Exercise
            </h2>
            <div class="flex flex-wrap gap-2">
              <For each={exercisesWithData()}>
                {(id) => {
                  const ex = getExerciseById(id);
                  return (
                    <button
                      class="text-xs font-inter font-medium px-3 py-1.5 rounded-lg"
                      classList={{
                        "bg-purple text-white-color": selected() === id,
                        "bg-elevated text-secondary-color": selected() !== id,
                      }}
                      onClick={() => setSelectedExercise(id)}
                    >
                      {ex?.name ?? id}
                    </button>
                  );
                }}
              </For>
            </div>
          </div>

          <Show when={isWeight()}>
            <div class="flex flex-col gap-4">
              <LineChart
                data={maxWeightData()}
                label="Max Weight"
                unit="lb"
                color="var(--accent-purple)"
              />
              <LineChart
                data={volumeData()}
                label="Total Volume"
                unit="lb"
                color="var(--accent-teal)"
              />
            </div>
          </Show>

          <Show when={!isWeight() && exercise()}>
            <LineChart
              data={cardioData()}
              label={cardioLabel()}
              unit={cardioUnit()}
              color="var(--accent-teal)"
            />
          </Show>
        </div>
      </Show>
    </Layout>
  );
};

export default Progress;
