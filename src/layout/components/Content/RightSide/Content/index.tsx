import React, { useEffect, useState } from "react";
import errorBoundary from "../../../errorBoundary";
import styles from "./index.css"

const Content = ({content}) => {
  
  return (
    content?.componentName
    ? 
     <div className={styles.wrap}> 
      
        <div className={styles.editor}>
          <div>当前选中：{content?.componentName}</div>
          <div className={styles.editorText}>
            <div>编辑</div>
            <div>复制样式</div>
          </div>
        </div>
      

          <div className={styles.layout}>
        <div className={styles.layoutHeader}>布局</div>
        
          <div  className={styles.layoutPattern}>
              <div>布局模式</div>
              <input type="text" />
        </div>
        
          <div className={styles.layoutMargin}>
              <div>外边距</div>
              <input type="text" placeholder="top"/>
              <input type="text" placeholder="right"/>
              <input type="text" placeholder="bottom"/>
              <input type="text" placeholder="left"/>
        </div>
        
          <div className={styles.layoutPadding}>
            <div>内边距</div>
              <input type="text" placeholder="top"/>
              <input type="text" placeholder="right"/>
              <input type="text" placeholder="bottom"/>
              <input type="text" placeholder="left"/>
        </div>
        
            <div  className={styles.layoutSize}>
                <div>宽度</div>
                <input type="text" />
                <div>高度</div>
                <input type="text" />
            </div>
          </div>
      </div>
    :
      <div>请先选中组件</div>
  );
}

export default errorBoundary(Content);
