import React from "react";
import classes from "./SubmitBar.module.css";

function SubmitBar({ inputValue, onClick, onChange }) {
  return (
    <div className={classes.submitBar}>
      <input value={inputValue} onChange={onChange} />
      <button onClick={onClick}>send</button>
    </div>
  );
}

export default SubmitBar;
