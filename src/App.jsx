import { useState, useRef } from 'react';
import Nav from './components/navbar';
import { ConfigProvider } from 'antd';
import AppRoutes from './components/router';
import './index.css'; 
import ExpoAr from './assets/Expo Arabic Bold.ttf'
// const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

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
      <div className='font-expo '>
        <Nav />
        <div>
          <AppRoutes />
        </div>
      </div>
    </ConfigProvider>
  );
}

export default App;
