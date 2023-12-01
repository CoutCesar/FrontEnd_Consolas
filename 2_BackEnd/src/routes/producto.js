//Rutas de producto producto.js
const { Router } = require('express');
const router = Router();

//Se obtienen los controlodores del archivo producto.controllers.js
const { getProductos, getProducto, createProducto, updateProducto, deleteProducto } = require('../controllers/producto.controller');

//Rutas para metodos que no requieren ID
router.route('/')
    .get(getProductos)      //Ruta para la consulta de todos los documentos
    .post(createProducto);  //Ruta para insertar un documento

//Rutas para metodos que requieren el codigo
router.route('/:codigo') 
    .get(getProducto)       //Ruta para consultar un documento
    .put(updateProducto)    //Ruta para actualizar un documento
    .delete(deleteProducto);//Ruta para eliminar un documento

module.exports = router;
