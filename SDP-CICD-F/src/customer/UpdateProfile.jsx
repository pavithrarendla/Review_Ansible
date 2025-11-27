import { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";
import { FaSave } from "react-icons/fa";

export default function UpdateProfile() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    gender: "",
    dob: "",
    email: "",
    username: "",
    password: "",
    mobileno: "",
    location: "",
  });

  const [toast, setToast] = useState({ type: "", message: "" });

  useEffect(() => {
    const storedCustomer = sessionStorage.getItem("customer");
    if (storedCustomer) {
      setFormData(JSON.parse(storedCustomer));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${config.url}/customer/updateprofile`,
        formData
      );
      if (response.status === 200) {
        setToast({ type: "success", message: response.data });
        sessionStorage.setItem("customer", JSON.stringify(formData));
      }
    } catch (error) {
      if (error.response) {
        setToast({ type: "error", message: error.response.data });
      } else {
        setToast({ type: "error", message: "An unexpected error occurred." });
      }
    }

    setTimeout(() => setToast({ type: "", message: "" }), 3000); // auto-hide
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#DBE4C9] px-6 py-12 relative">
      {/* Toast */}
      {toast.message && (
        <div
          className={`fixed top-5 right-5 px-6 py-3 rounded-xl shadow-lg text-white font-semibold animate-slideIn
          ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          {toast.message}
        </div>
      )}

      <div className="max-w-5xl w-full bg-white/90 rounded-2xl shadow-xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Left: Avatar + Name */}
          <div className="flex flex-col items-center text-center md:text-left">
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center text-4xl font-bold shadow-md 
                         border-4 border-dotted"
              style={{ backgroundColor: "#F7B441", borderColor: "#F7B441" }}
            >
              {formData.name?.charAt(0).toUpperCase() || "?"}
            </div>
            <h2 className="mt-6 text-3xl font-bold">{formData.name}</h2>
            <p className="text-gray-600">Update Profile</p>

            <button
              type="submit"
              form="updateForm"
              className="mt-8 inline-flex items-center gap-2 px-6 py-2 rounded-xl bg-[#F7B441] text-gray-900 font-semibold
                         hover:bg-opacity-90 transition transform hover:scale-105 shadow-md
                         border-2 border-dotted focus:outline-none focus:ring-4 focus:ring-[#F7B441]/30"
            >
              <FaSave /> Save Changes
            </button>
          </div>

          {/* Right: Form with 2-column grid */}
          <form
            id="updateForm"
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <FormField
              label="Full Name"
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <div className="flex flex-col">
              <label htmlFor="gender" className="text-gray-700 font-medium mb-1">
                Gender
              </label>
              <select
                id="gender"
                value={formData.gender}
                onChange={handleChange}
                disabled
                required
                className="p-3 rounded-lg border-2 border-dotted border-[#F7B441] bg-white focus:outline-none focus:ring-2 focus:ring-[#F7B441]"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <FormField
              label="Date of Birth"
              id="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              required
            />

            <FormField
              label="Email"
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <FormField
              label="Username"
              id="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              disabled
              required
            />

            <FormField
              label="Password"
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <FormField
              label="Mobile No"
              id="mobileno"
              type="number"
              value={formData.mobileno}
              onChange={handleChange}
              required
            />

            <FormField
              label="Location"
              id="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </form>
        </div>
      </div>
    </section>
  );
}

/* Reusable Input */
function FormField({ label, id, type, value, onChange, required, disabled }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-gray-700 font-medium mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className="p-3 rounded-lg border-2 border-dotted border-[#F7B441] bg-white focus:outline-none focus:ring-2 focus:ring-[#F7B441]"
      />
    </div>
  );
}
