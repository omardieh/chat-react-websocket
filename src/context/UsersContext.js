import React, { createContext, useState } from "react";

const UsersContext = createContext();

function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);

  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      {children}
    </UsersContext.Provider>
  );
}

export { UsersContext, UsersProvider };
