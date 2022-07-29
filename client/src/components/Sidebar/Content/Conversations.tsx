// @ts-nocheck
import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { useConversations } from '../../../contexts/ConversationsProvider';

const Conversations = () => {
  const { conversations, setSelectedIdx } = useConversations();
  return (
    <ListGroup variant="flush">
      {conversations.map((conversation: any, index: number) => {
        return (
          <ListGroupItem key={index} action active={conversation.selected} onClick={() => setSelectedIdx(index)}>
            {conversation.recipients.map((r: any) => r.name).join(", ")}
          </ListGroupItem>
        )
      })}
    </ListGroup>
  )
}

export default Conversations