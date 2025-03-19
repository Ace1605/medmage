import React, { createContext, useEffect, useState } from "react";

export const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [isSuperAdmin, setIsSuperAdmin] = useState(() => {
    const role = sessionStorage.getItem("isSuperAdmin");
    return role ? JSON.parse(role) : false;
  });

  useEffect(() => {
    sessionStorage.setItem("isSuperAdmin", JSON.stringify(isSuperAdmin));
  }, [isSuperAdmin]);

  return (
    <RoleContext.Provider value={{ isSuperAdmin, setIsSuperAdmin }}>
      {children}
    </RoleContext.Provider>
  );
};
