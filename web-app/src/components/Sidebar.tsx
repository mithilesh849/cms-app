import { NavLink } from "react-router-dom";
import { Home, LogOut, BatteryCharging } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import logoImage from './../assets/cms-logo.png'

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <div className="w-64 h-screen bg-zinc-900 text-white p-4 flex flex-col">
      <div className="mb-4 pt-2">
       <img src={logoImage} className=""/>
      </div>
      <nav className="mt-3.5">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center text-sm gap-2 p-2 rounded transition ${
                  isActive
                    ? "bg-green-900 text-green-400"
                    : "text-gray-400 hover:text-green-400 hover:bg-green-900"
                }`
              }
            >
              <Home size={20} />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/charging-stations"
              className={({ isActive }) =>
                `flex items-center text-sm gap-2 p-3 rounded transition ${
                  isActive
                    ? "bg-green-900 text-green-400"
                    : "text-gray-400 hover:text-green-400 hover:bg-green-900"
                }`
              }
            >
              <BatteryCharging size={20} />
              Charging Stations
            </NavLink>
          </li>
          {/* Logout button styled same as menu items */}
          <li>
            <button
              onClick={logout}
              className="w-full flex text-sm items-center gap-2 p-3 rounded transition text-gray-400 hover:text-green-400 hover:bg-green-900"
            >
              <LogOut size={20} />
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
