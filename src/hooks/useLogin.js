import { useState } from "react";
import  useAuthContext  from "./useAuthContext";
import axios from "axios";
import { useNavigate } from 'react-router-dom'; 
export const useSignIn = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate ()
  const signIn = async (email, password) => {
    setIsPending(true);
    setError(null);

    try {
        
        const response = await axios.post('http://localhost:4000/api/user/login', { email, password });
        setIsPending(false);
        console.log(response)
        localStorage.setItem("user", JSON.stringify(response.data)); 
        localStorage.setItem("userToken", response.data.token);
        const darole = response.data.role
        
    
        if(response.status === 200){

            if(darole === 'superadmin' || darole === 'admin' || darole === 'mentor'){
                console.log('i reached here buddy')
                 navigate('/dashboard/overview')
            }else if (darole === 'mentee'){
                navigate('/')
            }
        }
        return response.data;
    } catch (err) {
        setIsPending(false);
        setError(err.response?.data?.error || 'Login failed');
        console.log('error', err)
        return { error: err.response?.data?.error || 'Login failed' }; 
    }
};

return { signIn, error, isPending };
};
