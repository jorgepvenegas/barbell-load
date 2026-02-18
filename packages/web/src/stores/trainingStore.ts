import { createStore, produce } from "solid-js/store";
import { createRoot, createEffect } from "solid-js";
import {
  type TrainingSession,
  type ExerciseEntry,
  type WeightSet,
  type CardioSet,
  generateSessionId,
  TRAINING_SESSIONS_STORAGE_KEY,
} from "@barbell/shared";
import { useLocalStorage } from "../utils/useLocalStorage";

type TrainingStoreState = {
  sessions: TrainingSession[];
  activeSessionId: string | null;
};

const createTrainingStore = () => {
  const [state, setState] = createStore<TrainingStoreState>({
    sessions: useLocalStorage<TrainingSession[]>(TRAINING_SESSIONS_STORAGE_KEY, []),
    activeSessionId: null,
  });

  const getActiveSession = () =>
    state.sessions.find((s) => s.id === state.activeSessionId);

  const actions = {
    startSession: () => {
      const session: TrainingSession = {
        id: generateSessionId(),
        date: new Date().toISOString().split("T")[0],
        entries: [],
      };
      setState(
        produce((s) => {
          s.sessions.push(session);
          s.activeSessionId = session.id;
        })
      );
    },

    resumeSession: (id: string) => {
      setState("activeSessionId", id);
    },

    clearActiveSession: () => {
      setState("activeSessionId", null);
    },

    deleteSession: (id: string) => {
      setState(
        produce((s) => {
          s.sessions = s.sessions.filter((sess) => sess.id !== id);
          if (s.activeSessionId === id) s.activeSessionId = null;
        })
      );
    },

    addExerciseEntry: (exerciseId: string) => {
      const idx = state.sessions.findIndex((s) => s.id === state.activeSessionId);
      if (idx === -1) return;
      const entry: ExerciseEntry = { exerciseId, sets: [] };
      setState(
        produce((s) => {
          s.sessions[idx].entries.push(entry);
        })
      );
    },

    removeExerciseEntry: (entryIndex: number) => {
      const idx = state.sessions.findIndex((s) => s.id === state.activeSessionId);
      if (idx === -1) return;
      setState(
        produce((s) => {
          s.sessions[idx].entries.splice(entryIndex, 1);
        })
      );
    },

    addWeightSet: (entryIndex: number, set: WeightSet) => {
      const idx = state.sessions.findIndex((s) => s.id === state.activeSessionId);
      if (idx === -1) return;
      setState(
        produce((s) => {
          (s.sessions[idx].entries[entryIndex].sets as WeightSet[]).push(set);
        })
      );
    },

    addCardioSet: (entryIndex: number, set: CardioSet) => {
      const idx = state.sessions.findIndex((s) => s.id === state.activeSessionId);
      if (idx === -1) return;
      setState(
        produce((s) => {
          (s.sessions[idx].entries[entryIndex].sets as CardioSet[]).push(set);
        })
      );
    },

    removeSet: (entryIndex: number, setIndex: number) => {
      const idx = state.sessions.findIndex((s) => s.id === state.activeSessionId);
      if (idx === -1) return;
      setState(
        produce((s) => {
          s.sessions[idx].entries[entryIndex].sets.splice(setIndex, 1);
        })
      );
    },

    updateSessionDate: (id: string, date: string) => {
      setState(
        produce((s) => {
          const session = s.sessions.find((sess) => sess.id === id);
          if (session) session.date = date;
        })
      );
    },
  };

  createEffect(() => {
    localStorage.setItem(
      TRAINING_SESSIONS_STORAGE_KEY,
      JSON.stringify(state.sessions)
    );
  });

  return { state, actions, getActiveSession };
};

export const TrainingStore = createRoot(createTrainingStore);
export const useTrainingStore = () => TrainingStore.state;
export const useTrainingActions = () => TrainingStore.actions;
export const useActiveSession = () => TrainingStore.getActiveSession;
