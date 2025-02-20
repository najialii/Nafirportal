import { useState } from "react";
import  useAuthContext  from "./useAuthContext";
import axios from "axios";

export const useSignIn = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  
  const signIn = async (email, password) => {
    setIsPending(true);
    setError(null); 

    try {
      const response = await axios.post("http://localhost:4000/api/user/login", {
        email,
        password,
      });

      
      console.log("signIn successful:", response.data);
      if (response.status === 200) {
        console.log(response.data)
        localStorage.setItem('user', JSON.stringify(response.data));  
        localStorage.setItem('userToken', response.data.token);

        console.log("User data saved:", response.user);
      } else {
        console.log("Login failed with status", response.status);
      }

      dispatch({ type: "LOGIN", payload: response.data });

    } catch (err) {
      setError(err.response?.data?.error || "signIn failed");
    } finally {
      setIsPending(false);
    }
  };

  return { signIn, error, isPending };
};
