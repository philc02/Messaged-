// @ts-nocheck
import React, { useState, useCallback } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useConversations } from "../../contexts/ConversationsProvider";

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
                ref={lastMessage ? setRef : null}
                key={index}
                className={`my-1 d-flex flex-column ${
                  message.fromMe
                    ? "align-self-end align-items-end"
                    : "align-items-start"
                }`}
              >
                <div
                  className={`rounded px-2 py-1 ${
                    message.fromMe ? "bg-primary text-white" : "border"
                  }`}
                >
                  {message.text}
                </div>
                <div
                  className={`text-muted small ${
                    message.fromMe ? "text-right" : "text-left"
                  }`}
                >
                  {message.fromMe ? "You" : message.senderName}
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
              as="textarea"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ height: "75px", resize: "none" }}
            />
            <Button type="submit">Send</Button>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
};
