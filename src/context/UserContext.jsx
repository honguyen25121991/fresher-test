import React, { useState } from "react";

const UserContext = React.createContext({ email: "", auth: false });

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ email: "", auth: false });

  const loginContext = (email, token) => {
    setUser((user) => ({
      email: email,
      auth: true,
    }));
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
  };

  // Logout updates the user data to default
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");

    setUser((user) => ({
      email: "",
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, loginContext, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
