import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import decode from "jwt-decode";
import { injectGlobal } from "styled-components";
import reset from "styled-reset";

import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import CreateTeamScreen from "../screens/CreateTeamScreen";
import ViewTeamScreen from "../screens/ViewTeamScreen";
import DirectMessageScreen from "../screens/DirectMessageScreen";
import BotMessageScreen from "../screens/BotMessageScreen";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
  try {
    decode(token);
    const { exp } = decode(refreshToken);
    if (Date.now() / 1000 > exp) {
      return false;
    }
  } catch (err) {
    return false;
  }

  return true;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/"
          }}
        />
      )
    }
  />
);

const baseStyles = () => injectGlobal`
  ${reset}
  html {
    font-family: 'Roboto', sans-serif;
  }
`;

export default () => {
  baseStyles();
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LoginScreen} />
        <Route path="/register" exact component={RegisterScreen} />
        <PrivateRoute
          path="/viewTeam/:teamId?/:channelId?"
          exact
          component={ViewTeamScreen}
        />
        <PrivateRoute
          path="/viewTeam/user/:teamId/:userId"
          exact
          component={DirectMessageScreen}
        />
        <PrivateRoute path="/bot" exact component={BotMessageScreen} />
        <PrivateRoute path="/createTeam" exact component={CreateTeamScreen} />
      </Switch>
    </BrowserRouter>
  );
};
