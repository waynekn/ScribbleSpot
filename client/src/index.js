import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { DeltaProvider } from "./contexts/delta.context";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DeltaProvider>
      <App />
    </DeltaProvider>
  </React.StrictMode>
);

reportWebVitals();
