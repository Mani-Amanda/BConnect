import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BusinessProfileForm = () => {
  const [formData, setFormData] = useState({
    owner: "",
    name: "",
    category: "other",
    description: "",
    city: "",
    address: "",
    email: "",
    phone: ""
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const ownerId = localStorage.getItem("userId");
    if (ownerId) {
      setFormData((prev) => ({ ...prev, owner: ownerId }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5555/business/", formData);
      setMessage("Business created successfully!");
      console.log(response.data);
      setFormData({
        owner: "",
        name: "",
        category: "other",
        description: "",
        city: "",
        address: "",
        email: "",
        phone: ""
      });
    } catch (err) {
      console.error(err);
      setMessage("Error creating business. Check console.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-green-100 shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-green-800">Create Business</h2>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Business Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded bg-white text-green-700"
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-2 rounded bg-white text-green-700"
          required
        >
          <option value="resturant">Restaurant</option>
          <option value="salon">Salon</option>
          <option value="supermarket">Supermarket</option>
          <option value="healthcare">Healthcare</option>
          <option value="education">Education</option>
          <option value="other">Other</option>
        </select>
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded bg-white text-green-700"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded bg-white text-green-700"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded bg-white text-green-700"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded bg-white text-green-700"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded bg-white text-green-700"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BusinessProfileForm;
