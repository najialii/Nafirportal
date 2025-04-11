import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import { CiChat1, CiBellOn } from "react-icons/ci";
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import nafirLogo from '../assets/naflogo-01.svg';

const Nav = () => {
  const { user } = useAuthContext();

  if (
    window.location.pathname === "/login" ||
    window.location.pathname === "/signup" ||
    window.location.pathname.startsWith("/dashboard")
  ) {
    return null;
  }

  return (
    <nav dir="rtl" className="bg-white border-gray-200 w-full">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={nafirLogo} className="h-10" alt="Nafir Logo" />
        </Link>

        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100"
          aria-controls="navbar-dropdown"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 17 14"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
          <ul className="text-gray-900 font-medium flex flex-col text-lg p-4 md:p-0 mt-4 border items-center border-gray-100 gap-2 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link to="/" className="block py-2 px-3 hover:text-green-600">
                الرئيسية
              </Link>
            </li>
            <li>
              <Link to="/about" className="block py-2 px-3 hover:text-green-600">
                من نحن
              </Link>
            </li>
            <li className="relative group">
  <button
    className="block py-2 px-3 text-gray-900 hover:text-green-600 rounded-sm md:bg-transparent md:p-0"
  >
    خدماتنا
  </button>
  <ul className="absolute right-0 hidden group-hover:block bg-white shadow-md rounded-md mt-2 z-10 min-w-[180px]">
    <li>
      <Link
        to="/mentorships"
        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
      >
        التوجيه المهني
      </Link>
    </li>
    <li>
      <Link
        to="/services/activities"
        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
      >
        الأنشطة
      </Link>
    </li>
    <li>
      <Link
        to="/services/cv-review"
        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
      >
        مراجعة السيرة الذاتية
      </Link>
    </li>
  </ul>
</li>

            <li>
              <Link to="/contact" className="block py-2 px-3 hover:text-green-600">
                تواصل معنا
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link to="/chat" className="bg-white shadow-md h-8 w-8 flex justify-center items-center rounded-full">
                <CiChat1 size={20} color="#221F42" />
              </Link>
              <Link to="/notifications" className="bg-white shadow-md h-8 w-8 flex justify-center items-center rounded-full">
                <CiBellOn size={20} color="#221F42" />
              </Link>
              <Link to="/profile/me" className="shadow-md h-8 w-8 flex justify-center items-center rounded-full">
                <Avatar size={28} icon={<UserOutlined />} />
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white bg-primary-light hover:bg- font-medium rounded-lg text-sm px-5 py-2.5 ms-2"
              >
                تسجيل الدخول
              </Link>
              <Link
                to="/signup"
                className="text-white bg-primary-light hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 ms-2"
              >
                حساب جديد
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
