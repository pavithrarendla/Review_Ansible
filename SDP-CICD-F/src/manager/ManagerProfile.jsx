import { useState, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ManagerProfile() {
  const [manager, setManager] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedManager = sessionStorage.getItem("manager");
    if (storedManager) {
      setManager(JSON.parse(storedManager));
    }
  }, []);

  if (!manager) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#DBE4C9] text-gray-900">
        <p className="text-lg animate-pulse">Loading profile...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#DBE4C9] px-6 py-12">
      <div className="max-w-5xl w-full bg-white/90 rounded-2xl shadow-xl p-8 text-gray-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left side: Avatar + Name */}
          <div className="flex flex-col items-center text-center md:text-left">
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center text-4xl font-bold shadow-md 
                         border-4 border-dotted"
              style={{ backgroundColor: "#F7B441", borderColor: "#F7B441" }}
            >
              {manager.name?.charAt(0).toUpperCase()}
            </div>
            <h2 className="mt-6 text-3xl font-bold">{manager.name}</h2>
            <p className="text-gray-600">Manager Profile</p>

            {/* Edit Button */}
            <button
              onClick={() => navigate("/updatemanagerprofile")}
              type="button"
              className="mt-8 inline-flex items-center gap-2 px-6 py-2 rounded-xl bg-[#F7B441] text-gray-900 font-semibold
                         hover:bg-opacity-90 transition transform hover:scale-105 shadow-md
                         border-2 border-dotted focus:outline-none focus:ring-4 focus:ring-[#F7B441]/30"
              aria-label="Edit profile"
            >
              <FaPen />
              Edit Profile
            </button>
          </div>

          {/* Right side: Details */}
          <div className="space-y-5">
            <Detail label="Gender" value={manager.gender} />
            <Detail label="Date of Birth" value={manager.dob} />
            <Detail label="Email" value={manager.email} />
            <Detail label="Username" value={manager.username} />
            <Detail label="Mobile No" value={manager.mobileno} />
            <Detail label="Company Name" value={manager.company_name} />
          </div>
        </div>
      </div>
    </section>
  );
}

// Reusable Detail Row
function Detail({ label, value }) {
  return (
    <div className="flex justify-between border-b border-gray-300 pb-2">
      <span className="text-gray-600 font-medium">{label}</span>
      <span className="font-semibold">{value || "—"}</span>
    </div>
  );
}
