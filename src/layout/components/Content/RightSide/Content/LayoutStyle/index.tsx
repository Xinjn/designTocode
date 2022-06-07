import React, { useEffect, useState } from "react";
import errorBoundary from "../../../../errorBoundary";
import styles from "./index.css"
import MarginAndPadding from "./MarginAndPadding";

// 布局模式
const layoutPattern = ['inline','flex','block','inlineBlock','none']

const onUpdate = () => {}

const LayoutStyle = (content) => {
  return (
        <div className={styles.layout}>
          <div className={styles.layoutHeader}>布局</div>
          
          <div  className={styles.layoutPattern}>
              <div>布局模式</div>
              {
                layoutPattern.map((item, index) => {
                  return (
                    <div key={index}>
                      <button>{item}</button>
                    </div>
                  )
                })
              }
          </div>
      
          <MarginAndPadding margin={'0 0 0 0'} padding={'0 0 0 0'} onUpdate={onUpdate}/>

          <div  className={styles.layoutSize}>
                <div>宽度</div>
                <input type="text" placeholder="值"/>
                <div>高度</div>
                <input type="text" placeholder="值"/>
          </div>
        </div>
  );
}

export default errorBoundary(LayoutStyle);
