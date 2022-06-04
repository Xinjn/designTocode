import React, { useState } from "react";
import styles from "./index.css"
const Header = (props) => {

  return (
    <div className={styles.wrap}>
     <button>样式</button>
     <button>属性</button>
     <button>事件</button>
     <button>数据</button>
  </div>
  );
}

export default Header;
