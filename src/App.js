import React from "react";
import { Switch } from "react-router";
import "rsuite/dist/styles/rsuite-default.css";
import PrivateRoutes from "./components/PrivateRoutes";
import PublicRoute from "./components/PublicRoute";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import { ProfileProvider } from "./context/Profile.Context";

const App = () => {
  return (
    <ProfileProvider>
      <Switch>
        <PublicRoute path="/signin">
          <SignIn />
        </PublicRoute>
        <PrivateRoutes path="/">
          <Home />
        </PrivateRoutes>
      </Switch>
    </ProfileProvider>
  );
};

export default App;
