//* Funciones de Autenticación y Cierre de Sesión de usuario Editor.

//* FUNCIÓN PARA: //////// ABRIR modal de Edición ///////////

/**
 * openModal
 * Abre un modal especifico dado su ID.
 * @param {string} modalId - El ID del modal a abrir.
 */
function openModal(modalId) {
  document.getElementById(modalId).style.display = "block";
}

//* FUNCIÓN PARA: //////// CERRAR modal de Edición ///////////

/**
 * closeModal
 * Cierra un modal especifico dado su ID.
 * @param {string} modalId - El ID del modal a cerrar.
 */
function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

//* <!-- Script para manejo de autenticación, edición y cierre de sesión -->

document.addEventListener("DOMContentLoaded", () => {
  // Asegurarse de que los modales estén ocultos al cargar la página
  closeModal("loginModal");
  closeModal("editorModal");
});

//* FUNCIÓN PARA: ////////// LOGIN ////////////////

/**
 * login
 * Realiza una autenticación con Strapi para obtener un token JWT.
 * - Envía las credenciales del usuario para autenticar.
 * - Guarda el token JWT en localStorage si es exitoso.
 * - Muestra los modales adecuados según el estado de autenticación.
 */
async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    // Utilizando la URL correcta para la autenticación
    const response = await fetch("https://gea-strapi.up.railway.app/api/auth/local", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier: username, password: password }),
    });

    if (!response.ok) {
      // Leer el cuerpo de la respuesta como texto para registrar detalles
      const errorText = await response.text();
      console.error("Detalles del error:", errorText);
      throw new Error(
        `Error en la autenticación: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    if (data.jwt) {
      localStorage.setItem("token", data.jwt); // Guardar el token
      alert("Autenticación Exitosa.");
      closeModal("loginModal");
      document.getElementById("loginStatus").innerText = "Bienvenido!"; // Cambia el texto a "Bienvenido"
      loginStatus.style.color = "#0095ff"; // Cambia el color del texto a azul
      //await loadContent();
      //openModal("editorModal");
    } else {
      alert("Error de Autenticación.");
    }
  } catch (error) {
    console.error("Error de autenticación:", error);
    alert(
      "Error de Autenticación. Nombre de usuario o Contraseña incorrectos ."
    );
  }
}

//* FUNCIÓN PARA: //////////// ABRIR el modal correcto al hacer clic en el enlace del menú //////////////

/**
 * openEditor
 * Abre el editor para modificar contenido.
 * - Si hay un token JWT almacenado, carga el contenido de Hero, About, Stats y Office.
 * - Si no hay token, muestra el modal de inicio de sesión.
 */
async function openEditor() {
  console.log("openEditor llamada");
  if (localStorage.getItem("token")) {
    try {
      console.log("Intentando cargar Hero...");
      await loadContent();
      console.log("Hero cargado exitosamente.");

      console.log("Intentando cargar About...");
      await loadAboutContent();
      console.log("About cargado exitosamente.");

      console.log("Intentando cargar Stat...");
      await loadStatContent();
      console.log("Stat cargado exitosamente.");

      console.log("Intentando cargar Office ...");
      await loadOfficeContent();
      console.log("Office cargado exitosamente.");

      openModal("editorModal");
    } catch (error) {
      console.error("Error cargando contenidos:", error);
    }
  } else {
    //openModal("loginModal");
    alert("Debe Iniciar Sesión para la Edición de Contenido.");
  }
}

//* FUNCIÓN PARA: ///////////////// ABRIR Sesión Inicial /////////////////////
async function loginFirst() {
  if (localStorage.getItem("token")) {
    try {
      alert("Ya se encuentra Autenticado.");
    } catch (error) {
      //console.error("Error cargando contenidos:", error);
    }
  } else {
    openModal("loginModal");
  }
}

//* FUNCIÓN PARA: ///////////////// LOGOUT /////////////////////
/**
 * logout
 * Cierra la sesión eliminando el token JWT de localStorage.
 * - Si hay un token almacenado, lo elimina y redirige a la página principal.
 * - Si no hay sesión activa, muestra un mensaje de aviso.
 */
function logout() {
  // Comprobar si hay una sesión activa
  if (localStorage.getItem("token")) {
    // Eliminar el token del localStorage
    localStorage.removeItem("token");
    alert("Sesión cerrada con éxito.");
    // Redirigir al usuario a la página de inicio de sesión o página principal
    window.location.href = "index.html";
  } else {
    alert("No es necesario cerrar la sesión, no hay ninguna sesión activa.");
  }
}

//* <!-- FIN de Script para manejo de autenticación, edición y cierre de sesión -->
