import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  STORAGE_KEY,
  WEIGHT_STORAGE_KEY,
  PERCENTAGE_STORAGE_KEY,
  BAR_WEIGHT_STORAGE_KEY,
  availablePlates,
  StoreState,
  StoreActions,
  BarWeight,
} from '@barbell-calc/shared';

const AppContext = createContext<(StoreState & StoreActions) | null>(null);

const initialState: StoreState = {
  weight: 65,
  percentage: 100,
  percentageWeight: 65,
  barWeight: 45,
  selectedPlates: availablePlates,
};

type Action =
  | { type: 'SET_WEIGHT'; payload: number }
  | { type: 'SET_PERCENTAGE'; payload: number }
  | { type: 'SET_PERCENTAGE_WEIGHT'; payload: number }
  | { type: 'SET_BAR_WEIGHT'; payload: BarWeight }
  | { type: 'SET_SELECTED_PLATES'; payload: StoreState['selectedPlates'] }
  | { type: 'RESET_STORE' }
  | { type: 'LOAD_FROM_STORAGE'; payload: Partial<StoreState> };

function appReducer(state: StoreState, action: Action): StoreState {
  switch (action.type) {
    case 'SET_WEIGHT':
      return { ...state, weight: action.payload };
    case 'SET_PERCENTAGE':
      return { ...state, percentage: action.payload };
    case 'SET_PERCENTAGE_WEIGHT':
      return { ...state, percentageWeight: action.payload };
    case 'SET_BAR_WEIGHT':
      return { ...state, barWeight: action.payload };
    case 'SET_SELECTED_PLATES':
      return { ...state, selectedPlates: action.payload };
    case 'RESET_STORE':
      return initialState;
    case 'LOAD_FROM_STORAGE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    loadFromStorage();
  }, []);

  useEffect(() => {
    persistToStorage();
  }, [state]);

  const loadFromStorage = async () => {
    try {
      const [weight, percentage, percentageWeight, barWeight, selectedPlates] = await Promise.all([
        AsyncStorage.getItem(WEIGHT_STORAGE_KEY),
        AsyncStorage.getItem(PERCENTAGE_STORAGE_KEY),
        AsyncStorage.getItem(PERCENTAGE_STORAGE_KEY),
        AsyncStorage.getItem(BAR_WEIGHT_STORAGE_KEY),
        AsyncStorage.getItem(STORAGE_KEY),
      ]);

      const updates: Partial<StoreState> = {};
      if (weight) updates.weight = JSON.parse(weight);
      if (percentage) updates.percentage = JSON.parse(percentage);
      if (percentageWeight) updates.percentageWeight = JSON.parse(percentageWeight);
      if (barWeight) updates.barWeight = JSON.parse(barWeight);
      if (selectedPlates) updates.selectedPlates = JSON.parse(selectedPlates);

      if (Object.keys(updates).length > 0) {
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: updates });
      }
    } catch (e) {
      console.error('Failed to load from storage:', e);
    }
  };

  const persistToStorage = async () => {
    try {
      await Promise.all([
        AsyncStorage.setItem(WEIGHT_STORAGE_KEY, JSON.stringify(state.weight)),
        AsyncStorage.setItem(PERCENTAGE_STORAGE_KEY, JSON.stringify(state.percentage)),
        AsyncStorage.setItem(BAR_WEIGHT_STORAGE_KEY, JSON.stringify(state.barWeight)),
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state.selectedPlates)),
      ]);
    } catch (e) {
      console.error('Failed to persist to storage:', e);
    }
  };

  const value: StoreState & StoreActions = {
    ...state,
    resetStore: () => dispatch({ type: 'RESET_STORE' }),
    setWeight: (weight) => dispatch({ type: 'SET_WEIGHT', payload: weight }),
    setPercentage: (percentage) => dispatch({ type: 'SET_PERCENTAGE', payload: percentage }),
    setPercentageWeight: (percentageWeight) =>
      dispatch({ type: 'SET_PERCENTAGE_WEIGHT', payload: percentageWeight }),
    setBarWeight: (barWeight) => dispatch({ type: 'SET_BAR_WEIGHT', payload: barWeight }),
    setSelectedPlates: (selectedPlates) =>
      dispatch({ type: 'SET_SELECTED_PLATES', payload: selectedPlates }),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppStore() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppStore must be used within AppProvider');
  }
  return context;
}
