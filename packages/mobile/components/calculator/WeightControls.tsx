import { View, Text, Pressable } from 'react-native';
import { useMemo } from 'react';
import { MAX_PERCENTAGE, MAX_WEIGHT, MIN_PERCENTAGE, PERCENTAGE_STEP } from '@barbell/shared';
import { useStore } from '@/store/useStore';

export const WeightControls = () => {
  const { weight, percentage, barWeight, setWeight, setPercentage, setPercentageWeight } = useStore();

  const updatePercentageWeight = (newPercentage: number) => {
    const newPercentageWeight = (newPercentage / 100) * weight;
    setPercentageWeight(newPercentageWeight);
    setPercentage(newPercentage);
  };

  const incrementWeight = () => {
    const newWeight = Math.min(weight + 5, MAX_WEIGHT);
    setWeight(newWeight);
    setPercentageWeight((percentage / 100) * newWeight);
  };

  const decrementWeight = () => {
    const newWeight = Math.max(weight - 5, barWeight);
    setWeight(newWeight);
    setPercentageWeight((percentage / 100) * newWeight);
  };

  const incrementPercentage = () => {
    updatePercentageWeight(Math.min(percentage + PERCENTAGE_STEP, MAX_PERCENTAGE));
  };

  const decrementPercentage = () => {
    updatePercentageWeight(Math.max(percentage - PERCENTAGE_STEP, MIN_PERCENTAGE));
  };

  const decrementButtonDisabled = useMemo(() => percentage === MIN_PERCENTAGE, [percentage]);
  const increaseButtonDisabled = useMemo(() => percentage === MAX_PERCENTAGE, [percentage]);

  return (
    <View className="flex flex-col gap-5">
      <View className="flex flex-col gap-3 w-full">
        <Text className="text-xl font-bold text-foreground">Target Weight</Text>
        <View className="flex flex-row items-center justify-between rounded-xl px-5 h-[72px] bg-surface">
          <Text className="text-4xl font-extrabold text-foreground-secondary">{weight}</Text>
          <View className="flex flex-row gap-3">
            <Pressable
              className="flex items-center justify-center w-11 h-11 rounded-[22px] bg-primary"
              onPress={decrementWeight}
            >
              <Text className="text-xl text-white">−</Text>
            </Pressable>
            <Pressable
              className="flex items-center justify-center w-11 h-11 rounded-[22px] bg-primary"
              onPress={incrementWeight}
            >
              <Text className="text-xl text-white">+</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View className="flex flex-col gap-3 w-full">
        <Text className="text-xl font-bold text-foreground">Training % of Target</Text>
        <View className="flex flex-row items-center justify-between rounded-xl px-5 h-[72px] bg-surface">
          <Text className="text-4xl font-extrabold text-foreground-secondary">{percentage}%</Text>
          <View className="flex flex-row gap-3">
            <Pressable
              className={`flex items-center justify-center w-11 h-11 rounded-[22px] bg-primary ${
                decrementButtonDisabled && 'opacity-50'
              }`}
              onPress={decrementPercentage}
              disabled={decrementButtonDisabled}
            >
              <Text className="text-xl text-white">−</Text>
            </Pressable>
            <Pressable
              className={`flex items-center justify-center w-11 h-11 rounded-[22px] bg-primary ${
                increaseButtonDisabled && 'opacity-50'
              }`}
              onPress={incrementPercentage}
              disabled={increaseButtonDisabled}
            >
              <Text className="text-xl text-white">+</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};
