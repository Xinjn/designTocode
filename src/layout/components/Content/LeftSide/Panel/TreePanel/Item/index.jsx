import React, { useEffect,useState } from "react";
import styles from "./index.css"

const Item = (props) => {
  const {item} = props

  const render = () => {
    return (
      <>
         {item?.componentName}
         {item.children && item?.children.map((item,index)=>{
           return (
            <Item 
              key={index}
              item={item}
            />
           )
         })}
      </>
    )
  }
  return (
    <div class={styles.wrap} >
        {render()}
    </div>
  );
}

export default Item;
