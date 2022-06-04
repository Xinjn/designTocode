import React, { useEffect,useState } from "react";
import styles from "./index.css"
// Editor
import CodeMirror from '@uiw/react-codemirror';

const CodePanel = (props) => {

  const code = () => {
    return `
    import React, { Component } from 'react';

    class Index extends Component {
      constructor () {
        super();
      }
      render(){
        return (
          <>
          <div style={{ width: '200px' }}></div>
          </>
        )
      }
    }
    export default Index;
    `;
  };


  return (

    <div className={styles.wrap}>
        <CodeMirror
          value={code()}
          width="300px"
          height="100%"
          options={{
            keyMap: 'sublime',
            mode: 'jsx',
          }}
        />
    </div>
 
   
  );
}

export default CodePanel;
