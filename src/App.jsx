import { useState, useRef } from 'react';
import Nav from './components/navbar';
import { ConfigProvider } from 'antd';
import AppRoutes from './components/router';
import ExpoAr from './assets/Expo Arabic Bold.ttf'
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
console.log('API Base URL:', apiBaseUrl);
// import poppins-light from './assets/Expo Arabic Bold.ttf'

function App() {

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#221F42',
          borderRadius: 2,
          colorBgContainer: '#f6ffed',
        },
      }}
    >
      <div className='font-expoBold '>
        <Nav />
        <div>
          <AppRoutes />
        </div>
      </div>
    </ConfigProvider>
  );
}

export default App;
