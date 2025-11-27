// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaInstagram, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#f7b441] text-balck mt-0">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Brand / About */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Online Ticket Booking</h3>
          <p className="text-black text-sm">
            A complete event management platform to book, manage, and enjoy events with ease.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-yellow-400">Home</Link></li>
            <li><Link to="/viewallevents" className="hover:text-yellow-400">Events</Link></li>
            <li><Link to="/customerlogin" className="hover:text-yellow-400">Customer Login</Link></li>
            <li><Link to="/adminlogin" className="hover:text-yellow-400">Admin Login</Link></li>
            <li><Link to="/managerlogin" className="hover:text-yellow-400">Manager Login</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
          <ul className="space-y-2">
            <li><Link to="/faq" className="hover:text-yellow-400">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-yellow-400">Contact Us</Link></li>
            <li><Link to="/about" className="hover:text-yellow-400">About Us</Link></li>
            <li><a href="mailto:support@eventease.com" className="hover:text-yellow-400">Email Support</a></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
          <div className="flex space-x-4 text-2xl">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-yellow-400"><FaGithub /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-yellow-400"><FaLinkedin /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-yellow-400"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-yellow-400"><FaXTwitter /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4 text-center text-gray-500 text-sm">
        &copy;{new Date().getFullYear()} Design and Developed by Hemanth Moka ||  NO rights Reserved.
      </div>
    </footer>
  );
}
