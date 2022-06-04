import React from "react";
import errorBoundary from "../errorBoundary";
import styles from "./index.css"


const Wrap = (content) => {
  return (
    <div className={styles.wrap}>{content.children}</div>
  );
}

export default errorBoundary(Wrap);
 