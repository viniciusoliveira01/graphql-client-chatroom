import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import decode from 'jwt-decode'

import HomeScreen from '../screens/HomeScreen'
import RegisterScreen from '../screens/RegisterScreen'
import LoginScreen from '../screens/LoginScreen'
import CreateTeamScreen from '../screens/CreateTeamScreen'
import ViewTeamScreen from '../screens/ViewTeamScreen'

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
            pathname: '/login'
          }}
        />
      ))}
  />
);

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={HomeScreen} />
      <Route path='/login' exact component={LoginScreen} />
      <Route path='/register' exact component={RegisterScreen} />
      <Route path='/viewTeam/:teamId?/:channelId?' exact component={ViewTeamScreen} />
      <PrivateRoute path='/createTeam' exact component={CreateTeamScreen} />
    </Switch>
  </BrowserRouter>
)
