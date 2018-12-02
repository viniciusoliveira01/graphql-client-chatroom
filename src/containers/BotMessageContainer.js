import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";

import MessageBot from "../components/viewTeam/MessageBot";

class BotMessageContainer extends Component {
  render() {
    const { loading, messages } = this.props;
    if (loading) {
      return <p>Loading</p>;
    }

    const messageDefault = {
      text: "Olá, em que posso ajudar?"
    };

    return (
      <div>
        <Messages>
          <MessageBot
            meUserId="bilu"
            messageUserId="bilu"
            username="bilu"
            message={messageDefault}
            key={`${1}-"42"`}
          />
          {messages.map(message => (
            <MessageBot
              meUserId={message.id}
              messageUserId={message.id}
              username={message.id}
              message={message}
              key={`${1}-${message.id}`}
            />
          ))}
        </Messages>
      </div>
    );
  }
}

const Messages = styled.div`
grid-column: 3
grid-row: 2
padding: 20px
display: flex
flex-direction: column
overflow-y: auto
`;

export default BotMessageContainer;
