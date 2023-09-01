// src/index.js
import React from "react";
import { Provider } from "react-redux";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.css';
import store from "./redux/Store";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root");

const root = createRoot(rootElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
