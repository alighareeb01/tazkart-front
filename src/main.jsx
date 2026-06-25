import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@tailwindplus/elements";
import { TokenProvider } from "./Components/Context/TokenContext.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <TokenProvider>
    <App />,
  </TokenProvider>,
  // </StrictMode>,
);
