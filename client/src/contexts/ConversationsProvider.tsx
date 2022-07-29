// @ts-nocheck
import React, { useContext, useState, useEffect, useCallback } from 'react'
import useLocalStore from '../hooks/useLocalStore';
import { useContacts } from './ContactsProvider';
import { useSocket } from './SocketProvider';

// @ts-ignore
const ConversationsContext = React.createContext()

export const useConversations = () => useContext(ConversationsContext);

// @ts-ignore
export function ConversationsProvider({ id, children }) {
  const [conversations, setConversations] = useLocalStore('conversations', [])
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
  const { contacts } = useContacts()
  const socket = useSocket()
  const createConversation = (recipients) => {
    setConversations(prevConversations => {
      return [...prevConversations, { recipients, messages: [] }]
    })
  }

  const addMessageToConversation = useCallback(({ recipients, text, sender }) => {
    console.log("addmsg", recipients, text, sender);
    setConversations(prevConversations => {
      let madeChange = false
      const newMessage = { sender, text }
      console.log("addmsg", prevConversations);
      const newConversations = prevConversations.map(conversation => {
        if (arrayEquality(conversation.recipients, recipients)) {
          madeChange = true
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage]
          }
        }

        return conversation
      })

      if (madeChange) {
        console.log("new", newConversations);
        return newConversations
      } else {

        console.log("prev", [
          ...prevConversations,
          { recipients, messages: [newMessage] }
        ]);
        return [
          ...prevConversations,
          { recipients, messages: [newMessage] }
        ]
      }
    })
  }, [setConversations])

  useEffect(() => {
    if (socket == null) return

    socket.on('receive-message', addMessageToConversation)

    return () => {
      socket.off('receive-message')
    }
  }, [socket, addMessageToConversation]);

  const sendMessage = (recipients, text) => {
    console.log(recipients, text);
    socket.emit('send-message', { recipients, text })

    addMessageToConversation({ recipients, text, sender: id })
  }

  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map(recipient => {
      const contact = contacts.find(contact => {
        return contact.id === recipient
      })
      const name = (contact && contact.name) || recipient
      return { id: recipient, name }
    })

    const messages = conversation.messages.map(message => {
      const contact = contacts.find(contact => {
        return contact.id === message.sender
      })
      const name = (contact && contact.name) || message.sender
      const fromMe = id === message.sender
      return { ...message, senderName: name, fromMe }
    })
    
    const selected = index === selectedConversationIndex
    return { ...conversation, messages, recipients, selected }
  })

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    sendMessage,
    selectConversationIndex: setSelectedConversationIndex,
    createConversation
  }

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  )
}

function arrayEquality(a, b) {
  if (a.length !== b.length) return false

  a.sort()
  b.sort()

  return a.every((element, index) => {
    return element === b[index]
  })
}