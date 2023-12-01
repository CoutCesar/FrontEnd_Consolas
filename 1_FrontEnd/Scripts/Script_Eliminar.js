// Espera a que el contenido del documento HTML se cargue completamente
document.addEventListener('DOMContentLoaded', () => {
    // Obtén el formulario para eliminar un producto mediante su ID
    const formEliminarProducto = document.getElementById('Form_EliminarProducto');

    // Agrega un evento de escucha para el envío del formulario
    formEliminarProducto.addEventListener('submit', function (event) {
        // Evita que el formulario se envíe de manera convencional
        event.preventDefault();

        // Obtiene el código del producto a eliminar desde el formulario
        const codigoProductoEliminar = document.getElementById('CodigoProductoEliminar').value;

        // Realiza una solicitud al servidor para eliminar el producto específico
        fetch(`http://localhost:4000/producto/${codigoProductoEliminar}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
                // Pueden añadirse más encabezados según sea necesario
            },
        })
            .then(response => {
                // Verifica si la respuesta del servidor es exitosa
                if (!response.ok) {
                    throw new Error(`Error al eliminar el producto: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                // Maneja la respuesta del servidor después de eliminar el producto
                console.log('Producto eliminado:', data);

                // Puedes realizar otras acciones, como cerrar el modal o actualizar la interfaz
            })
            .catch(error => {
                // Captura errores durante el proceso y muestra mensajes de error
                console.error('Error al eliminar el producto:', error);
                // Puedes mostrar un mensaje de error al usuario si lo deseas
            });
    });
});
