import React from 'react'
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'
import findIndex from 'lodash/findIndex'
import { Redirect } from 'react-router-dom'

import { meQuery } from '../graphql/Team'

import Header from '../components/viewTeam/Header'
import SendMessage from '../components/viewTeam/SendMessage'
import AppLayout from '../components/viewTeam/AppLayout'
import Sidebar from '../containers/Sidebar'
import DirectMessageContainer from '../containers/DirectMessageContainer'

const DirectMessageScreen = ({ mutate, data: { loading, me, getUser }, match: { params: { teamId, userId } } }) => {
  if (loading) {
    return null
  }

  const { teams, username } = me

  if (!teams) {
    return <Redirect to='/createTeam' />
  }

  const teamIdInteger = parseInt(teamId, 10)

  const teamIdx = teamIdInteger ? findIndex(teams, ['id', teamIdInteger]) : 0
  const team = teamIdx === -1 ? teams[0] : teams[teamIdx]
  const teamsList = teams.map(t => ({
    id: t.id,
    letter: t.name.charAt(0).toUpperCase()
  }))

  return (
    <AppLayout>
      <Sidebar teams={teamsList} team={team} username={username} />
      <Header channelName={getUser.username} />
      <DirectMessageContainer teamId={teamId} userId={userId} />
      <SendMessage onSubmit={async (text) => {
        await mutate({ variables: {
          text,
          receiverId: userId,
          teamId: teamId
        },
        optimisticResponse: {
          createDirectMessage: true
        },
        update: (store) => {
          const data = store.readQuery({ query: meQuery });
          const teamIdx2 = findIndex(data.me.teams, ['id', team.id]);
          const notAlreadyThere = data.me.teams[teamIdx2].directMessageMembers.every(member => member.id !== parseInt(userId, 10));
          if (notAlreadyThere) {
            data.me.teams[teamIdx2].directMessageMembers.push({
              __typename: 'User',
              id: userId,
              username: getUser.username,
            });
            store.writeQuery({ query: meQuery, data });
          }
        }
        })
      }} placeholder={userId} />
    </AppLayout>
  )
}

const createMessageMutation = gql`
  mutation($receiverId: Int!, $text: String!, $teamId: Int!) {
    createDirectMessage(receiverId: $receiverId, text: $text, teamId: $teamId)
  }
`

const directMessageMeQuery = gql`
  query($userId: Int!) {
    getUser(userId: $userId) {
      username
    }
    me {
      id
      username
      teams {
        id
        name
        admin
        directMessageMembers {
          id
          username
        }
        channels {
          id
          name
        }
      }
    }
  }
`

export default compose(
  graphql(createMessageMutation),
  graphql(directMessageMeQuery, {
    options: props => ({
      variables: { userId: props.match.params.userId },
      fetchPolicy: 'network-only'
    })
  })
)(DirectMessageScreen)
