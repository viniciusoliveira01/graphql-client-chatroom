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
import MessageContainer from '../containers/MessageContainer'

const ViewTeamScreen = ({ mutate, data: { loading, me }, match: { params: { teamId, channelId } } }) => {
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

  let channel
  if (teams.channels) {
    const channelIdInteger = parseInt(channelId, 10)
    const channelIdx = channelIdInteger ? findIndex(team.channels, ['id', channelIdInteger]) : 0
    channel = channelIdx === -1 ? team.channels[0] : team.channels[channelIdx]
  }

  return (
    <AppLayout>
      <Sidebar teams={teamsList} team={team} username={username} />
      {(team && team.channels && channel) && <React.Fragment>
                    <Header channelName={channel.name} />
                    <MessageContainer channelId={channel.id} />
                    <SendMessage placeholder={channel.name} onSubmit={async (text) => {
                      await mutate({ variables: {text, channelId: channel.id} })
                    }} channelId={channel.id} />
                  </React.Fragment>}
    </AppLayout>
  )
}

const createMessageMutation = gql`
  mutation($channelId: Int!, $text: String!) {
    createMessage(channelId: $channelId, text: $text)
  }
`

export default compose(
  graphql(createMessageMutation),
  graphql(meQuery, {options: { fetchPolicy: 'network-only' }})
)(ViewTeamScreen)
