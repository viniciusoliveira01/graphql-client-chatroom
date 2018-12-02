import React from "react";
import styled from "styled-components";
import moment from "moment";

export default ({ message, username, meUserId, messageUserId }) => {
  console.log(meUserId, messageUserId);
  return (
    <Message isFriend={meUserId === "vinicius"}>
      <UserIcon isFriend={meUserId === "vinicius"}>
        <UserIconName>{meUserId === "vinicius" ? "V" : "B"}</UserIconName>
      </UserIcon>
      <Container>
        <UserMessageInfos>
          <Username>{username}</Username>
        </UserMessageInfos>
        <MessageText>{message.text}</MessageText>
      </Container>
    </Message>
  );
};

const Container = styled.div`
  display: flex
  flex-direction: column
  justify-content: space-between

`;

const UserIcon = styled.div`
  display: flex
  justify-content: center
  align-items: center
  background: ${({ isFriend }) => (isFriend ? "#7375c2" : "#9973c2")}
  height: 50px
  width: 50px
  margin-right: 10px
  border-radius: 50%
`;

const UserIconName = styled.span`
  font-size: 25px
  line-height: 37px
  font-weight: 300
  color: #fff
`;

const Message = styled.div`
  margin: 5px 0
  display: flex
  justify-content: flex-start
  order: -1
`;

const UserMessageInfos = styled.div`
  display: flex
  justify-content: space-between
  padding: 1px 0
`;

const Username = styled.span`
  color: #000
  font-weight: bold
  font-size: 18px
  line-height: 21px
  padding-right: 5px
  text-transform: capitalize
`;

const MessageCreatedAt = styled.span`
  color: #bfb8be
  font-weight: 100
  font-size: 15px
  line-height: 21px
`;

const MessageText = styled.span`
  color: #404040
  font-weight: 3  00
  font-size: 15px
`;
