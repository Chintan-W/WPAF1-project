import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const RestaurantDelete = ({ onDelete, onCancel }) => {
  const [restaurantId, setRestaurantId] = useState('');
  const [restaurantData, setRestaurantData] = useState(null);

  const handleSearch = async () => {
    try {
      // Send a GET request to fetch the restaurant data based on restaurant_id
      const response = await axios.get(`https://vercel.com/chintans-projects-018c01db/wpaf-1-project/${restaurantId}`);
      setRestaurantData(response.data);
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
      setRestaurantData(null);
    }
  };

  const handleDelete = async () => {
    try {
      // Send a DELETE request to delete the restaurant
      await axios.delete(`https://vercel.com/chintans-projects-018c01db/wpaf-1-project/${restaurantId}`);
      onDelete(restaurantId);
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    }
  };

  const clearData = () => {
    setRestaurantData(null);
    setRestaurantId('');
  };

  return (
    <div className="container mt-5">
      <h2>Delete Restaurant</h2>
      <div className="mb-3">
        <label className="form-label">Search Restaurant ID:</label>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={restaurantId}
            onChange={(e) => setRestaurantId(e.target.value)}
            placeholder="Enter restaurant_id"
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {restaurantData ? (
        <div>
          <p className="mb-2">Restaurant ID: {restaurantData.restaurant_id}</p>
          <p className="mb-2">Name: {restaurantData.name}</p>
          <p className="mb-2">Borough: {restaurantData.borough}</p>
          {/* Add more details based on your restaurant data structure */}
          
          <button className="btn btn-danger me-2" onClick={handleDelete}>
            Delete
          </button>
          <button className="btn btn-secondary" onClick={clearData}>
            Cancel
          </button>
        </div>
      ) : (
        <p className="mt-3">No restaurant found</p>
      )}
    </div>
  );
};

export default RestaurantDelete;
