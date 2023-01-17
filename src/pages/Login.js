import React, { useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";
import { MainContext } from "../context/MainContext";
import { UsersContext } from "../context/UsersContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const { name, setName, room, setRoom } = useContext(MainContext);
  const { users, setUsers } = useContext(UsersContext);

  useEffect(() => {
    socket.on("users", (users) => {
      setUsers(users);
    });
  });

  const handleLogin = () => {
    socket.emit("login", { name, room }, (error) => {
      if (error) {
        console.log(error);
        return error;
      }
      navigate("/chat");
    });
  };

  if (users[0]?.name) {
    return (
      <div>
        already logged in as : <b>{users[0].name}</b>
      </div>
    );
  }

  return (
    <div>
      <input
        type="text"
        placeholder="enter user nickname"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="enter room name"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={handleLogin}>login</button>
    </div>
  );
}

export default Login;
