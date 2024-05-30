const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5100;

app.use(cors());
app.use(express.json());

// Verbinden mit MongoDB
//mongoose.connect('mongodb://localhost:27017/mydatabase', {
    //127.0.0.1
mongoose.connect('mongodb://localhost:27017/testdb', {});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Beispiel-Schema und Modell
const itemSchema = new mongoose.Schema({
  number: Number,
  animal: String,
});

const Item = mongoose.model('Card', itemSchema);

// API-Endpunkt zum Abrufen aller Einträge
app.get('/cards', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Server starten
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
