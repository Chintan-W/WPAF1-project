import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RestaurantForm = () => {
  const [name, setName] = useState('');
  const [cuisine, setCuisine] = useState('');

  const handleCreateRestaurant = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/restaurants', {
        name,
        cuisine,
      });
      console.log('New restaurant created:', response.data);
      // Optionally, you can update the state or perform other actions after creating the restaurant
    } catch (error) {
      console.error('Error creating restaurant:', error);
    }
  };

  return (
    <div>
      <h2>Create New Restaurant</h2>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Cuisine:
        <input type="text" value={cuisine} onChange={(e) => setCuisine(e.target.value)} />
      </label>
      <br />
      <button onClick={handleCreateRestaurant}>Create Restaurant</button>
      <br />
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default RestaurantForm;
