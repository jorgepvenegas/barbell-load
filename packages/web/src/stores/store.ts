import { createStore } from "solid-js/store";
import { createRoot, createEffect } from "solid-js";
import { availablePlates, BarWeight, STORAGE_KEY, WEIGHT_STORAGE_KEY, PERCENTAGE_STORAGE_KEY, BAR_WEIGHT_STORAGE_KEY } from "@barbell/shared";
import { useLocalStorage } from "../utils/useLocalStorage";

// Define types for our store
type StoreState = {
  weight: number;
  percentage: number;
  percentageWeight: number;
  barWeight: BarWeight;
  selectedPlates: typeof availablePlates;
};

type StoreActions = {
  resetStore: () => void;
  setWeight: (weight: number) => void;
  setPercentage: (percentage: number) => void;
  setPercentageWeight: (percentageWeight: number) => void;
  setBarWeight: (barWeight: BarWeight) => void;
  setSelectedPlates: (selectedPlates: typeof availablePlates) => void;
};

const initialState: StoreState = {
  weight: useLocalStorage<number>(WEIGHT_STORAGE_KEY, 65),
  percentage: useLocalStorage<number>(PERCENTAGE_STORAGE_KEY, 100),
  barWeight: useLocalStorage<BarWeight>(BAR_WEIGHT_STORAGE_KEY, 45),
  selectedPlates: useLocalStorage<typeof availablePlates>(STORAGE_KEY, availablePlates),
  percentageWeight: useLocalStorage<number>(WEIGHT_STORAGE_KEY, 65),
};
  
// Create the store with actions
const createCustomStore = () => {
  const [state, setState] = createStore<StoreState>(initialState);

  const actions: StoreActions = {
    resetStore: () => {
      setState(initialState);
    },
    setWeight: (weight: number) => {
      setState("weight", weight);
    },
    setPercentage: (percentage: number) => {
      setState("percentage", percentage);
    },
    setPercentageWeight: (percentageWeight: number) => {
      setState("percentageWeight", percentageWeight);
    },
    setBarWeight: (barWeight: BarWeight) => {
      setState("barWeight", barWeight);
    },
    setSelectedPlates: (selectedPlates: typeof availablePlates) => {
      setState("selectedPlates", selectedPlates);
    },
  };

  // Persist state changes to localStorage
  createEffect(() => {
    localStorage.setItem(WEIGHT_STORAGE_KEY, JSON.stringify(state.weight));
  });

  createEffect(() => {
    localStorage.setItem(PERCENTAGE_STORAGE_KEY, JSON.stringify(state.percentage));
  });

  createEffect(() => {
    localStorage.setItem(BAR_WEIGHT_STORAGE_KEY, JSON.stringify(state.barWeight));
  });

  createEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.selectedPlates));
  });

  return { state, actions };
};

// Create a singleton instance of the store
export const CustomStore = createRoot(createCustomStore);

// Export helper hooks for components
export const useStore = () => CustomStore.state;
export const useStoreActions = () => CustomStore.actions;
