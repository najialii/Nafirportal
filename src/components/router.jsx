import React from "react";
import { Routes, Route } from "react-router-dom";


import MentorPage from "../pages/MentorPage"; 
import HomePage from "../pages/homePage";
import Signup from "../pages/signup";
import Login from "../pages/login";
import AddSession from '../pages/AddSession'
import SessionPage from "../pages/Sessionlayout";
const AppRoutes = () => {
  return (
    <Routes>
    
      <Route path="/" element={<HomePage />} /> 
      <Route path="/mentor/:id" element={<MentorPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/addsession" element={<AddSession />} />
      <Route path="/sessionPage" element={<SessionPage />} />
    </Routes>
  );
};

export default AppRoutes;
