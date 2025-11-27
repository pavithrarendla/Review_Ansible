import { Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import CustomerHome from './CustomerHome';
import CustomerProfile from './CustomerProfile';
import CustomerLogin from './CustomerLogin';
import UpdateProfile from './UpdateProfile';
import BookedEvents from './BookedEvents';
import ViewAllEvents from './ViewAllEvents';
import BookEvent from './BookEvent';
import { useAuth } from '../contextapi/AuthContext';

export default function CustomerNavBar() {
  const { setIsCustomerLoggedIn } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setIsCustomerLoggedIn(false);
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
              Welcome Customer
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex lg:space-x-8">
              <Link to="/customerhome" className="text-black font-medium hover:text-gray-800 transition">
                Home
              </Link>
              <Link to="/customerprofile" className="text-black font-medium hover:text-gray-800 transition">
                Profile
              </Link>
              <Link to="/updateprofile" className="text-black font-medium hover:text-gray-800 transition">
                Update Profile
              </Link>
              <Link to="/viewallevents" className="text-black font-medium hover:text-gray-800 transition">
                Book Event
              </Link>
              <Link to="/bookedevents" className="text-black font-medium hover:text-gray-800 transition">
                Booked Events
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
            <Link to="/customerhome" className="block text-black" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link to="/customerprofile" className="block text-black" onClick={() => setMenuOpen(false)}>
              Profile
            </Link>
            <Link to="/updateprofile" className="block text-black" onClick={() => setMenuOpen(false)}>
              Update Profile
            </Link>
            <Link to="/viewallevents" className="block text-black" onClick={() => setMenuOpen(false)}>
              Book Event
            </Link>
            <Link to="/bookedevents" className="block text-black" onClick={() => setMenuOpen(false)}>
              Booked Events
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
        <Route path="/customerhome" element={<CustomerHome />} />
        <Route path="/customerprofile" element={<CustomerProfile />} />
        <Route path="/updateprofile" element={<UpdateProfile />} />
        <Route path="/viewallevents" element={<ViewAllEvents />} />
        <Route path="/bookevent" element={<BookEvent />} />
        <Route path="/bookedevents" element={<BookedEvents />} />
        <Route path="/customerlogin" element={<CustomerLogin />} />
      </Routes>
    </div>
  );
}
