import React, { useState } from 'react';
import axios from 'axios';

function Step1({ onNext, setUserId }) {
  const [usuario, setUsuario] = useState('');

  const handleInputChange = (e) => {
    setUsuario(e.target.value);
  };

  const handleSubmit = async () => {
    const formData = { usuario };

    try {
      const response = await axios.post('http://localhost:5000/save-step1', formData);
      setUserId(response.data.userId); // Save the user ID for the next step
      onNext();
    } catch (error) {
      alert('Error saving step 1 data');
    }
  };

  return (
    <div>
      <input type="text" value={usuario} onChange={handleInputChange} placeholder="Usuario" />
      <button onClick={handleSubmit}>Next</button>
    </div>
  );
}

function Step2({ userId, onNext }) {
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleSubmit = async () => {
    const formData = { nombre, apellidoPaterno, apellidoMaterno };

    try {
      await axios.post(`http://localhost:5000/save-step2/${userId}`, formData);
      onNext();
    } catch (error) {
      alert('Error saving step 2 data');
    }
  };

  return (
    <div>
      <input type="text" value={nombre} onChange={handleInputChange(setNombre)} placeholder="Nombre" />
      <input type="text" value={apellidoPaterno} onChange={handleInputChange(setApellidoPaterno)} placeholder="Apellido Paterno" />
      <input type="text" value={apellidoMaterno} onChange={handleInputChange(setApellidoMaterno)} placeholder="Apellido Materno" />
      <button onClick={handleSubmit}>Next</button>
    </div>
  );
}

function Step3({ userId, onNext }) {
  const [estado, setEstado] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');
  const [colonia, setColonia] = useState('');
  const [domicilio, setDomicilio] = useState('');
  const [numeroExterior, setNumeroExterior] = useState('');

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleSubmit = async () => {
    const formData = { estado, ciudad, codigoPostal, colonia, domicilio, numeroExterior };

    try {
      await axios.post(`http://localhost:5000/save-step3/${userId}`, formData);
      onNext();
    } catch (error) {
      alert('Error saving step 3 data');
    }
  };

  return (
    <div>
      <input type="text" value={estado} onChange={handleInputChange(setEstado)} placeholder="Estado" />
      <input type="text" value={ciudad} onChange={handleInputChange(setCiudad)} placeholder="Ciudad" />
      <input type="text" value={codigoPostal} onChange={handleInputChange(setCodigoPostal)} placeholder="Código Postal" />
      <input type="text" value={colonia} onChange={handleInputChange(setColonia)} placeholder="Colonia" />
      <input type="text" value={domicilio} onChange={handleInputChange(setDomicilio)} placeholder="Domicilio" />
      <input type="text" value={numeroExterior} onChange={handleInputChange(setNumeroExterior)} placeholder="Número Exterior" />
      <button onClick={handleSubmit}>Next</button>
    </div>
  );
}

function Step4({ userId }) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleSubmit = async () => {
    const formData = { correo, contrasena };

    try {
      await axios.post(`http://localhost:5000/save-step4/${userId}`, formData);
      alert('All data saved successfully');
    } catch (error) {
      alert('Error saving step 4 data');
    }
  };

  return (
    <div>
      <input type="email" value={correo} onChange={handleInputChange(setCorreo)} placeholder="Correo" />
      <input type="password" value={contrasena} onChange={handleInputChange(setContrasena)} placeholder="Contraseña" />
      <button onClick={handleSubmit}>Save Data</button>
    </div>
  );
}

function App() {
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState(null);

  const handleNext = () => {
    setStep(step + 1);
  };
}