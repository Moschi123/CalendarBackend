const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors')
require('dotenv').config();
//Crear el servidor de express

const app = express();

//Base de Datos
dbConnection();

//CORS
app.use(cors());

//directorio publico
app.use( express.static('public'));
//use es un midelware una petcion que se ejecuta cuando el cliente pasapor algun lugar

//Lectura y parseo
app.use( express.json());

//Rutas

app.use('/api/auth',require('./routes/auth'));
app.use('/api/events',require('./routes/events'));

//TODO: CRUD Eventos

//escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
  });