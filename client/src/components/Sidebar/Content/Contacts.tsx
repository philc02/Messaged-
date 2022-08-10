import React, { useEffect } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import styled from "styled-components";
import { useContacts } from "../../../contexts/ContactsProvider";

const ProfilePic = styled.img`
    border-radius: 50%;
    width: 25px;
    height: 25px;
    /* margin-bottom: 30px; */
`;

const PHILIP_DP = "https://www.seekpng.com/png/detail/604-6046709_one-ok-rock-stand-out-fit-in-from.png";
const DANIEL_DP = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_mMl3CT2uoskVlH-fsZtwb7WejBDMVtlPrw&usqp=CAU";
const NORMAL_DP = "https://png.pngtree.com/png-vector/20191101/ourlarge/pngtree-male-avatar-simple-cartoon-design-png-image_1934458.jpg";

const Contacts = () => {
  const { contacts } = useContacts();

  useEffect(() => {
    console.log("AA",contacts);
  }, []);

  return (
    <div style={{ height: "90vh" }}>
      <div style={{ marginBottom: "10px" }}>Contacts</div>
      <ListGroup variant="flush">
        {contacts.map((contact: { id: string; name: string }) => {
          return  (
            <div style={{ margin: "3px 0px" }}>
              <ListGroupItem key={contact.id} style={{ display: "flex", columnGap: "10px" }}>
              <ProfilePic src={
                 contact.name === "Chatbot" ?  
                  "https://media.istockphoto.com/vectors/robot-icon-bot-sign-design-chatbot-symbol-concept-voice-support-bot-vector-id1073043588?k=20&m=1073043588&s=170667a&w=0&h=K216zV32D3CyvJUQ17vcUNMj1UvNvVhn8nJZ8s-z3VA=" :
                  contact.name === "Philip" || contact.name === "philip_id" ? PHILIP_DP :
                  contact.name === "Daniel" || contact.name === "friend_id" ? DANIEL_DP :
                  NORMAL_DP } />
                <div>{contact.name}</div>
                </ListGroupItem>
            </div>
          )
        })}
      </ListGroup>
    </div>
  );
};

export default Contacts;
