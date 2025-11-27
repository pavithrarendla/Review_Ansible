import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import { useAuth } from '../contextapi/AuthContext';

export default function AdminLogin() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { setIsAdminLoggedIn } = useAuth();

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${config.url}/admin/checkadminlogin`, formData);
      if (response.status === 200) {
        setIsAdminLoggedIn(true);
        setStatus({ type: 'success', message: 'Login successful! Redirecting...' });
        setTimeout(() => navigate('/adminhome'), 1500);
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
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black">Admin Login</h1>
          <p className="mt-2 text-gray-900">Enter your credentials to access admin panel.</p>
        </div>

        {status.message && (
          <div
            className={`text-center px-6 py-3 rounded-lg font-semibold transition-all duration-500 ${
              status.type === 'success' ? 'bg-green-700 text-green-100' : 'bg-red-700 text-red-100'
            }`}
          >
            {status.message}
          </div>
        )}

        <div className="space-y-4">
          <InputField id="username" label="Username" value={formData.username} onChange={handleChange} />
          <InputField id="password" type="password" label="Password" value={formData.password} onChange={handleChange} />
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 text-sm rounded-xl bg-yellow-600 hover:bg-black-500 text-white font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 shadow-md hover:shadow-violet-500/40 flex items-center gap-2"
          >
            {isSubmitting ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : 'Login'}
          </button>
        </div>
      </div>
    </form>
  );
}

function InputField({ id, label, type = "text", value, onChange }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required
        className="mt-1 w-full rounded-xl bg-black/30 border border-violet-500/20 backdrop-blur-sm p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
      />
    </div>
  );
}
