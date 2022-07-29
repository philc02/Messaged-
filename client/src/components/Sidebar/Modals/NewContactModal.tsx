import React, { useRef } from "react";
import { Button, Form, FormControl, Modal } from "react-bootstrap";
import { useContacts } from "../../../contexts/ContactsProvider";

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
          <Form.Group>
            <Form.Label>Id</Form.Label>
            <Form.Control type="text" ref={idInputRef} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" ref={nameInputRef} required />
          </Form.Group>
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  );
};

export default NewContactModal;
