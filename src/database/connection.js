const mongoose = require("mongoose");

const connection = async ()=> {

    try{
        await mongoose.connect("mongodb://localhost:27017/formulario-facebook");
        console.log("Conectado correctamente con el backend")
    }
    catch(e){
        console.log(e);
        throw new Error("No se pudo conectar a la base de datos")
    }
}
module.exports= connection
 