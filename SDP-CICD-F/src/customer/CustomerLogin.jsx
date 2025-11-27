import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import config from '../config';
import { useAuth } from '../contextapi/AuthContext';

export default function CustomerLogin() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { setIsCustomerLoggedIn } = useAuth();

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${config.url}/customer/checkcustomerlogin`, formData);
      if (response.status === 200) {
        setIsCustomerLoggedIn(true);
        sessionStorage.setItem('customer', JSON.stringify(response.data));
        setStatus({ type: 'success', message: 'Login successful! Redirecting...' });
        setTimeout(() => navigate('/customerhome'), 1500);
      } else {
        setStatus({ type: 'error', message: 'Login failed. Check your credentials.' });
      }
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.response?.data || 'Something went wrong. Please try again.'
      });
    }

    setIsSubmitting(false);
  };

  return (
    <form
      className="bg-[#DBE4C9] text-white min-h-screen px-4 py-16 flex items-center justify-center"
      onSubmit={handleSubmit}
    >
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black">Customer Login</h1>
          <p className="mt-2 text-gray-600">Login to access your account and book events.</p>
        </div>

        {/* Status Message */}
        {status.message && (
          <div
            className={`text-center px-6 py-3 rounded-lg font-semibold transition-all duration-500 ${
              status.type === 'success'
                ? 'bg-green-700 text-green-100'
                : 'bg-red-700 text-red-100'
            }`}
          >
            {status.message}
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-4">
          <InputField
            id="username"
            label="Username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
          />
          <InputField
            id="password"
            type="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 text-sm rounded-xl bg-yellow-600 hover:bg-black text-white font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 shadow-md hover:shadow-violet-500/40 flex items-center gap-2"
          >
            {isSubmitting ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              'Login'
            )}
          </button>
        </div>

      
        {/* <section className="mt-10 text-center space-y-3">
          <h3 className="text-2xl font-semibold text-violet-400">Book Your Ticket</h3>
          <div className="flex justify-center gap-4 mt-3">
            <Link
              to="/viewallevents"
              className="px-4 py-2 rounded-xl bg-violet-700 hover:bg-violet-600 text-white font-medium transition"
            >
              🎬 Movies
            </Link>
            <Link
              to="/travel"
              className="px-4 py-2 rounded-xl bg-violet-700 hover:bg-violet-600 text-white font-medium transition"
            >
              🚗 Travel
            </Link>
            <Link
              to="/viewallevents"
              className="px-4 py-2 rounded-xl bg-violet-700 hover:bg-violet-600 text-white font-medium transition"
            >
              🎟️ Events
            </Link>
          </div>
        </section> */}

        {/* Footer */}
        <div className="text-center text-gray-900 text-sm mt-8">
          <p>
            Don't have an account? <Link to="/customerregistration" className="text-yellow-500 underline">Register here</Link>
          </p>
        </div>
      </div>
    </form>
  );
}

// Input Field Component
function InputField({ id, label, type = "text", value, onChange, placeholder }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="mt-1 w-full rounded-xl bg-black/30 border border-violet-500/20 backdrop-blur-sm p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
      />
    </div>
  );
}
