import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

export default function AddEvent() {
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    capacity: '',
    cost: ''
  });

  const [manager, setManager] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const storedManager = sessionStorage.getItem('manager');
    if (storedManager) setManager(JSON.parse(storedManager));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!manager) {
      setError('Manager not logged in. Please login first.');
      return;
    }

    try {
      const response = await axios.post(`${config.url}/manager/addevent`, {
        ...formData,
        manager_id: manager.id
      });
      if (response.status === 200) {
        setMessage(response.data);
        setError('');
        setFormData({ category: '', title: '', description: '', capacity: '', cost: '' });
      }
    } catch (err) {
      setMessage('');
      setError(err.response?.data || 'An unexpected error occurred.');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#DBE4C9] px-6 py-12">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Add New Event</h2>

        {message && <div className="text-green-700 font-semibold text-center mb-4">{message}</div>}
        {error && <div className="text-red-600 font-semibold text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Category</label>
              <input
                type="text"
                id="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f7b441]"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Title</label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f7b441]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-[#f7b441]"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Capacity</label>
              <input
                type="number"
                id="capacity"
                value={formData.capacity}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f7b441]"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Cost</label>
              <input
                type="number"
                step="0.01"
                id="cost"
                value={formData.cost}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f7b441]"
                required
              />
            </div>
          </div>

          <div className="text-center mt-4">
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-[#f7b441] hover:bg-yellow-500 font-semibold transition"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
