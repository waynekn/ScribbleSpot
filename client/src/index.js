import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DeltaProvider } from "./contexts/delta.context";
import { UserProvider } from "./contexts/user.context";

import "./index.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <DeltaProvider>
        <App />
      </DeltaProvider>
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();
