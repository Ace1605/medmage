import React, { createContext, useEffect, useState } from "react";

export const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [isSuperAdmin, setIsSuperAdmin] = useState(() => {
    const role = sessionStorage.getItem("isSuperAdmin");
    return role ? JSON.parse(role) : false;
  });

  const [toggle, setToggle] = useState(() => {
    const toggled = sessionStorage.getItem("toggled");
    return toggled ? JSON.parse(toggled) : false;
  });

  useEffect(() => {
    sessionStorage.setItem("isSuperAdmin", JSON.stringify(isSuperAdmin));
    sessionStorage.setItem("toggled", JSON.stringify(toggle));
  }, [isSuperAdmin, toggle]);

  return (
    <RoleContext.Provider
      value={{ isSuperAdmin, setIsSuperAdmin, toggle, setToggle }}
    >
      {children}
    </RoleContext.Provider>
  );
};
