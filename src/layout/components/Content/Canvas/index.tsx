import React, { useState, useCallback, useRef, useEffect } from "react";

import styles from "./index.css"
// Store
import { Store } from "../../../store";
// react-dnd
import { useDrop } from 'react-dnd';
import { ItemTypes } from "../../../types";
import CustomDragLayer from "./CustomDragLayer";
// Item
import Item from "./Item";
// util
import { traverse } from "../../../../util";
import { v1 as uuid } from 'uuid';
import errorBoundary from "../../errorBoundary";

const Canvas = (props) => {
  // 总数据
  const store = Store.useContainer();
  const { states, changeStates } = store;
  const { codeTree } = states

  // 渲染新节点
  const appendNode = (item) => {
    const id = uuid();
    const codeTree2 = codeTree
    item['id'] = id
    codeTree2.children.push(item) 

    console.log('画板渲染新节点',codeTree2);
    changeStates({codeTree:{...codeTree2}})
  }
  // 移动节点：useCallback避免非必要渲染（仅会在某个依赖项改变时才重新计算）
  const moveNode = useCallback((dragId,hoverId) => {
    const codeTree2 = codeTree

    let drag = codeTree2.children.find(item=>item.id === dragId)
    const dragIndex = codeTree2.children.findIndex(item=>item.id === dragId)
    const hover = codeTree2.children.find(item=>item.id === hoverId)
    const hoverIndex = codeTree2.children.findIndex(item=>item.id === hoverId)

    console.log('moveNode',drag,dragIndex,hover,hoverIndex);

    // 删除自身
    codeTree2.children.splice(dragIndex,1)
    // 添加目标
    codeTree2.children.splice(hoverIndex,0,drag)

    changeStates({codeTree:{...codeTree2}})

  }, [])
  // 移入子项
  const moveToParentNode = (dragId,hoverId) => {
      console.log('移动子项',dragId,hoverId);
      const codeTree2 = codeTree

      const drag = codeTree2.children.find(item=>item.id === dragId)
      const dragIndex = codeTree2.children.findIndex(item=>item.id === dragId)
      const hover = codeTree2.children.find(item=>item.id === hoverId)
      const hoverIndex = codeTree2.children.findIndex(item=>item.id === hoverId)

      drag['parentId'] = hoverId
      hover.children.push(drag)
      // 删除自身
      codeTree2.children.splice(dragIndex,1)

      changeStates({codeTree:{...codeTree2}})
  }
  // 移出子项
  const moveOutParentNode = (dragId,hoverId) => {
    const codeTree2 = codeTree

    const drag = codeTree2.children.find(item=>item.id === dragId)
    const dragIndex = codeTree2.children.findIndex(item=>item.id === dragId)
    const hover = codeTree2.children.find(item=>item.id === hoverId)
    const hoverIndex = codeTree2.children.findIndex(item=>item.id === hoverId)

    console.log('moveOutParentNode',drag,dragIndex,hover,hoverIndex);

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

  const backNode = (item) =>{
    console.log('移出子项');
  }


9  // drop
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

      console.log('画板放置信息',item);
      
      if(!item.id){
        // 渲染节点
        appendNode(item)
      }else{
        // 移出子项
        backNode(item)
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
                    moveNode={moveNode}
                    moveToParentNode={moveToParentNode}
                    moveOutParentNode={moveOutParentNode}
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
