import React, { useEffect } from "react";
import styles from "./index.css"
import errorBoundary from "./components/errorBoundary"
// Store
import { Store } from '../store';
// components
import Header from "./components/Header"
import Content from './components/Content';
import Wrap from './components/Wrap';
// react-dnd
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Canvas from "./components/Content/Canvas"
// react-router
import {
    HashRouter,
    Routes,
    Route,
} from "react-router-dom";


function Layout() {



    return (
      <HashRouter>
            <Store.Provider>
                <Wrap>
                        <Routes>
                            <Route path="/" element={
                                <>
                                    <Header />
                                    <Content />
                                </>
                            } />
                            {/* iframe:canvas页面 */}
                            
                            <Route 
                                path='/canvas'
                            element={
                                <div className={styles.content}>
                                    <DndProvider backend={HTML5Backend}>
                                        <Canvas />
                                    </DndProvider>
                                </div>
                            } />
                        
                            {/*错误页面*/}
                            <Route path="*" element={<h1>404!</h1>}
                            />
                        </Routes>
                    </Wrap>
            </Store.Provider>
        </HashRouter>
    )
}

export default errorBoundary(Layout) 