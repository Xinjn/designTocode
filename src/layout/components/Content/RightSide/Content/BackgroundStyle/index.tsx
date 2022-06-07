import React, { useEffect, useState } from "react";
import errorBoundary from "../../../../errorBoundary";
import styles from "./index.css"

// 布局模式


const BackgroundStyle = (content) => {
  return (
        <div className={styles.background}>
          <div className={styles.backgroundHeader}>背景</div>
            <div>背景类型</div>
          <input type="color" name="" id="" />
          <div>透明度</div>
        </div>
  );
}

export default errorBoundary(BackgroundStyle);
