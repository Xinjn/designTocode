import React, { useState } from "react";
import styles from "./index.css"
import Header from "./Header";
import Content from "./Content";

const RightSide = (props) => {

  return (
    <div className={styles.wrap}>
      <Header />
      <Content />
    </div>
  );
}

export default RightSide;
