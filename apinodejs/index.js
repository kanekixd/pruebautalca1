require('./config/conexion');

const cors = require('cors') 

const bodyParser= require('body-parser');

const express = require('express');


const port = (process.env.port || 3000);

const app = express();


app.use(bodyParser.json());

app

app.use(cors())
//permitir tipos de datos

app.use(express.json())


//config
app.set('port', port)

//rutas

app.use('/api',require('./rutas'))



//iniciar express

app.listen(app.get('port'),(error)=>{
    if(error){
        console.log('error al iniciar el server: '+ error)
    }else{
        console.log('servidor inciado en el puerto: '+port)
    }
});