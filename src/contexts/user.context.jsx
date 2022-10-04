import { createContext, useEffect, useReducer } from "react";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "../utils/firebase/firebase.utils";

//the actual value you want to access
export const UserContext = createContext({
  //default value: is only used when a component does not have a matching Provider above it in the tree
  currentUser: null,
  setCurrentUser: () => null,
});

const INITIAL_STATE = {
  currentUser: null,
};

const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error("Invalid action");
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const { currentUser } = state;

  const setCurrentUser = (user) => {
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
  };

  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};