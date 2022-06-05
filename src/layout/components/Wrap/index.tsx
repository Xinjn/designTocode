import React,{ useEffect } from "react";
import errorBoundary from "../errorBoundary";
import styles from "./index.css"
import { Store } from "../../../store";
import DSL from "../../../Test";

const Wrap = (content) => {
    // 总数据
    const store = Store.useContainer();
    const { states, changeStates } = store;
    const { codeTree } = states
  
  useEffect(() => {
    if (codeTree) {
      const output = DSL(JSON.parse(JSON.stringify(codeTree)))
      const panelDisplay = output.panelDisplay[0]
      const panelValue = panelDisplay['panelValue']
      changeStates({output:panelValue})
    }
  },[codeTree])

  return (
    <div className={styles.wrap}>{content.children}</div>
  );
}

export default errorBoundary(Wrap);
 