import React from "react";
import styles from "./index.css"
// Store
import { Store } from "../../../../store" 
// Panel
import ShemaPanel from "./ShemaPanel";
import ComponentsPanel from "./ComponentsPanel";
import TreePanel from "./TreePanel";
import CodePanel from "./CodePanel";
// react-dnd
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


const Panel = (props) => {
  const store = Store.useContainer();
  const { states, changeStates } = store;
  const {schemaPanel,componentPanel,treePanel,codePanel} = states

  return (
    <div class={styles.wrap}>
      {componentPanel && (
        	<DndProvider backend={HTML5Backend}>
              <ComponentsPanel />
          </DndProvider>
      )}
      {treePanel && <TreePanel />}
      {schemaPanel && <ShemaPanel />}
      {codePanel && <CodePanel />  }
    </div>
  );
}

export default Panel;
