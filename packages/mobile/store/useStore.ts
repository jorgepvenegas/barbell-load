import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  availablePlates,
  BarWeight,
} from '@barbell/shared';

type StoreState = {
  weight: number;
  percentage: number;
  percentageWeight: number;
  barWeight: BarWeight;
  selectedPlates: typeof availablePlates;
  isHydrated: boolean;
};

type StoreActions = {
  setWeight: (weight: number) => void;
  setPercentage: (percentage: number) => void;
  setPercentageWeight: (percentageWeight: number) => void;
  setBarWeight: (barWeight: BarWeight) => void;
  setSelectedPlates: (selectedPlates: typeof availablePlates) => void;
  resetStore: () => void;
  setHydrated: () => void;
};

type Store = StoreState & StoreActions;

const initialState: StoreState = {
  weight: 65,
  percentage: 100,
  percentageWeight: 65,
  barWeight: 45,
  selectedPlates: availablePlates,
  isHydrated: false,
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      ...initialState,

      setWeight: (weight) => set({ weight }),
      setPercentage: (percentage) => set({ percentage }),
      setPercentageWeight: (percentageWeight) => set({ percentageWeight }),
      setBarWeight: (barWeight) => set({ barWeight }),
      setSelectedPlates: (selectedPlates) => set({ selectedPlates }),
      resetStore: () => set(initialState),
      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: '@mobile/barbell-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        weight: state.weight,
        percentage: state.percentage,
        barWeight: state.barWeight,
        selectedPlates: state.selectedPlates,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);
