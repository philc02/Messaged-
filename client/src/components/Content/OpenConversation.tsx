// @ts-nocheck
import React, { useState, useCallback } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useConversations } from "../../contexts/ConversationsProvider";
import styled from "styled-components";

const PHILIP_DP = "https://www.seekpng.com/png/detail/604-6046709_one-ok-rock-stand-out-fit-in-from.png";
const DANIEL_DP = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_mMl3CT2uoskVlH-fsZtwb7WejBDMVtlPrw&usqp=CAU";
const NORMAL_DP = "https://png.pngtree.com/png-vector/20191101/ourlarge/pngtree-male-avatar-simple-cartoon-design-png-image_1934458.jpg";

const ProfilePic = styled.img`
    border-radius: 50%;
    width: 25px;
    height: 25px;
    /* margin-bottom: 30px; */
`;

export const OpenConversation = () => {
  const [text, setText] = useState("");
  const setRef = useCallback((node: any) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);
  const { sendMessage, selectedConversation } = useConversations();

  function handleSubmit(e: any) {
    e.preventDefault();
    console.log(text);
    console.log(selectedConversation.recipients);
    sendMessage(
      selectedConversation.recipients.map((r: any) => r.id),
      text
    );
    setText("");
  }

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div
        className="flex-grow-1"
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          maxHeight: "calc(100vh - 100px)",
          overflowY: "scroll",
        }}
      >
        <div
          className="d-flex flex-column align-items-start px-3 flex-grow-1"
          style={{ maxHeight: "calc(100vh - 100px)" }}
        >
          {selectedConversation.messages.map((message: any, index: number) => {
            const lastMessage =
              selectedConversation.messages.length - 1 === index;
            return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row"
                  }}
                  ref={lastMessage ? setRef : null}
                  key={index}
                  className={`my-1 d-flex ${
                    message.fromMe
                      ? "align-self-end align-items-end"
                      : "align-items-start"
                  }`}
                >
                  <div style={{ display : "flex", flexDirection: "column", alignItems: message.fromMe ? "flex-end" : "flex-start" }}>
                    <div style={{ display : "flex", flexDirection: "row", alignItems: "center", columnGap: "10px" }}>
                    { !message.fromMe &&  <ProfilePic src={
                    message.senderName === "Chatbot" ?  
                      "https://media.istockphoto.com/vectors/robot-icon-bot-sign-design-chatbot-symbol-concept-voice-support-bot-vector-id1073043588?k=20&m=1073043588&s=170667a&w=0&h=K216zV32D3CyvJUQ17vcUNMj1UvNvVhn8nJZ8s-z3VA=" :
                      message.senderName === "Philip" || message.senderName === "philip_id" ? PHILIP_DP :
                      message.senderName === "friend_id" || message.senderName === "Daniel" ? DANIEL_DP :
                      NORMAL_DP } /> }
                    <div
                      className={`rounded px-2 py-1 ${
                        message.fromMe ? "bg-primary text-white" : "border"
                      }`}
                    >
                      {message.text}
                    </div>
                    { message.fromMe &&  <ProfilePic src={
                    message.senderName === "Chatbot" ?  
                      "https://media.istockphoto.com/vectors/robot-icon-bot-sign-design-chatbot-symbol-concept-voice-support-bot-vector-id1073043588?k=20&m=1073043588&s=170667a&w=0&h=K216zV32D3CyvJUQ17vcUNMj1UvNvVhn8nJZ8s-z3VA=" :
                      message.senderName === "Philip" || message.senderName === "philip_id" ? PHILIP_DP :
                      message.senderName === "friend_id" || message.senderName === "Daniel" ? DANIEL_DP :
                      NORMAL_DP } /> }
                    </div>
                    <div
                      className={`text-muted small ${
                        message.fromMe ? "text-right" : "text-left"
                      }`}
                    >
                      {message.fromMe ? "You" : message.senderName}
                    </div>
                  </div>
                </div>
            );
          })}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup className="mb-3">
            <Form.Control
              className="shadow-none"
              as="textarea"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ height: "75px", resize: "none" }}
            />
            <Button className="shadow-none" type="submit">Send</Button>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
};
