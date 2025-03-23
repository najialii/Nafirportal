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
        const response = await axios.post('http://localhost:4000/api/user/login', { email, password });
        setIsPending(false);
        console.log(response.data)
        localStorage.setItem("user", JSON.stringify(response.data)); 
        localStorage.setItem("userToken", response.data.token);
        return response.data;
    } catch (err) {
        setIsPending(false);
        setError(err.response?.data?.error || 'Login failed');
        return { error: err.response?.data?.error || 'Login failed' }; 
    }
};

return { signIn, error, isPending };
};
