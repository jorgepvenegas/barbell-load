import { type Component } from "solid-js";
import Calculator from "./components/Calculator";
import { Router, Route } from "@solidjs/router";
import Plates from "./components/plates/Plates";
import FindGym from "./components/FindGym/FindGym";

const App: Component = () => (
  <Router>
    <Route path="/" component={Calculator} />
    <Route path="/plates" component={Plates} />
    <Route path="/find-gym" component={FindGym} />
  </Router>
);

export default App;
