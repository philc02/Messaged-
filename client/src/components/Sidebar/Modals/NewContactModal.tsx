import React, { useRef } from "react";
import { Button, Form, FormControl, Modal } from "react-bootstrap";
import { useContacts } from "../../../contexts/ContactsProvider";
import styled from "styled-components";

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
const NewContactModal = ({ closeModal }: NewContactModalProps) => {
  const idInputRef = useRef<HTMLInputElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const { createContact } = useContacts();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    createContact(
      idInputRef?.current?.value as string,
      nameInputRef?.current?.value as string
    );
    closeModal();
  };

  return (
    <>
      <Modal.Header closeButton>Create Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group style={{ marginBottom: "10px" }}>
            <Form.Label>Enter Your Friend's User ID!</Form.Label>
            <Form.Control type="text" ref={idInputRef} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>What's their name?</Form.Label>
            <Form.Control type="text" ref={nameInputRef} required />
          </Form.Group>
          <br />
          <CreateButton type="submit">Create</CreateButton>
        </Form>
      </Modal.Body>
    </>
  );
};

export default NewContactModal;
