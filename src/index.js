import React from "react";
import ReactDOM from "react-dom/client";
import "./index.sass";
import { BrowserRouter } from "react-router-dom";

import App from "./components/App";
import reportWebVitals from "./reportWebVitals";

import omdbApi from "./omdb-api";
import logic from "./logic";

logic.setUserId = (id) =>
  id
    ? sessionStorage.setItem("user-id", id)
    : sessionStorage.removeItem("user-id");
logic.getUserId = () => sessionStorage.getItem("user-id");

logic.setUserApiToken = (token) =>
  token
    ? sessionStorage.setItem("user-api-token", token)
    : sessionStorage.removeItem("user-api-token");
logic.getUserApiToken = () => sessionStorage.getItem("user-api-token");

const { REACT_APP_API_OMDB_URL, REACT_APP_API_OMDB_KEY } = process.env;

omdbApi.url = `${REACT_APP_API_OMDB_URL}?apikey=${REACT_APP_API_OMDB_KEY}`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
