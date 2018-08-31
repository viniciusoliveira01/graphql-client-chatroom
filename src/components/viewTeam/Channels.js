import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaPlusCircle } from 'react-icons/fa'

const channel = ({ id, name }, teamId) => (
  <SideBarListItem>
    <SideBarListItemLink key={`channel-${id}`} to={`/viewTeam/${teamId}/${id}`}>
      #
      {name}
    </SideBarListItemLink>
  </SideBarListItem>
)

const user = ({ id, username }, teamId) => (
  <SideBarListItem>
    <SideBarListItemLink key={`user-${id}`} to={`/viewTeam/user/${teamId}/${id}`}>
      {username}
    </SideBarListItemLink>
  </SideBarListItem>
)

export default ({teamName, username, channels, users, onChannelAddClick, teamId, onInvitePeopleClick, onDirectMessage, isOwner}) => (
  <ChannelWrapper>
    <PushLeft>
      <TeamNameHeader>
        {teamName}
      </TeamNameHeader>
      <Username>
        {username}
      </Username>
    </PushLeft>
    <div>
      <SideBarList>
        <SideBarListHeader>
          <SideBarTitle>
            Channels
          </SideBarTitle>
          {isOwner && <SideBarOption onClick={onChannelAddClick}>
                        <FaPlusCircle />
                      </SideBarOption>}
        </SideBarListHeader>
        {channels.map((c) => channel(c, teamId))}
      </SideBarList>
    </div>
    <div>
      <SideBarList>
        <SideBarListHeader>
          <SideBarTitle>
            Direct Messages
          </SideBarTitle>
          <SideBarOption onClick={onDirectMessage}>
            <FaPlusCircle />
          </SideBarOption>
        </SideBarListHeader>
        {users.map((u) => user(u, teamId))}
      </SideBarList>
    </div>
    <div>
      <SideBarList>
        <SideBarListHeader>
          <SideBarTitle>
            Invite People
          </SideBarTitle>
          {isOwner && <SideBarOption onClick={onInvitePeopleClick}>
                        <FaPlusCircle />
                      </SideBarOption>}
        </SideBarListHeader>
      </SideBarList>
    </div>
  </ChannelWrapper>
)

const ChannelWrapper = styled.div`
  grid-column: 2
  grid-row: 1 / 4
  background-color: #282828
  color: #f2f2f2
  padding-top: 5px
`

const TeamNameHeader = styled.h1`
  color: #fff
  font-size: 20px
  padding: 5px 0px 2px 0
`

const Username = styled.h2`
 color: #f2f2f2
 font-size: 15px
 font-weight: 300
 padding-bottom: 5px
`

const SideBarList = styled.div`
  width: 100%
  padding-left: 0px
`

const SideBarTitle = styled.span`
  color: #fff
  font-size: 15px
`

const SideBarOption = styled.i`
  font-size: 14px
  padding-left: 5px
  cursor: pointer
`

const paddingLeft = 'padding-left: 10px'

const SideBarListItem = styled.div`
  width: 100%
  &:hover {
    background: #181818
    width: 100%
  }
`

const SideBarListItemLink = styled(Link)`
  color: #fff
  font-size: 15px
  line-height: 21px
  margin: 10px;
  text-decoration: none;
`

const SideBarListHeader = styled.div`
  display: flex
  justify-content: space-between
  padding: 0 10px
  margin: 10px 0
`

const PushLeft = styled.div`${paddingLeft}`
