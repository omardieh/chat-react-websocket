import React from "react";
import classes from "./ScreenMessages.module.css";

function ScreenMessages({ messages }) {
  return (
    <div className={classes.screen}>
      <ul>
        {messages.map((e, i) => (
          <li key={i}>
            <b>{e.author} : </b> {e.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ScreenMessages;
