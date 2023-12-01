const productoCtrl = {};

const Producto = require('../models/Producto');

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//Control para consultar todos los documentos
productoCtrl.getProductos = async (req, res) => 
{
    //Consulta los documentos
    const ListaProductos = await Producto.find();

    //Envia los documentos
    res.json(ListaProductos);
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////
//Control para crear un documento
productoCtrl.createProducto = async (req, res) => 
{
    try {
        //Se obtienen los datos por parte del cliente
        const { codigo, nombre, descripcion, precio, imgurl } = req.body;imgurl
        const ProductoNuevo = new Producto({
            Codigo: codigo,
            Nombre: nombre,
            Descripcion: descripcion,
            Precio: precio,
            ImgURL: imgurl
        });

        //Imprime los datos recibidos
        console.log(ProductoNuevo);

        //Inserta el documento
        await ProductoNuevo.save();

        //Responde al cliente con un mensaje
        res.json({ message: 'Producto Creado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor al crear el producto' });
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////
//Control para consultar un documento
productoCtrl.getProducto = async (req, res) => 
{
    try {
        //Se obtiene el codigo brindado por el cliente
        const codigo = req.params.codigo; // Asumiendo que el código está en los parámetros de la solicitud
        console.log('El servidor recibio el codigo ', codigo);

        //Se realiza la consulta en la base de datos
        const producto = await Producto.findOne({ Codigo: codigo });

        //En caso de no existir manda mensaje de error
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        return res.json(producto);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error del servidor' });
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////
//Control para actualizar un documento
productoCtrl.updateProducto = (req, res) => 
{
    //Obtiene los datos brindados por el cliente
    const { codigo, nombre, descripcion, precio, imgURL } = req.body;
    
    //Realiza la busqueda y actualiza el documento
    Producto.findOneAndUpdate(
        { Codigo: req.params.codigo }, // Buscar por el campo Codigo
        {
            Codigo: codigo,
            Nombre: nombre,
            Descripcion: descripcion,
            Precio: precio,
            ImgURL: imgURL
        },
        { new: true } // Para devolver el documento modificado en lugar del original
    )
    .then(updatedProducto => {
        if (!updatedProducto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto Modificado', data: updatedProducto });
    })
    .catch(error => {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    });
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////
//Control para eliminar un documento
productoCtrl.deleteProducto = async (req, res) => 
{
    try {
        //Recibe el codigo por parte del cliente
        const codigo = req.params.codigo;

        // Buscar y eliminar el producto por código
        const resultado = await Producto.deleteOne({ Codigo: codigo });

        if (resultado.deletedCount === 0) {
            return res.status(404).json({ message: 'Producto no encontrado para eliminar' });
        }

        res.json({ message: 'Producto Eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor al eliminar el producto' });
    }
}

module.exports = productoCtrl;