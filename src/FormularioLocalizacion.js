import React, { useState } from 'react'
import "./Formulario.css"






export const FormularioLocalizacion = (props) => {

  const [estado, setEstado]=useState('');
  const [ciudad, setCiudad] = useState('');
  const [cp, setCp]= useState('');
  const [colonia, setColonia]= useState('');
  const [domicilio, setDomicilio]= useState('');
  const [numExterior, setNumExterior]= useState('');




    const estados = [
        'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas',
        'Chihuahua', 'Coahuila', 'Colima', 'Durango', 'Guanajuato', 'Guerrero', 'Hidalgo',
        'Jalisco', 'México', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca',
        'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora',
        'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
      ];

let actionEstado=(e)=>{
  setEstado(e.target.value);
  props.recibeEstado(e.target.value);
}

let actionCiudad =(e)=>{
  setCiudad(e.target.value);
  props.recibeCiudad(e.target.value);
}

let actionCp =(e)=>{
  setCp(e.target.value);
  props.recibeCP(e.target.value)
}

let actionColonia=(e)=>{
  setColonia(e.target.value);
  props.recibeColonia(e.target.value);
}
let actionDomicilio=(e)=>{
setDomicilio(e.target.value);
props.recibeDomicilio(e.target.value);

}

let actionNumeroExterior=(e)=>{
  setNumExterior(e.target.value);
  props.recibeNum(e.target.value);
}

  return (
    <div className='design_box'>

<select onChange={actionEstado} placeholder='Estado' className='input' value={estado}>
    <option value='' disabled>Estado</option>
    {estados.map((estado, index) => (
          <option key={index} value={estado}>{estado}</option>
        ))}
    
</select>



<input placeholder='Ciudad' className='input' type='text' onChange={ actionCiudad} value={ciudad}/>
<input 
onChange={actionCp} value={cp}
placeholder='Codigo Postal' className='input' type='text'/>
<input  onChange={actionColonia} value={colonia}
placeholder='Colonia' className='input' type='text'/>
<input onChange={actionDomicilio} value={domicilio}
placeholder='Domicilio' className='input' type='text'/>
<input onChange={actionNumeroExterior} value={numExterior}
placeholder='Numero Exterior' className='input' type='text'/>






    </div>
  )
}
