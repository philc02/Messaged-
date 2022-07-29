// @ts-nocheck
import React from "react";
import { useConversations } from "../../contexts/ConversationsProvider";
import { OpenConversation } from "../../components/Content/OpenConversation";
import Sidebar from "../../components/Sidebar/Sidebar";

interface DashboardProps {
  id: string;
}
const Dashboard = (props: DashboardProps) => {
  const { id } = props;
  const { selectedConversation } = useConversations();

  return (
    <div className="d-flex" style={{ maxHeight: "50vh !important" }}>
      <Sidebar id={id} />
      {selectedConversation && <OpenConversation />}
    </div>
  );
};

export default Dashboard;
