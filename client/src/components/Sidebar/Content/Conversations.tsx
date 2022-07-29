// @ts-nocheck
import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useConversations } from "../../../contexts/ConversationsProvider";

const Conversations = () => {
  const { conversations, selectConversationIndex } = useConversations();
  return (
    <ListGroup variant="flush">
      {conversations.map((conversation: any, index: number) => {
        return (
          <ListGroupItem
            key={index}
            action
            active={conversation.selected}
            onClick={() => selectConversationIndex(index)}
          >
            {conversation.recipients.map((r: any) => r.name).join(", ")}
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
};

export default Conversations;
