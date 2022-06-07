import React, { useEffect, useState } from "react";
import errorBoundary from "../../../../errorBoundary";
import styles from "./index.css"

// 布局模式


const LocationStyle = (content) => {
  return (
        <div className={styles.location}>
          <div className={styles.locationHeader}>定位</div>
            <div>定位类型</div>
          <div>层叠顺序</div>
          <div>浮动方向</div>
          <div>清楚浮动</div>
        </div>
  );
}

export default errorBoundary(LocationStyle);
