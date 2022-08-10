// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { Button, Form, FormControl, Modal } from "react-bootstrap";
import styled from "styled-components";
import { useContacts } from "../../../contexts/ContactsProvider";
import { useConversations } from "../../../contexts/ConversationsProvider";

const StyledContact = styled.div`
  padding: 4px 8px;
  margin: 0px 5px;
  border-radius: 5px;
  border: 1px black solid;
  /* background-color: white; */
  &:hover {
    background-color: #254da3;
    * {
      color: white
    }
  }
`;

const CreateButton = styled(Button) `
    background-color: #d24662;
    border: none;
    border-radius: 5px;
    /* width: 100%; */
    outline: none;
    &:focus {
        background-color: #d24662;
    }
    &:hover {
        background-color: #fa355c;
    }
`;

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
    console.log(id);
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
      <Modal.Header closeButton>Create New Message</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "30px", display: "flex", flexDirection: "row" }}>
            {contacts.map((contact: any) => {
              const isChecked = selectedContactIds.includes(contact.id);
              return (
                  <StyledContact
                    style={{
                      border: isChecked && "1px white solid",
                      backgroundColor: isChecked && "#254da3"
                    }}
                    onClick={() => handleCheckboxClick(contact.id)}
                  >
                    <div style={{ color: isChecked && "white" }}>{contact.name}</div>
                  </StyledContact>
              );
            })}
          </div>
          <CreateButton className="shadow-none" type="submit">Create</CreateButton>
        </Form>
      </Modal.Body>
    </>
  );
};

export default NewConversationModal;
