import { useState } from "react";
import  useAuthContext  from "./useAuthContext";
import axios from "axios";

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signUp = async (email, password) => {
    setIsPending(true);
    setError(null); 

    try {
      const response = await axios.post("http://localhost:4000/api/user/signup", {
        email,
        password,
      });

      console.log("Signup successful:", response.data);

      localStorage.setItem("user", JSON.stringify(response.data.user)); // Assuming response.data has a user object
      localStorage.setItem("userToken", response.data.token);

      dispatch({ type: "LOGIN", payload: response.data });

    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    } finally {
      setIsPending(false);
    }
  };

  return { signUp, error, isPending };
};
