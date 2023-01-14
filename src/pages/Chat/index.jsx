import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import ChatScreen from "../../components/ChatScreen";
import ScreenMessages from "../../components/ChatScreen/ScreenMessages";
import SubmitBar from "../../components/ChatScreen/SubmitBar";

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
      <ChatScreen>
        <ScreenMessages messages={messages} />
        <SubmitBar
          input={message}
          setInput={setMessage}
          inputFor={"text"}
          onClick={submitNewMessage}
          onChange={(e) => handleInputChange(e, "text", setMessage)}
        />
      </ChatScreen>
    </div>
  );
}

export default Chat;
