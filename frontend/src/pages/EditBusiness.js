import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditBusiness = () => {
  const { businessId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    city: '',
    address: '',
    email: '',
    phone: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const categoryOptions = ['resturant', 'salon','supermarket','healthcare','education','other'];

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/business/${businessId}`);
        setFormData(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load business data');
        setLoading(false);
      }
    };

    fetchBusiness();
  }, [businessId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5555/business/${businessId}`, formData);
      alert('Business updated successfully!');
      navigate('/');
    } catch (err) {
      console.error('AxiosError', err);
      alert('Failed to update business');
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading business data...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-800">Edit Business</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-green-700 font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            className="w-full border border-green-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            
          />
        </div>

        <div>
          <label className="block text-green-700 font-medium mb-1">Category</label>
          <select
            name="category"
            value={formData.category || ''}
            onChange={handleChange}
            className="w-full border border-green-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="">-- Select Category --</option>
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-green-700 font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            className="w-full border border-green-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            
          />
        </div>

        <div>
          <label className="block text-green-700 font-medium mb-1">City</label>
          <input
            type="text"
            name="city"
            value={formData.city || ''}
            onChange={handleChange}
            className="w-full border border-green-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        
          />
        </div>

        <div>
          <label className="block text-green-700 font-medium mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address || ''}
            onChange={handleChange}
            className="w-full border border-green-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            
          />
        </div>

        <div>
          <label className="block text-green-700 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            className="w-full border border-green-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            
          />
        </div>

        <div>
          <label className="block text-green-700 font-medium mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone || ''}
            onChange={handleChange}
            className="w-full border border-green-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition duration-200"
        >
          Update Business
        </button>
      </form>
    </div>
  );
};

export default EditBusiness;
