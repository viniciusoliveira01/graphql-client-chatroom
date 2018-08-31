import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

export default ({message, username}) => (
  <Message>
    <UserIcon>
      <UserIconName>
        {username.charAt(0).toUpperCase()}
      </UserIconName>
    </UserIcon>
    <Container>
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
    </Container>
  </Message>
)

const Container = styled.div`
  display: flex
  flex-direction: column
  justify-content: space-between

`

const UserIcon = styled.div`
  display: flex
  justify-content: center
  align-items: center
  background: #7375c2
  height: 50px
  width: 50px
  margin-right: 10px
  border-radius: 50%
`

const UserIconName = styled.span`
  font-size: 25px
  line-height: 37px
  font-weight: 300
  color: #fff
`

const Message = styled.div`
  margin: 5px 0
  display: flex
  justify-content: flex-start
`

const UserMessageInfos = styled.div`
  display: flex
  justify-content: space-between
  padding: 1px 0
`

const Username = styled.span`
  color: #000
  font-weight: bold
  font-size: 18px
  line-height: 21px
  padding-right: 5px
  text-transform: capitalize
`

const MessageCreatedAt = styled.span`
  color: #bfb8be
  font-weight: 100
  font-size: 15px
  line-height: 21px
`

const MessageText = styled.span`
  color: #404040
  font-weight: 3  00
  font-size: 15px
`
