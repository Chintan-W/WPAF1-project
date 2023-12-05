import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/restaurants');
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Restaurant List</h1>
      <ul className="list-group">
        {restaurants.map((restaurant) => (
          <li key={restaurant._id} className="list-group-item">
            {restaurant.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantList;
