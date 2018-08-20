import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo'

import registerServiceWorker from './registerServiceWorker'
import Routes from './config/routes'

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:8081/graphql'
})

const client = new ApolloClient({
  networkInterface
})

const App = (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
)
ReactDOM.render(App, document.getElementById('root'))
registerServiceWorker()
