import { Component } from "solid-js";
import { A, useLocation } from "@solidjs/router";

export const TabBar: Component = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav
      class="flex justify-around items-center rounded-[100px] h-[62px] px-1 bg-card"
      aria-label="Main navigation"
    >
      <A
        href="/"
        class="flex flex-col items-center justify-center gap-1 py-2 px-3 flex-1"
        aria-current={isActive("/") ? "page" : undefined}
      >
        <svg
          class="w-6 h-6"
          classList={{
            "text-purple": isActive("/"),
            "text-tertiary-color": !isActive("/"),
          }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
        <span
          class="text-[13px] font-semibold font-inter"
          classList={{
            "text-purple": isActive("/"),
            "text-tertiary-color": !isActive("/"),
          }}
        >
          By Weight
        </span>
      </A>

      <A
        href="/plates"
        class="flex flex-col items-center justify-center gap-1 py-2 px-3 flex-1"
        aria-current={isActive("/plates") ? "page" : undefined}
      >
        <svg
          class="w-5 h-5"
          classList={{
            "text-purple": isActive("/plates"),
            "text-tertiary-color": !isActive("/plates"),
          }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <span
          class="text-[13px] font-medium font-inter"
          classList={{
            "text-purple": isActive("/plates"),
            "text-tertiary-color": !isActive("/plates"),
          }}
        >
          By Plate
        </span>
      </A>

      <A
        href="/training"
        class="flex flex-col items-center justify-center gap-1 py-2 px-3 flex-1"
        aria-current={isActive("/training") ? "page" : undefined}
      >
        <svg
          class="w-6 h-6"
          classList={{
            "text-purple": isActive("/training"),
            "text-tertiary-color": !isActive("/training"),
          }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
        <span
          class="text-[13px] font-inter"
          classList={{
            "font-semibold text-purple": isActive("/training"),
            "font-medium text-tertiary-color": !isActive("/training"),
          }}
        >
          Training
        </span>
      </A>

      <A
        href="/settings"
        class="flex flex-col items-center justify-center gap-1 py-2 px-3 flex-1"
        aria-current={isActive("/settings") ? "page" : undefined}
      >
        <svg
          class="w-6 h-6"
          classList={{
            "text-purple": isActive("/settings"),
            "text-tertiary-color": !isActive("/settings"),
          }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span
          class="text-[13px] font-inter"
          classList={{
            "font-semibold text-purple": isActive("/settings"),
            "font-medium text-tertiary-color": !isActive("/settings"),
          }}
        >
          Settings
        </span>
      </A>
    </nav>
  );
};
