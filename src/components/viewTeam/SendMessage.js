import React from 'react'
import styled from 'styled-components'

export default ({ channelName }) => (
  <SendMessageWrapper>
    <Input placeholder={`Message #${channelName}`} />
  </SendMessageWrapper>
)
const SendMessageWrapper = styled.div`
  grid-column: 3
  grid-row: 3
  margin: 20px
`
const Input = styled.input`
  width: 100%
  height: 30px
  font-size: 14px
  padding-left: 10px
  border: 1px solid #ddd
  border-radius: 4px
`
