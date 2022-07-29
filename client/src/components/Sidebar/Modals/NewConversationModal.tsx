// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { Button, Form, FormControl, Modal } from "react-bootstrap";
import { useContacts } from "../../../contexts/ContactsProvider";
import { useConversations } from "../../../contexts/ConversationsProvider";
interface NewContactModalProps {
  closeModal: () => void;
}
const NewConversationModal = ({ closeModal }: NewContactModalProps) => {
  const [selectedContactIds, setSelectedContactIds] = useState([] as any[]);
  const { contacts } = useContacts();
  const { createConversation } = useConversations();

  useEffect(() => {
    console.log("A", contacts);
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // console.log(contacts);
    createConversation(selectedContactIds);
    closeModal();
  };

  const handleCheckboxClick = (id: string) => {
    setSelectedContactIds((prevIds: any) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((prevId: any) => {
          return id !== prevId;
        });
      } else {
        return [...prevIds, id];
      }
    });
  };
  return (
    <>
      <Modal.Header closeButton>Create Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact: any) => {
            return (
              <Form.Group controlId={contact.id} key={contact.id}>
                <Form.Check
                  type="checkbox"
                  checked={selectedContactIds.includes(contact.id)}
                  label={contact.name}
                  onChange={() => handleCheckboxClick(contact.id)}
                />
              </Form.Group>
            );
          })}
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  );
};

export default NewConversationModal;
