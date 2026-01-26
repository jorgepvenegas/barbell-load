import { View, Text } from 'react-native';
import { useMemo } from 'react';
import { calculatePlates } from '@barbell/shared';
import { useStore } from '../stores/useStore';

export const PlateResults = () => {
  const { weight, percentage, percentageWeight, barWeight, selectedPlates } = useStore();

  const plates = useMemo(
    () =>
      calculatePlates({
        targetWeight: weight * (percentage / 100),
        barWeight,
        selectedPlates,
      }),
    [weight, percentage, barWeight, selectedPlates]
  );

  const isLessThanTheBarbell = useMemo(() => {
    return percentageWeight && percentageWeight < barWeight;
  }, [percentageWeight, barWeight]);

  return (
    <View className="flex flex-col gap-4 w-full">
      <Text className="text-xl font-bold text-purple-600">Calculated Weight</Text>
      <View className="flex flex-col gap-4 rounded-xl p-6 bg-purple-600 shadow-lg">
        <Text className="text-[34px] font-extrabold text-white">
          {percentageWeight.toFixed(0)} lb
        </Text>

        <Text className="text-[15px] font-medium text-white opacity-80">
          {barWeight} lb Barbell
        </Text>

        {!isLessThanTheBarbell && (
          <View className="text-[15px]">
            {plates && plates.length > 0 ? (
              <View>
                <Text className="text-white opacity-85 mb-1">Plates Per Side:</Text>
                {plates.map(({ count, weight }, index) => (
                  <Text key={index} className="text-white opacity-85">
                    {count}× {weight} lb
                  </Text>
                ))}
              </View>
            ) : (
              <Text className="text-white opacity-85">Just the barbell!</Text>
            )}
          </View>
        )}

        {isLessThanTheBarbell && (
          <Text className="text-[15px] text-white opacity-85">
            That's less than the barbell weight
          </Text>
        )}
      </View>
    </View>
  );
};
