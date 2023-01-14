import React from "react";
import classes from "./SubmitBar.module.css";

function SubmitBar({ input, onClick, onChange }) {
  return (
    <div className={classes.submitBar}>
      <input value={input.text} onChange={onChange} />
      <button onClick={onClick}>send</button>
    </div>
  );
}

export default SubmitBar;
