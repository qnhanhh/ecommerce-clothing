import { createContext, useState } from "react";

//the actual value you want to access
export const UserContext = createContext({
  //default value: is only used when a component does not have a matching Provider above it in the tree
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
