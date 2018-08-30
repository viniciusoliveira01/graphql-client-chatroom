import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import LaddaButton, { S, ZOOM_IN } from 'react-ladda';
import { Link } from 'react-router-dom'

class LoginScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
      loading: false
    }
  }

  onSubmit = async () => {
    this.setState({ loading: true })
    const { email, password } = this.state
    const response = await this.props.mutate({
      variables: { email, password }
    });

    const { ok, token, refreshToken, errors } = response.data.login
    if (ok) {
      this.setState({ loading: false })
      localStorage.setItem('token', token)
      localStorage.setItem('refreshToken', token)
      this.props.history.push('/viewTeam')
    } else {
      this.setState({ loading: false })
      const err = {}
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message
      })

      this.setState(err)
    }
  }
  render () {
    const { email, password, emailError, passwordError, loading } = this.state

    return (
      <SigninContainer>
          <SigninTitle>Chat Room</SigninTitle>
          <SigninSubtitle>
            See what your friends are talking about!
          </SigninSubtitle>
          <SigninForm>
            <Input
              name='email'
              placeholder='Email'
              type='email'
              value={email}
              onChange={e => this.setState({email: e.target.value})} />
            {emailError && <span>{emailError}</span>}
            <Input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={e => this.setState({password: e.target.value})} />
            {passwordError && <span>{passwordError}</span>}
            <LaddaButton
              loading={loading}
              data-color="purple"
              data-size={S}
              data-style={ZOOM_IN}
              data-spinner-size={30}
              data-spinner-color="white"
              data-spinner-lines={12} 
              onClick={this.onSubmit}>
              Submit
            </LaddaButton>
            <CreateAccountSpan>
              New to Chat?
              <CreateAccountText to='/register'> Create an account</CreateAccountText>
            </CreateAccountSpan>
          </SigninForm>
      </SigninContainer>
    )
  }
}

const SigninContainer = styled.div`
  height: 100vh
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
`

const SigninTitle = styled.h1`
  color: #9973c2
  text-align: center
  padding-bottom: 15px
  font-size: 35px
  font-weight: 700
`

const SigninSubtitle = styled.h6`
  color: #7375c2
  text-align: center
  padding-bottom: 15px
  font-size: 18px
  font-weight: 300
`

const CreateAccountSpan = styled.span`
  color: #000
  font-weight: 300
  font-size: 12px
  padding-top: 10px
`

const CreateAccountText = styled(Link)`
  color: #9973c2
  text-align: center
  padding: 10px 0
  font-size: 13px
  font-weight: 300
  text-decoration: none
`

const SigninForm = styled.div`
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  width: 100%
  max-width: 250px
`

const Input = styled.input`
  border: 1px solid #c5c7c8
  border-radius: 3px
  height: 27px
  color: #060605
  font-size: 12px
  font-weight: 200
  line-height: 1.5
  padding: 0 15px
  margin: 8px 0
  width: 100%
  &:focus {
    outline: none
  }
  -webkit-box-shadow: 0 0 0px 1000px white inset;
`

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
