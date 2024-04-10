import React, { createContext, useState } from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from "react-dom/client"
import App from "./App.jsx";

export const Context = createContext({ isAuthorized: false });

const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState({});
  return (
    <Context.Provider value={{ isAuthorized, setIsAuthorized, user, setUser }}>
      <App />
    </Context.Provider>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<AppWrapper />);
