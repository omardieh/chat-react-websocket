import React, { createContext, useState } from "react";

const MainContext = createContext();

const MainProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);

  return (
    <MainContext.Provider
      value={{ name, room, messages, setName, setRoom, setMessages }}
    >
      {children}
    </MainContext.Provider>
  );
};

export { MainContext, MainProvider };
