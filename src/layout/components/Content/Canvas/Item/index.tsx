import React, { useState, useCallback, useRef, useEffect } from "react";

import styles from "./index.css"
// Store
import { Store } from "../../../../../store";
// react-dnd
import { useDrop, useDrag } from 'react-dnd';
import { ItemTypes } from "../../../../../types";
import { getEmptyImage } from 'react-dnd-html5-backend';
import errorBoundary from "../../../errorBoundary";
import { traverse } from "../../../../../util";

const Item = (props) => {
  const {
    item,
    hoverId,
    appendChildrenNode,  // 追加子项
    replaceNode,  // 替换项
  } = props

  // 总数据
  const store = Store.useContainer();
  const { states, changeStates } = store;
  const { codeTree,currentItem } = states

  const ref = useRef(null)

  const [{ canDrop, isOver }, drop] = useDrop(
    {
        accept: ItemTypes.NODE,
        collect: (monitor) => ({
          isOver: monitor.isOver({
            shallow: true,
          }),
          canDrop: monitor.canDrop(),
        }),
        drop: (item, monitor) => {
          if (monitor.didDrop()) {
            return;
          }

          const fromId = item.id
          const fromIndex = codeTree.children.findIndex(item => item.id === fromId)
          let hoverNode = null
          traverse(codeTree, item => {
            if (item.id === hoverId) {
              hoverNode = item
            }
          })

          
          // 处理节点
          if (fromId !== hoverId && fromIndex > -1) {
            
            if (!hoverNode?.children) { 
               // 替换项
              replaceNode(fromId, hoverId)
            } else { 
              // 追加子项
              appendChildrenNode(fromId,hoverId)
            }

          }else{
              // 移动到节点
              appendChildrenNode(fromId,hoverId)
          }
         
        },
    }
  )

  const [{ isDragging }, drag,dragPreview] = useDrag({
    type: ItemTypes.NODE,
    item: () => {
      const data = {
        componentName:item?.componentName,
        props:item?.props,
        id:item.id
      }  
      // 适配children属性
      item?.children ? data['children'] = item.children : null
      console.log('画板拖拽信息',data);
      return data
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  
  // 隐藏拖拽默认预览图
  dragPreview(getEmptyImage())
  drag(drop(ref));


  const handlerChoose = () => {
    console.log(item);
    changeStates({currentItem:item})
  }

  const render = () => {
    return (
      <>
         {item?.componentName}
         {item.children && item?.children.map((item,index)=>{
           return (
            <Item 
              key={index}
              item={item}
              hoverId={item.id}
              appendChildrenNode={appendChildrenNode}
            />
           )
         })}
        {isOver && canDrop ? (
          <div className={styles.line}/>
        ) : null}
      </>
    )
  }

  return ( 
      <div className={styles.wrap} ref={ref} onClick={handlerChoose}>
        {render()}
      </div>
  );
}

export default errorBoundary(Item);
