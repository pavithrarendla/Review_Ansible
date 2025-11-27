import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaSun,
  FaMoon,
} from "react-icons/fa";

import Home from "./Home";
import About from "./About";
import CustomerLogin from "./../customer/CustomerLogin";
import CustomerRegistration from "./../customer/CustomerRegistration";
import Contact from "./Contact";
import AdminLogin from "./../admin/AdminLogin";
import ManagerLogin from "../manager/ManagerLogin";
import NotFound from "./NotFound";

export default function MainNavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.className = newMode ? "dark-mode" : "";
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  return (
    <div>
      {/* Navbar */}
      <header className="bg-[#f7b441]">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link to="/" className="inline-flex">
                <img
                  className="w-auto h-10"
                  src="/ticket-booking-high-resolution-logo-transparent.png"
                  alt="logo"
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex lg:justify-center lg:ml-16 lg:space-x-8 xl:space-x-14">
              <Link
                to="/"
                className="text-base font-medium text-gray-900 transition hover:text-gray-700"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-base font-medium text-gray-900 transition hover:text-gray-700"
              >
                About
              </Link>
              <Link
                to="/customerregistration"
                className="text-base font-medium text-gray-900 transition hover:text-gray-700"
              >
                Register
              </Link>
              <Link
                to="/contact"
                className="text-base font-medium text-gray-900 transition hover:text-gray-700"
              >
                Contact
              </Link>
            </div>

            {/* Right Side */}
            <div className="flex items-center justify-end ml-auto">
              <div className="hidden lg:flex lg:items-center lg:space-x-8">
                <Link
                  to="/customerlogin"
                  className="text-base font-medium text-gray-900 transition hover:text-gray-700"
                >
                  Customer Login
                </Link>
                <Link
                  to="/managerlogin"
                  className="text-base font-medium text-gray-900 transition hover:text-gray-700"
                >
                  Manager Login
                </Link>
                <Link
                  to="/adminlogin"
                  className="text-base font-medium text-gray-900 transition hover:text-gray-700"
                >
                  Admin Login
                </Link>
              </div>

              {/* Dark Mode Toggle */}
              <button
                className="p-2 ml-4 text-gray-900 hover:text-gray-700"
                onClick={toggleDarkMode}
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>

              {/* Cart */}
              <button className="relative p-2 ml-2 text-gray-900 hover:text-gray-700">
                <FaShoppingCart className="w-6 h-6" />
                <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-indigo-600 rounded-full">
                  3
                </span>
              </button>

              {/* Hamburger for Mobile */}
              <button
                type="button"
                className="p-2 ml-3 text-gray-900 lg:hidden hover:text-gray-700"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-[#FFE942] px-4 pb-4 space-y-3">
            <Link
              to="/"
              className="block text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/customerregistration"
              className="block text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              Register
            </Link>
            <Link
              to="/customerlogin"
              className="block text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              Customer Login
            </Link>
            <Link
              to="/managerlogin"
              className="block text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              Manager Login
            </Link>
            <Link
              to="/adminlogin"
              className="block text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              Admin Login
            </Link>
            <Link
              to="/contact"
              className="block text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </header>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/customerregistration" element={<CustomerRegistration />} />
        <Route path="/customerlogin" element={<CustomerLogin />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/managerlogin" element={<ManagerLogin />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
