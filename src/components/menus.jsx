import { AiOutlineDashboard, AiOutlineUsergroupAdd, AiOutlineProfile, AiOutlineBook } from "react-icons/ai";
import { MdEventNote, MdAddBox, MdOutlineRateReview } from "react-icons/md";
import { FaListUl, FaUserCircle, FaRegCalendarCheck } from "react-icons/fa";
import { BsCalendarCheck, BsPeopleFill } from "react-icons/bs";
import { LuMessageSquare } from "react-icons/lu";
import { TbFileAnalytics } from "react-icons/tb";



const iconSize = 20

export const superAdminMenu = [
  { label: "Overview", path: "/dashboard/overview", icon: <TbFileAnalytics size={iconSize} /> },
  { label: "Department", path: "/dashboard/deparmnets", icon: <FaListUl size={iconSize} /> },
  { label: "Users", path: "/dashboard/users", icon: <AiOutlineUsergroupAdd size={iconSize} /> },
  { label: "Messanges", path: "/dashboard/messanger", icon: <LuMessageSquare  size={iconSize} /> },
  { label: "Announcements", path: "/dashboard/annoucmentss", icon: <MdOutlineRateReview size={iconSize} /> },
  { label: "Sessions", path: "/dashboard/sessionsmanagement", icon: <BsCalendarCheck size={iconSize} /> },
  // { label: "Reviews", path: "/dashboard/reviews", icon: <MdEventNote size={iconSize} /> },
  
];

export const adminMenu = [
  { label: "Overview", path: "/dashboard/overview", icon: <TbFileAnalytics size={iconSize} /> },
  { label: "Participants", path: "/dashboard/users", icon: <FaListUl size={iconSize} /> },
  { label: "Requests", path: "/dashboard/mentors-req", icon: <AiOutlineUsergroupAdd size={iconSize} /> },
  { label: "Add Activities", path: "/dashboard/createActivity", icon: <MdAddBox size={iconSize} /> },
  { label: "Activities", path: "/dashboard/activitesList", icon: <FaListUl size={iconSize} /> },
  // { label: "Reviews", path: "/dashboard/reviews", icon: <MdEventNote size={iconSize} /> }
];

export const mentorMenu = [
  { label: "Profile", path: "/dashboard/profile/me", icon: <AiOutlineProfile size={iconSize} /> },
  { label: "Add Session", path: "/dashboard/addsession", icon: <MdAddBox size={iconSize} /> },
  { label: "Session Requests", path: "/men-sessions", icon: <BsCalendarCheck size={iconSize} /> },
  { label: "Reviews", path: "/mentor/reviews", icon: <MdOutlineRateReview size={iconSize} /> }
];

export const menteeMenu = [
  { label: "Dashboard", path: "/dashboard", icon: <AiOutlineDashboard size={iconSize} /> },
  { label: "Profile", path: "/dashbo/profile/me", icon: <FaUserCircle size={iconSize} /> },
  { label: "My Sessions", path: "/user/sessions", icon: <BsPeopleFill size={iconSize} /> },
  { label: "Sessions Calendar", path: "/user/calendar", icon: <FaRegCalendarCheck size={iconSize} /> }
];
