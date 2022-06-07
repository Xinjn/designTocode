import React, { useEffect, useState } from "react";
import errorBoundary from "../../../errorBoundary";
import styles from "./index.css"
// components
import LayoutStyle from "./LayoutStyle";
import LocationStyle from "./LocationStyle";
import BackgroundStyle from "./BackgroundStyle";
import FrameStyle from "./FrameStyle";
const Content = (content) => {
  console.log('content', content);
  const { dom } = content
  // Dom信息
  const [domHtml,setDomHtml] = useState(null)
  const [domStyle,setDomStyle] = useState(null)
  
  useEffect(() => {
    if (dom) {
      let style = window.getComputedStyle(dom, null);
      setDomHtml(dom)
      setDomStyle(style)
    }
  }, [dom])
  
  // useEffect(() => {
  //   if (domStyle) {
  //     console.log('domStyle',domStyle);
      
  //   }
  // },[domStyle])

  return (
    // content?.componentName
    // ? 
     <div className={styles.wrap}> 
      
        <div className={styles.editor}>
          <div>当前选中：{domHtml?.localName}</div>
          <div className={styles.editorText}>
            <div>{domHtml?.className}编辑</div>
            <div>复制样式</div>
        </div>
        <div className={styles.editorStyle}>
          <div>
          { domStyle?.position && `position:${domStyle.position}`}
          </div>
          <div>
          {domStyle?.width && `width:${domStyle.width}`}
          </div>
          <div>
          { domStyle?.height && `height:${domStyle.height}`}
          </div>
          <div>
          {domStyle?.backgroundColor && `background-color:${domStyle.backgroundColor}`}
          </div>
        </div>
        </div>
          <LayoutStyle />
          <LocationStyle />
          <BackgroundStyle />
          <FrameStyle />
      </div>
    // :
    //   <div>请先选中组件</div>
  );
}

export default errorBoundary(Content);
