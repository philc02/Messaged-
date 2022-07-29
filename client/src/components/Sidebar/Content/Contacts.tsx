import React, { useEffect } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useContacts } from "../../../contexts/ContactsProvider";

const Contacts = () => {
  const { contacts } = useContacts();

  useEffect(() => {
    console.log("AA",contacts);
  }, []);

  return (
    <ListGroup variant="flush">
      {contacts.map((contact: { id: string; name: string }) => {
        return  (
          <ListGroupItem key={contact.id}>{contact.name}</ListGroupItem>
        )
      })}
    </ListGroup>
  );
};

export default Contacts;
