const mongoose = require('mongoose');
require('dotenv').config(); // Esta línea carga las variables de entorno desde el archivo .env

//Aqui se obtiene la URI del archivo .env
const URI = process.env.MONGO_URI;

//Se conecta a la base de datos
mongoose.connect(URI);

const connection = mongoose.connection;

//En caso de que la conexion sea correcta se indica con un mensaje
connection.once('open', () => {
    console.log('Base de datos conectada')
});
