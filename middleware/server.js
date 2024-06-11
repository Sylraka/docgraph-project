const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5100;


//-----------------------
//from old middleware, still needed?
//const db = require("./app/models");
// parse requests of content-type - application/x-www-form-urlencoded
//app.use(express.urlencoded({ extended: true }));

//-----------------------



app.use(cors());
app.use(express.json());

// Verbinden mit MongoDB
//mongoose.connect('mongodb://localhost:27017/mydatabase', {
    //127.0.0.1
mongoose.connect('mongodb://localhost:27017/graphProjectRuntime', {});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

//import and using the routing module
require("./app/routes/board.routes")(app);


// will run when server starts
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



// simple route. api-endpoint: will run when a get-request to ('/') comes in
//app.get("/", (req, res) => {
//  res.json({ message: "Welcome to my application." });
//});






// Beispiel-Schema und Modell
const itemSchema = new mongoose.Schema({
  number: Number,
  animal: String,
});


const Item = mongoose.model('Card', itemSchema);

// api-endpoint: will run when a get-request to ('/cards') comes in
app.get('/cards', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});






