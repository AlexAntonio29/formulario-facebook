const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDBB');
});

// Definir un esquema y modelo de MongoDB
const userSchema = new mongoose.Schema({
  usuario: String,
  nombre: String,
  apellidoPaterno: String,
  apellidoMaterno: String,
  estado: String,
  ciudad: String,
  codigoPostal: String,
  colonia: String,
  domicilio: String,
  numeroExterior: String,
  correo: String,
  pass: String,

});

const User = mongoose.model('User', userSchema);

// Ruta para guardar la primera parte de los datos
app.post('/save-step1', async (req, res) => {
  const { usuario } = req.body;

  const newUser = new User({ usuario });
  try {
    const savedUser = await newUser.save();
    res.status(200).send({ message: 'Step 1 data saved successfully', userId: savedUser._id });
  } catch (error) {
    res.status(500).send('Error saving step 1 data');
  }
});

// Ruta para actualizar la segunda parte
app.post('/save-step2/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, apellidoPaterno, apellidoMaterno } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send('User not found');
    }

    user.nombre = nombre;
    user.apellidoPaterno = apellidoPaterno;
    user.apellidoMaterno = apellidoMaterno;

    await user.save();
    res.status(200).send('Step 2 data saved successfully');
  } catch (error) {
    res.status(500).send('Error saving step 2 data');
  }
});

// Ruta para actualizar la tercera parte
app.post('/save-step3/:id', async (req, res) => {
  const { id } = req.params;
  const { estado, ciudad, cp, colonia, domicilio, numExterior } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send('User not found');
    }

    user.estado = estado;
    user.ciudad = ciudad;
    user.codigoPostal = cp;
    user.colonia = colonia;
    user.domicilio = domicilio;
    user.numeroExterior = numExterior;

    await user.save();
    res.status(200).send('Step 3 data saved successfully');
  } catch (error) {
    res.status(500).send('Error saving step 3 data');
  }
});

// Ruta para actualizar la cuarta parte
app.post('/save-step4/:id', async (req, res) => {
  const { id } = req.params;
  const { correo, pass } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send('User not found');
    }

    user.correo = correo;
    user.pass = pass;


    

    await user.save();
    res.status(200).send('Step 4 data saved successfully');
  } catch (error) {
    res.status(500).send('Error saving step 4 data');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
