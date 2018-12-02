import React from "react";
import styled from "styled-components";
import axios from "axios";
import { compose, graphql } from "react-apollo";
import gql from "graphql-tag";
import findIndex from "lodash/findIndex";
import { Redirect } from "react-router-dom";

import { meQuery } from "../graphql/Team";

import Header from "../components/viewTeam/Header";

import AppLayout from "../components/viewTeam/AppLayout";
import Sidebar from "../containers/Sidebar";
import BotMessageContainer from "../containers/BotMessageContainer";

class BotMessageScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      messages: [],
      loading: false
    };
  }

  handleSubmit() {
    this.setState({ loading: true });
    const { message } = this.state;
    axios
      .post("http://191.239.242.108:3004/message", {
        message
      })
      .then(response => {
        const answer = response.data.answers[0].answer;
        const botAnswer = {
          id: "bilu",
          text: answer
        };

        const userQuestion = {
          id: "vinicius",
          text: message
        };
        const newMessages = [userQuestion, botAnswer];

        this.setState({ loading: false, messages: newMessages, message: "" });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }

  render() {
    const {
      mutate,
      data: { loading, me },
      match: {
        params: { teamId, channelId }
      }
    } = this.props;
    const { messages } = this.state;

    if (loading) {
      return <p>...</p>;
    }

    const { teams, username } = me;
    const teamIdInteger = parseInt(teamId, 10);

    const teamIdx = teamIdInteger ? findIndex(teams, ["id", teamIdInteger]) : 0;
    const team = teamIdx === -1 ? teams[0] : teams[teamIdx];
    const teamsList = teams.map(t => ({
      id: t.id,
      letter: t.name.charAt(0).toUpperCase()
    }));

    const channelIdInteger = parseInt(channelId, 10);
    const channelIdx = channelIdInteger
      ? findIndex(team.channels, ["id", channelIdInteger])
      : 0;
    const channel =
      channelIdx === -1 ? team.channels[0] : team.channels[channelIdx];

    return (
      <AppLayout>
        {team && <Sidebar teams={teamsList} team={team} username={username} />}
        <React.Fragment>
          <BotMessageContainer messages={messages} loading={loading} />
          <SendMessageWrapper>
            <Input
              placeholder={`Message to bot`}
              name="message"
              value={this.state.message}
              onChange={e => this.setState({ message: e.target.value })}
              onKeyDown={e => e.keyCode === 13 && this.handleSubmit()}
            />
          </SendMessageWrapper>
        </React.Fragment>
      </AppLayout>
    );
  }
}

const SendMessageWrapper = styled.div`
  grid-column: 3
  grid-row: 3
  margin: 20px
`;
const Input = styled.input`
  width: 100%
  height: 30px
  font-size: 14px
  padding-left: 10px
  border: 1px solid #ddd
  border-radius: 4px
`;

export default graphql(meQuery, { options: { fetchPolicy: "network-only" } })(
  BotMessageScreen
);
