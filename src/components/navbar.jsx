import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
const Nav = () => {
  const { user } = useAuthContext();

  return (
    <nav className="bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <h3 className="text-2xl text-green-400 font-bold">Nafir</h3>
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
                className="block py-2 px-3 text-gray-900 bg-green-700 rounded-sm md:bg-transparent md:text-green-700 md:p-0 md:dark:text-green-500 dark:bg-green-600 md:dark:bg-transparent"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/mentor/:id"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-gray-900 md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-gray-900 md:dark:hover:bg-transparent"
              >
                Mentor
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-gray-900 md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-gray-900 md:dark:hover:bg-transparent"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/pricing"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-gray-900 md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-gray-900 md:dark:hover:bg-transparent"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-gray-900 md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-gray-900 md:dark:hover:bg-transparent"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex gap-2 items-center">
          {user ? (
            <>
              <span>{user.email}</span>
              <button
                onClick={() => dispatch({ type: "LOGOUT" })}
                className="focus:outline-none text-green-900 border border-green-700 bg-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700">
                <Link to="/login">Login</Link>
              </button>
              <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700">
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