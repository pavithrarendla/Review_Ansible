import { useState } from "react";
import axios from "axios";
import config from "../config";

export default function AddManager() {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    email: "",
    username: "",
    password: "",
    mobileno: "",
    company_name: "",
    company_location: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.url}/admin/addeventmanager`, formData);
      if (response.status === 200) {
        setMessage(response.data);
        setError("");
        setFormData({
          name: "",
          gender: "",
          dob: "",
          email: "",
          username: "",
          password: "",
          mobileno: "",
          company_name: "",
          company_location: "",
        });
      }
    } catch (err) {
      setMessage("");
      if (err.response) {
        setError(err.response.data);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <section className="min-h-screen bg-[#DBE4C9] flex items-center justify-center px-6 py-12">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-2xl font-bold text-center mb-6 underline text-gray-900">
          Add Event Manager
        </h3>

        {message && <p className="text-center text-green-600 font-semibold mb-4">{message}</p>}
        {error && <p className="text-center text-red-600 font-semibold mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField label="Full Name" id="name" value={formData.name} onChange={handleChange} />
            <SelectField label="Gender" id="gender" value={formData.gender} onChange={handleChange} options={["Male", "Female", "Other"]} />
            <InputField label="Date of Birth" id="dob" type="date" value={formData.dob} onChange={handleChange} />
            <InputField label="Email" id="email" type="email" value={formData.email} onChange={handleChange} />
            <InputField label="Username" id="username" value={formData.username} onChange={handleChange} />
            <InputField label="Password" id="password" type="password" value={formData.password} onChange={handleChange} />
            <InputField label="Mobile No" id="mobileno" type="number" value={formData.mobileno} onChange={handleChange} />
            <InputField label="Company Name" id="company_name" value={formData.company_name} onChange={handleChange} />
            <InputField label="Company Location" id="company_location" value={formData.company_location} onChange={handleChange} />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-[#F7B441] text-gray-900 font-semibold hover:bg-yellow-500
                       hover:scale-105 transition-all shadow-md border-2 border-dotted focus:outline-none focus:ring-4 focus:ring-[#F7B441]/30 mt-4"
          >
            Add Manager
          </button>
        </form>
      </div>
    </section>
  );
}

// Reusable Input Field
function InputField({ label, id, type = "text", value, onChange }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-gray-600 font-medium mb-1">{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        required
        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7B441] focus:border-[#F7B441]"
      />
    </div>
  );
}

// Reusable Select Field
function SelectField({ label, id, value, onChange, options }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-gray-600 font-medium mb-1">{label}</label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        required
        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7B441] focus:border-[#F7B441]"
      >
        <option value="">Select {label}</option>
        {options.map((opt, index) => (
          <option key={index} value={opt.toLowerCase()}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
