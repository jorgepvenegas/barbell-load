import type { BarWeight, PlateWeight, PlatePair } from './calculators';

export type { BarWeight, PlateWeight, PlatePair };

export type StoreState = {
  weight: number;
  percentage: number;
  percentageWeight: number;
  barWeight: BarWeight;
  selectedPlates: Array<{
    enabled: boolean;
    weight: PlateWeight;
  }>;
};

export type StoreActions = {
  resetStore: () => void;
  setWeight: (weight: number) => void;
  setPercentage: (percentage: number) => void;
  setPercentageWeight: (percentageWeight: number) => void;
  setBarWeight: (barWeight: BarWeight) => void;
  setSelectedPlates: (selectedPlates: StoreState['selectedPlates']) => void;
};
