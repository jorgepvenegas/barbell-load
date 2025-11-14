import { A, useLocation } from "@solidjs/router";
import { Component } from "solid-js";
import ThemeToggle from "./ThemeToggle";

const Navbar: Component = () => {
  const location = useLocation();

  return (
    <div class="flex items-center justify-between gap-4">
      <ul class="menu menu-horizontal lg:menu-horizontal bg-base-200 rounded-sm">
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
      <ThemeToggle />
    </div>
  );
};

export default Navbar;
