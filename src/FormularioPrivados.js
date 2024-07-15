import React, { useState } from 'react'
import './Formulario.css';

export const FormularioPrivados = (props) => {

const [pass, setPass]= useState('');
const [correo, setCorreo]= useState('');

let actionPass=(e)=>{
setPass(e.target.value);
props.recibePass(e.target.value);
}
let actionCorreo =(e)=>{
setCorreo(e.target.value);
props.recibeCorreo(e.target.value);
}

  return (
    <div className='design_box'>
        
        <input onChange={actionCorreo} value={correo}
         placeholder='Correo Electronico' className='input' type='text'/>
        <input  onChange={actionPass}  value={pass}
        placeholder='Contraseña' className='input' type='password'/>
        

    </div>
  )
}
