import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const team = ({ id, letter }) => (
  <TeamListItem key={`team-${id}`} to={`/viewTeam/${id}`}>
    {letter}
  </TeamListItem>
)

export default ({ teams }) => (
  <TeamWrapper>
    <TeamList>
      {teams.map(team)}
    </TeamList>
    <TeamListItem to={`/createTeam`}>
      +
    </TeamListItem>
  </TeamWrapper>
)

const TeamWrapper = styled.div`
  grid-column: 1
  grid-row: 1 / 4
  background-color: #181818
  color: #958993
`

const TeamList = styled.div`
  width: 100%
  padding-top: 5px
`

const TeamListItem = styled(Link)`
  height: 50px
  width: 50px
  background-color: #c173c2
  color: #fff
  margin: auto
  margin-bottom: 10px
  display: flex
  align-items: center
  justify-content: center
  font-size: 24px
  border-radius: 50%
  text-decoration: none
  &:hover {
    border-style: solid
    border-width: thick
    border-color: #c173c2
  }
`
