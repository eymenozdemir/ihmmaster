import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "./context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MaterialUIControllerProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </MaterialUIControllerProvider>

);
