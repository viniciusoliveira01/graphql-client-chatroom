import React, { Component } from 'react'
import { gql, graphql } from 'react-apollo'
import { Link } from 'react-router-dom'

class HomeScreen extends Component {
  render () {
    console.log(this.props)
    return (
      <div className='App'>
        <Link to='/register'> Signup
        </Link>
      </div>
    )
  }
}

const allUsersQuery = gql`
  {
    allUsers {
      id
      username
      email
    }
  }
`

export default graphql(allUsersQuery)(HomeScreen)
