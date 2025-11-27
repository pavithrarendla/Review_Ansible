import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

import ManagerHome from "./ManagerHome";
import ManagerProfile from "./ManagerProfile";
import AddEvent from "./AddEvent";
import ViewEventsByManager from "./ViewEventsByManager";
import ViewBookings from "./ViewBookings";
// import AddEvent from "./AddEvent";
import ManagerLogin from "./ManagerLogin";
import { useAuth } from "../contextapi/AuthContext";

export default function ManagerNavBar() {
  const { setIsManagerLoggedIn } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setIsManagerLoggedIn(false);
    sessionStorage.clear();
  };

  return (
    <div>
      {/* Navbar */}
      <header className="bg-[#f7b441] shadow-md">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Logo / Title */}
            <div className="flex items-center flex-shrink-0 text-black font-bold text-xl">
              Welcome Manager
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex lg:space-x-8">
              <Link to="/managerhome" className="text-black font-medium hover:text-gray-800 transition">
                Home
              </Link>
              <Link to="/managerprofile" className="text-black font-medium hover:text-gray-800 transition">
                Profile
              </Link>
              <Link to="/addevent" className="text-black font-medium hover:text-gray-800 transition">
                Add Event
              </Link>
              <Link to="/vieweventsbymanager" className="text-black font-medium hover:text-gray-800 transition">
                View Events
              </Link>
              <Link to="/viewbookings" className="text-black font-medium hover:text-gray-800 transition">
                Bookings
              </Link>
              <button
                onClick={handleLogout}
                className="text-black font-medium hover:text-gray-800 transition"
              >
                Logout
              </button>
            </div>

            {/* Mobile Hamburger */}
            <div className="lg:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-black focus:outline-none"
              >
                {menuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-[#FFE942] px-4 pb-4 space-y-3">
            <Link to="/managerhome" className="block text-black" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link to="/managerprofile" className="block text-black" onClick={() => setMenuOpen(false)}>
              Profile
            </Link>
            <Link to="/addevent" className="block text-black" onClick={() => setMenuOpen(false)}>
              Add Event
            </Link>
            <Link to="/vieweventsbymanager" className="block text-black" onClick={() => setMenuOpen(false)}>
              View Events
            </Link>
            <Link to="/viewbookings" className="block text-black" onClick={() => setMenuOpen(false)}>
              Bookings
            </Link>
            <button
              onClick={() => { handleLogout(); setMenuOpen(false); }}
              className="block text-black w-full text-left"
            >
              Logout
            </button>
          </div>
        )}
      </header>

      {/* Routes */}
      <Routes>
        <Route path="/managerhome" element={<ManagerHome />} />
        <Route path="/managerprofile" element={<ManagerProfile />} />
        <Route path="/addevent" element={<AddEvent />} />
        <Route path="/vieweventsbymanager" element={<ViewEventsByManager />} />
        <Route path="/viewbookings" element={<ViewBookings />} />
        <Route path="/addevent" element={<AddEvent />} />
        <Route path="/managerlogin" element={<ManagerLogin />} />

      </Routes>
    </div>
  );
}
