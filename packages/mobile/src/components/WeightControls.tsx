import { View, Text, Pressable } from 'react-native';
import { useMemo } from 'react';
import { MAX_PERCENTAGE, MAX_WEIGHT, MIN_PERCENTAGE, PERCENTAGE_STEP } from '@barbell/shared';
import { useStore } from '../stores/useStore';

export const WeightControls = () => {
  const { weight, percentage, percentageWeight, barWeight, setWeight, setPercentage, setPercentageWeight } = useStore();

  const updatePercentageWeight = (newPercentage: number) => {
    const newPercentageWeight = (newPercentage / 100) * weight;
    setPercentageWeight(newPercentageWeight);
    setPercentage(newPercentage);
  };

  const incrementWeight = () => {
    const newWeight = Math.min(weight + 5, MAX_WEIGHT);
    setWeight(newWeight);
  };

  const decrementWeight = () => {
    const newWeight = Math.max(weight - 5, barWeight);
    setWeight(newWeight);
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
        <Text className="text-xl font-bold text-purple-600">Target Weight</Text>
        <View className="flex flex-row items-center justify-between rounded-xl px-5 h-[72px] bg-gray-100">
          <Text className="text-[34px] font-extrabold text-gray-900">{weight}</Text>
          <View className="flex flex-row gap-3">
            <Pressable
              className="flex items-center justify-center w-11 h-11 rounded-[22px] bg-gray-200"
              onPress={decrementWeight}
            >
              <Text className="text-xl text-gray-900">−</Text>
            </Pressable>
            <Pressable
              className="flex items-center justify-center w-11 h-11 rounded-[22px] bg-purple-600"
              onPress={incrementWeight}
            >
              <Text className="text-xl text-white">+</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View className="flex flex-col gap-3 w-full">
        <Text className="text-xl font-bold text-purple-600">Training % of Target</Text>
        <View className="flex flex-row items-center justify-between rounded-xl px-5 h-[72px] bg-gray-100">
          <Text className="text-[34px] font-extrabold text-teal-600">{percentage}%</Text>
          <View className="flex flex-row gap-3">
            <Pressable
              className={`flex items-center justify-center w-11 h-11 rounded-[22px] ${
                decrementButtonDisabled ? 'bg-gray-300 opacity-50' : 'bg-gray-200'
              }`}
              onPress={decrementPercentage}
              disabled={decrementButtonDisabled}
            >
              <Text className="text-xl text-gray-900">−</Text>
            </Pressable>
            <Pressable
              className={`flex items-center justify-center w-11 h-11 rounded-[22px] ${
                increaseButtonDisabled ? 'bg-purple-400 opacity-50' : 'bg-purple-600'
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
