import { type Component, Show } from "solid-js";
import Layout from "../Layout";
import SessionList from "./SessionList";
import SessionEditor from "./SessionEditor";
import {
  useTrainingStore,
  useTrainingActions,
  useActiveSession,
} from "../../stores/trainingStore";

const Training: Component = () => {
  const store = useTrainingStore();
  const actions = useTrainingActions();
  const activeSession = useActiveSession();

  return (
    <Layout>
      <header class="flex items-center justify-between py-4">
        <h1 class="text-4xl font-bold font-jakarta text-primary-color">
          Training
        </h1>
      </header>

      <Show
        when={activeSession()}
        fallback={
          <SessionList
            sessions={store.sessions}
            onStart={actions.startSession}
            onResume={actions.resumeSession}
            onDelete={actions.deleteSession}
          />
        }
      >
        {(session) => (
          <SessionEditor
            session={session()}
            onBack={actions.clearActiveSession}
            onUpdateDate={(date) => actions.updateSessionDate(session().id, date)}
            onAddExercise={actions.addExerciseEntry}
            onRemoveExercise={actions.removeExerciseEntry}
            onAddWeightSet={actions.addWeightSet}
            onAddCardioSet={actions.addCardioSet}
            onRemoveSet={actions.removeSet}
          />
        )}
      </Show>
    </Layout>
  );
};

export default Training;
