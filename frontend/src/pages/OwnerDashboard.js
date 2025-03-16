import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OwnerDashboard = () => {
  const [businesses, setBusinesses] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const ownerId = localStorage.getItem('userId'); 

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/business/${ownerId}`);
        setBusinesses(response.data); 
      } catch (err) {
        setError('Error fetching businesses');
        console.error(err);
      }
    };

    if (ownerId) {
      fetchBusinesses(); 
    } else {
      setError('No owner ID found. Please log in.');
    }
  }, [ownerId]);

  const handleCreateBusinessProfile = () => {
    navigate(`/owner/${ownerId}/create-business`);
  };

  const handleEditBusiness = (businessId) => {
    navigate(`/owner/edit-business/${businessId}`);
  };

  const handleDeleteBusiness = async (businessId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this business profile?");
    if (!confirmDelete) return;
  
    try {
      await axios.delete(`http://localhost:5555/business/${businessId}`);
      setBusinesses(businesses.filter((business) => business._id !== businessId));
    } catch (err) {
      setError('Error deleting business');
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">Welcome to Your Dashboard</h1>
      <button
        onClick={handleCreateBusinessProfile}
        className="bg-blue-500 text-white py-2 px-4 rounded-md mb-6 hover:bg-blue-600"
      >
        Create New Business Profile
      </button>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <h2 className="text-2xl font-semibold mb-4">Your Business Profiles</h2>
      
      {businesses.length === 0 ? (
        <p>No businesses found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {businesses.map((business) => (
            <div
              key={business._id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-blue-500 mb-2">{business.name}</h3>
              <p className="text-gray-700 mb-2"><strong>Category:</strong> {business.category}</p>
              <p className="text-gray-700 mb-2"><strong>Description:</strong> {business.description || 'No Description'}</p>
              <p className="text-gray-700 mb-2"><strong>City:</strong> {business.city}</p>
              <p className="text-gray-700 mb-2"><strong>Address:</strong> {business.address}</p>
              <p className="text-gray-700 mb-2"><strong>Email:</strong> {business.email}</p>
              <p className="text-gray-700 mb-4"><strong>Phone:</strong> {business.phone}</p>

              <div className="flex justify-between">
                <button
                  onClick={() => handleEditBusiness(business._id)}
                  className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteBusiness(business._id)}
                  className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;
