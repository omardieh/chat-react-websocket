import React from "react";
import classes from "./ChatScreen.module.css";

function ChatScreen({ children, onChange, inputValue }) {
  return (
    <div className={classes.screen}>
      <div className={classes.username}>
        <h4>username :</h4>
        <input value={inputValue} onChange={onChange} />
      </div>
      {children}
    </div>
  );
}

export default ChatScreen;
