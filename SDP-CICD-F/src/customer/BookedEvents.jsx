import { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";

export default function BookedEvents() {
  const [bookedEvents, setBookedEvents] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookedEvents = async () => {
      const storedCustomer = sessionStorage.getItem("customer");
      if (storedCustomer) {
        const customerData = JSON.parse(storedCustomer);
        setCustomer(customerData);
        try {
          const response = await axios.get(
            `${config.url}/customer/bookedevents/${customerData.id}`
          );
          setBookedEvents(response.data);
          setError("");
        } catch (err) {
          console.error(err);
          setError("Failed to fetch booked events");
        }
      } else {
        setError("Please log in to view your booked events.");
      }
    };

    fetchBookedEvents();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-[#DBE4C9]">
      <h3 className="text-center text-2xl font-semibold underline mb-6">
        Your Booked Events
      </h3>

      {error && <p className="text-center text-red-600 font-bold mb-4">{error}</p>}

      {customer && bookedEvents.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-dotted border-yellow-400 text-center">
            <thead className="bg-yellow-400">
              <tr>
                {[
                  "Booking ID",
                  "Event Category",
                  "Event Title",
                  "Start Date",
                  "End Date",
                  "Booked Capacity",
                  "Status",
                  "Booking Time",
                ].map((col, idx) => (
                  <th
                    key={idx}
                    className="border border-dotted border-yellow-400 px-2 py-1"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookedEvents.map((event, index) => (
                <tr
                  key={index}
                  className="hover:bg-yellow-50 transition-colors"
                >
                  <td className="border border-dotted border-yellow-400 px-2 py-1">
                    {event.id}
                  </td>
                  <td className="border border-dotted border-yellow-400 px-2 py-1">
                    {event.event.category}
                  </td>
                  <td className="border border-dotted border-yellow-400 px-2 py-1 font-medium">
                    {event.event.title}
                  </td>
                  <td className="border border-dotted border-yellow-400 px-2 py-1">
                    {event.startdate}
                  </td>
                  <td className="border border-dotted border-yellow-400 px-2 py-1">
                    {event.enddate}
                  </td>
                  <td className="border border-dotted border-yellow-400 px-2 py-1">
                    {event.bookedcapacity}
                  </td>
                  <td
                    className={`border border-dotted border-yellow-400 px-2 py-1 font-bold ${
                      event.status === "ACCEPTED"
                        ? "text-green-600"
                        : event.status === "REJECTED"
                        ? "text-red-600"
                        : ""
                    }`}
                  >
                    {event.status}
                  </td>
                  <td className="border border-dotted border-yellow-400 px-2 py-1">
                    {new Date(event.bookingtime).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">No booked events found.</p>
      )}
      <div className="h-32" /> {/* Space at bottom */}
    </div>
  );
}
