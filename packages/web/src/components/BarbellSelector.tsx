import { Component } from "solid-js";
import { useStore, useStoreActions } from "../stores/store";

export const BarbellSelector: Component = () => {
  const { setBarWeight } = useStoreActions();
  const store = useStore();

  const isSelected = (weight: number) => store.barWeight === weight;

  return (
    <div class="flex flex-col gap-4 w-full">
      <h3 class="text-xl font-bold font-jakarta text-primary-color">
        Barbell Type
      </h3>
      <div class="flex flex-col gap-3">
        <button
          class="flex items-center justify-between h-16 rounded-xl px-6"
          classList={{
            "bg-purple": isSelected(45),
            "bg-card": !isSelected(45),
          }}
          onClick={() => setBarWeight(45)}
          aria-pressed={isSelected(45)}
        >
          <span
            class="text-lg font-bold font-jakarta"
            classList={{
              "text-white-color": isSelected(45),
              "text-primary-color": !isSelected(45),
            }}
          >
            45 lb
          </span>
          {isSelected(45) ? (
            <svg class="w-7 h-7 text-white-color" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <div class="w-7 h-7 rounded-full border-[2.5px] border-tertiary" />
          )}
        </button>

        <button
          class="flex items-center justify-between h-16 rounded-xl px-6"
          classList={{
            "bg-purple": isSelected(33),
            "bg-card": !isSelected(33),
          }}
          onClick={() => setBarWeight(33)}
          aria-pressed={isSelected(33)}
        >
          <span
            class="text-lg font-bold font-jakarta"
            classList={{
              "text-white-color": isSelected(33),
              "text-primary-color": !isSelected(33),
            }}
          >
            33 lb
          </span>
          {isSelected(33) ? (
            <svg class="w-7 h-7 text-white-color" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <div class="w-7 h-7 rounded-full border-[2.5px] border-tertiary" />
          )}
        </button>
      </div>
    </div>
  );
};
