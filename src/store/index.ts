import { useState ,useEffect} from "react";
import { createContainer } from "unstated-next";
// util
import { v1 as uuid } from 'uuid';
import { traverse } from "../util";

// 初始节点树
const initialCodeTree = {
  "componentName": "Page",
  // "id":uuid(),
  "id":'123456789',
  "props": {
    "style": {
      "display": "inline",
      "width": "375px",
      "height": "500px"
    },
    "className": "page"
  },
  "rect": {
    "x": 0,
    "y": 0,
    "width": 375,
    "height": 500
  },
  "children": [{
    "componentName": "Div",
    "id": "3a26d9c2-a7b3-4601-af78-bd254b94493f",
    "props": {
      "style": {
        "position": "relative",
        "backgroundColor": "#D8D8D8",
        "width": "100px",
        "height": "100px"
      },
      "className": "mask1"
    },
    "rect": {
      "x": 0,
      "y": 0,
      "width": 100,
      "height": 100
    },
    "fileName": "mod_0",
    "smart": {
      "layerProtocol": {
        "module": {
          "type": "smartModule"
        }
      }
    }
  }],
};

// 总数据
const useStore = (
  initialState = {
    treePanel: true, // 节点树面板
    codeTree: initialCodeTree, // 节点树
    componentPanel: true, // 组件库面板
    schemaPanel: true, // schema面板
    codePanel: true, // 代码面板
    output: '', // 出码
    currentId:'' // 目标节点ID
  }
) => {
  const [states, setStates] = useState(initialState);

  const changeStates = (newStates) => {
    setStates((states) => Object.assign({}, states, newStates));
  };


  // 添加新项
  const appendNode = (item) => {
    console.log('添加新项');
    const { codeTree } = states
    
    const id = uuid();
    const codeTree2 = codeTree
    
    codeTree2?.children.push({
      ...item,
      id:id
    })

    // 更新数据
    changeStates({ codeTree: { ...codeTree, ...codeTree2 } })
    

  }

  // 替换项
  const replaceNode = (fromId,toId) => {
    console.log('替换项');

    const { codeTree } = states
    const codeTree2 = codeTree

    // 相同ID不拖拽
    if (fromId === toId) return console.log('不能为自身');
    let fromNode = null

    // 在子节点中不拖拽
    let isChildren = false

    traverse(codeTree2, (item) => {
      if (item.id === fromId) {
        fromNode = item
        if (fromNode.parentId) {
           isChildren = true;
        }
        return false;
      }
      return true;
    });

    if (isChildren) return console.log('在子节点中不拖拽');

    // 获取下标
    const fromIndex = codeTree2?.children.findIndex(item=>item.id === fromId)
    const toIndex = codeTree2?.children.findIndex(item => item.id === toId)

    // 交换位置
    const arr = codeTree2?.children
    const temp = arr[fromIndex];
    arr[fromIndex] = arr[toIndex];
    arr[toIndex] = temp;

    // 更新数据
    changeStates({codeTree:{...codeTree,...codeTree2}})
    
  }

  // 追加子项
  const appendChildrenNode = (fromId, toId) => {
    console.log('追加子项');

    // 相同ID不追加
    if (fromId === toId) return console.log('不能为自身');

    const { codeTree } = states
    let fromNode = null
    let parent = null
    const codeTree2 = codeTree

    // 获取当前项
    traverse(codeTree2, item => {
      if (item.id === fromId) {
        fromNode = item
        return false
      }
      return true
    })

    // 获取父项
    traverse(codeTree2, item => {
      if (item.id === toId) {
        parent = item
        return false
      }
      return true
    })

    // 追加子项
    const fromNode2 = JSON.parse(JSON.stringify(fromNode))
    if (parent?.children) {
      fromNode2['parentId'] = toId
      parent?.children.push(fromNode2)
    } else {
      //移除属性
      delete fromNode2.parentId;
      codeTree2?.children.push(fromNode2)
    }

    // 删除自身
    if (fromNode?.parentId) {
      const fromParentId = fromNode.parentId
      // 父项删除
      traverse(codeTree2, item => {
        if (item.id === fromParentId) {
          const fromParent  = item
          const index = fromParent?.children.findIndex(item=>item.id === fromId)
          fromParent?.children.splice(index,1)
          return false
        }
        return true
      })
    } else {
      //根项删除
      const index = codeTree2?.children.findIndex(item => item.id === fromId)
      codeTree2?.children.splice(index,1)
    }

    // 更新数据
    changeStates({codeTree:{...codeTree,...codeTree2}})
  }

  // 移除子项
  const removeChildNode = (id) => {
    console.log('移除子项');
    const { codeTree } = states
    const codeTree2 = codeTree

    let fromNode = null
    let parentId = ''
    let parent = null

    // 获取目标项及父项ID
    traverse(codeTree2, item => {
      if (item.id === id) {
        fromNode = item
        parentId = item?.parentId
      }
    })

    // 获取父项
    traverse(codeTree2,(item)=>{
      if (item.id === parentId) {
         parent = item
        return true
      }
    })

    // 查找目标所在父级索引
    const index = parent?.children.findIndex(item => item.id === id)
    
    // 删除节点
    parent?.children.splice(index, 1)

    //移除属性
    delete fromNode.parentId;

    // 添加节点
    codeTree2?.children.push(fromNode)

    // 更新数据
    changeStates({codeTree:{...codeTree,...codeTree2}})
  }

  // 节点数据改变：通信子iframe进行更新
  useEffect(() => {
      const childIframe = document.getElementById('canvasIframe');
      if(!childIframe)return 
      if (states.codeTree.children.length > 0) {
          childIframe?.contentWindow?.postMessage(states?.codeTree,'http://localhost:8888/#/canvas'); 
      }
  },[states])

  return { states, changeStates , appendNode ,appendChildrenNode ,replaceNode, removeChildNode};
};



export const Store = createContainer(useStore);


