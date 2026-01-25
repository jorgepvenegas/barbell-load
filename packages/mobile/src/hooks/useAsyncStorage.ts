import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useAsyncStorage<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFromStorage();
  }, [key]);

  const loadFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue != null) {
        setState(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error('Failed to load from AsyncStorage:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const setStorageValue = async (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(state) : value;
      setState(valueToStore);
      await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (e) {
      console.error('Failed to save to AsyncStorage:', e);
    }
  };

  return [state, setStorageValue, isLoading] as const;
}
