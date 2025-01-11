export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const value = JSON.parse(localStorage.getItem(key) ?? JSON.stringify(initialValue));
  return value;
};
