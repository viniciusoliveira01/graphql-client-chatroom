import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class LoginScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      emailError: '',
      password: '',
      passwordError: ''
    }
  }

  onSubmit = async () => {
    const { email, password } = this.state
    const response = await this.props.mutate({
      variables: { email, password }
    });

    const { ok, token, refreshToken, errors } = response.data.login
    if (ok) {
      localStorage.setItem('token', token)
      localStorage.setItem('refreshToken', token)
      this.props.history.push('/createTeam')
    } else {
      const err = {}
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message
      })

      this.setState(err)
    }
  }
  render () {
    const { email, password, emailError, passwordError } = this.state
    return (
      <div>
          <h1>Login</h1>
          <input
            name='email'
            placeholder='Email'
            value={email}
            onChange={e => this.setState({email: e.target.value})} />
          {emailError && <span>{emailError}</span>}
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={e => this.setState({password: e.target.value})} />
          {passwordError && <span>{passwordError}</span>}
          <button onClick={this.onSubmit}>Submit</button>

      </div>
    )
  }
}

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`

export default graphql(loginMutation)(LoginScreen)
