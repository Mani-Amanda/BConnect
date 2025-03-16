import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [businesses, setBusinesses] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [name, setName] = useState('');
  const [categories, setCategories] = useState(['resturant', 'salon', 'supermarket', 'healthcare', 'education', 'other']);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [error, setError] = useState('');

  // Pagination 
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await axios.get('http://localhost:5555/business');
        setBusinesses(response.data);
        setFilteredBusinesses(response.data);
        setTotalPages(Math.ceil(response.data.length / pageSize)); 
      } catch (err) {
        setError('Failed to fetch businesses');
        console.error(err);
      }
    };

    fetchBusinesses();
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    filterBusinesses(category, selectedCity, name);
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    filterBusinesses(selectedCategory, city, name);
  };

  const handleNameSearch = (e) => {
    const searchTerm = e.target.value;
    setName(searchTerm);
    filterBusinesses(selectedCategory, selectedCity, searchTerm);
  };

  const filterBusinesses = (category, city, searchTerm) => {
    let filtered = businesses;

    if (category) {
      filtered = filtered.filter((business) => business.category === category);
    }

    if (city) {
      filtered = filtered.filter((business) => business.city.toLowerCase().includes(city.toLowerCase()));
    }

    if (searchTerm) {
      filtered = filtered.filter((business) => business.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    setFilteredBusinesses(filtered);
    setTotalPages(Math.ceil(filtered.length / pageSize)); 
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const currentBusinesses = filteredBusinesses.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Dashboard - All Businesses</h1>

      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}

      {/* Search by Name */}
      <div className="mb-4">
        <label htmlFor="name" className="mr-2">Search by Business Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameSearch}
          placeholder="Search by business name"
          className="p-2 border rounded-md"
        />
      </div>

      {/* Search by Category */}
      <div className="mb-4">
        <label htmlFor="category" className="mr-2">Filter by Category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="p-2 border rounded-md"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Search by City */}
      <div className="mb-4">
        <label htmlFor="city" className="mr-2">Filter by Location (City):</label>
        <input
          type="text"
          id="city"
          value={selectedCity}
          onChange={handleCityChange}
          placeholder="Enter city name"
          className="p-2 border rounded-md"
        />
      </div>

      {/* Displaying the filtered businesses */}
      {currentBusinesses.length === 0 ? (
        <p>No businesses found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentBusinesses.map((business) => (
            <div
              key={business._id}
              className="border p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold">{business.name}</h2>
              <p className="text-gray-600">{business.category}</p>
              <p>{business.city}, {business.address}</p>
              <p>Email: {business.email}</p>
              <p>Phone: {business.phone}</p>
              <p className="text-sm text-gray-500 mt-2">{business.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
