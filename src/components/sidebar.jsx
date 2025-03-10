import { Link } from "react-router-dom";

const Sidebar = ({ menuItems }) => {
  return (
    <aside className="bg-white z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
      <ul className="mt-4 space-y-2 font-medium">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-primary-light hover:text-white group"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
