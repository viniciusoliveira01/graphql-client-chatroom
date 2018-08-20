import React, { Component } from 'react'
import { gql, graphql } from 'react-apollo'

class RegisterScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      usernameError: '',
      email: '',
      emailError: '',
      password: '',
      passwordError: ''
    }
  }

  onSubmit = async () => {
    this.setState({ usernameError: '', emailError: '', passwordError: '' })

    const {username, email, password } = this.state
    const response = await this.props.mutate({
      variables: {username, email, password}
    })

    const { ok, errors } = response.data.register
    if (ok) {
      this.props.history.push('/')
    } else {
      const err = {}
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message
      })

      this.setState(err)
    }
  }
  render () {
    const { username, email, password, usernameError, emailError, passwordError } = this.state
    return (
      <div>

          <input
            placeholder='Name'
            value={username}
            onChange={e => this.setState({username: e.target.value})} />
          {usernameError && <span>{usernameError}</span>}
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

const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`

export default graphql(registerMutation)(RegisterScreen)
