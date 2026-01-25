import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Pressable,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppStore } from '../stores/AppContext';
import { useTheme } from '../stores/ThemeContext';
import type { PlateWeight } from '@barbell-calc/shared';

export default function PlatesScreen() {
  const store = useAppStore();
  const { theme } = useTheme();
  const [plateCounts, setPlateCounts] = useState<Record<number, number>>({});

  const enabledPlates = useMemo(
    () => store.selectedPlates.filter(({ enabled }) => enabled),
    [store.selectedPlates]
  );

  useEffect(() => {
    const counts: Record<number, number> = {};
    enabledPlates.forEach((plate) => {
      counts[plate.weight] = 0;
    });
    setPlateCounts(counts);
  }, [enabledPlates]);

  const totalWeight = useMemo(() => {
    const plateWeight = Object.entries(plateCounts).reduce(
      (sum, [weight, count]) => sum + Number(weight) * count * 2,
      0
    );
    return plateWeight + store.barWeight;
  }, [plateCounts, store.barWeight]);

  const handleIncrement = (weight: PlateWeight) => {
    setPlateCounts((prev) => ({
      ...prev,
      [weight]: (prev[weight] || 0) + 1,
    }));
  };

  const handleDecrement = (weight: PlateWeight) => {
    setPlateCounts((prev) => ({
      ...prev,
      [weight]: Math.max(0, (prev[weight] || 0) - 1),
    }));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.pageBg }}>
      <ScrollView
        style={{ flex: 1, paddingHorizontal: 16, paddingTop: 16 }}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: theme.textPrimary,
            marginBottom: 32,
          }}
        >
          Plate Counter
        </Text>

        <View style={{ gap: 20 }}>
          {/* Total Weight */}
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: theme.textPrimary,
                marginBottom: 12,
              }}
            >
              Total Weight
            </Text>
            <View
              style={{
                backgroundColor: theme.teal,
                borderRadius: 16,
                padding: 20,
                gap: 4,
              }}
            >
              <Text
                style={{
                  fontSize: 32,
                  fontWeight: 'bold',
                  color: theme.white,
                }}
              >
                {totalWeight} lb
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: 'rgba(255, 255, 255, 0.8)',
                }}
              >
                {store.barWeight} lb Olympic Bar + Plates
              </Text>
            </View>
          </View>

          {/* Plates Per Side */}
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: theme.textPrimary,
                marginBottom: 12,
              }}
            >
              Plates Per Side
            </Text>
            <View
              style={{
                backgroundColor: theme.cardBg,
                borderRadius: 16,
                padding: 20,
                gap: 20,
              }}
            >
              {enabledPlates.map((plate) => (
                <View
                  key={plate.weight}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: theme.textPrimary,
                    }}
                  >
                    {plate.weight} lb
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                    <Pressable
                      disabled={(plateCounts[plate.weight] || 0) === 0}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 18,
                        backgroundColor: theme.elevatedBg,
                        justifyContent: 'center',
                        alignItems: 'center',
                        opacity: (plateCounts[plate.weight] || 0) === 0 ? 0.5 : 1,
                      }}
                      onPress={() => handleDecrement(plate.weight)}
                    >
                      <MaterialCommunityIcons name="minus" size={18} color={theme.textPrimary} />
                    </Pressable>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: theme.textPrimary,
                        minWidth: 30,
                        textAlign: 'center',
                      }}
                    >
                      {plateCounts[plate.weight] || 0}
                    </Text>
                    <Pressable
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 18,
                        backgroundColor: theme.purple,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => handleIncrement(plate.weight)}
                    >
                      <MaterialCommunityIcons name="plus" size={18} color={theme.white} />
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
