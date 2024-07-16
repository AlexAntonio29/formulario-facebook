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
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://alex2910:xAkeamOOKTu6H3H8@databaseformalryfaceboo.yrr1tgy.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000 // Aumenta el tiempo de espera a 30 segundos
});

const db = mongoose.connection;
db.on('error', err => {
  console.error('Error de conexión a MongoDB:', err);
});
db.once('open', () => {
  console.log('Conectado a MongoDB');
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

// Rutas para guardar datos
app.post('/save-step1', async (req, res) => {
  const { usuario } = req.body;
  console.log("ESTOY DENTRO DE USUARIO PARA GUARDAR");
  const newUser = new User({ usuario });
  try {
    const savedUser = await newUser.save();
    res.status(200).send({ message: 'Step 1 data saved successfully', userId: savedUser._id });
  } catch (error) {
    console.error('Error al guardar los datos del paso 1:', error);
    res.status(500).send('Error saving step 1 data');
  }
});

// Rutas para actualizar datos
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
    console.error('Error al guardar los datos del paso 2:', error);
    res.status(500).send('Error saving step 2 data');
  }
});

// Similar para save-step3 y save-step4...

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
