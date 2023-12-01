document.addEventListener('DOMContentLoaded', () => {
    // Obtener referencia a la lista de productos
    const listaProductos = document.getElementById('listaProductos');

    // Limpiar la lista antes de cargar los nuevos elementos
    listaProductos.innerHTML = '';

    // Realizar una solicitud al servidor para obtener la lista de productos
    fetch('http://localhost:4000/producto') // Ajusta la URL según tu ruta
        .then(response => response.json())
        .then(data => {
            // Manipular los datos obtenidos del servidor (array de productos)
            data.forEach(producto => {
                // Crear elementos HTML dinámicamente para cada producto
                const nuevoElemento = document.createElement('li');
                nuevoElemento.innerHTML = `
                    <a href="Producto.html?codigo=${producto.Codigo}">
                        <img src="${producto.ImgURL}" alt="${producto.Nombre}">
                        <h2>${producto.Nombre}</h2>
                        <p>Código: ${producto.Codigo}</p> <!-- Agregando el código -->
                        <p>Precio: $${producto.Precio.toFixed(2)}</p>
                    </a>
                `;
                listaProductos.appendChild(nuevoElemento);
            });
        })
        .catch(error => {
            console.error('Error al obtener la lista de productos:', error);
        });
});
