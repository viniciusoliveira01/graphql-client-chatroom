import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import HomeScreen from '../screens/HomeScreen'
import RegisterScreen from '../screens/RegisterScreen'

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={HomeScreen} />
      <Route path='/register' exact component={RegisterScreen} />
    </Switch>
  </BrowserRouter>
)
