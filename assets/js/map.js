// <!-- JavaScript para manejar el modal del sitemap -->
// Obtener los elementos
var modal = document.getElementById("sitemapModal");
var openModalBtn = document.getElementById("openModalBtn");
var closeModalBtn = document.getElementById("closeModalBtn");

// Función para abrir el modal
openModalBtn.onclick = function () {
    modal.style.display = "block";
};

// Función para cerrar el modal
closeModalBtn.onclick = function () {
    modal.style.display = "none";
};

// Cerrar el modal cuando el usuario hace clic fuera de él
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// Código gpt para resolver el problema por el backdrop del bloqueo de los modales de los logos y permitir que cierren al hacer click fuera de ellos
// Obtener el modal
var logoModalElement = document.getElementById("logoModal");
var logoModal2Element = document.getElementById("logoModal2");

// Inicializar el modal sin backdrop
var logoModal = new bootstrap.Modal(logoModalElement, {
    backdrop: false, // Sin backdrop
    keyboard: true, // Permitir cerrar con la tecla ESC
});

var logoModal2 = new bootstrap.Modal(logoModal2Element, {
    backdrop: false,
    keyboard: true,
});

// Detectar clic fuera del modal y cerrarlo
logoModalElement.addEventListener("click", function (event) {
    if (event.target === logoModalElement) {
        logoModal.hide();
    }
});

logoModal2Element.addEventListener("click", function (event) {
    if (event.target === logoModal2Element) {
        logoModal2.hide();
    }
});
