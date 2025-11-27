import { Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import AdminHome from './AdminHome';
import AddManager from './AddManager';
import ViewManagers from './ViewManagers';
import ViewCustomers from './ViewCustomers';
import AdminLogin from './AdminLogin';
import { useAuth } from '../contextapi/AuthContext';

export default function AdminNavBar() {
  const { setIsAdminLoggedIn } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.clear();
  };

  return (
    <div>
      {/* Navbar */}
      <header className="bg-[#f7b441] shadow-md">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0 text-black font-bold text-xl">
              Welcome Admin
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex lg:space-x-8">
              <Link to="/adminhome" className="text-black font-medium hover:text-gray-800 transition">
                Home
              </Link>
              <Link to="/addeventmanager" className="text-black font-medium hover:text-gray-800 transition">
                Add Event Managers
              </Link>
              <Link to="/viewmanagers" className="text-black font-medium hover:text-gray-800 transition">
                View Event Managers
              </Link>
              <Link to="/viewallcustomers" className="text-black font-medium hover:text-gray-800 transition">
                View All Customers
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
            <Link to="/adminhome" className="block text-black" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link to="/addeventmanager" className="block text-black" onClick={() => setMenuOpen(false)}>
              Add Event Managers
            </Link>
            <Link to="/viewmanagers" className="block text-black" onClick={() => setMenuOpen(false)}>
              View Event Managers
            </Link>
            <Link to="/viewallcustomers" className="block text-black" onClick={() => setMenuOpen(false)}>
              View All Customers
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
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/addeventmanager" element={<AddManager />} />
        <Route path="/viewmanagers" element={<ViewManagers />} />
        <Route path="/viewallcustomers" element={<ViewCustomers />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
      </Routes>
    </div>
  );
}
