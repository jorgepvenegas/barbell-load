import { type Component } from "solid-js";
import Calculator from "./components/Calculator";
import { Router, Route } from "@solidjs/router";
import Plates from "./components/plates/Plates";

const App: Component = () => (
  <Router>
    <Route path="/" component={Calculator} />
    <Route path="/plates" component={Plates} />
  </Router>
);

export default App;
