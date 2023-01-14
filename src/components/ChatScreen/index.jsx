import React from "react";
import classes from "./ChatScreen.module.css";

function ChatScreen({ children }) {
  return <div className={classes.screen}>{children}</div>;
}

export default ChatScreen;
