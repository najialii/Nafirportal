import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
// import nafirLogo from '../assets/nafnafirLogo-01.svg'
import { CiChat1 } from "react-icons/ci";
import { CiBellOn } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import {Splitter} from "antd"
import { UserOutlined } from '@ant-design/icons';
// import   us  from 'react-router-dom'

import {Avatar} from 'antd'

import nafirLogo from '../assets/logo-01.jpg'
const Nav = () => {
  const { user } = useAuthContext();

  return (
    <nav className="bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          {/* <h3 className="text-2xl text-green-400 font-bold">Nafir</h3> */}
          <img src={nafirLogo} className="h-18" />
        </Link>
        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-dropdown"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
          <ul className="text-gray-900 flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-gray-900 bg-primary-light rounded-sm md:bg-transparent md:text-primary-light md:p-0 md:dark:text-primary-light dark:bg-green-600 md:dark:bg-transparent"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/mentor/:id"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-light md:p-0 dark:text-gray-900 md:dark:hover:text-primary-light dark:hover:bg-gray-700 dark:hover:text-gray-900 md:dark:hover:bg-transparent"
              >
                link
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-light md:p-0 dark:text-gray-900 md:dark:hover:text-primary-light dark:hover:bg-gray-700 dark:hover:text-gray-900 md:dark:hover:bg-transparent"
              >
                link
              </Link>
            </li>
            <li>
              <Link
                to="/pricing"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-light md:p-0 dark:text-gray-900 md:dark:hover:text-primary-light dark:hover:bg-gray-700 dark:hover:text-gray-900 md:dark:hover:bg-transparent"
              >
                link
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-light md:p-0 dark:text-gray-900 md:dark:hover:text-primary-light dark:hover:bg-gray-700 dark:hover:text-gray-900 md:dark:hover:bg-transparent"
              >
                link
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex gap-2 items-center">
        
        </div>
        <div className="flex gap-4 ">
        {user ? (
            <>
              {/* <span>{user.email}</span> */}
              <button className="bg-white shadow-md   h-8 w-8 flex justify-center items-center rounded-full">
                <Link to="/signup"><CiChat1   size={20} color="#221F42"  /></Link>
              </button>
        <button className=" bg-white shadow-md  h-8 w-8 flex justify-center items-center rounded-full ">
                <Link to="/signup"><CiBellOn  size={20} color="#221F42" /></Link>
              </button>

              <div>
              


        <button className="  shadow-md  h-8 w-8 flex justify-center items-center rounded-full ">
                <Link to="/profile/me"><Avatar size={28} color={"#221F42"} icon={<UserOutlined />} /></Link>
              </button>
              </div>
            </>
          ) : (
            <>
              <button className="focus:outline-none text-white bg-primary-light hover:bg-green-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-primary-light">
                <Link to="/login">Login</Link>
              </button>
              <button className="focus:outline-none text-white bg-primary-light hover:bg-green-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-primary-light">
                <Link to="/signup">Signup</Link>
              </button>
              
            </>
          )}

     
        </div>
      </div>
    </nav>
  );
};

export default Nav;