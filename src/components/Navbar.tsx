import { A } from "@solidjs/router";
import { Component } from "solid-js";

const Navbar: Component = () => {
  return (
    <ul class="menu menu-horizontal lg:menu-horizontal bg-base-200 rounded">
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
  );
};

export default Navbar;
