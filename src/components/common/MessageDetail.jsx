import React, { useEffect } from "react";
import { Widget } from "react-chat-widget";

import "react-chat-widget/lib/styles.css";

import { StyledMessage } from "../../styles";
import { SUBSCRIBE_MESSAGE } from "../../graphql/subscriptions";

const MessageDetail = ({ handleNewUserMessage, subscribeToMore }) => {
  useEffect(() => {
    console.log("noiiccee");

    subscribeToMore({
      document: SUBSCRIBE_MESSAGE,
      variables: { receiver: "5e2a2c4b2b999a00177da5f4" },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.newMessage;

        if (!prev.friendChat.find(msg => msg.id === newMessage.id)) {
          return Object.assign({}, prev, {
            friendChat: [...prev.friendChat, newMessage]
          });
        } else {
          return prev;
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledMessage>
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        profileAvatar="https://cdn5.vectorstock.com/i/1000x1000/51/99/icon-of-user-avatar-for-web-site-or-mobile-app-vector-3125199.jpg"
        title="Ezekiel"
        subtitle=""
        showCloseButton={true}
        autofocus={true}
        launcher={handleToggle => {
          return (
            <button key={handleToggle} onClick={handleToggle}>
              Toggle
            </button>
          );
        }}
      />
    </StyledMessage>
  );
};

export default MessageDetail;
