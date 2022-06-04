import React from "react";
import errorBoundary from "../errorBoundary";
import styles from "./index.css"

const Footer = () => {
  return (
    <div className={styles.footer}>
      IFENG Licensed | Copyright © 2022.01.01-present Ifeng
    </div>
  );
}

export default errorBoundary(Footer);
 