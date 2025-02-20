import {useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
// import { sum } from '../sum.js';  // Correct import
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
console.log('API Base URL:', apiBaseUrl);
import Nav from '../src/components/navbar'

import Footer from './components/footer';
import AppRoutes from './components/router';
function App() {
  const [count, setCount] = useState(0)
 const mounted = useRef(false)

// const getUserData = async () => {
//   const response = await axios.get('https://jsonplaceholder.typicode.com/users')
//   .then((response)=>{
//     setUserData(response.data)
//   })
// }

// async function getUserData(){
//   const url = 'https://jsonplaceholder.typicode.com/users'
//   try {
//     const res= await fetch(url)
//     if(!res.ok){
//       throw new Error('something went wrong')
//     }
//     const jsonData = await res.json()
//     setUserData(jsonData)
//     console.log(jsonData)
    
//   } catch (error) {
//     console.error(error.message);
//   }
// }






  return (
    <>

    <Nav />



<div className=''>

     <AppRoutes />
</div>
     {/* <AddDonation /> */}
      




      <Footer />
    </>
  )

  
}



export default App
