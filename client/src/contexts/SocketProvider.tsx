import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'
// @ts-ignore
const SocketContext = React.createContext()

export function useSocket() {
  return useContext(SocketContext)
}

// @ts-ignore
export function SocketProvider({ id, children }) {
  const [socket, setSocket] = useState()

  // @ts-ignore
  useEffect(() => {
    const newSocket = io(
      'http://localhost:5000',
      { query: { id } }
    )
    // @ts-ignore
    console.log("NEW SOCKET");
    console.log(newSocket);
    // @ts-ignore
    setSocket(newSocket)

    return () => newSocket.close()
  }, [id])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}