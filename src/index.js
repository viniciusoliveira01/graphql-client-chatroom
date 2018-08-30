import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'

import registerServiceWorker from './registerServiceWorker'
import Routes from './config/routes'
import client from './apollo'

const App = (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
)

ReactDOM.render(App, document.getElementById('root'))
registerServiceWorker()
