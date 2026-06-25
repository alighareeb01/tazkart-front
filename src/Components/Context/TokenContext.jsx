import { createContext, useState } from "react";

export const TokenContext = createContext();

export function TokenProvider({ children }) {
  const [token, setToken] = useState(sessionStorage.getItem("token") || null);

  function saveToken(token) {
    sessionStorage.setItem("token", token);
    setToken(token);
  }
  function removeToken() {
    sessionStorage.removeItem("token");
    setToken(null);
  }

  return (
    <TokenContext.Provider value={{ token, saveToken, removeToken }}>
      {children}
    </TokenContext.Provider>
  );
}
