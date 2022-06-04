import React from "react";
import styles from "./index.css"
// useDragLayer:自定义拖拽图层
import { useDragLayer } from 'react-dnd';


const CustomDragLayer = (props) => {

  const { monitor,isDragging, item, clientOffset, } = useDragLayer((monitor)=>({
    monitor:monitor,
    isDragging: monitor.isDragging(),
    item: monitor.getItem(),
    clientOffset: monitor.getClientOffset(),
  }))

  if (!isDragging || !clientOffset) return null

  return ( 
    <div className={styles.wrap} >
       <div 
        className={styles.item} 
        style={{
          transform: `translate(${clientOffset.x - 10}px, ${clientOffset.y - 10}px)`,
        }}
      >
        {item.componentName}
      </div>
    </div>

  );
}

export default CustomDragLayer;
