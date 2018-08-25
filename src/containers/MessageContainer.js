import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Messages from '../components/viewTeam/Messages'
import Message from '../components/viewTeam/Message'

const newChannelMessageSubscription = gql`
  subscription($channelId: Int!) {
    newChannelMessage(channelId: $channelId) {
      id
      text
      user {
        username
      }
      created_at
    }
  }
`

class MessageContainer extends Component {
  componentDidMount () {
    this.props.data.subscribeToMore({
      document: newChannelMessageSubscription,
      variables: {
        channelId: this.props.channelId
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) {
          return prev
        }

        return {
          ...prev,
          messages: [...prev.messages, subscriptionData.data.newChannelMessage]
        }
      }
    })
  }

  render () {
    const { data: { loading, messages }} = this.props
    if (loading) {
      return null
    }

    return (
      <div>
        <Messages>
          <ul className='message-list'>
            {messages.map(message => <Message message={message} key={message.id} />)}
          </ul>
        </Messages>
      </div>
    )
  }
}

const messagesQuery = gql`
  query($channelId: Int!) {
    messages(channelId: $channelId) {
      id
      text
      user {
        username
      }
      created_at
    }
  }
`

export default graphql(
  messagesQuery,
  {
    variables: props => ({
      channelId: props.channelId
    })
  }
)(MessageContainer)
