import React, { useState } from "react";
import styles from "./index.css"
// Editor
import CodeMirror from '@uiw/react-codemirror';
import { Store } from "../../../../../store";


const ShemaPanel = (props) => {
  // 总数据
  const store = Store.useContainer();
  const { states, changeStates } = store;
  const {codeTree} = states

  return (
    <div class={styles.wrap}>
      <CodeMirror
        value={JSON.stringify(codeTree, null, '\t')} // 内容：解决json换行
        width="300px"
        options={{
          keyMap: 'sublime',
          styleActiveLine: true,    //高亮
          mode: {name: 'text/javascript', json: true},   //哪种类型的代码
        }}
      />
  </div>
  );
}

export default ShemaPanel;
