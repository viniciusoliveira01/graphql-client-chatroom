import React from 'react'
import { graphql } from 'react-apollo'
import findIndex from 'lodash/findIndex'
import { Redirect } from 'react-router-dom'

import { allTeamsQuery } from '../graphql/Team'

import Header from '../components/viewTeam/Header'
import SendMessage from '../components/viewTeam/SendMessage'
import AppLayout from '../components/viewTeam/AppLayout'
import Sidebar from '../containers/Sidebar'
import MessageContainer from '../containers/MessageContainer'

const ViewTeamScreen = ({ data: { loading, allTeams, inviteTeams }, match: { params: { teamId, channelId } } }) => {
  if (loading) {
    return null
  }

  const teamsList = [...allTeams, ...inviteTeams]

  if (!allTeams) {
    return <Redirect to='/createTeam' />
  }

  const teamIdInteger = parseInt(teamId, 10)

  const teamIdx = teamIdInteger ? findIndex(teamsList, ['id', teamIdInteger]) : 0
  const team = teamIdx === -1 ? teamsList[0] : teamsList[teamIdx]
  const teams = teamsList.map(t => ({
    id: t.id,
    letter: t.name.charAt(0).toUpperCase()
  }))

  const channelIdInteger = parseInt(channelId, 10)
  const channelIdx = channelIdInteger ? findIndex(team.channels, ['id', channelIdInteger]) : 0
  const channel = channelIdx === -1 ? team.channels[0] : team.channels[channelIdx]

  return (
    <AppLayout>
      <Sidebar teams={teams} team={team} />
      {channel && <React.Fragment>
                    <Header channelName={channel.name} />
                    <MessageContainer channelId={channel.id} />
                    <SendMessage channelName={channel.name} channelId={channel.id} />
                  </React.Fragment>}
    </AppLayout>
  )
}

export default graphql(allTeamsQuery)(ViewTeamScreen)
