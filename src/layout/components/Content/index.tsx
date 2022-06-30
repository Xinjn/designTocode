import React from "react";
import styles from "./index.css"
import RightSide from "./RightSide"
import LeftSide from "./LeftSide"
import errorBoundary from "../errorBoundary";

const Content = (props) => {
  return (
    <div className={styles.content}>
      <LeftSide />

        <iframe src="http://localhost:8888/#/canvas" style={{ width: '100vw' }} id="canvasIframe"/>
      <RightSide />
    </div>
  );
}

export default errorBoundary(Content);
