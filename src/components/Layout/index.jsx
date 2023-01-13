import React from "react";
import classes from "./Layout.module.css";

function Layout({ children }) {
  return <main className={classes.layout}> {children} </main>;
}

export default Layout;
