// Declarar la variable sesionIniciada en un alcance más amplio
let sesionIniciada = false;

document.addEventListener('DOMContentLoaded', function () {
    // Verificar si hay una sesión iniciada (ajusta esto según tu lógica de inicio de sesión)
    const sesionIniciada = false; // Cambia esto según tu lógica de inicio de sesión

    if (sesionIniciada) {
        openModal('ModalMenu');
    } else {
        // Abre directamente el modal de menú y el mensaje de bienvenida
        openModal('ModalMenu');
        mostrarOpcionesAdministracion();
    }
});

function openModal(modalId) {
    const modals = document.querySelectorAll('.Contenedor');

    modals.forEach((modal) => {
        modal.style.display = 'none';
    });

    const modalToShow = document.getElementById(modalId);
    modalToShow.style.display = 'block';

    // Ocultar también el modal de administración al cerrar el modal de inicio
    const administracionMensaje = document.getElementById('AdministracionMensaje');
    administracionMensaje.style.display = 'none';

    // Mostrar el mensaje de bienvenida si se inicia sesión y se abre el ModalMenu
    if (sesionIniciada && modalId === 'ModalMenu') {
        mostrarOpcionesAdministracion();
    }
}

function closeModal() {
    const modals = document.querySelectorAll('.Contenedor');

    modals.forEach((modal) => {
        modal.style.display = 'none';
    });
}

function openRegistrar(modalId) {
    closeModal();
    openModal(modalId);
}

function openModificar(modalId) {
    closeModal();
    openModal(modalId);
}

function openEliminar(modalId) {
    closeModal();
    openModal(modalId);
}

function closeModalInicio() {
    const modalInicio = document.getElementById('ModalInicio');
    modalInicio.style.display = 'none';

    // Ocultar también el modal de administración al cerrar el modal de inicio
    const administracionMensaje = document.getElementById('AdministracionMensaje');
    administracionMensaje.style.display = 'none';
}

function mostrarOpcionesAdministracion() {
    const administracionMensaje = document.getElementById('AdministracionMensaje');
    administracionMensaje.style.display = 'block';
}
