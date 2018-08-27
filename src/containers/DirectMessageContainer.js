import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Messages from '../components/viewTeam/Messages'
import Message from '../components/viewTeam/Message'

const newDirectMessageSubscription = gql`
  subscription($teamId: Int!, $userId: Int!) {
    newDirectMessage(teamId: $teamId, userId: $userId) {
      id
      sender {
        username
      }
      text
      created_at
    }
  }
`

class DirectMessageContainer extends Component {
  componentWillMount () {
    this.unsubscribe = this.subscribe(this.props.teamId, this.props.userId)
  }

  componentWillReceiveProps ({ teamId, userId }) {
    if (this.props.teamId !== teamId || this.props.userId !== userId) {
      if (this.unsubscribe) {
        this.unsubscribe()
      }
      this.unsubscribe = this.subscribe(teamId, userId)
    }
  }

  componentWillUnmount () {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }

  subscribe = (teamId, userId) => {
        this.props.data.subscribeToMore({
      document: newDirectMessageSubscription,
      variables: {
        teamId,
        userId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) {
          return prev;
        }

        return {
          ...prev,
          directMessages: [...prev.directMessages, subscriptionData.data.newDirectMessage],
        };
      },
    })
  }


  render () {
    const { data: { loading, directMessages }, userId} = this.props
    if (loading) {
      return null
    }
    console.log(directMessages)

    return (
      <div>
        <Messages>
          <ul className='message-list'>
            {directMessages.map(message => <Message username={message.sender.username} message={message} key={`${userId}-${message.id}`} />)}
          </ul>
        </Messages>
      </div>
    )
  }
}

const directMessagesQuery = gql`
  query($teamId: Int!, $userId: Int!) {
    directMessages(teamId: $teamId, otherUserId: $userId) {
      id
      sender {
        username
      }
      text
      created_at
    }
  }
`

export default graphql(directMessagesQuery, {
  options: props => ({
    variables: {
      teamId: props.teamId,
      userId: props.userId
    },
    fetchPolicy: 'network-only'
  })
})(DirectMessageContainer)
