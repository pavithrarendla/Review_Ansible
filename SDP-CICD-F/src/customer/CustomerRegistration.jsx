import { useState } from 'react';
import axios from 'axios';
import config from '../config';

export default function CustomerRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    dob: '',
    email: '',
    username: '',
    password: '',
    mobileno: '',
    location: ''
  });

  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${config.url}/customer/registration`, formData);
      if (response.status === 200) {
        setStatus({ type: 'success', message: response.data });
        setFormData({
          name: '',
          gender: '',
          dob: '',
          email: '',
          username: '',
          password: '',
          mobileno: '',
          location: ''
        });
      }
    } catch (error) {
      setStatus({ type: 'error', message: error.response?.data || 'An unexpected error occurred.' });
    }
    setIsSubmitting(false);
  };

  return (
    <section className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#DBE4C9' }}>
      <form
        className="w-full max-w-3xl p-8"
        // style={{ backgroundColor: '#18181B', color: 'white' }}
        onSubmit={handleSubmit}
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold" style={{ color: '#000000ff' }}>
            Customer Registration
          </h1>
          <p className="mt-2 text-black-300">
            Register as a customer and join our community.
          </p>
        </div>

        {/* Personal Info Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold ml-65" style={{ color: '#000000ff' }}>Personal Info</h2>
          <div className="grid sm:grid-cols-4 gap-6">
            <InputField id="name" label="Full Name" value={formData.name} onChange={handleChange} />
            <SelectField id="gender" label="Gender" value={formData.gender} onChange={handleChange} options={["Male", "Female", "Other"]} />
            <InputField id="dob" label="Date of Birth" type="date" value={formData.dob} onChange={handleChange} />
            <InputField id="email" label="Email" type="email" value={formData.email} onChange={handleChange} />
            <InputField id="username" label="Username" value={formData.username} onChange={handleChange} />
            <InputField id="password" label="Password" type="password" value={formData.password} onChange={handleChange} />
            <InputField id="mobileno" label="Mobile No" type="number" value={formData.mobileno} onChange={handleChange} />
            <InputField id="location" label="Location" value={formData.location} onChange={handleChange} />
          </div>
        </section>

        {/* Buttons */}
        <div className="flex justify-center mt-10 gap-6">
          <button
            type="reset"
            disabled={isSubmitting}
            className="px-6 py-2 text-sm rounded-xl border border-gray-600 text-black-300 hover:bg-black-800 transition duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 text-sm rounded-xl font-semibold transition duration-300 flex items-center gap-2"
            style={{ backgroundColor: '#F7B441', color: '#18181B' }}
          >
            {isSubmitting ? (
              <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
            ) : (
              'Register'
            )}
          </button>
        </div>

        {/* Status Message */}
        {status.message && (
          <div
            className="text-center mt-6 px-6 py-3 rounded-lg font-semibold"
            style={{
              backgroundColor: status.type === 'success' ? '#F7B441' : '#e53e3e',
              color: status.type === 'success' ? '#18181B' : '#fff'
            }}
          >
            {status.message} {status.type === 'success' && <a href="/customer/customerlogin" className="underline" style={{ color: '#18181B' }}>Login here</a>}
          </div>
        )}

        {/* Footer */}
        <div className="mt-10 text-center text-black-300 text-sm space-y-2 mt-6">
          <p>
            Already have an account? <a href="/customerlogin" className="underline" style={{ color: '#F7B441' }}>Login here</a>
          </p>
          <p>
            By registering, you agree to our <a href="/terms" className="underline" style={{ color: '#F7B441' }}>Terms of Service</a> and <a href="/privacy" className="underline" style={{ color: '#F7B441' }}>Privacy Policy</a>.
          </p>
        </div>
      </form>
    </section>
  );
}

// Input Field Component
function InputField({ id, label, type = "text", value, onChange }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium" style={{ color: '#F7B441' }}>{label}</label>
      <input
        id={id}
        type={type}
        name={id}
        value={value}
        onChange={onChange}
        required
        className="mt-1 w-full rounded-xl p-3 placeholder-gray-400 focus:outline-none"
        style={{ backgroundColor: '#fbb23dff', border: '1px solid #F7B441', color: 'white' }}
      />
    </div>
  );
}

// Select Field Component
function SelectField({ id, label, value, onChange, options }) {
  return (
    <div className="relative">
      <label htmlFor={id} className="block text-sm font-medium" style={{ color: '#F7B441' }}>{label}</label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required
        className="mt-1 w-full rounded-xl p-3 focus:outline-none appearance-none"
        style={{ backgroundColor: '#ffca2bff', border: '1px solid #F7B441', color: 'white' }}
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt.toLowerCase()}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
