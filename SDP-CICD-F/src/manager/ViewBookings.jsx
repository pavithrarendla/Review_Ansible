import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

export default function ViewBookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const [managerId, setManagerId] = useState(null);

  useEffect(() => {
    const storedManager = sessionStorage.getItem('manager');
    if (storedManager) {
      const manager = JSON.parse(storedManager);
      setManagerId(manager.id);
      fetchBookings(manager.id);
    } else {
      setError('Manager not logged in.');
    }
  }, []);

  const fetchBookings = async (managerId) => {
    try {
      const response = await axios.get(`${config.url}/manager/viewbookingsbymanager/${managerId}`);
      setBookings(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch bookings');
      setBookings([]);
    }
  };

  const updateStatus = async (bookingId, status) => {
    try {
      const response = await axios.get(`${config.url}/manager/updatebookingstatus`, {
        params: { id: bookingId, status: status }
      });
      alert(response.data);
      fetchBookings(managerId);
    } catch (err) {
      alert('Failed to update booking status');
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h3 className="text-center text-2xl font-semibold underline mb-6">Bookings for My Events</h3>

      {error && <p className="text-center text-red-600 font-bold mb-4">{error}</p>}

      {bookings.length === 0 ? (
        <p className="text-center text-gray-600">No bookings available for your events.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-dotted border-yellow-400 text-center">
            <thead className="bg-yellow-400">
              <tr>
                <th className="border border-dotted border-yellow-400 px-2 py-1">Booking ID</th>
                <th className="border border-dotted border-yellow-400 px-2 py-1">Event ID</th>
                <th className="border border-dotted border-yellow-400 px-2 py-1">Event Title</th>
                <th className="border border-dotted border-yellow-400 px-2 py-1">Customer Name</th>
                <th className="border border-dotted border-yellow-400 px-2 py-1">Customer Email</th>
                <th className="border border-dotted border-yellow-400 px-2 py-1">Start Date</th>
                <th className="border border-dotted border-yellow-400 px-2 py-1">End Date</th>
                <th className="border border-dotted border-yellow-400 px-2 py-1">Booked Capacity</th>
                <th className="border border-dotted border-yellow-400 px-2 py-1">Status</th>
                <th className="border border-dotted border-yellow-400 px-2 py-1">Booking Time</th>
                <th className="border border-dotted border-yellow-400 px-2 py-1">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index} className="hover:bg-yellow-50">
                  <td className="border border-dotted border-yellow-400 px-2 py-1">{booking.id}</td>
                  <td className="border border-dotted border-yellow-400 px-2 py-1">{booking.event.id}</td>
                  <td className="border border-dotted border-yellow-400 px-2 py-1">{booking.event.title}</td>
                  <td className="border border-dotted border-yellow-400 px-2 py-1">{booking.customer.name}</td>
                  <td className="border border-dotted border-yellow-400 px-2 py-1">{booking.customer.email}</td>
                  <td className="border border-dotted border-yellow-400 px-2 py-1">{booking.startdate}</td>
                  <td className="border border-dotted border-yellow-400 px-2 py-1">{booking.enddate}</td>
                  <td className="border border-dotted border-yellow-400 px-2 py-1">{booking.bookedcapacity}</td>
                  <td className={`border border-dotted border-yellow-400 px-2 py-1 font-bold ${booking.status === 'ACCEPTED' ? 'text-green-600' : booking.status === 'REJECTED' ? 'text-red-600' : ''}`}>
                    {booking.status}
                  </td>
                  <td className="border border-dotted border-yellow-400 px-2 py-1">{new Date(booking.bookingtime).toLocaleString()}</td>
                  <td className="border border-dotted border-yellow-400 px-2 py-1 flex justify-center gap-2">
                    <button
                      onClick={() => updateStatus(booking.id, 'ACCEPTED')}
                      className="w-20 py-1 bg-green-500 mb-2 text-white font-semibold rounded-lg hover:bg-green-600 transition"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => updateStatus(booking.id, 'REJECTED')}
                      className="w-20 py-1 bg-red-500 mb-2 text-white font-semibold rounded-lg hover:bg-red-600 transition"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
