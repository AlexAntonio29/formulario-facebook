import React, { useState } from 'react'
import './Formulario.css';



export const FormularioDatosPersonales = (props) => {


const [nombre, setNombre] = useState ('');
const [appPaterno, setAppPaterno] = useState('');
const [appMaterno, setAppMaterno] = useState('');

let actionInputNombre =(e)=>{

  setNombre(e.target.value);

  props.recibeNombre(e.target.value);
  

}

let actionInputPaterno = (e)=>{
  setAppPaterno(e.target.value);
  props.recibeAppPaterno(e.target.value);
}

let actionInputMaterno =(e)=>{
  setAppMaterno(e.target.value);
 props.recibeAppMaterno(e.target.value);
}





  return (

   


    <div className='design_box'>

<input placeholder='Nombre(s)' className='input' type='text' value = {nombre} onChange={actionInputNombre}/>
<input onChange={actionInputPaterno} value={appPaterno}
placeholder='Apellido Paterno' className='input' type='text'/>
<input onChange={actionInputMaterno}  value={appMaterno}
 placeholder='Apellido Materno' className='input' type='text'/>


        


    
  
    </div>
  )
}
