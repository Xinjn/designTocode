import React from "react";
import errorBoundary from "../errorBoundary";

import styles from "./index.css"

const Header = () => {

  return (
    <div className={styles.wrap}>
  
        <div className={styles.logo}>DesignToCode</div>

        <div className={styles.option}>
                <div className={styles.pcOrMobile}>
                  <button>PC端</button>
                  <button>移动端</button>
                </div>

                <div className={styles.showCode}>
                  <button>代码预览</button>
                </div>
                <div className={styles.save}>
                  <button >保存</button>
                </div>

          </div>
 
  </div>
  );
}

export default errorBoundary(Header);
