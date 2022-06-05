import React from "react";
import errorBoundary from "../../../../../errorBoundary";
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
    <div className={styles.wrap} >
        {render()}
    </div>
  );
}

export default errorBoundary(Item);
