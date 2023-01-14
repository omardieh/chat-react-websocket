import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import ChatScreen from "../../components/ChatScreen";
import ScreenMessages from "../../components/ChatScreen/ScreenMessages";
import SubmitBar from "../../components/ChatScreen/SubmitBar";

function Chat() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const socket = socketIOClient(`${SERVER_URL}`);
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
    if (message.author && message.text) {
      socket.emit("MessageToServer", {
        message: message.text,
        author: message.author,
      });
      setMessage((prev) => ({ ...prev, text: "" }));
    } else {
      alert("oops, please fill in username and message before submitting");
    }
  };

  return (
    <div>
      <ChatScreen
        onChange={(e) => handleInputChange(e, "author", setMessage)}
        inputValue={message.author}
      >
        <ScreenMessages messages={messages} />
        <SubmitBar
          inputValue={message.text}
          onClick={submitNewMessage}
          onChange={(e) => handleInputChange(e, "text", setMessage)}
        />
      </ChatScreen>
    </div>
  );
}

export default Chat;
