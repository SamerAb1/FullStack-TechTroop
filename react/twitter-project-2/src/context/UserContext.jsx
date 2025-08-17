import { createContext, useContext, useState } from "react";
import { getUserName, setUserName as persist } from "../lib/user";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [userName, setUserNameState] = useState(getUserName());

  function setUserName(name) {
    setUserNameState(name);
    persist(name); // save locally whenever it changes
  }

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
