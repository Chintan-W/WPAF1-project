import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const restaurantsPerPage = 10;

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/restaurants');
        const sortedRestaurants = response.data.sort((a, b) => a.restaurant_id - b.restaurant_id);
        setRestaurants(sortedRestaurants);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchRestaurants();
  }, []);

  // Logic to paginate restaurants
  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants = restaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);

  
return (
  <div className="container mt-5">
    <h1 className="mb-4">Restaurant List</h1>
    <ul className="list-group">
      {currentRestaurants.map((restaurant) => (
        <li key={restaurant._id} className="list-group-item">
          <strong>{restaurant.name}</strong>
          <p>Restaurant ID: {restaurant.restaurant_id}</p>
          <p>Address: {`${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`}</p>
          <p>Borough: {restaurant.borough}</p>
        </li>
      ))}
    </ul>

    {/* Pagination */}
    <nav className="mt-4">
      <ul className="pagination">
        {Array(Math.ceil(restaurants.length / restaurantsPerPage))
          .fill()
          .map((_, index) => (
            <li
              key={index}
              className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
      </ul>
    </nav>
  </div>
);;
};

export default RestaurantList;
