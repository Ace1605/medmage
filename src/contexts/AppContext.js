import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem("medmage_token");
    return savedToken ? savedToken : null;
  });
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("medmage_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [providers, setProviders] = useState(() => {
    const savedProviders = localStorage.getItem("user_providers");
    return savedProviders ? JSON.parse(savedProviders) : [];
  });

  const [isSuperAdmin, setIsSuperAdmin] = useState(() => {
    const role = localStorage.getItem("isSuperAdmin");
    return role ? JSON.parse(role) : false;
  });

  const [toggle, setToggle] = useState(() => {
    const toggled = localStorage.getItem("toggled");
    return toggled ? JSON.parse(toggled) : false;
  });

  useEffect(() => {
    localStorage.setItem("medmage_user", JSON.stringify(user));
    token
      ? localStorage.setItem("medmage_token", token)
      : localStorage.removeItem("medmage_token");
  }, [user, token]);

  useEffect(() => {
    localStorage.setItem("user_providers", JSON.stringify(providers));
    localStorage.setItem("isSuperAdmin", JSON.stringify(isSuperAdmin));
    localStorage.setItem("toggled", JSON.stringify(toggle));
  }, [isSuperAdmin, toggle, providers]);
  return (
    <AppContext.Provider
      value={{
        isSuperAdmin,
        setIsSuperAdmin,
        toggle,
        setToggle,
        token,
        user,
        setToken,
        setUser,
        providers,
        setProviders,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
