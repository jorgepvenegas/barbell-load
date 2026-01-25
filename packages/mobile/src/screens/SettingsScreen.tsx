import React from 'react';
import { View, Text, ScrollView, SafeAreaView, Pressable, Switch } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppStore } from '../stores/AppContext';
import { useTheme } from '../stores/ThemeContext';
import type { BarWeight } from '@barbell-calc/shared';

export default function SettingsScreen() {
  const store = useAppStore();
  const { theme, isDark, toggleTheme } = useTheme();

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
          Settings
        </Text>

        <View style={{ gap: 20 }}>
          {/* Barbell Weight */}
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: theme.textPrimary,
                marginBottom: 12,
              }}
            >
              Barbell Type
            </Text>
            <View style={{ gap: 12 }}>
              {([33, 45] as BarWeight[]).map((weight) => (
                <Pressable
                  key={weight}
                  onPress={() => store.setBarWeight(weight)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: theme.cardBg,
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 16,
                    borderWidth: store.barWeight === weight ? 2 : 0,
                    borderColor: store.barWeight === weight ? theme.purple : 'transparent',
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: theme.textPrimary }}>
                      {weight} lb
                    </Text>
                  </View>
                  {store.barWeight === weight && (
                    <MaterialCommunityIcons name="check" size={24} color={theme.purple} />
                  )}
                </Pressable>
              ))}
            </View>
          </View>

          {/* Available Plates */}
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: theme.textPrimary,
                marginBottom: 12,
              }}
            >
              Available Plates
            </Text>
            <View
              style={{
                backgroundColor: theme.cardBg,
                borderRadius: 12,
                overflow: 'hidden',
              }}
            >
              {store.selectedPlates.map((plate, index) => (
                <Pressable
                  key={plate.weight}
                  onPress={() => {
                    const updated = [...store.selectedPlates];
                    updated[index] = { ...updated[index], enabled: !updated[index].enabled };
                    store.setSelectedPlates(updated);
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 16,
                    paddingVertical: 16,
                    borderBottomWidth: index < store.selectedPlates.length - 1 ? 1 : 0,
                    borderBottomColor: theme.border,
                  }}
                >
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 16,
                      fontWeight: '500',
                      color: plate.enabled ? theme.textPrimary : theme.textTertiary,
                      textDecorationLine: plate.enabled ? 'none' : 'line-through',
                    }}
                  >
                    {plate.weight} lb
                  </Text>
                  <Switch
                    value={plate.enabled}
                    onValueChange={() => {
                      const updated = [...store.selectedPlates];
                      updated[index] = { ...updated[index], enabled: !updated[index].enabled };
                      store.setSelectedPlates(updated);
                    }}
                    trackColor={{ false: theme.elevatedBg, true: theme.purple }}
                    thumbColor={theme.white}
                  />
                </Pressable>
              ))}
            </View>
          </View>

          {/* Theme Toggle */}
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: theme.textPrimary,
                marginBottom: 12,
              }}
            >
              Appearance
            </Text>
            <Pressable
              onPress={toggleTheme}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: theme.cardBg,
                borderRadius: 12,
                paddingHorizontal: 16,
                paddingVertical: 16,
              }}
            >
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <MaterialCommunityIcons
                  name={isDark ? 'moon-waning-crescent' : 'white-balance-sunny'}
                  size={20}
                  color={theme.textPrimary}
                />
                <Text style={{ fontSize: 16, fontWeight: '500', color: theme.textPrimary }}>
                  {isDark ? 'Dark Mode' : 'Light Mode'}
                </Text>
              </View>
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: theme.elevatedBg, true: theme.purple }}
                thumbColor={theme.white}
              />
            </Pressable>
          </View>

          {/* Reset Button */}
          <Pressable
            onPress={store.resetStore}
            style={{
              backgroundColor: theme.pink,
              borderRadius: 12,
              paddingVertical: 16,
              alignItems: 'center',
              marginTop: 8,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '600', color: theme.white }}>
              Reset All Settings
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
