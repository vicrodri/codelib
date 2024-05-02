import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { ScrollToTop } from "./common/ScrollToTop.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider, FilterProvider, cartInitialState, filterInitialState } from "./context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <CartProvider cartInitialState={cartInitialState}>
        <FilterProvider filterInitialState={filterInitialState}>
          <ScrollToTop />
          <ToastContainer closeButton={false} />
          <App />
        </FilterProvider>
      </CartProvider>
    </Router>
  </React.StrictMode>
);
