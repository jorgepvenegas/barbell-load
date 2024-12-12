import { createSignal } from "solid-js";

import { createEffect } from "solid-js";

export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [value, setValue] = createSignal<T>(
    JSON.parse(localStorage.getItem(key) ?? JSON.stringify(initialValue))
  );

  createEffect(() => {
    localStorage.setItem(key, JSON.stringify(value()));
  });

  return [value, setValue] as const;
};