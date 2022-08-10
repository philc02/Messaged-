import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
// @ts-ignore
const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

// @ts-ignore
export function SocketProvider({ id, children }) {
  const [socket, setSocket] = useState();

  const getSocket = async () => {
    const response = await fetch("http://localhost:5001/chat", {
      mode: "cors",
      method: "POST",
      headers: new Headers({'content-type': 'application/json'}),
      body: JSON.stringify({ text: "what is your name?" })
    }).then(res => res);
    console.log(response);
    // console.log(response.json());
  }

  useEffect(() => {
    console.log("ran");
    getSocket();
  }, [])
  // @ts-ignore
  useEffect(() => {
    
    const newSocket = io("http://localhost:5000", { query: { id } });
    // @ts-ignore
    console.log("NEW SOCKET");
    // console.log(newSocket);
    // @ts-ignore
    setSocket(newSocket);

    // return () => newSocket.close();
  }, [id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
