import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
import Home from "./routes/Home";
import Summoners from "./routes/Summoners";
import rootReducer from "./modules/index";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body{
  padding:0;
  margin:0;
  background-color: #ebeef1;
}
ul{
  padding: 0 0;
  margin: 0px
}
li{
  list-style: none;
}

`;

const router = createBrowserRouter([
  {
    path: `${process.env.PUBLIC_URL + "/"}`,
    element: <Home />,
  },
  {
    path: `${process.env.PUBLIC_URL + "/summoners/kr/:summonersName"}`,
    element: <Summoners />,
  },
]);

const store = createStore(rootReducer);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <GlobalStyle />
    <RouterProvider router={router} />
  </Provider>
);
