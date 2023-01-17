import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MainProvider } from "./context/MainContext";
import { UsersProvider } from "./context/UsersContext";
import { SocketProvider } from "./context/SocketContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MainProvider>
    <UsersProvider>
      <SocketProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SocketProvider>
    </UsersProvider>
  </MainProvider>
);
