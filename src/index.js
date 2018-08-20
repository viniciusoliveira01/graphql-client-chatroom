import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo'

import registerServiceWorker from './registerServiceWorker'
import Routes from './config/routes'

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:8081/graphql'
})

const client = new ApolloClient({
networkInterface})

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {}
      }

      req.options.headers['x-token'] = localStorage.getItem('token')
      req.options.headers['x-refresh-token'] = localStorage.getItem('refreshToken')
      next()
    }
  }
])

networkInterface.useAfter([
  {
    applyAfterware({ response: { headers } }, next) {
      const token = headers.get('x-token')
      const refreshToken = headers.get('x-refresh-token')

      if (token) {
        localStorage.setItem('token', token)
      }

      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken)
      }

      next()
    }
  }
])

const App = (
<ApolloProvider client={client}>
  <Routes />
</ApolloProvider>
)
ReactDOM.render(App, document.getElementById('root'))
registerServiceWorker()
