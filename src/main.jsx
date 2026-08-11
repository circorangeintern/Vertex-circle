import React from "react";
import ReactDOM from "react-dom/client";
// import "./styles/global.css";
import "./styles/tokens.css";
import "./index.css";


import AppRouter from "./routes/AppRouter";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);