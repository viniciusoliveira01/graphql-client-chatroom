import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import LaddaButton, { S, ZOOM_IN } from 'react-ladda';
import { Link } from 'react-router-dom'

class RegisterScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      usernameError: '',
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
      loading: false
    }
  }

  onSubmit = async () => {
    this.setState({ usernameError: '', emailError: '', passwordError: '', loading: true })

    const {username, email, password } = this.state
    const response = await this.props.mutate({
      variables: {username, email, password}
    })

    const { ok, errors } = response.data.register
    if (ok) {
      this.setState({ loading: false })
      this.props.history.push('/')
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
    const { username, email, password, usernameError, emailError, passwordError, loading } = this.state
    return (
      <RegisterContainer>
        <LeftSide />
        <RightSide>
          <RegisterTitle>Chat Room</RegisterTitle>
          <RegisterSubtitle>
            Join your friends in a talk!
          </RegisterSubtitle>
          <RegisterForm>
            <Input
              placeholder='Name'
              type='text'
              value={username}
              onChange={e => this.setState({username: e.target.value})} />
            {usernameError && <span>{usernameError}</span>}
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
                Register
            </LaddaButton>
          </RegisterForm>
        </RightSide>
      </RegisterContainer>
    )
  }
}

const LeftSide = styled.div`
  display: flex
  flex: 1
  position: relative;
  background: linear-gradient(152deg, #c173c2, #7375c2);
  &::before {
    content: "";
    width: 100%;
    height: 100vh;
    position: absolute;
    background: inherit;
    z-index: -1;
    bottom: 0;
    transform-origin: left top;
    transform: skewX(6deg);
  }
`
const RightSide = styled.div`
  display: flex
  flex: 2
  flex-direction: column
  justify-content: center
  align-items: center
`

const RegisterContainer = styled.div`
  display: flex
  height: 100vh
`

const RegisterTitle = styled.h1`
  color: #9973c2
  text-align: center
  padding-bottom: 15px
  font-size: 35px
  font-weight: 700
`

const RegisterSubtitle = styled.h6`
  color: #7375c2
  text-align: center
  padding-bottom: 15px
  font-size: 18px
  font-weight: 300
`

const OrText = styled.span`
  color: #7375c2
  text-align: center
  padding-top: 10px
  font-size: 14px
  font-weight: 300
`

const CreateAccountText = styled(Link)`
  color: #9973c2
  text-align: center
  padding: 10px 0
  font-size: 15px
  font-weight: 500
  text-decoration: none
`

const RegisterForm = styled.form`
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
