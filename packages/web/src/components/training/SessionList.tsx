import { type Component, For, Show } from "solid-js";
import { type TrainingSession, getExerciseById, sessionsToJSON, sessionsToCSV } from "@barbell/shared";
import { downloadFile } from "../../utils/download";

interface SessionListProps {
  sessions: TrainingSession[];
  onStart: () => void;
  onResume: (id: string) => void;
  onDelete: (id: string) => void;
}

const formatDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split("-");
  return `${month}/${day}/${year}`;
};

const SessionList: Component<SessionListProps> = (props) => {
  const sorted = () =>
    [...props.sessions].sort((a, b) => b.date.localeCompare(a.date));

  const exportJSON = () =>
    downloadFile(sessionsToJSON(props.sessions), "training-sessions.json", "application/json");

  const exportCSV = () =>
    downloadFile(sessionsToCSV(props.sessions), "training-sessions.csv", "text/csv");

  return (
    <div class="flex flex-col gap-5">
      <button
        class="flex items-center justify-center gap-2 rounded-xl h-[56px] bg-purple text-white-color font-semibold font-inter text-base w-full"
        onClick={props.onStart}
      >
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m7-7H5" />
        </svg>
        New Session
      </button>

      <Show when={sorted().length > 0}>
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold font-jakarta text-primary-color">
            Past Sessions
          </h2>
          <div class="flex gap-2">
            <button
              class="text-xs font-inter font-medium px-3 py-1.5 rounded-lg bg-elevated text-secondary-color"
              onClick={exportJSON}
            >
              Export JSON
            </button>
            <button
              class="text-xs font-inter font-medium px-3 py-1.5 rounded-lg bg-elevated text-secondary-color"
              onClick={exportCSV}
            >
              Export CSV
            </button>
          </div>
        </div>
        <div class="flex flex-col gap-3">
          <For each={sorted()}>
            {(session) => (
              <div class="flex flex-col gap-2 rounded-xl p-4 bg-card">
                <div class="flex items-center justify-between">
                  <span class="text-sm font-semibold font-inter text-secondary-color">
                    {formatDate(session.date)}
                  </span>
                  <div class="flex gap-2">
                    <button
                      class="text-xs font-inter font-medium px-3 py-1 rounded-lg bg-elevated text-primary-color"
                      onClick={() => props.onResume(session.id)}
                    >
                      Edit
                    </button>
                    <button
                      class="text-xs font-inter font-medium px-3 py-1 rounded-lg text-error"
                      onClick={() => props.onDelete(session.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <Show
                  when={session.entries.length > 0}
                  fallback={
                    <span class="text-sm font-inter text-tertiary-color">
                      No exercises logged
                    </span>
                  }
                >
                  <div class="flex flex-wrap gap-1.5">
                    <For each={session.entries}>
                      {(entry) => {
                        const exercise = getExerciseById(entry.exerciseId);
                        return (
                          <span class="text-xs font-inter font-medium px-2 py-1 rounded-md bg-elevated text-secondary-color">
                            {exercise?.name ?? entry.exerciseId} ({entry.sets.length})
                          </span>
                        );
                      }}
                    </For>
                  </div>
                </Show>
              </div>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
};

export default SessionList;
