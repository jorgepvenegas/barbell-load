import { A, useLocation } from "@solidjs/router";
import { Component } from "solid-js";
import ThemeToggle from "./ThemeToggle";

const Navbar: Component = () => {
  const location = useLocation();

  return (
    <div class="flex items-center justify-between gap-2 sm:gap-4 w-full bg-base-200">
      <ul class="menu menu-horizontal text-sm sm:text-base flex-1">
        <li classList={{ active: location.pathname === "/" }}>
          <A href="/">
            Home
          </A>
        </li>
        <li classList={{ active: location.pathname === "/plates" }}>
          <A href="/plates">
            By Plate
          </A>
        </li>
      </ul>
      <div class="pr-3 sm:pr-4">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
