import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useContacts } from "../../../contexts/ContactsProvider";

const Contacts = () => {
  const { contacts } = useContacts();
  return (
    <ListGroup variant="flush">
      {contacts.map((contact: { id: string; name: string }) => {
        <ListGroupItem key={contact.id}>{contact.name}</ListGroupItem>;
      })}
    </ListGroup>
  );
};

export default Contacts;
