import { A, useLocation } from "@solidjs/router";
import { Component } from "solid-js";
import ThemeToggle from "./ThemeToggle";

const Navbar: Component = () => {
  const location = useLocation();

  return (
    <div class="navbar bg-base-200 shadow-sm border-b border-base-300">
      <div class="navbar-start">
        <ul class="menu menu-horizontal text-sm sm:text-base">
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
          <li classList={{ active: location.pathname === "/find-gym" }}>
            <A href="/find-gym">
              Find Gym
            </A>
          </li>
        </ul>
      </div>
      <div class="navbar-end">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
