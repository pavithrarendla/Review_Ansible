import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config';

export default function ViewAllEvents() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const [searchTerms, setSearchTerms] = useState({
    id: '',
    manager: '',
    company: '',
    category: '',
    title: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const fetchAllEvents = async () => {
    try {
      const response = await axios.get(`${config.url}/customer/viewallevents`);
      setEvents(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch events');
      setEvents([]);
    }
  };

  const handleBookClick = (eventId) => {
    const customer = JSON.parse(sessionStorage.getItem('customer'));
    if (!customer || !customer.id) {
      alert('Only customers can book events');
      return;
    }
    navigate(`/bookevent?eventid=${eventId}`);
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await axios.delete(`${config.url}/manager/deleteevent/${eventId}`);
      fetchAllEvents();
    } catch (err) {
      console.error(err);
      alert('Failed to delete event');
    }
  };

  const handleSearchChange = (e, field) => {
    setSearchTerms(prev => ({ ...prev, [field]: e.target.value }));
  };

  const filteredEvents = events.filter(event =>
    event.id.toString().includes(searchTerms.id) &&
    event.manager.name.toLowerCase().includes(searchTerms.manager.toLowerCase()) &&
    event.manager.company_name.toLowerCase().includes(searchTerms.company.toLowerCase()) &&
    event.category.toLowerCase().includes(searchTerms.category.toLowerCase()) &&
    event.title.toLowerCase().includes(searchTerms.title.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h3 className="text-center text-2xl font-semibold underline mb-6">Available Events</h3>

      {error && <p className="text-center text-red-600 font-bold mb-4">{error}</p>}

      {/* Search Inputs */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {Object.keys(searchTerms).map(field => (
          <input
            key={field}
            type="text"
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={searchTerms[field]}
            onChange={e => handleSearchChange(e, field)}
            className="border border-dotted border-yellow-400 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
          />
        ))}
      </div>

      {/* Events Table */}
      {filteredEvents.length === 0 ? (
        <p className="text-center text-gray-600">No matching events found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-dotted border-yellow-400 text-center">
            <thead className="bg-yellow-400 font-semibold">
              <tr>
                <th className="border border-dotted border-yellow-400 px-2 py-1">Event ID</th>
                <th className="border border-dotted border-yellow-400 px-2 py-1">Company Name</th>
                <th className="border border-dotted border-yellow-400 px-2 py-1">Location</th>
                <th className="border border-dotted border-yellow-400 px-2 py-1">Category</th>
                <th className="border border-dotted border-yellow-400 px-2 py-1">Title</th>
                <th className="border border-dotted border-yellow-400 px-2 py-1">Capacity</th>
                <th className="border border-dotted border-yellow-400 px-2 py-1">Cost</th>
                <th className="border border-dotted border-yellow-400 px-2 py-1">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event, index) => (
                <tr key={index} className="hover:bg-yellow-50">
                  <td className="border border-dotted border-yellow-400 px-2 py-1">{event.id}</td>
                  <td className="border border-dotted border-yellow-400 px-2 py-1">{event.manager.company_name}</td>
                  <td className="border border-dotted border-yellow-400 px-2 py-1">{event.manager.company_location}</td>
                  <td className="border border-dotted border-yellow-400 px-2 py-1">{event.category}</td>
                  <td className="border border-dotted border-yellow-400 px-2 py-1">{event.title}</td>
                  <td className="border border-dotted border-yellow-400 px-2 py-1">{event.capacity}</td>
                  <td className="border border-dotted border-yellow-400 px-2 py-1">{event.cost}</td>
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
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
