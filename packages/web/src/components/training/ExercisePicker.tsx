import { type Component, For, createSignal, Show } from "solid-js";
import { exercises, type Exercise, type ExerciseType } from "@barbell/shared";

interface ExercisePickerProps {
  onSelect: (exerciseId: string) => void;
  onCancel: () => void;
}

const ExercisePicker: Component<ExercisePickerProps> = (props) => {
  const [filter, setFilter] = createSignal<ExerciseType | "all">("all");
  const [search, setSearch] = createSignal("");

  const filtered = () =>
    exercises.filter((e) => {
      const matchesType = filter() === "all" || e.type === filter();
      const matchesSearch =
        search() === "" ||
        e.name.toLowerCase().includes(search().toLowerCase());
      return matchesType && matchesSearch;
    });

  return (
    <div class="flex flex-col gap-4 rounded-xl p-4 bg-card">
      <div class="flex items-center justify-between">
        <h3 class="text-base font-bold font-jakarta text-primary-color">
          Add Exercise
        </h3>
        <button
          class="text-sm font-inter font-medium text-tertiary-color"
          onClick={props.onCancel}
        >
          Cancel
        </button>
      </div>

      <input
        type="text"
        placeholder="Search exercises..."
        class="rounded-lg px-3 py-2 text-sm font-inter bg-elevated text-primary-color outline-none"
        value={search()}
        onInput={(e) => setSearch(e.currentTarget.value)}
      />

      <div class="flex gap-2">
        <button
          class="text-xs font-inter font-medium px-3 py-1.5 rounded-lg"
          classList={{
            "bg-purple text-white-color": filter() === "all",
            "bg-elevated text-secondary-color": filter() !== "all",
          }}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          class="text-xs font-inter font-medium px-3 py-1.5 rounded-lg"
          classList={{
            "bg-purple text-white-color": filter() === "weight",
            "bg-elevated text-secondary-color": filter() !== "weight",
          }}
          onClick={() => setFilter("weight")}
        >
          Weight
        </button>
        <button
          class="text-xs font-inter font-medium px-3 py-1.5 rounded-lg"
          classList={{
            "bg-purple text-white-color": filter() === "cardio",
            "bg-elevated text-secondary-color": filter() !== "cardio",
          }}
          onClick={() => setFilter("cardio")}
        >
          Cardio
        </button>
      </div>

      <div class="flex flex-col gap-1 max-h-[240px] overflow-y-auto">
        <Show
          when={filtered().length > 0}
          fallback={
            <span class="text-sm font-inter text-tertiary-color py-2">
              No exercises found
            </span>
          }
        >
          <For each={filtered()}>
            {(exercise) => (
              <button
                class="flex items-center justify-between px-3 py-2.5 rounded-lg text-left hover:bg-elevated"
                onClick={() => props.onSelect(exercise.id)}
              >
                <span class="text-sm font-inter font-medium text-primary-color">
                  {exercise.name}
                </span>
                <span class="text-xs font-inter text-tertiary-color">
                  {exercise.type === "weight" ? "Weight" : exercise.unit}
                </span>
              </button>
            )}
          </For>
        </Show>
      </div>
    </div>
  );
};

export default ExercisePicker;
