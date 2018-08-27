import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import decode from 'jwt-decode'

import RegisterScreen from '../screens/RegisterScreen'
import LoginScreen from '../screens/LoginScreen'
import CreateTeamScreen from '../screens/CreateTeamScreen'
import ViewTeamScreen from '../screens/ViewTeamScreen'
import DirectMessageScreen from '../screens/DirectMessageScreen'

const isAuthenticated = () => {
  const token = localStorage.getItem('token')
  const refreshToken = localStorage.getItem('refreshToken')
  try {
    decode(token)
    decode(refreshToken)
  } catch (err) {
    return false
  }

  return true
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/'
          }}
        />
      ))}
  />
);

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={LoginScreen} />
      <Route path='/register' exact component={RegisterScreen} />
      <PrivateRoute path='/viewTeam/:teamId?/:channelId?' exact component={ViewTeamScreen} />
      <PrivateRoute path='/viewTeam/user/:teamId/:userId' exact component={DirectMessageScreen} />
      <PrivateRoute path='/createTeam' exact component={CreateTeamScreen} />
    </Switch>
  </BrowserRouter>
)
