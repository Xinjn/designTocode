import React, { useEffect, useState } from "react";
import errorBoundary from "../../errorBoundary";
import styles from "./index.css"
// Store
import { Store } from "../../../../store";
// react-dnd
import { useDrop } from 'react-dnd';
import { ItemTypes } from "../../../../types";
import CustomDragLayer from "./CustomDragLayer";
// Item
import Item from "./Item";

const Canvas = (props) => {
  // 总数据
  const store = Store.useContainer();
  const {
    states,
    appendNode,  // 添加新项
    appendChildrenNode,  // 追加子项
    replaceNode, // 替换项
    removeChildNode   // 移除子项
  } = store;

  // 仅第一次从数据源获取
  const [codeTree,setCodeTree] = useState(states?.codeTree)

  // 父框架回调
  const iframeParentCallback = (event) => {    
    const {codeTree,currentId} = event.data

    if (codeTree?.children) {
      setCodeTree({ ...codeTree })
      randerStyle(codeTree,currentId)
    }
  }

  // 监听父框架回调
  useEffect(() => {
    window.addEventListener("message", iframeParentCallback, false);
  },[])


  const randerStyle = (codeTree, currentId) => {
    // 根节点
    if (currentId === 'page') {
      const root = codeTree?.props?.style
      
      if (JSON.stringify(root) === '{}') {
        return;
      }
  
      // 获取Canvas
      const canvas = document.getElementById('canvas')
      // 设置根样式
      for (let [key, value] of Object.entries(root)) {
        canvas.style.cssText += `${key}: ${value}`
      } 
    }
  }
    
  // 放置
  const [
    { 
      canDrop, 
      isOver,  
    },
    drop // 当前放置节点
  ] = useDrop({
    accept: ItemTypes.NODE, // 拖拽类型：需同一类型
    collect: (monitor) => ({ // 采集器
      canDrop: monitor.canDrop(),// 是否可以被放置。如果正在进行拖动操作，则返回true
      isOver: monitor.isOver({
        shallow: true, // 是否悬停在 drop target 区域。可以选择传递{ shallow: true }以严格检查是否只有 drag source 悬停，而不是嵌套目标
      }),
    }),
    drop: (item, monitor) => { // 放置
      // 当前目标直接返回
      const didDrop = monitor.didDrop(); 
      if (didDrop) {
        return;
      }

      console.log('画板放置信息', item);
      // 添加新项
      if (!item.id) {
        appendNode(item)
      } else {
        // 移出子项
        removeChildNode(item.id)
      }
    },
  },[])

  const onTirmParentIframe = () => {
    // 通知父框架
    window.parent && window.parent.postMessage({ currentId: 'page' }, 'http://localhost:8888/');
  }

  return ( 
    <div className={styles.wrap} >
        {/* 画布 */}
        <div 
          id="canvas"
          className={styles.canvas} 
          ref={drop}
          onClick={onTirmParentIframe}
        >
          {
            codeTree?.children.map((item,index)=>{
              return (
                <Item 
                    key={index} 
                    item={item} 
                    hoverId={item.id} // 获取hover项的index
                    replaceNode={replaceNode}
                    appendChildrenNode={appendChildrenNode}  // 追加子项
                  />
              )
            })
          }
          <CustomDragLayer />
        </div>
      </div>
  );
}

export default errorBoundary(Canvas);
