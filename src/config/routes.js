import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import HomeScreen from '../screens/HomeScreen'
import RegisterScreen from '../screens/RegisterScreen'
import LoginScreen from '../screens/LoginScreen'
import CreateTeamScreen from '../screens/CreateTeamScreen'

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={HomeScreen} />
      <Route path='/login' exact component={LoginScreen} />
      <Route path='/register' exact component={RegisterScreen} />
      <Route path='/createTeam' exact component={CreateTeamScreen} />
    </Switch>
  </BrowserRouter>
)
