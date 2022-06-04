import React, { useEffect,useState } from "react";
import styles from "./index.css"
import { Store } from "../../../../../store";
import { useDrop } from 'react-dnd';
import Item from "./Item";

const DomTree = (props) => {
  // 总数据
  const store = Store.useContainer();
  const { states, changeStates } = store;
  const {codeTree }  =states


  return (
    <div class={styles.wrap} >
      {
        codeTree.children.map((item,index)=>{
          return(
            <Item 
              key={index} 
              item={item}
            />
          )
        })
      }
    </div>
  );
}

export default DomTree;
