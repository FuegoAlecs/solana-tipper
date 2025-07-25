// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // if using React Query
import { AlchemyAccountProvider } from "@account-kit/react";
// main.jsx
import { config } from "./config";

import App from "./App.jsx";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AlchemyAccountProvider config={config} queryClient={queryClient}>
        <App />
      </AlchemyAccountProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
