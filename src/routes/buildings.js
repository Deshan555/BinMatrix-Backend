const express = require('express');
const Building = require('../models/Building');
const router = express.Router();

// Create a new building
router.post('/new', async (req, res) => {
  try {
    const building = new Building(req.body);
    await building.save();
    res.status(201).json(building);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read all buildings
router.get('/all', async (req, res) => {
  try {
    const buildings = await Building.find();
    res.status(200).json(buildings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read a building by ID
router.get('/:id', async (req, res) => {
  try {
    const building = await Building.findById(req.params.id);
    if (!building) return res.status(404).json({ message: 'Building not found' });
    res.status(200).json(building);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a building by ID
router.put('/:id', async (req, res) => {
  try {
    const building = await Building.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!building) return res.status(404).json({ message: 'Building not found' });
    res.status(200).json(building);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a building by ID
router.delete('/:id', async (req, res) => {
  try {
    const building = await Building.findByIdAndDelete(req.params.id);
    if (!building) return res.status(404).json({ message: 'Building not found' });
    res.status(200).json({ message: 'Building deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
