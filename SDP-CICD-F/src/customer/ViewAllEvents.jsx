import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHashtag,
  FaBuilding,
  FaMapMarkerAlt,
  FaTags,
  FaHeading,
  FaAlignLeft,
  FaUsers,
  FaMoneyBill,
  FaTicketAlt,
  FaTrash,
} from "react-icons/fa";
import config from "../config";

export default function ViewAllEvents() {
  const [events, setEvents] = useState([]);
  const [searchTerms, setSearchTerms] = useState({
    id: "",
    manager: "",
    company: "",
    category: "",
    title: "",
    description: "",
    capacity: "",
    cost: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const fetchAllEvents = async () => {
    try {
      const response = await fetch(`${config.url}/customer/viewallevents`);
      const data = await response.json();
      setEvents(data);
      setError("");
    } catch (err) {
      setError("Failed to fetch events");
      setEvents([]);
    }
  };

  const handleBookClick = (eventId) => {
    const customer = JSON.parse(sessionStorage.getItem("customer"));
    if (!customer || !customer.id) {
      alert("Customer not logged in");
      return;
    }
    navigate(`/bookevent?eventid=${eventId}`);
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await fetch(`${config.url}/manager/deleteevent/${eventId}`, { method: "DELETE" });
      fetchAllEvents();
    } catch (err) {
      console.error(err);
      alert("Failed to delete event");
    }
  };

  const handleSearchChange = (e, field) => {
    setSearchTerms((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const filteredEvents = events.filter((event) => {
    return (
      event.id.toString().includes(searchTerms.id) &&
      event.manager.name.toLowerCase().includes(searchTerms.manager.toLowerCase()) &&
      event.manager.company_name.toLowerCase().includes(searchTerms.company.toLowerCase()) &&
      event.category.toLowerCase().includes(searchTerms.category.toLowerCase()) &&
      event.title.toLowerCase().includes(searchTerms.title.toLowerCase()) &&
      event.description.toLowerCase().includes(searchTerms.description.toLowerCase()) &&
      event.capacity.toString().includes(searchTerms.capacity) &&
      event.cost.toString().includes(searchTerms.cost)
    );
  });

  return (
    <div className="p-6 min-h-screen bg-[#DBE4C9]">
      <h3 className="text-center text-2xl font-semibold underline mb-6">
        Available Events
      </h3>

      {error && <p className="text-center text-red-600 font-bold mb-4">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-dotted border-yellow-400 text-center">
          <thead className="bg-yellow-400">
            <tr>
              {[
                { label: "Event ID", icon: <FaHashtag /> },
                { label: "Company", icon: <FaBuilding /> },
                { label: "Location", icon: <FaMapMarkerAlt /> },
                { label: "Category", icon: <FaTags /> },
                { label: "Title", icon: <FaHeading /> },
                { label: "Description", icon: <FaAlignLeft /> },
                { label: "Capacity", icon: <FaUsers /> },
                { label: "Cost", icon: <FaMoneyBill /> },
                { label: "Action", icon: null },
              ].map((col, idx) => (
                <th key={idx} className="border border-dotted border-yellow-400 px-2 py-1">
                  <div className="flex items-center justify-center gap-1">
                    {col.icon} {col.label}
                  </div>
                </th>
              ))}
            </tr>

            {/* Search Row */}
            <tr className="bg-[#fffaf2]">
              {Object.keys(searchTerms).map((field, idx) => (
                <th key={idx} className="px-2 py-1 border border-dotted border-yellow-400">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerms[field]}
                    onChange={(e) => handleSearchChange(e, field)}
                    className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-sm"
                  />
                </th>
              ))}
              <th className="border border-dotted border-yellow-400"></th>
            </tr>
          </thead>

          <tbody>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <tr
                  key={index}
                  className="hover:bg-yellow-50 transition-colors"
                >
                  <td className="border border-dotted border-yellow-400 px-2 py-1">{event.id}</td>
                  <td className="border border-dotted border-yellow-400 px-2 py-1">{event.manager.company_name}</td>
                  <td className="border border-dotted border-yellow-400 px-2 py-1">{event.manager.company_location}</td>
                  <td className="border border-dotted border-yellow-400 px-2 py-1">{event.category}</td>
                  <td className="border border-dotted border-yellow-400 px-2 py-1 font-medium">{event.title}</td>
                  <td className="border border-dotted border-yellow-400 px-2 py-1">{event.description}</td>
                  <td className="border border-dotted border-yellow-400 px-2 py-1">{event.capacity}</td>
                  <td className="border border-dotted border-yellow-400 px-2 py-1">₹{event.cost}</td>
                  <td className="border border-dotted border-yellow-400 px-2 py-1 flex justify-center gap-2">
                    <button
                      onClick={() => handleBookClick(event.id)}
                      className="w-20 py-1 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
                    >
                      Book
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="w-20 py-1 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-8 text-gray-500 font-medium">
                  No matching events found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
