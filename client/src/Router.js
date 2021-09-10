import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/home/Home.js";
import NavBar from "./components/misc/NavBar.js";

export default function router() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          Login
        </Route>
        <Route exact path="/register">
          Register
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
