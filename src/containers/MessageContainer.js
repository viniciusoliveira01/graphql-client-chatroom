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
  componentWillMount() {
    this.unsubscribe = this.subscribe(this.props.channelId);
  }

  componentWillReceiveProps({ channelId }) {
    if (this.props.channelId !== channelId) {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
      this.unsubscribe = this.subscribe(channelId);
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  subscribe = channelId => {
    this.props.data.subscribeToMore({
      document: newChannelMessageSubscription,
      variables: {
        channelId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) {
          return prev;
        }

        return {
          ...prev,
          messages: [...prev.messages, subscriptionData.data.newChannelMessage],
        };
      },
    });
  }


  render () {
    const { data: { loading, messages }, channelId} = this.props
    if (loading) {
      return null
    }

    return (
      <div>
        <Messages>
          <ul className='message-list'>
            {messages.map(message => <Message username={message.user.username} message={message} key={`${channelId}-${message.id}`} />)}
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

export default graphql(messagesQuery, {
  options: props => ({
    variables: {
      channelId: props.channelId
    },
    fetchPolicy: 'network-only'
  })
})(MessageContainer)
