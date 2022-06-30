import React,{ useEffect } from "react";
import errorBoundary from "../errorBoundary";
import styles from "./index.css"
// Store
import { Store } from "../../../store";
// DSL(react)
import DSL from "../../../Test";
import { traverse } from "../../../util";

const Wrap = (content) => {
  // 总数据
  const store = Store.useContainer();
  const { states, changeStates } = store;
  const { codeTree } = states

//   const getCurrentNode = (id) => {
//     traverse(codeTree, (item) => {
//       if(item.id)
//     })
// }


  // 监听子框架回调函数
  const iframeChildCallback = (event) => {
    
    // 设置当前选中元素
    const { data: { currentId } } = event
    if (!currentId) return 
    
    changeStates({currentId})
  
  }
  
  // 监听子框架回调函数
  useEffect(() => {
      window.addEventListener("message", iframeChildCallback, false);
  },[])
  
  useEffect(() => {
    if (codeTree) {
      // // 出码
      // const output = DSL(JSON.parse(JSON.stringify(codeTree)))
      // console.log('出码：',output);
      // const panelDisplay = output.panelDisplay[0]
      // const panelValue = panelDisplay['panelValue']
      // changeStates({ output: panelValue })
      
    }
  },[codeTree])

  return (
    <div className={styles.wrap}>{content.children}</div>
  );
}

export default errorBoundary(Wrap);
 