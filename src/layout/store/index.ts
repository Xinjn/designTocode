import { useState } from "react";
import { createContainer } from "unstated-next";
const STATE = {
  WATCHING: "watching",
  LOADING: "loading",
  END: "end",
  NODATA: "nodata",
  ERROR: "error",
};

// 初始节点树
const initialCodeTree = {
  componentName: "Page",
  props: {
    style: {},
  },
  children: [],
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
    currentItem:{} // 当前组件
  }
) => {
  const [states, setStates] = useState(initialState);

  const changeStates = (newStates) => {
    setStates((states) => Object.assign({}, states, newStates));
  };

  return { states, changeStates };
};

export const Store = createContainer(useStore);

// 列表相关的状态
const useListStore = (
  initialState = {
    nodes: [], // 列表数据
    status: STATE.WATCHING,
  }
) => {
  const [listStates, setListStates] = useState(initialState);

  const changeListStates = (newListStates) => {
    setListStates((prevStates) => {
      return Object.assign({}, prevStates, newListStates);
    });
  };

  return { listStates, changeListStates };
};

export const ListStore = createContainer(useListStore);
