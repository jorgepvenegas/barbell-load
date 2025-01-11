import { createSignal, createEffect } from "solid-js";
import {
  PlatePair,
  calculatePlates,
} from "../utils/calculators";
import { useStore } from "../stores/store";

export const useWeightCalculator = () => {
  const store = useStore();
  // TODO: Do we need to use signals here?
  const [percentageWeight, setPercentageWeight] = createSignal(store.weight);
  const [plates, setPlates] = createSignal<Array<PlatePair>>();

  createEffect(() => {
    const targetWeight = store.weight * (store.percentage / 100);
    const calculatedPlates = calculatePlates({
      targetWeight,
      barWeight: store.barWeight,
      selectedPlates: store.selectedPlates,
    });

    setPercentageWeight(targetWeight);
    setPlates(calculatedPlates);
  });

  return { percentageWeight, plates };
};