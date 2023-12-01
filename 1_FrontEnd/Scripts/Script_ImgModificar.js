document.addEventListener("DOMContentLoaded", () => {
    const formModificarProducto = document.getElementById("Form_ModificarProducto");
    const formProductoEncontrado = document.getElementById("Form_ModificarProductoEncontrado");

    // Ocultar el formulario Form_ModificarProductoEncontrado al inicio
    formProductoEncontrado.style.display = "none";

    // Declarar codigoProducto y imagenProducto fuera del alcance de las funciones
    let codigoProducto;
    let imagenProducto;

    // Escuchar el envío del formulario de búsqueda
    formModificarProducto.addEventListener("submit", event => {
        event.preventDefault();

        // Asignar el valor a codigoProducto
        codigoProducto = document.getElementById("CodigoProductoModificar").value;

        console.log('El código insertado es ', codigoProducto);
        fetch(`http://localhost:4000/producto/${codigoProducto}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error de red: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                // Mostrar el formulario Form_ModificarProductoEncontrado
                formModificarProducto.style.display = "none";
                formProductoEncontrado.style.display = "block";

                // Asignar los valores actuales a los campos del formulario de modificación
                document.getElementById("NombreProductoModificar").value = data.Nombre;
                document.getElementById("CodigoProductoModificarDato").value = data.Codigo;
                document.getElementById("DescripcionProductoModificar").value = data.Descripcion;
                document.getElementById("PrecioProductoModificar").value = data.Precio;

                // Guardar la URL de la imagen actual
                imagenProducto = data.ImgURL;

                // Previsualizar la imagen actual
                const previsualizacionModificacion = document.getElementById("PrevisualizacionModificacion");
                previsualizacionModificacion.src = imagenProducto;
            })
            .catch(error => {
                // Producto no encontrado, mostrar un mensaje o realizar alguna acción
                console.error("Producto no encontrado en el cliente:", error);
            });
    });

    // Escuchar cambios en el input de imagen y mostrar la previsualización
    const imagenModificacionInput = document.getElementById("ImagenModificacion");
    imagenModificacionInput.addEventListener("change", event => {
        const imagenFile = event.target.files[0];
        mostrarImagenPreviaModificacion(imagenFile);
    });

    // Función para mostrar la previsualización de la imagen de modificación
    function mostrarImagenPreviaModificacion(file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const previsualizacionModificacion = document.getElementById("PrevisualizacionModificacion");
            previsualizacionModificacion.src = e.target.result;
        };

        // Leer el contenido del archivo como una URL
        reader.readAsDataURL(file);
    }

    // Escuchar el envío del formulario Form_ModificarProductoEncontrado (Modificar Producto)
    formProductoEncontrado.addEventListener("submit", event => {
        event.preventDefault();

        // Obtener los datos modificados del formulario
        const nuevoNombre = document.getElementById("NombreProductoModificar").value;
        const nuevoCodigo = document.getElementById("CodigoProductoModificarDato").value;
        const nuevaDescripcion = document.getElementById("DescripcionProductoModificar").value;
        const nuevoPrecio = document.getElementById("PrecioProductoModificar").value;
        const nuevaImagen = document.getElementById("ImagenModificacion").files[0];

        // Si hay una nueva imagen, cargarla en imgBB y usar su URL
        if (nuevaImagen) {
            const formData = new FormData();
            formData.append('image', nuevaImagen);

            //Se llama a la api de imgBB para guardar la imagen
            fetch('https://api.imgbb.com/1/upload?key=1db6eacbdb9ce8bfaf3658dc158de5dc', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    // Guardar la nueva URL de la imagen
                    const nuevaImagenURL = data.data.url;

                    // Asignar la nueva URL de la imagen antes de enviar los datos al servidor
                    imagenProducto = nuevaImagenURL;

                    // Realizar la solicitud PUT al servidor con la nueva información
                    realizarSolicitudPUT(nuevoNombre, nuevoCodigo, nuevaDescripcion, nuevoPrecio, imagenProducto);
                })
                .catch(error => {
                    console.error("Error al cargar la nueva imagen:", error);
                });
        } else {
            // Si no hay una nueva imagen, usar la imagen actual
            realizarSolicitudPUT(nuevoNombre, nuevoCodigo, nuevaDescripcion, nuevoPrecio, imagenProducto);
        }
    });

    // Función para realizar la solicitud PUT al servidor
    function realizarSolicitudPUT(nombre, codigo, descripcion, precio, imagenURL) {
        //Se llama a la Api para Actualizar el documento seleccionado
        fetch(`http://localhost:4000/producto/${codigoProducto}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombre,
                codigo: codigo,
                descripcion: descripcion,
                precio: precio,
                imgURL: imagenURL
            })
        })
            .then(response => response.json())
            .then(resultado => {
                // Manejar el resultado si es necesario
                console.log("Producto modificado:", resultado);
            })
            .catch(error => {
                console.error("Error al modificar el producto:", error);
            });
    }
});
