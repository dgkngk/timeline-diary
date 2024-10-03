const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); 
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Connect to MongoDB
mongoose.connect('mongodb+srv://Cluster68459:b1RyZk5SeVdi@cluster68459.p3ymj.mongodb.net', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Create a Mongoose Schema for diary entries
const diaryEntrySchema = new mongoose.Schema({
  title: String,
  writer: String,
  date: String,
  text: String,
  image: String
});

const DiaryEntry = mongoose.model('DiaryEntry', diaryEntrySchema);

// GET: Fetch all diary entries
app.get('/api/diary', async (req, res) => {
  try {
    const entries = await DiaryEntry.find();
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch diary entries' });
  }
});

// POST: Create a new diary entry
app.post('/api/diary', async (req, res) => {
  const newEntry = new DiaryEntry(req.body);
  try {
    await newEntry.save();
    console.log("saved");
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create new diary entry' });
  }
});

// PUT: Update a diary entry
app.put('/api/diary/:id', async (req, res) => {
  try {
    const updatedEntry = await DiaryEntry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEntry);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update diary entry' });
  }
});

// DELETE: Delete a diary entry
app.delete('/api/diary/:id', async (req, res) => {
  try {
    await DiaryEntry.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete diary entry' });
  }
});

// Start the server
app.listen(5001, () => console.log('Server running on port 5001'));
