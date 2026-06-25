import { createContext, useState } from "react";

export const TokenContext = createContext();

export function TokenProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  function saveToken(token) {
    localStorage.setItem("token", token);
    setToken(token);
  }
  function removeToken() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
    <TokenContext.Provider value={{ token, saveToken, removeToken }}>
      {children}
    </TokenContext.Provider>
  );
}
