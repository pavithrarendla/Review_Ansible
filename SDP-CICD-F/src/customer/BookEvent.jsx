import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import config from "../config";

export default function BookEvent() {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const eventId = queryParams.get("eventid");

  const [customer, setCustomer] = useState(null);
  const [formData, setFormData] = useState({
    startdate: "",
    enddate: "",
    bookedcapacity: 1,
  });

  const [toast, setToast] = useState({ type: "", message: "" });

  useEffect(() => {
    const storedCustomer = sessionStorage.getItem("customer");
    if (storedCustomer) {
      setCustomer(JSON.parse(storedCustomer));
    } else {
      setToast({ type: "error", message: "Customer not logged in!" });
      navigate("/customerlogin");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      event: { id: eventId },
      customer: { id: customer.id },
      ...formData,
      status: 1,
    };

    try {
      const response = await fetch(`${config.url}/customer/bookevent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        setToast({ type: "success", message: "Event booked successfully!" });
        setTimeout(() => navigate("/bookedevents"), 2000);
      } else {
        setToast({ type: "error", message: "Failed to book event." });
      }
    } catch (error) {
      console.error("Booking error:", error);
      setToast({ type: "error", message: "Something went wrong. Try again." });
    }

    setTimeout(() => setToast({ type: "", message: "" }), 3000);
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

      <div className="w-full max-w-lg bg-white/90 rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Book Event</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 2-column grid for dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField
              label="Start Date"
              type="date"
              name="startdate"
              value={formData.startdate}
              onChange={handleChange}
              required
            />
            <FormField
              label="End Date"
              type="date"
              name="enddate"
              value={formData.enddate}
              onChange={handleChange}
              required
            />
          </div>

          {/* Capacity (single row) */}
          <FormField
            label="Capacity"
            type="number"
            name="bookedcapacity"
            min="1"
            value={formData.bookedcapacity}
            onChange={handleChange}
            required
          />

          {/* Submit button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#F7B441] text-gray-900 font-semibold
                         hover:bg-opacity-90 transition transform hover:scale-105 shadow-md
                         border-2 border-dotted focus:outline-none focus:ring-4 focus:ring-[#F7B441]/30"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

/* Reusable Input Component */
function FormField({ label, type, name, value, onChange, required, min }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-gray-700 font-medium mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        min={min}
        className="p-3 rounded-lg border-2 border-dotted border-[#F7B441] bg-white 
                   focus:outline-none focus:ring-2 focus:ring-[#F7B441]"
      />
    </div>
  );
}
