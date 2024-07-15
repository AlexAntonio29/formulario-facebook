// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Definir un esquema y modelo de MongoDB
const dataSchema = new mongoose.Schema({
  message: String
});

const Data = mongoose.model('Data', dataSchema);

// Ruta para guardar datos
app.post('/save', async (req, res) => {
  const { message } = req.body;
  const newData = new Data({ message });
  try {
    await newData.save();
    res.status(200).send('Data saved successfully');
  } catch (error) {
    res.status(500).send('Error saving data');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
