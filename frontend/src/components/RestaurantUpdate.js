import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const RestaurantUpdate = ({ onUpdate, onCancel }) => {
  const [restaurantId, setRestaurantId] = useState('');
  const [fetchedData, setFetchedData] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    name: '',
    borough: '',
    cuisine: '',
    address: {
      building: '',
      coord: [0, 0],
      street: '',
      zipcode: '',
    },
  });

  useEffect(() => {
    const fetchRestaurantById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/restaurants/${restaurantId}`);
        setFetchedData(response.data);
        setUpdatedData({
          name: response.data.name,
          borough: response.data.borough,
          cuisine: response.data.cuisine,
          address: {
            building: response.data.address.building,
            coord: response.data.address.coord,
            street: response.data.address.street,
            zipcode: response.data.address.zipcode,
          },
        });
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
        setFetchedData(null);
      }
    };

    if (restaurantId) {
      fetchRestaurantById();
    }
  }, [restaurantId]);

  const handleSearchChange = (e) => {
    setRestaurantId(e.target.value);
  };

  const handleDataChange = (field, value) => {
    setUpdatedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/restaurants/${restaurantId}`, {
        restaurant_id: restaurantId,
        ...updatedData,
      });
      onUpdate(restaurantId, updatedData);
    } catch (error) {
      console.error('Error updating restaurant:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Update Restaurant</h2>
      <div className="mb-3">
        <label className="form-label">Search Restaurant ID:</label>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={restaurantId}
            onChange={handleSearchChange}
            placeholder="Enter restaurant_id"
          />
          <button className="btn btn-primary" onClick={() => setRestaurantId(restaurantId)}>
            Search
          </button>
        </div>
      </div>
      
      {fetchedData ? (
        <div>
          <label className="form-label">Name:</label>
          <input type="text" className="form-control" name="name" value={updatedData.name} onChange={(e) => handleDataChange('name', e.target.value)} />
          
          <label className="form-label mt-3">Borough:</label>
          <input type="text" className="form-control" name="borough" value={updatedData.borough} onChange={(e) => handleDataChange('borough', e.target.value)} />
          
          <label className="form-label mt-3">Cuisine:</label>
          <input type="text" className="form-control" name="cuisine" value={updatedData.cuisine} onChange={(e) => handleDataChange('cuisine', e.target.value)} />
          
          <label className="form-label mt-3">Building:</label>
          <input
            type="text"
            className="form-control"
            name="building"
            value={updatedData.address.building}
            onChange={(e) => handleDataChange('address.building', e.target.value)}
          />
          
          <button className="btn btn-success mt-3" onClick={handleUpdate}>Update</button>
          <button className="btn btn-secondary mt-3" onClick={onCancel}>Cancel</button>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default RestaurantUpdate;
