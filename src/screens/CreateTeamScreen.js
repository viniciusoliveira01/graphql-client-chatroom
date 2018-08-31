import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import LaddaButton, { S, ZOOM_IN } from 'react-ladda'
import { Link } from 'react-router-dom'


class CreateTeamScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      nameError: '',
      loading: false
    }
  }

  onSubmit = async () => {
    this.setState({ loading: true })
    const { name } = this.state
    let response = null

    try {
      response = await this.props.mutate({
        variables: { name }
      })
    } catch (error) {
      this.props.history.push('/')
    }

    const { ok, errors, team } = response.data.createTeam
    if (ok) {
      this.setState({ loading: false })
      this.props.history.push(`/viewTeam/${team.id}`)
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
    const { name, nameError, loading } = this.state
    return (
      <CreateTeamContainer>
          <LeftSide />
          <RightSide>
            <CreateTeamTitle>Create your Team</CreateTeamTitle>
            <CreateTeamSubtitle>
              Here you can create a team to interact with your friends and team mates
            </CreateTeamSubtitle>
            <CreateTeamForm>
              <Input
                name='team'
                placeholder='Team name'
                type='text'
                value={name}
                onChange={e => this.setState({name: e.target.value})} />
                  {
                    nameError && <span>{nameError}</span>
                  }
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
            </CreateTeamForm>
          </RightSide>
      </CreateTeamContainer>
    )
  }
}

const LeftSide = styled.div`
  display: flex
  flex: 1
  position: relative
  background: linear-gradient(152deg, #c173c2, #9973c2);
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

const CreateTeamContainer = styled.div`
  display: flex
  height: 100vh
`

const CreateTeamTitle = styled.h1`
  color: #9973c2
  text-align: center
  padding-bottom: 15px
  font-size: 35px
  font-weight: 700
`

const CreateTeamSubtitle = styled.h6`
  color: #7375c2
  text-align: center
  max-width: 300px
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

const CreateTeamForm = styled.form`
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

const createTeamMutation = gql`
  mutation($name: String!) {
    createTeam(name: $name) {
      ok
      team {
        id
      }
      errors {
        path
        message
      }
    }
  }
`

export default graphql(createTeamMutation)(CreateTeamScreen)
