import React, { useState } from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import { ContactsProvider } from "./contexts/ContactsProvider";
import { ConversationsProvider } from "./contexts/ConversationsProvider";
import { SocketProvider } from "./contexts/SocketProvider";
import useLocalStore from "./hooks/useLocalStore";

const App = () => {
  const [id, setId] = useLocalStore("id", null as any);

  return (
    <body style={{ overflow: "hidden" }}>
      {id ? (
        <SocketProvider id={id}>
          <ContactsProvider>
            <ConversationsProvider id={id}>
              <Dashboard id={id} />
            </ConversationsProvider>
          </ContactsProvider>
        </SocketProvider>
      ) : (
        <Login onIdSubmit={(id: string) => setId(id)} />
      )}
    </body>
  );
};

export default App;
