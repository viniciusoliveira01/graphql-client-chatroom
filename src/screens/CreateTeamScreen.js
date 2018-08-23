import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class CreateTeamScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      nameError: ''
    }
  }

  onSubmit = async () => {
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
      this.props.history.push(`/viewTeam/${team.id}`)
    } else {
      const err = {}
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message
      })

      this.setState(err)
    }
  }

  render () {
    const { name, nameError } = this.state
    return (
      <div>
          <h1>Create your Team</h1>
          <input
            name='team'
            placeholder='Team name'
            value={name}
            onChange={e => this.setState({name: e.target.value})} />
              {
                nameError && <span>{nameError}</span>
              }
          <button onClick={this.onSubmit}>Submit</button>

      </div>
    )
  }
}

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
