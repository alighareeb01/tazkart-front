import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@tailwindplus/elements";
import { TokenProvider } from "./Components/Context/TokenContext.jsx";
import { Provider } from "react-redux";
import { store } from "./Components/store/store.js";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <TokenProvider>
      <App />
    </TokenProvider>
  </Provider>,
  // </StrictMode>,
);
