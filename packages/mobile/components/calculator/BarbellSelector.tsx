import { View, Text, Pressable } from 'react-native';
import { useStore } from '@/store/useStore';

export const BarbellSelector = () => {
  const { barWeight, setBarWeight } = useStore();

  const isSelected = (weight: number) => barWeight === weight;

  return (
    <View className="flex flex-col gap-4 w-full">
      <Text className="text-xl font-bold text-foreground">Barbell Type</Text>
      <View className="flex flex-row gap-3 w-full">
        <Pressable
          className={`flex w-1/2 flex-row items-center justify-between h-16 rounded-xl px-6 ${
            isSelected(45) ? 'bg-primary' : 'bg-surface'
          }`}
          onPress={() => setBarWeight(45)}
        >
          <Text
            className={`text-lg font-bold ${
              isSelected(45) ? 'text-white' : 'text-foreground-secondary'
            }`}
          >
            45 lb
          </Text>
          {isSelected(45) ? (
            <Text className="text-2xl text-white">✓</Text>
          ) : (
            <View className="w-7 h-7 rounded-full border-2 border-border" />
          )}
        </Pressable>

        <Pressable
          className={`flex w-1/2 flex-row items-center justify-between h-16 rounded-xl px-6 ${
            isSelected(33) ? 'bg-primary' : 'bg-surface'
          }`}
          onPress={() => setBarWeight(33)}
        >
          <Text
            className={`text-lg font-bold ${
              isSelected(33) ? 'text-white' : 'text-foreground-secondary'
            }`}
          >
            33 lb
          </Text>
          {isSelected(33) ? (
            <Text className="text-2xl text-white">✓</Text>
          ) : (
            <View className="w-7 h-7 rounded-full border-2 border-border" />
          )}
        </Pressable>
      </View>
    </View>
  );
};
