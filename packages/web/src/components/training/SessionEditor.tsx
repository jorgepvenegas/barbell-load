import { type Component, For, Show, createSignal } from "solid-js";
import {
  type TrainingSession,
  type WeightSet,
  type CardioSet,
  getExerciseById,
} from "@barbell/shared";
import ExercisePicker from "./ExercisePicker";

interface SessionEditorProps {
  session: TrainingSession;
  onBack: () => void;
  onUpdateDate: (date: string) => void;
  onAddExercise: (exerciseId: string) => void;
  onRemoveExercise: (entryIndex: number) => void;
  onAddWeightSet: (entryIndex: number, set: WeightSet) => void;
  onAddCardioSet: (entryIndex: number, set: CardioSet) => void;
  onRemoveSet: (entryIndex: number, setIndex: number) => void;
}

const SessionEditor: Component<SessionEditorProps> = (props) => {
  const [showPicker, setShowPicker] = createSignal(false);
  const [weightInputs, setWeightInputs] = createSignal<
    Record<number, { reps: string; weight: string }>
  >({});
  const [cardioInputs, setCardioInputs] = createSignal<
    Record<number, { value: string; duration: string }>
  >({});

  const handleAddExercise = (exerciseId: string) => {
    props.onAddExercise(exerciseId);
    setShowPicker(false);
  };

  const handleAddWeightSet = (entryIndex: number) => {
    const input = weightInputs()[entryIndex];
    const reps = parseInt(input?.reps || "0", 10);
    const weight = parseFloat(input?.weight || "0");
    if (reps > 0 && weight > 0) {
      props.onAddWeightSet(entryIndex, { reps, weight });
      setWeightInputs((prev) => ({
        ...prev,
        [entryIndex]: { reps: "", weight: "" },
      }));
    }
  };

  const handleAddCardioSet = (entryIndex: number) => {
    const input = cardioInputs()[entryIndex];
    const value = parseFloat(input?.value || "0");
    const duration = input?.duration ? parseFloat(input.duration) : undefined;
    if (value > 0) {
      props.onAddCardioSet(entryIndex, {
        value,
        ...(duration ? { duration } : {}),
      });
      setCardioInputs((prev) => ({
        ...prev,
        [entryIndex]: { value: "", duration: "" },
      }));
    }
  };

  return (
    <div class="flex flex-col gap-5">
      <div class="flex items-center gap-3">
        <button
          class="flex items-center justify-center w-9 h-9 rounded-[18px] bg-elevated"
          onClick={props.onBack}
          aria-label="Back to sessions"
        >
          <svg
            class="w-5 h-5 text-primary-color"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <input
          type="date"
          class="text-sm font-inter font-medium text-secondary-color bg-transparent outline-none border-none cursor-pointer"
          value={props.session.date}
          onChange={(e) => props.onUpdateDate(e.currentTarget.value)}
        />
      </div>

      <For each={props.session.entries}>
        {(entry, entryIndex) => {
          const exercise = () => getExerciseById(entry.exerciseId);
          const isWeight = () => exercise()?.type === "weight";

          return (
            <div class="flex flex-col gap-3 rounded-xl p-4 bg-card">
              <div class="flex items-center justify-between">
                <h3 class="text-base font-bold font-jakarta text-primary-color">
                  {exercise()?.name ?? entry.exerciseId}
                </h3>
                <button
                  class="text-xs font-inter font-medium text-error"
                  onClick={() => props.onRemoveExercise(entryIndex())}
                >
                  Remove
                </button>
              </div>

              <Show when={entry.sets.length > 0}>
                <div class="flex flex-col gap-1">
                  <div class="flex gap-2 text-xs font-inter font-medium text-tertiary-color px-1">
                    <span class="w-8">Set</span>
                    <Show
                      when={isWeight()}
                      fallback={
                        <>
                          <span class="flex-1">
                            {exercise()?.unit === "laps" ? "Laps" : "Time"}
                          </span>
                          <Show when={exercise()?.unit !== "laps"}>
                            <span class="flex-1">Duration (s)</span>
                          </Show>
                        </>
                      }
                    >
                      <span class="flex-1">Reps</span>
                      <span class="flex-1">Weight (lb)</span>
                    </Show>
                    <span class="w-8" />
                  </div>
                  <For each={entry.sets}>
                    {(set, setIdx) => (
                      <div class="flex items-center gap-2 px-1 py-1">
                        <span class="w-8 text-sm font-inter font-medium text-secondary-color">
                          {setIdx() + 1}
                        </span>
                        <Show
                          when={isWeight()}
                          fallback={
                            <>
                              <span class="flex-1 text-sm font-inter font-semibold text-primary-color">
                                {(set as CardioSet).value}
                              </span>
                              <Show when={exercise()?.unit !== "laps"}>
                                <span class="flex-1 text-sm font-inter text-primary-color">
                                  {(set as CardioSet).duration ?? "-"}
                                </span>
                              </Show>
                            </>
                          }
                        >
                          <span class="flex-1 text-sm font-inter font-semibold text-primary-color">
                            {(set as WeightSet).reps}
                          </span>
                          <span class="flex-1 text-sm font-inter text-primary-color">
                            {(set as WeightSet).weight} lb
                          </span>
                        </Show>
                        <button
                          class="w-8 flex items-center justify-center"
                          onClick={() =>
                            props.onRemoveSet(entryIndex(), setIdx())
                          }
                          aria-label={`Remove set ${setIdx() + 1}`}
                        >
                          <svg
                            class="w-4 h-4 text-tertiary-color"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                  </For>
                </div>
              </Show>

              <Show
                when={isWeight()}
                fallback={
                  <div class="flex gap-2 items-end">
                    <div class="flex flex-col gap-1 flex-1">
                      <label class="text-xs font-inter text-tertiary-color">
                        {exercise()?.unit === "laps" ? "Laps" : "Time"}
                      </label>
                      <input
                        type="number"
                        inputMode="decimal"
                        class="rounded-lg px-3 py-2 text-sm font-inter bg-elevated text-primary-color outline-none w-full"
                        placeholder="0"
                        value={cardioInputs()[entryIndex()]?.value ?? ""}
                        onInput={(e) =>
                          setCardioInputs((prev) => ({
                            ...prev,
                            [entryIndex()]: {
                              ...prev[entryIndex()],
                              value: e.currentTarget.value,
                            },
                          }))
                        }
                      />
                    </div>
                    <Show when={exercise()?.unit !== "laps"}>
                      <div class="flex flex-col gap-1 flex-1">
                        <label class="text-xs font-inter text-tertiary-color">
                          Duration (s)
                        </label>
                        <input
                          type="number"
                          inputMode="decimal"
                          class="rounded-lg px-3 py-2 text-sm font-inter bg-elevated text-primary-color outline-none w-full"
                          placeholder="0"
                          value={cardioInputs()[entryIndex()]?.duration ?? ""}
                          onInput={(e) =>
                            setCardioInputs((prev) => ({
                              ...prev,
                              [entryIndex()]: {
                                ...prev[entryIndex()],
                                duration: e.currentTarget.value,
                              },
                            }))
                          }
                        />
                      </div>
                    </Show>
                    <button
                      class="flex items-center justify-center w-9 h-9 rounded-[18px] bg-purple shrink-0"
                      onClick={() => handleAddCardioSet(entryIndex())}
                      aria-label="Add set"
                    >
                      <svg
                        class="w-4 h-4 text-white-color"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 5v14m7-7H5"
                        />
                      </svg>
                    </button>
                  </div>
                }
              >
                <div class="flex gap-2 items-end">
                  <div class="flex flex-col gap-1 flex-1">
                    <label class="text-xs font-inter text-tertiary-color">
                      Reps
                    </label>
                    <input
                      type="number"
                      inputMode="numeric"
                      min="1"
                      class="rounded-lg px-3 py-2 text-sm font-inter bg-elevated text-primary-color outline-none w-full"
                      placeholder="0"
                      value={weightInputs()[entryIndex()]?.reps ?? ""}
                      onInput={(e) =>
                        setWeightInputs((prev) => ({
                          ...prev,
                          [entryIndex()]: {
                            ...prev[entryIndex()],
                            reps: e.currentTarget.value,
                          },
                        }))
                      }
                    />
                  </div>
                  <div class="flex flex-col gap-1 flex-1">
                    <label class="text-xs font-inter text-tertiary-color">
                      Weight (lb)
                    </label>
                    <input
                      type="number"
                      inputMode="decimal"
                      min="1"
                      class="rounded-lg px-3 py-2 text-sm font-inter bg-elevated text-primary-color outline-none w-full"
                      placeholder="0"
                      value={weightInputs()[entryIndex()]?.weight ?? ""}
                      onInput={(e) =>
                        setWeightInputs((prev) => ({
                          ...prev,
                          [entryIndex()]: {
                            ...prev[entryIndex()],
                            weight: e.currentTarget.value,
                          },
                        }))
                      }
                    />
                  </div>
                  <button
                    class="flex items-center justify-center w-9 h-9 rounded-[18px] bg-purple shrink-0"
                    onClick={() => handleAddWeightSet(entryIndex())}
                    aria-label="Add set"
                  >
                    <svg
                      class="w-4 h-4 text-white-color"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 5v14m7-7H5"
                      />
                    </svg>
                  </button>
                </div>
              </Show>
            </div>
          );
        }}
      </For>

      <Show
        when={showPicker()}
        fallback={
          <button
            class="flex items-center justify-center gap-2 rounded-xl h-[48px] bg-elevated text-primary-color font-medium font-inter text-sm w-full"
            onClick={() => setShowPicker(true)}
          >
            <svg
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 5v14m7-7H5"
              />
            </svg>
            Add Exercise
          </button>
        }
      >
        <ExercisePicker
          onSelect={handleAddExercise}
          onCancel={() => setShowPicker(false)}
        />
      </Show>
    </div>
  );
};

export default SessionEditor;
