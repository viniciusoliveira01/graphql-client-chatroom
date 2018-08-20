import React, { Component } from 'react'
import { gql, graphql } from 'react-apollo'

class CreateTeamScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      team: '',
      teamError: ''
    }
  }

  onSubmit = async () => {
    const { team } = this.state
    const response = await this.props.mutate({
      variables: { team }
    });

    const { ok, errors } = response.data.createTeam
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
    const { team, teamError } = this.state
    return (
      <div>
          <h1>Create your Team</h1>
          <input
            name='team'
            placeholder='Team name'
            value={team}
            onChange={e => this.setState({team: e.target.value})} />
          {teamError && <span>{teamError}</span>}
          <button onClick={this.onSubmit}>Submit</button>

      </div>
    )
  }
}

const createTeamMutation = gql`
  mutation($team: String!) {
    createTeam(name: $team) {
      ok
      errors {
        path
        message
      }
    }
  }
`

export default graphql(createTeamMutation)(CreateTeamScreen)
