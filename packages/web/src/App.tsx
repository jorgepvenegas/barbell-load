import { type Component } from "solid-js";
import Calculator from "./components/Calculator";
import { Router, Route } from "@solidjs/router";
import Plates from "./components/plates/Plates";
import Settings from "./components/Settings";
import Training from "./components/training/Training";
import Progress from "./components/progress/Progress";

const App: Component = () => (
  <Router>
    <Route path="/" component={Calculator} />
    <Route path="/plates" component={Plates} />
    <Route path="/training" component={Training} />
    <Route path="/progress" component={Progress} />
    <Route path="/settings" component={Settings} />
  </Router>
);

export default App;
