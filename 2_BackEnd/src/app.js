//app.js
require('dotenv').config(); //Dependencia para cargar las variables del .env

const path = require('path'); //Dependencia para las rutas
const express = require('express'); //Dependencia de express
const cors = require('cors'); //Dependencia de Cors

const app = express();


//Ajustes
app.set('port', process.env.PORT || 4000); //Se asigna el puerto


//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '1_FrontEnd')));


//Rutas
app.use('/producto', require('./routes/producto')); //Referencia al Router

module.exports = app;