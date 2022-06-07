import React, { useState } from "react";
import styles from "./index.css"
import Header from "./Header";
import Content from "./Content";
import errorBoundary from "../../errorBoundary";
import { Store } from "../../../../store";

const RightSide = () => {
  // 总数据
  const store = Store.useContainer();
  const { states, changeStates } = store;
  const {currentDom} = states
  
  return (
    <div className={styles.wrap}>
      <Header />
      <Content dom={currentDom}/>
    </div>
  );
}

export default errorBoundary(RightSide);
