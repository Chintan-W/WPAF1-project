import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, LoadScript, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';
import { InputGroup, FormControl, Button, Card } from 'react-bootstrap';

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [restaurantData, setRestaurantData] = useState(null);

  const handleSearch = async () => {
    console.log('Searching for restaurant:', searchTerm);

    // Fetch the restaurant data based on the search term (restaurant_id)
    try {
      const response = await axios.get(`https://wpaf-1-project.vercel.app/api/restaurants/${searchTerm}`);
      const { address, name, cuisine } = response.data;

      console.log('API Response:', response.data); // Log the entire response

      if (!address || !address.coord || !Array.isArray(address.coord) || address.coord.length !== 2 || isNaN(address.coord[0]) || isNaN(address.coord[1])) {
        console.error('Invalid coordinates:', address.coord);
        return;
      }

      const [lng, lat] = address.coord.map(coord => Number(coord)); // Convert coordinates to numbers

      // Set the marker directly using the Marker component
      setMarker({ lat, lng });
      setRestaurantData({ name, cuisine, address });
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
    }
  };

  // Close the InfoWindow when the map is clicked
  const handleMapClick = () => {
    setRestaurantData(null);
  };

  return (
    <div>
      <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: '1' }}>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline-secondary" onClick={handleSearch}>
            Search
          </Button>
        </InputGroup>
      </div>
      <LoadScript googleMapsApiKey="AIzaSyBuTbPpEos_ED0QbVIU3EC8dx4NexwCGUU">
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: 'calc(100vh - 60px)', position: 'absolute', top: '60px' }}
          center={{ lat: 40.7925587, lng: -73.96805719999999 }}
          zoom={14}
          onLoad={(map) => setMap(map)}
          onClick={handleMapClick}
        >
          {marker && <Marker position={marker} />}
          {restaurantData && (
            <InfoWindow position={marker} onCloseClick={() => setRestaurantData(null)}>
              <Card style={{ width: '200px' }}>
                <Card.Body>
                  <Card.Title>{restaurantData.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{restaurantData.cuisine}</Card.Subtitle>
                  <Card.Text>{restaurantData.address.building} {restaurantData.address.street}, {restaurantData.address.zipcode}</Card.Text>
                </Card.Body>
              </Card>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapComponent;
