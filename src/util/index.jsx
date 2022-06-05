/*
 *  递归：深度优先遍历，从根到叶，子对象按相反顺序
 *  如果fn返回false，则终止退出
*/
export const traverse =(data,fn) => {
  if (fn(data) === false) {
    return false
  }

  if (data && data.children) {
    for (let i = data.children.length - 1; i >= 0; i--) {
      if (!traverse(data.children[i], fn)) return false
    }
  }
  
  return true
}

  