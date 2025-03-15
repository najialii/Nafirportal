import React from "react";
import { Routes, Route } from "react-router-dom";


import MentorPage from "../pages/MentorPage"; 
import HomePage from "../pages/homePage";
import Signup from "../pages/signup";
import Login from "../pages/login";
import AddSession from '../pages/mentor/AddSession'
import SessionPage from "../pages/Sessionlayout";
import RoomsList from "../pages/messages";
import CVUpload from "../pages/cvchecks";
import Chat from '../components/chat'
import ChatRoom from "./chatroom";
import Messanger from "../pages/messanger";
import Profile from '../pages/admin/profile'
import SessionsPage from '../pages/sessionspage'
import MentSessions from '../pages/mentor/sessions'
import DashLayout from '../pages/admin/admindash'
import UserPro from "../pages/userprofile";
import BlogPost from '../pages/blogpost'
import CreateBlog  from '../components/addblogs'
import Blogpage from "../pages/blogspage";
import Activities from '../pages/activities'
import Activitiespage  from '../pages/activitiespage'
import  CreateActivity from '../pages/createact'
const AppRoutes = () => {
  return (
    <Routes>
    
      <Route path="/" element={<HomePage />} /> 
      <Route path="/mentor/:id" element={<MentorPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sessionPage" element={<SessionPage />} />
      <Route path="/cv" element={<CVUpload />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/messages" element={<RoomsList />} />
      <Route path="/chatroom" element={<ChatRoom />} />
      <Route path="/messanger" element={<Messanger/>} />
      <Route path="/messanger/:conversationId" element={<Messanger/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/profile/:userId" element={<UserPro />} />
      <Route path="/activities" element={<Activities />} />
      <Route path="/activities/:id" element={<Activitiespage />} />

      <Route path="/sessions" element={<SessionsPage/>} />
      <Route path="/blogs" element={<BlogPost/>} />
      <Route path="/blog/:id" element={<Blogpage/>} />
      <Route path="/createblog" element={<CreateBlog/>} />

      {/* <Route path="/createActivity" element={<CreateActivity/>} /> */}
      {/* <Route path="/addsession" element={<AddSession />} /> */}
      <Route path="/createActivity" element={<DashLayout><CreateActivity /></DashLayout>} />
      <Route path="/profile/me" element={<DashLayout><UserPro /></DashLayout>} />
      <Route path="/men-sessions" element={<DashLayout><MentSessions /></DashLayout>} />
      <Route path="/addsession" element={<DashLayout><AddSession /></DashLayout>} />
      {/* <Route path="/" element={<MentSessions/>} /> */}
   
    </Routes>
  );
};

export default AppRoutes;
