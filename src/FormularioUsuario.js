

import React, { useState } from 'react'
import './Formulario.css';






export const FormularioUsuario = ({reciveUsuario}) => {

  const [message, setMesagge]=useState('');


    let actionMessage=(e)=>{
      const newValue = e.target.value;
      setMesagge(newValue);
      
        reciveUsuario(newValue);

    }
 

  return (
   
    <div className='design_box'>


        <input  onChange={actionMessage} value={message} 
         placeholder='Introduzca su usuario...' className='input' type='text'/>
       
       
          
          
        

    </div>
   

    
  )
}
