import React from 'react'
import { graphql } from 'react-apollo'
import findIndex from 'lodash/findIndex'

import { allTeamsQuery } from '../graphql/Team'

import Header from '../components/viewTeam/Header'
import Messages from '../components/viewTeam/Messages'
import SendMessage from '../components/viewTeam/SendMessage'
import AppLayout from '../components/viewTeam/AppLayout'
import Sidebar from '../containers/Sidebar'

const ViewTeamScreen = ({ data : { loading, allTeams }, match: { params: { teamId, channelId } } }) => {
  if (loading) {
    return null
  }

  const teamIdx = !!teamId ? findIndex(allTeams, ['id', parseInt(teamId, 10)]) : 0
  const team = allTeams[teamIdx]
  const teams = allTeams.map(t => ({
    id: t.id,
    letter: t.name.charAt(0).toUpperCase()
  }))

  const channelIdx = !!channelId ? findIndex(team.channels, ['id', parseInt(channelId, 10)]) : 0
  const channel = team.channels[channelIdx]

  return (
    <AppLayout>
      <Sidebar teams={teams} team={team} />
      <Header channelName={channel.name} />
      <Messages>
        <ul className='message-list'>
          <li />
          <li />
        </ul>
      </Messages>
      <SendMessage channelName={channel.name} />
    </AppLayout>
  )
}

export default graphql(allTeamsQuery)(ViewTeamScreen)
