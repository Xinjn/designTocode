import React, { useEffect, useState } from "react";
import styles from "./index.css"

const Content = (props) => {

  return (
    <div className={styles.wrap}>

      <div className={styles.attrWrap}>
        <div className={styles.attrHeader}>属性名</div>
      </div>


      <div className={styles.styleWrap}>
        <div className={styles.styleHeader}>样式</div>
        <div  className={styles.styleOption}>
          <div  className={styles.styleItem}>
            <div>宽度</div>
            <input type="text" />
          </div>
          <div  className={styles.styleItem}>
            <div>高度</div>
            <input type="text" />
          </div>
          <div  className={styles.styleItem}>
            <div>上边距</div>
            <input type="text" />
          </div>
        </div>
      </div>

    </div>
  );
}

export default Content;
