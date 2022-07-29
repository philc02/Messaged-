import React, { useState } from 'react'
import { Tab, Nav, Button, Modal } from "react-bootstrap";
import Contacts from './Content/Contacts';
import Conversations from './Content/Conversations';
import NewContactModal from './Modals/NewContactModal';
import NewConversationModal from './Modals/NewConversationModal';

interface SidebarProps {
  id: string;
}

const CONVERSATIONS_KEY = "conversations";
const CONTACTS_KEY = "contacts";

const Sidebar = (props: SidebarProps) => {
  const { id } = props;
  const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY)
  const [modalOpen, setModalOpen] = useState(false);
  const isConversationOpen = activeKey === CONVERSATIONS_KEY;
  const updateActiveKey = (eventKey: any) => setActiveKey(eventKey);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div style={{ width: "250px", height: "100vh" }} className="d-flex flex-column">
        <Tab.Container activeKey={activeKey} onSelect={updateActiveKey}>
            <Nav variant="tabs" className="justify-content-center">
                <Nav.Item>
                    <Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
                </Nav.Item>
            </Nav>
            <Tab.Content className="border-right flex-grow-1">
                <Tab.Pane eventKey={CONVERSATIONS_KEY}>
                    <Conversations />
                </Tab.Pane>
                <Tab.Pane eventKey={CONTACTS_KEY}>
                    <Contacts />
                </Tab.Pane>
            </Tab.Content>
            <div className="p-2 border-top border-right small">
                Your ID: <span className="text-muted">{id}</span>
            </div>
            <Button className="rounded-0" onClick={openModal}>
                New {isConversationOpen ? "Conversation" : "Contact"}
            </Button>
        </Tab.Container>
        <Modal show={modalOpen} onHide={closeModal}>
            {isConversationOpen ?
                <NewConversationModal closeModal={closeModal}  />
                : <NewContactModal closeModal={closeModal} />
            }
        </Modal>
    </div>
  )
}

export default Sidebar