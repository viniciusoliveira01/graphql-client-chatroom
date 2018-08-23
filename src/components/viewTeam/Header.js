import React from 'react'
import styled from 'styled-components'

export default ({ channelName }) => (
  <HeaderWrapper>
    <div>
      #
      {channelName}
    </div>
  </HeaderWrapper>
)

const HeaderWrapper = styled.div`
  grid-column: 3
  grid-row: 1
`
