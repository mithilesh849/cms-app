import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";


const AppLayout = ({ children }) => {
  const { logout } = useAuth();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />
        {/* Page Content */}
        <div className="p-4 bg-black">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
