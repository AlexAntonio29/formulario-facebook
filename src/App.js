

/**/
import logo from './logo2.svg';

//conectar a bd







import './App.css';
import { FormularioUsuario } from './FormularioUsuario.js';
import { FormularioDatosPersonales } from './FormularioDatosPersonales.js';
import { FormularioLocalizacion } from './FormularioLocalizacion.js';
import { FormularioPrivados } from './FormularioPrivados.js';
import { FormularioFinal } from './FormularioFinal.js';
import React, { useState } from 'react'
import './Formulario.css';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';




function App() {




  const [isVisibleUsuario, setIsVisibleUsuario] = useState(true);
  const [isVisiblePersonales, setIsVisiblePersonales] = useState(false);
  const [isVisibleLocalizacion, setIsVisibleLoc] = useState(false);
  const [isVisiblePrivados, setIsVisisblePrivados] =useState (false);
  const [isVisibleFinal, setIsVisibleFinal]= useState(false);



  const[usuario,setUsuario]=useState('');
 
//user usuarios

const [userId, setUserId] = useState(null);


  let actionVisibilityUsuario=(e)=>{

    if(usuario===''){
      alert("No puedes dejar el apartado vacío")
    }else{

    handleSubmit();
   
    setIsVisibleUsuario(!isVisibleUsuario);
    setIsVisiblePersonales(true);



  }
}


const handleSubmit = async () => {
  const formData = { usuario };

  try {
    const response = await axios.post('http://localhost:5000/save-step1', formData);
    setUserId(response.data.userId); // Save the user ID for the next step
   
  } catch (error) {
    
  }
};


const handleSubmitStep2 = async () => {
  const formData = { nombre, apellidoPaterno, apellidoMaterno };

  try {
    await axios.post(`http://localhost:5000/save-step2/${userId}`, formData);
   
  } catch (error) {

  }
};


  let actionVisibilityPersonales=()=>{

  if(nombre===''||apellidoPaterno===''||apellidoMaterno===''){
    alert("No puedes dejar el apartado vacio");
  }else{
    handleSubmitStep2();

    setIsVisiblePersonales(!isVisiblePersonales);
    setIsVisibleLoc(true);}
  }



  //Step 3

  const handleSubmitStep3 = async () => {
    const formData = { estado, ciudad, cp, colonia, domicilio, numExterior };

    try {
      await axios.post(`http://localhost:5000/save-step3/${userId}`, formData);
     
     
    } catch (error) {
     
    }
  };

  let actionVisiblityLoc=(e)=>{
  if(estado===''||ciudad===''||cp===''||colonia===''||domicilio===''||numExterior===""){
    
    alert("No puedes dejar el apartado vacio");

  }else{  
    
    handleSubmitStep3();
    setIsVisibleLoc(!isVisibleLocalizacion);
    setIsVisisblePrivados(true);}
  }



  const handleSubmitStep4 = async () => {
    const formData = { correo, pass };

    try {

      
      await axios.post(`http://localhost:5000/save-step4/${userId}`, formData);
      alert('All data saved successfully');
    } catch (error) {
      alert('Error saving step 4 data');
    }
  };

  let actionVisiblityPriv=(e)=>{

    if(pass===''||correo===''){
      alert("No puedes dejar el apartado vacio");
    }
    else{

      handleSubmitStep4();

    
      setIsVisisblePrivados(!isVisiblePrivados);
      setIsVisibleFinal(true);
    }

 

  }

  let actionVisibilityFinal=(e)=>{

    alert("Final");
  }



  let functionReciveUser=(e)=>{

setUsuario(e);

console.log(e);

  }

//Datos Personales

const [nombre, setNombre]= useState('');
const [apellidoPaterno, setApellidoPaterno] = useState('');
const [apellidoMaterno, setApellidoMaterno] = useState ('');

  let functionNombre =(e)=> {
    setNombre(e);
    
    
  }

  let functionPaterno =(e)=>{
    setApellidoPaterno(e);
    console.log(e);
    console.log(apellidoPaterno);
  }

  let functionMaterno =(e)=>{
    setApellidoMaterno(e);
    console.log(e);
    console.log(apellidoMaterno);
  }
//DATOS LOCALIZACION


let [estado,setEstado]=useState('');
let [ciudad, setCiudad]= useState('');
let [cp, setCp] = useState('');
let [colonia, setColonia] = useState('');
let [domicilio, setDomicilio] = useState('');
let [numExterior, setNumExterior]= useState('');


  let functionEstado =(e)=>{

    setEstado(e)

  }

  let funtionCiudad =(e)=>{
setCiudad(e);
  }

  let functionCodigoPostal =(e)=>{
setCp(e);
  }

  let functionColonia =(e)=>{
  setColonia(e);
  }

  let functionDomicilio =(e)=>{
    setDomicilio(e);

  }

  let functionNumExterior =(e)=>{
      setNumExterior(e);
  }

//Datos Privados

const[pass,setPass]= useState('');
const[correo, setCorreo]= useState('');

let functionPass=(e)=>{
setPass(e);
}


let functionCorreo =(e)=>{
setCorreo(e);
}



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
    
      
        
          <h1> Facebook</h1>

        <div className='designFormulario'>
        <CSSTransition
        in={isVisibleUsuario}
        timeout={0}
        classNames="fade"
        unmountOnExit
      >
        
        <FormularioUsuario reciveUsuario={ functionReciveUser}/>
         
         </CSSTransition>
<CSSTransition
        in={isVisiblePersonales}
        timeout={0}
        classNames="fade"
        unmountOnExit
      >

        <FormularioDatosPersonales  
        recibeNombre={functionNombre} 
        recibeAppPaterno={functionPaterno} 
        recibeAppMaterno={functionMaterno}
        />
         
         </CSSTransition>

         <CSSTransition
        in={isVisibleLocalizacion}
        timeout={0}
        classNames="fade"
        unmountOnExit
      >

        <FormularioLocalizacion
        recibeEstado={functionEstado}
        recibeCiudad={funtionCiudad}
        recibeCP={functionCodigoPostal}
        recibeColonia={functionColonia}
        recibeDomicilio={functionDomicilio}
        recibeNum={functionNumExterior}

        />
         
         </CSSTransition>

         <CSSTransition
        in={isVisiblePrivados}
        timeout={0}
        classNames="fade"
        unmountOnExit
      >

        <FormularioPrivados
        recibePass={functionPass}
        recibeCorreo={functionCorreo}
        
        />
         
         </CSSTransition>

         <CSSTransition
        in={isVisibleFinal}
        timeout={0}
        classNames="fade"
        unmountOnExit
      >

        <FormularioFinal/>
         
         </CSSTransition>
         {isVisibleUsuario && <button  className='design_button' onClick={e=>actionVisibilityUsuario(true)}>Continuar</button> }
          {isVisiblePersonales && <button  className='design_button' onClick={e=>actionVisibilityPersonales(true)}>Continuar</button> }
          {isVisibleLocalizacion && <button  className='design_button' onClick={e=>actionVisiblityLoc(true)}>Continuar</button> }
          {isVisiblePrivados && <button  className='design_button' onClick={e=>actionVisiblityPriv(true)}>Continuar</button> }
          {isVisibleFinal && <button  className='design_button' onClick={e=>actionVisibilityFinal(true)}>Continuar</button> }

        </div>

      </header>
    </div>



  );
}

export default App;

