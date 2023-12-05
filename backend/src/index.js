import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import Restaurant from './models/restaurant.model.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

const MONGODB_URI = 'mongodb+srv://bchintan99:chintan@cluster0.lbtbsd2.mongodb.net/sample_restaurants';
app.use(cors());
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a new restaurant
app.post('/api/restaurants', async (req, res) => {
  try {
    const newRestaurant = await Restaurant.create(req.body);
    res.status(201).json(newRestaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all restaurants
app.get('/api/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a restaurant by ID
app.get('/api/restaurants/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ restaurant_id: req.params.id });
    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(404).json({ error: 'Restaurant not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a restaurant by ID
app.put('/api/restaurants/:restaurant_id', async (req, res) => {
  try {
    const { restaurant_id } = req.params;
    const { ...restOfData } = req.body;

    const isRestaurantIdUnique = await Restaurant.findOne({ restaurant_id, _id: { $ne: restaurant_id } });
    if (isRestaurantIdUnique) {
      return res.status(400).json({ error: 'restaurant_id must be unique' });
    }

    const updatedRestaurant = await Restaurant.findOneAndUpdate({ restaurant_id }, restOfData, { new: true });
    if (updatedRestaurant) {
      res.json(updatedRestaurant);
    } else {
      res.status(404).json({ error: 'Restaurant not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a restaurant by ID
app.delete('/api/restaurants/:restaurant_id', async (req, res) => {
  try {
    const deletedRestaurant = await Restaurant.findOneAndDelete({ restaurant_id: req.params.restaurant_id });
    if (deletedRestaurant) {
      res.json({ message: 'Restaurant deleted successfully' });
    } else {
      res.status(404).json({ error: 'Restaurant not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
