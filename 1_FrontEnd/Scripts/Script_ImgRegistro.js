// Obtener referencias al input y a la imagen
const $seleccionArchivos = document.querySelector("#ImagenRegistro");
const $imagenPrevisualizacion = document.querySelector("#PrevisualizacionRegistro");

// Escuchar cambios en la selección de archivos
$seleccionArchivos.addEventListener("change", () => {
    // Obtener los archivos seleccionados
    const archivos = $seleccionArchivos.files;

    // Salir de la función si no hay archivos y quitar la imagen
    if (!archivos || archivos.length === 0) {
        $imagenPrevisualizacion.src = "";
        return;
    }

    // Tomar el primer archivo y mostrar la previsualización
    const primerArchivo = archivos[0];
    mostrarImagenPrevia(primerArchivo);
});

// Función para mostrar la previsualización de la imagen
function mostrarImagenPrevia(file) {
    // Crear un objeto FileReader para leer el contenido del archivo
    const reader = new FileReader();

    reader.onload = function (e) {
        // Crear una imagen para obtener las dimensiones originales
        const img = new Image();
        img.src = e.target.result;

        img.onload = function () {
            // Crear un elemento canvas para redimensionar la imagen
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            // Establecer el tamaño del canvas
            canvas.width = 100;
            canvas.height = 100;

            // Dibujar la imagen redimensionada en el canvas
            ctx.drawImage(img, 0, 0, 100, 100);

            // Obtener la URL de la imagen redimensionada
            const imagenRedimensionadaURL = canvas.toDataURL("image/png");

            // Mostrar la imagen redimensionada en la previsualización
            $imagenPrevisualizacion.src = imagenRedimensionadaURL;
        };
    };

    // Leer el contenido del archivo como una URL
    reader.readAsDataURL(file);
}

// Escuchar el envío del formulario
document.getElementById('Form_NuevoProducto').addEventListener('submit', function (event) {
    event.preventDefault();

    // Obtener datos del formulario
    const nombreProducto = document.getElementById('NombreProducto').value;
    const codigoProducto = document.getElementById('CodigoProducto').value;
    const descripcionProducto = document.getElementById('DescripcionProducto').value;
    const precioProducto = document.getElementById('PrecioProducto').value;
    const imagenInput = document.getElementById('ImagenRegistro');
    const imagenFile = imagenInput.files[0];

    // Limpiar el formulario y la previsualización de la imagen
    const formNuevoProducto = document.getElementById('Form_NuevoProducto');
    const imagenPrevisualizacion = document.querySelector("#PrevisualizacionRegistro");
    formNuevoProducto.reset();
    imagenPrevisualizacion.src = '';

    // Verificar si se seleccionó una imagen
    if (imagenFile) {
        // Crear formData para enviar la imagen a ImgBB
        const formData = new FormData();
        formData.append('image', imagenFile);

        // Subir la imagen a ImgBB
        fetch('https://api.imgbb.com/1/upload?key=1db6eacbdb9ce8bfaf3658dc158de5dc', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                // Obtener la URL de la imagen subida a ImgBB
                const imagenURL = data.data.url;

                // Crear objeto con los datos del producto
                const datosProducto = {
                    codigo: codigoProducto,
                    nombre: nombreProducto,
                    descripcion: descripcionProducto,
                    precio: precioProducto,
                    imgurl: imagenURL
                };

                console.log('Datos del producto:', datosProducto);

                // Enviar datos al servidor para la inserción
                fetch(`http://localhost:4000/producto`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(datosProducto),
                    mode: 'cors'
                })
                    .then(response => response.json())
                    .then(resultado => {
                        // Manejar el resultado si es necesario
                        console.log('Resultado de la inserción:', resultado);
                    })
                    .catch(error => {
                        console.error('Error al enviar datos al servidor:', error);
                    });
            })
            .catch(error => {
                console.error('Error al subir la imagen a ImgBB:', error);
            });
    } else {
        console.error('No se seleccionó ninguna imagen.');
    }
});
