import { AuthContext } from "../context/authcontext"; 
import { useContext, useEffect, useState } from "react";

 const useAuthContext = ()=>{
const context = useContext(AuthContext)
const [user, setUser] = useState(null);

useEffect(() => {
  
  const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

if(!context){
    throw Error('this is been used outside of the context scope ')
}

return context 
}

export default useAuthContext