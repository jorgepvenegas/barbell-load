import { A } from "@solidjs/router";
import { Component } from "solid-js";
import ThemeToggle from "./ThemeToggle";

const Navbar: Component = () => {
  return (
    <div class="flex items-center justify-between gap-4">
      <ul class="menu menu-horizontal lg:menu-horizontal bg-base-200 rounded-sm">
        <li>
          <A activeClass="active" href="/" end>
            Home
          </A>
        </li>
        <li>
          <A activeClass="active" href="/plates">
            By Plate
          </A>
        </li>
      </ul>
      <ThemeToggle />
    </div>
  );
};

export default Navbar;
