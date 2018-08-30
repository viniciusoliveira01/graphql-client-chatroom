import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

export default ({message, username}) => (
  <Message>
    <UserMessageInfos>
      <Username>
        {username}
      </Username>
      <MessageCreatedAt>
        {moment(message.created_at).format('HH:mm a')}
      </MessageCreatedAt>
    </UserMessageInfos>
    <MessageText>
      {message.text}
    </MessageText>
  </Message>
)

const Message = styled.div`
  margin: 5px 0
`

const UserMessageInfos = styled.div`
  display: flex
  justify-content: flex-start
  padding: 5px 0
`

const Username = styled.span`
  color: #000
  font-weight: bold
  font-size: 15px
  padding-right: 5px
`

const MessageCreatedAt = styled.span`
  color: #958993
  font-weight: 100
  font-size: 12px
`

const MessageText = styled.span`
  color: #404040
  font-weight: 300
  font-size: 13px
`
