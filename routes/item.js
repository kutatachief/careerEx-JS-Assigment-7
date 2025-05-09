const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// GET /api/items
router.get('/', async (req, res) => {
  res.json([{ name: "Example Item", quantity: 1 }]); // simple test response
});


// Add a found item
router.post('/', async (req, res) => {
  try {
    const item = new Item(req.body);
    const savedItem = await item.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// View all unclaimed items
router.get('/unclaimed', async (req, res) => {
  try {
    const items = await Item.find({ claimed: false });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// View one item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// Update item details or mark as claimed
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Delete old/irrelevant item
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
