import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import DynamicAuth0Provider from "./utils/DynamicAuth0Provider";
import { Provider } from "react-redux";
import store from "./app/store";

let customHeader = "";

// Initialize dark mode by default (no localStorage)
document.documentElement.classList.add('dark-mode');

ReactDOM.render(
  <Provider store={store}>
    <DynamicAuth0Provider>
      <App customHeader={customHeader} />
    </DynamicAuth0Provider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
