import React, { useMemo, useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Pressable,
  Platform,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { calculatePlates, MAX_PERCENTAGE, MIN_PERCENTAGE, PERCENTAGE_STEP, MAX_WEIGHT } from '@barbell-calc/shared';
import { useAppStore } from '../stores/AppContext';
import { useTheme } from '../stores/ThemeContext';

export default function CalculatorScreen() {
  const store = useAppStore();
  const { theme } = useTheme();
  const [decrementDisabled, setDecrementDisabled] = useState(false);
  const [incrementDisabled, setIncementDisabled] = useState(false);

  useEffect(() => {
    setIncementDisabled(store.percentage === MAX_PERCENTAGE);
    setDecrementDisabled(store.percentage === MIN_PERCENTAGE);
  }, [store.percentage]);

  const plates = useMemo(() =>
    calculatePlates({
      targetWeight: store.weight * (store.percentage / 100),
      barWeight: store.barWeight,
      selectedPlates: store.selectedPlates,
    }),
    [store.weight, store.percentage, store.selectedPlates, store.barWeight]
  );

  const isLessThanBarbell = useMemo(
    () => store.percentageWeight && store.percentageWeight < store.barWeight,
    [store.percentageWeight, store.barWeight]
  );

  const updatePercentageWeight = (newPercentage: number) => {
    const percentageWeight = (newPercentage / 100) * store.weight;
    store.setPercentageWeight(percentageWeight);
    store.setPercentage(newPercentage);
  };

  const incrementWeight = () => {
    const newWeight = Math.min(store.weight + 5, MAX_WEIGHT);
    store.setWeight(newWeight);
  };

  const decrementWeight = () => {
    const newWeight = Math.max(store.weight - 5, store.barWeight);
    store.setWeight(newWeight);
  };

  const incrementPercentage = () => {
    updatePercentageWeight(Math.min(store.percentage + PERCENTAGE_STEP, MAX_PERCENTAGE));
  };

  const decrementPercentage = () => {
    updatePercentageWeight(Math.max(store.percentage - PERCENTAGE_STEP, MIN_PERCENTAGE));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.pageBg }}>
      <ScrollView
        style={{ flex: 1, paddingHorizontal: 16, paddingTop: 16 }}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: theme.textPrimary, marginBottom: 32 }}>
          Barbell Calc
        </Text>

        <View style={{ gap: 20 }}>
          {/* Target Weight */}
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: theme.textPrimary,
                marginBottom: 12,
              }}
            >
              Target Weight
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: theme.cardBg,
                borderRadius: 16,
                paddingHorizontal: 20,
                paddingVertical: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 32,
                  fontWeight: 'bold',
                  color: theme.textPrimary,
                }}
              >
                {store.weight}
              </Text>
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <Pressable
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: theme.elevatedBg,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={decrementWeight}
                >
                  <MaterialCommunityIcons name="minus" size={20} color={theme.textPrimary} />
                </Pressable>
                <Pressable
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: theme.purple,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={incrementWeight}
                >
                  <MaterialCommunityIcons name="plus" size={20} color={theme.white} />
                </Pressable>
              </View>
            </View>
          </View>

          {/* Training % */}
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: theme.textPrimary,
                marginBottom: 12,
              }}
            >
              Training % of Target
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: theme.cardBg,
                borderRadius: 16,
                paddingHorizontal: 20,
                paddingVertical: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 32,
                  fontWeight: 'bold',
                  color: theme.teal,
                }}
              >
                {store.percentage}%
              </Text>
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <Pressable
                  disabled={decrementDisabled}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: theme.elevatedBg,
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: decrementDisabled ? 0.5 : 1,
                  }}
                  onPress={decrementPercentage}
                >
                  <MaterialCommunityIcons name="minus" size={20} color={theme.textPrimary} />
                </Pressable>
                <Pressable
                  disabled={incrementDisabled}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: theme.purple,
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: incrementDisabled ? 0.5 : 1,
                  }}
                  onPress={incrementPercentage}
                >
                  <MaterialCommunityIcons name="plus" size={20} color={theme.white} />
                </Pressable>
              </View>
            </View>
          </View>

          {/* Results */}
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: theme.textPrimary,
                marginBottom: 12,
              }}
            >
              Calculated Weight
            </Text>
            <View
              style={{
                backgroundColor: theme.purple,
                borderRadius: 16,
                padding: 20,
                gap: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 32,
                  fontWeight: 'bold',
                  color: theme.white,
                }}
              >
                {store.percentageWeight.toFixed(0)} lb
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: 'rgba(255, 255, 255, 0.8)',
                }}
              >
                {store.barWeight} lb Barbell
              </Text>

              {!isLessThanBarbell && (
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '400',
                    color: 'rgba(255, 255, 255, 0.85)',
                    lineHeight: 20,
                  }}
                >
                  {plates && plates.length > 0
                    ? `Plates Per Side:\n${plates.map((p) => `${p.count}× ${p.weight} lb`).join('\n')}`
                    : 'Just the barbell!'}
                </Text>
              )}

              {isLessThanBarbell && (
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '400',
                    color: 'rgba(255, 255, 255, 0.85)',
                  }}
                >
                  That's less than the barbell weight
                </Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
