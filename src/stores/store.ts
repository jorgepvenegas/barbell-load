import { createStore } from "solid-js/store";
import { createRoot } from "solid-js";
import { BarWeight } from "../utils/calculators";

// Define types for our store
type StoreState = {
  weight: number;
  percentage: number;
  percentageWeight?: number;
  barWeight: BarWeight;
};

type StoreActions = {
  resetStore: () => void;
  setWeight: (weight: number) => void;
  setPercentage: (percentage: number) => void;
  setPercentageWeight: (percentageWeight: number) => void;
  setBarWeight: (barWeight: BarWeight) => void;
};

const initialState: StoreState = {
  weight: 65,
  percentage: 100,
  barWeight: 45,
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
  };

  return { state, actions };
};

// Create a singleton instance of the store
export const CustomStore = createRoot(createCustomStore);

// Export helper hooks for components
export const useStore = () => CustomStore.state;
export const useStoreActions = () => CustomStore.actions;
