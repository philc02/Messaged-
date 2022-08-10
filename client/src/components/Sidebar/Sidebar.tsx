// @ts-nocheck
import React, { useState } from 'react'
import { Tab, Nav, Button, Modal } from "react-bootstrap";
import Contacts from './Content/Contacts';
import Conversations from './Content/Conversations';
import NewContactModal from './Modals/NewContactModal';
import NewConversationModal from './Modals/NewConversationModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from "styled-components";
import { faHome, faCommentAlt, faAddressBook, faCogs } from "@fortawesome/fontawesome-free-solid";
const MenuContainer = styled.div`
    width: 60px;
    height: 100vh;
    padding: 20px 0px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 5px;
    background-color: #254da3;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const MenuItemsContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    /* row-gap: 25px; */
`;

const MenuProfile = styled.img`
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin-bottom: 30px;
`;

const IconWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 40px;
    &:hover {
        background-color: white;
        * {
            color: black;
        }
    }
`;
const SideBarContainer = styled.div`
    width: 250px;
    height: 100vh;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    /* border-right: 1px solid black; */
    display: flex;
    flex-direction: column;
`;

const NewButton = styled(Button) `
    background-color: #d24662;
    border: none;
    border-radius: 5px;
    width: 100%;
    outline: none;
    &:focus {
        background-color: #d24662;
    }
    &:hover {
        background-color: #fa355c;
    }
`;

interface SidebarProps {
  id: string;
}

const CONVERSATIONS_KEY = "conversations";
const CONTACTS_KEY = "contacts";
const SETTINGS_KEY = "settings";

const PHILIP_DP = "https://www.seekpng.com/png/detail/604-6046709_one-ok-rock-stand-out-fit-in-from.png";
const DANIEL_DP = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_mMl3CT2uoskVlH-fsZtwb7WejBDMVtlPrw&usqp=CAU";
const NORMAL_DP = "https://png.pngtree.com/png-vector/20191101/ourlarge/pngtree-male-avatar-simple-cartoon-design-png-image_1934458.jpg";
const Sidebar = (props: SidebarProps) => {
  const { id } = props;
  const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY)
  const [modalOpen, setModalOpen] = useState(false);
  const isConversationOpen = activeKey === CONVERSATIONS_KEY;
  const updateActiveKey = (eventKey: any) => setActiveKey(eventKey);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
        <MenuContainer>
            <MenuProfile
                    src={ 
                        id === "philip_id" ? PHILIP_DP : id === "friend_id" ? DANIEL_DP :
                        "https://png.pngtree.com/png-vector/20191101/ourlarge/pngtree-male-avatar-simple-cartoon-design-png-image_1934458.jpg" }/>
            <MenuItemsContainer> 
            <IconWrapper onClick={() => setActiveKey(CONVERSATIONS_KEY)} style={{
                backgroundColor: activeKey === CONVERSATIONS_KEY ? "white" : "",
                color: activeKey === CONVERSATIONS_KEY ? "" : "white"
            }}>
                 <FontAwesomeIcon icon={faCommentAlt} />
            </IconWrapper>
            <IconWrapper onClick={() => setActiveKey(CONTACTS_KEY)} style={{
                backgroundColor: activeKey === CONTACTS_KEY ? "white" : "",
                color: activeKey === CONTACTS_KEY ? "" : "white"
            }}>
                 <FontAwesomeIcon icon={faAddressBook} />
            </IconWrapper>
            <IconWrapper onClick={() => setActiveKey(SETTINGS_KEY)} style={{
                backgroundColor: activeKey === SETTINGS_KEY ? "white" : "",
                color: activeKey === SETTINGS_KEY ? "" : "white"
            }}>
                 <FontAwesomeIcon icon={faCogs} />
            </IconWrapper>
            </MenuItemsContainer>
        </MenuContainer>
        <SideBarContainer>
            <div style={{ flex: "1" }}>
                {activeKey === CONVERSATIONS_KEY && <Conversations /> }
                {activeKey === CONTACTS_KEY && <Contacts /> }
                {activeKey === SETTINGS_KEY && <div className="p-2 border-top border-right small">
                    Your ID: <span className="text-muted">{id}</span>
                </div> }
                <NewButton className="shadow-none" onClick={openModal}>
                {activeKey === CONVERSATIONS_KEY ? "Create New Message" : activeKey === CONTACTS_KEY ? "Add New Friends" : "Create New ID"}
                </NewButton>
            </div>
            <Modal show={modalOpen} onHide={closeModal}>
                {isConversationOpen ?
                    <NewConversationModal closeModal={closeModal}  />
                    : <NewContactModal closeModal={closeModal} />
                }
            </Modal>
        </SideBarContainer>
    </>
  )
}

export default Sidebar