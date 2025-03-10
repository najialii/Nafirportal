import {useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
// import { sum } from '../sum.js';  // Correct import
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
console.log('API Base URL:', apiBaseUrl);
import Nav from '../src/components/navbar'
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { Button, ConfigProvider, Space } from 'antd';
>>>>>>> 7613e493 (Add activities endpoint and feedback message after adding new activity)
=======
import { Button, ConfigProvider, Space } from 'antd';
>>>>>>> e0c74c8078fe1ca549f086117475ce283a674a88

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
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> e0c74c8078fe1ca549f086117475ce283a674a88
      <ConfigProvider
    theme={{
      token: {
        // Seed Token
        colorPrimary: '#221F42',
        borderRadius: 2,

        // Alias Token
        colorBgContainer: '#f6ffed',
      },
    }}
  >

<div className='font-expoAr '>
<<<<<<< HEAD
>>>>>>> 7613e493 (Add activities endpoint and feedback message after adding new activity)
=======
>>>>>>> e0c74c8078fe1ca549f086117475ce283a674a88

    <Nav />



<div className=''>

     <AppRoutes />
</div>
     {/* <AddDonation /> */}
      




<<<<<<< HEAD
<<<<<<< HEAD
      <Footer />
=======
      <Footer /> 
      </div>

      </ConfigProvider>
>>>>>>> 7613e493 (Add activities endpoint and feedback message after adding new activity)
=======
      {/* <Footer />  */}
      </div>

      </ConfigProvider>
>>>>>>> e0c74c8078fe1ca549f086117475ce283a674a88
    </>
  )

  
}



export default App
