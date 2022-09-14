import React from "react";
import ReactDOM from "react-dom/client";
import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'react-toastify/dist/ReactToastify.css';
import "assets/scss/styles.scss";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";

import App from "App";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));



root.render(
  <ThemeContextWrapper>
    <App />
    <ToastContainer hideProgressBar={true} />
  </ThemeContextWrapper>
);
