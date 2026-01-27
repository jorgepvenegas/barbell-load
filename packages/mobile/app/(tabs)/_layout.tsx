import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemeStore } from '@/store/useThemeStore';

export default function TabLayout() {
  const { theme } = useThemeStore();
  const colors = theme === 'dark' ? {
    active: '#A78BFA',
    inactive: '#9CA3AF',
    background: '#111827',
    border: '#374151',
  } : {
    active: '#8B5CF6',
    inactive: '#9CA3AF',
    background: '#FFFFFF',
    border: '#E5E7EB',
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.active,
        tabBarInactiveTintColor: colors.inactive,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Calculator',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calculator" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="plates"
        options={{
          title: 'Plates',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="weight-lifter" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
