import React, { useState, useCallback, useRef, useEffect } from "react";
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
// util
import { v1 as uuid } from 'uuid';
import { traverse } from "../../../../util";


const Canvas = (props) => {
  // 总数据
  const store = Store.useContainer();
  const {
    states,
    changeStates,
    appendNode,  // 添加新项
    appendChildrenNode,  // 追加子项
    replaceNode, // 替换项
    removeChildNode   // 移除子项
  } = store;
  const { codeTree } = states

  // 移出到其他节点
  const moveOutNode = (dragId, hoverId) => {
    console.log('移出到其他节点');
    
    if (dragId === hoverId) {
      return console.log('不能为自身');
      
    }
    const codeTree2 = codeTree

    const drag = codeTree2.children.find(item=>item.id === dragId)
    const dragIndex = codeTree2.children.findIndex(item=>item.id === dragId)
    const hover = codeTree2.children.find(item=>item.id === hoverId)
    const hoverIndex = codeTree2.children.findIndex(item=>item.id === hoverId)

    // 查找目标 
    traverse(codeTree2,(item)=>{
      // 添加目标
      if(item.id === dragId){
        const drag2 = item
        const dragParentId = item.parentId
        // 删除父级ID属性
        delete item.parentId;
        // 删除自身
        if(dragParentId){
            // 查找父级 
            traverse(codeTree2,(item)=>{
              if(item.id === dragParentId){
                const dragParent = item
    
                dragParent.children.splice(dragIndex,1)
              }
            })
        }

        // 添加目标
        codeTree2.children.splice(hoverIndex,0,drag2)
      }
    })

    changeStates({codeTree:{...codeTree2}})
  }

  // 放置
  const [
    { 
      canDrop, // 是否放置中（进行中）
      isOver  // 是否进入目标放置区域
    },
    drop // 当前放置节点
  ] = useDrop({
    accept: ItemTypes.NODE, // 拖拽类型：需同一类型
    collect: (monitor) => ({ // 采集器
      // 测试悬停是仅发生在当前目标上还是嵌套目标上
      isOver: monitor.isOver({
        shallow: true,
      }),
      canDrop: monitor.canDrop(),
    }),
    drop:(item,monitor)=>{ // 放置
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
    }
  },[])

  return ( 
      <div className={styles.wrap} >
        {/* 画布 */}
        <div 
          className={styles.canvas} 
          ref={drop}
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
                    moveOutNode={moveOutNode}
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
