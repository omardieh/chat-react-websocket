import React, { useContext, useEffect, useState } from "react";
import ChatScreen from "../../components/ChatScreen";
import ScreenMessages from "../../components/ChatScreen/ScreenMessages";
import SubmitBar from "../../components/ChatScreen/SubmitBar";
import { handleInputChange } from "../../handlers/handle-input-change";
import { UsersContext } from "../../context/UsersContext";
import { SocketContext } from "../../context/SocketContext";
import { MainContext } from "../../context/MainContext";
import { useNavigate } from "react-router-dom";

function Chat() {
  const { users } = useContext(UsersContext);
  const { name, room, messages, setName, setRoom, setMessages } =
    useContext(MainContext);
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!name) {
      alert("you need to be logged in first");
      return navigate("/login");
    }
  }, [navigate, name]);

  useEffect(() => {
    socket.on("MessageToClient", (msg) => {
      setMessages((messages) => [...messages, msg]);
    });
    return () => socket.disconnect();
  }, [socket, setMessages]);

  const submitNewMessage = () => {
    socket.emit("MessageToServer", message, () => setMessage(""));
    setMessage("");
  };
  console.log(messages);
  return (
    <div>
      <>
        {users &&
          users.map((user) => {
            return (
              <div key={user.id}>
                <div>user: {user.name}</div>
              </div>
            );
          })}
      </>
      <>
        room: {console.log(room)}
        {room.slice(0, 1).toUpperCase() + room.slice(1)}
      </>
      <>
        {messages.length > 0 ? (
          messages.map((msg, i) => (
            <div key={i}>
              <div>{msg.user}</div>
              <div>{msg.text}</div>
            </div>
          ))
        ) : (
          <div>
            <div>-----</div>
            <div>No messages</div>
            <div>-----</div>
          </div>
        )}
      </>
      <>
        <form>
          <input
            type="text"
            placeholder="Enter Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={submitNewMessage}
            disabled={message === "" ? true : false}
          >
            Send
          </button>
        </form>
      </>
      <ChatScreen
        user={name}
        room={room.slice(0, 1).toUpperCase() + room.slice(1)}
      >
        <ScreenMessages messages={messages} />
        <SubmitBar
          inputValue={message}
          onClick={submitNewMessage}
          onChange={(e) => setMessage(e.target.value)}
          disabled={message === "" ? true : false}
        />
      </ChatScreen>
    </div>
  );
}

export default Chat;
