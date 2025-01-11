import { createSignal, createEffect } from "solid-js";
import {
  availablePlates,
  PlatePair,
  calculatePlates,
} from "../utils/calculators";
import { useStore } from "../stores/store";

export const useWeightCalculator = (
  selectedPlates: () => typeof availablePlates
) => {

  const store = useStore();
  const [percentageWeight, setPercentageWeight] = createSignal(store.weight);
  const [plates, setPlates] = createSignal<Array<PlatePair>>();

  createEffect(() => {
    const targetWeight = store.weight * (store.percentage / 100);
    const calculatedPlates = calculatePlates({
      targetWeight,
      barWeight: store.barWeight,
      selectedPlates: selectedPlates(),
    });

    setPercentageWeight(targetWeight);
    setPlates(calculatedPlates);
  });

  return { percentageWeight, plates };
};