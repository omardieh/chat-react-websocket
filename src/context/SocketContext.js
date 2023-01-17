import React, { createContext } from "react";
import socketIOClient from "socket.io-client";

const SocketContext = createContext();

function SocketProvider({ children }) {
  const ENDPOINT = `${process.env.REACT_APP_SERVER_URL}`;
  const socket = socketIOClient(ENDPOINT);

  return (
    <SocketContext.Provider value={socket}> {children} </SocketContext.Provider>
  );
}

export { SocketContext, SocketProvider };
