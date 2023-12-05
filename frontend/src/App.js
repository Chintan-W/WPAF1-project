import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import RestaurantList from './components/RestaurantList.js';
import RestaurantForm from './components/RestaurantForm.js';
import RestaurantUpdate from './components/RestaurantUpdate.js';  // Import the Update component
import RestaurantDelete from './components/RestaurantDelete.js';  // Import the Delete component

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/restaurants" element={<RestaurantList />} />
          <Route path="/create" element={<RestaurantForm />} />
          <Route path="/update" element={<RestaurantUpdate />} />
          <Route path="/delete" element={<RestaurantDelete />} />
          <Route path="/" element={<h1>Home</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
