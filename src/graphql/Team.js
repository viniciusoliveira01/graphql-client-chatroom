import gql from 'graphql-tag'

export const allTeamsQuery = gql`
  {
    allTeams {
      id
      owner
      name
      channels {
        id
        name
      }
    }
    inviteTeams {
      id
      owner
      name
      channels {
        id
        name
      }
    }
  }
`

export const i = {}
