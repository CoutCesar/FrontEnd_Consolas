document.addEventListener('DOMContentLoaded', () => {
    // Obtener el código del producto de la URL
    const params = new URLSearchParams(window.location.search);
    const codigoProducto = params.get('codigo');

    // Si hay un código de producto, realiza una solicitud al servidor para obtener la información del producto
    if (codigoProducto) {
        fetch(`http://localhost:4000/producto/${codigoProducto}`)
            .then(response => response.json())
            .then(producto => {
                // Actualiza la información en la página del producto
                document.getElementById('ImagenProducto').src = producto.ImgURL;
                document.getElementById('NombreProducto').innerText = producto.Nombre;
                document.getElementById('PrecioProducto').innerText = `$${producto.Precio.toFixed(2)}`;

                // Actualiza la descripción del producto
                const descripcionElement = document.querySelector('.Descripcion p');
                if (descripcionElement) {
                    descripcionElement.innerText = producto.Descripcion || 'No disponible';
                }
            })
            .catch(error => {
                console.error('Error al obtener la información del producto:', error);
            });
    }
});
