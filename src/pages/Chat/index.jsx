import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

function Chat() {
  const SERVER_PORT = 4000;
  const socket = socketIOClient(`http://localhost:${SERVER_PORT}`);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState({
    text: "",
    author: "",
  });

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("MessagesFromServer", (messagesFromServer) => {
      setMessages(messagesFromServer);
    });

    socket.on("MessageToClient", (MessageToClient) => {
      setMessages((prev) => [...prev, MessageToClient]);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => socket.disconnect();
  }, []);

  const handleInputChange = (event, key) => {
    setMessage((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const submitNewMessage = () => {
    socket.emit("MessageToServer", {
      message: message.text,
      author: message.author,
    });
  };

  return (
    <div>
      <input
        value={message.text}
        onChange={(e) => handleInputChange(e, "text")}
      />
      <input
        value={message.author}
        onChange={(e) => handleInputChange(e, "author")}
      />
      <button onClick={submitNewMessage}>send</button>
      {JSON.stringify(messages)}
    </div>
  );
}

export default Chat;
