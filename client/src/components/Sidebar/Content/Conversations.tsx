// @ts-nocheck
import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useConversations } from "../../../contexts/ConversationsProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from "styled-components";
import { faHome, faSearch, faAddressBook, faPlus } from "@fortawesome/fontawesome-free-solid";

const CircleButton = styled.button`
  border: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  &:hover {
    background-color: #2c42ead1;
  }
  * {
    width: 10px;
    height: 10px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 13px 0px;
  padding: 5px 10px;
  /* border: 0.2px solid black; */
  border-radius: 7px;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  align-items: center;
  column-gap: 7px;
`;

const StyledInput = styled.input`
    font-size: 12px;
    border: none;
    &:focus {
      outline: none;
    }
    height: 25px;
`;
const ConversationContainer = styled.div`

`;

const ProfilePic = styled.img`
    border-radius: 50%;
    width: 25px;
    height: 25px;
    /* margin-bottom: 30px; */
`;

const PHILIP_DP = "https://www.seekpng.com/png/detail/604-6046709_one-ok-rock-stand-out-fit-in-from.png";
const DANIEL_DP = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_mMl3CT2uoskVlH-fsZtwb7WejBDMVtlPrw&usqp=CAU";
const NORMAL_DP = "https://png.pngtree.com/png-vector/20191101/ourlarge/pngtree-male-avatar-simple-cartoon-design-png-image_1934458.jpg";
const Conversations = () => {
  const { conversations, selectConversationIndex } = useConversations();
  return (
    <div style={{ height: "90vh" }}>
        <div>Messages</div>
        <InputContainer>
          <FontAwesomeIcon icon={faSearch} style={{ width: "14px" }} />
          <StyledInput placeholder="Search..."/>
        </InputContainer>
      <ListGroup variant="flush">
        {conversations.map((conversation: any, index: number) => {
          return (
            <ConversationContainer>
              <ListGroupItem
                key={index}
                action
                active={conversation.selected}
                style={{
                  // border: "solid 1px #254da3",
                  display: "flex",
                  columnGap: "10px",
                  backgroundColor: conversation.selected ? "#254da3" : "white",
                  margin: "5px 0px",
                  borderRadius: "5px",
                  boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"
                }}
                onClick={() => selectConversationIndex(index)}
              >
                <ProfilePic src={
                  conversation.recipients.map((r: any) => r.name).join(", ") === "Chatbot" ?  
                  "https://media.istockphoto.com/vectors/robot-icon-bot-sign-design-chatbot-symbol-concept-voice-support-bot-vector-id1073043588?k=20&m=1073043588&s=170667a&w=0&h=K216zV32D3CyvJUQ17vcUNMj1UvNvVhn8nJZ8s-z3VA=" :
                  conversation.recipients.map((r: any) => r.name).join(", ") === "Philip" || conversation.recipients.map((r: any) => r.name).join(", ") === "philip_id" ? PHILIP_DP :
                  conversation.recipients.map((r: any) => r.name).join(", ") === "Daniel"  || conversation.recipients.map((r: any) => r.name).join(", ") === "friend_id" ? DANIEL_DP :
                  NORMAL_DP } />
                <div>{conversation.recipients.map((r: any) => r.name).join(", ")}</div>
              </ListGroupItem>
            </ConversationContainer>
          );
        })}
      </ListGroup>
    </div>
  );
};

export default Conversations;
