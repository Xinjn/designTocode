import React from "react";
import errorBoundary from "./components/errorBoundary"
import { Store } from './store';
import Wrap from './components/Wrap';
// components
import Header from "./components/Header"
import Content from './components/Content';
import "../Test"

function Layout() {
    return (
      <Store.Provider>
          <Wrap>
            <Header />
            <Content />
          </Wrap>
      </Store.Provider>
    )
}

export default errorBoundary(Layout) 