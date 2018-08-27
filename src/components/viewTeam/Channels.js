import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const channel = ({ id, name }, teamId) => (
  <Link key={`channel-${id}`} to={`/viewTeam/${teamId}/${id}`} style={{color: '#958993'}}>
    <SideBarListItem>
      #
      {name}
    </SideBarListItem>
  </Link>
)

const user = ({ id, username }, teamId) => (
  <SideBarListItem key={`user-${id}`}>
    <Link to={`/viewTeam/user/${teamId}/${id}`}>
      {username}
    </Link>
  </SideBarListItem>
)

export default ({teamName, username, channels, users, onChannelAddClick, teamId, onInvitePeopleClick, onDirectMessage, isOwner}) => (
  <ChannelWrapper>
    <PushLeft>
      <TeamNameHeader>
        {teamName}
      </TeamNameHeader>
      {username}
    </PushLeft>
    <div>
      <SideBarList>
        <SideBarListHeader>
          Channels
          {isOwner && <span onClick={onChannelAddClick}>+++</span>}
        </SideBarListHeader>
        {channels.map((c) => channel(c, teamId))}
      </SideBarList>
    </div>
    <div>
      <SideBarList>
        <SideBarListHeader>
          Direct Messages
          <span onClick={onDirectMessage}>+++</span>
        </SideBarListHeader>
        {users.map((u) => user(u, teamId))}
      </SideBarList>
    </div>
    {isOwner && <div>
                  <span onClick={onInvitePeopleClick}>+ Invite People</span>
                </div>}
  </ChannelWrapper>
)

const ChannelWrapper = styled.div`
  grid-column: 2
  grid-row: 1 / 4
  background-color: #4e3a4c
  color: #958993
`

const TeamNameHeader = styled.h1`
  color: #fff
  font-size: 20px
`

const SideBarList = styled.ul`
  width: 100%
  list-style: none
  padding-left: 0px
`

const paddingLeft = 'padding-left: 10px'

const SideBarListItem = styled.li`
  padding: 2px
  ${paddingLeft}
  &:hover {
    background: #3e313c
  }
`

const SideBarListHeader = styled.li`${paddingLeft};`

const PushLeft = styled.div`${paddingLeft};`

const Green = styled.span`color: #38978d;`
