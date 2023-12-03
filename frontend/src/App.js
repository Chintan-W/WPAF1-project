
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Change 'Switch' to 'Routes'
import Navbar from './components/Navbar.js';
import RestaurantList from './components/RestaurantList.js';
import RestaurantForm from './components/RestaurantForm.js';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Navbar />
          <Routes>  {/* Change 'Switch' to 'Routes' */}
            <Route path="/restaurants" element={<RestaurantList />} />
            <Route path="/create" element={<RestaurantForm />} />
            <Route path="/" element={<h1>Home</h1>} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
