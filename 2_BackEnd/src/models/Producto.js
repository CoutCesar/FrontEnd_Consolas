const { Schema, model } = require('mongoose');

const productoSchema = new Schema({
    Codigo: {
        type: Number,
        unique: true,
        required: true
    },
    Nombre: {
        type: String,
        required: true
    },
    Descripcion: String,
    Precio: {
        type: Number,
        required: true
    },
    ImgURL: String
});

const Producto = model('Producto', productoSchema);

module.exports = Producto;

