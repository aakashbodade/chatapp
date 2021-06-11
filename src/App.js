import React from "react";
import { Route, Switch } from "react-router";
import "rsuite/dist/styles/rsuite-default.css";
import PrivateRoutes from "./components/PrivateRoutes";
import PublicRoute from "./components/PublicRoute";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";

const App = () => {
  return (
    <Switch>
      <PublicRoute path="/signin">
        <SignIn />
      </PublicRoute>
      <PrivateRoutes path="/">
        <Home />
      </PrivateRoutes>
    </Switch>
  );
};

export default App;
