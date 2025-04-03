import { createContext, useReducer, useEffect } from "react";

const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      const userWRole = action.payload
      localStorage.setItem("user", JSON.stringify(userWRole));
      return { user: action.payload };
    case "LOGOUT":
      localStorage.removeItem("user");
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      dispatch({ type: "LOGIN", payload: storedUser });
    }
  }, []);

  console.log("AuthContext State:", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
