// Funciones para acceder a la API de Strapi, cargar el contenido y actualizarlo en la BD de Strapi.
// Funciones de Autenticacción y Cierre de Sesión de usuario Editor.

//////////////////////////////////////////////////////////////////////////////// HERO ////////////////////////////////////////////////////////////////////////////////////////

// <!-- Funciones para trabajar com el HERO desde la API de Strapi-->
// URL de la API de Strapi
const apiURLhero = "http://localhost:1337/api/hero";

// FUNCIÓN PARA: ////////////////////////////////////////////////// (1) OBTENER Y MOSTRAR DATOS DEL HERO ///////////////////////////////////////////////////////////////////////
/**
 * fetchHeroContent
 * Obtiene el contenido de la seccion Hero desde la API de Strapi y lo muestra en el sitio web.
 * - Realiza una solicitud HTTP GET a la API.
 * - Parsea la respuesta y actualiza el contenido de la seccion Hero.
 * - Asigna valores a los elementos HTML correspondientes.
 */
async function fetchHeroContent() {
  try {
    const response = await fetch(apiURLhero + "?populate=*");
    const data = await response.json();

    const heroData = data.data;
    const title = heroData.Titulo;
    const subtitle = heroData.Subtitulo;
    const cardtitle1 = heroData.CardTitle1;
    const cardcont1 = heroData.CardCont1;
    const cardtitle2 = heroData.CardTitle2;
    const cardcont2 = heroData.CardCont2;
    const cardtitle3 = heroData.CardTitle3;
    const cardcont3 = heroData.CardCont3;
    const cardtitle4 = heroData.CardTitle4;
    const cardcont4 = heroData.CardCont4;

    document.getElementById("hero-title").textContent = title;
    document.getElementById("hero-subtitle").textContent = subtitle;
    document.getElementById("hero-cardtitle1").textContent = cardtitle1;
    document.getElementById("hero-cardcont1").textContent = cardcont1;
    document.getElementById("hero-cardtitle2").textContent = cardtitle2;
    document.getElementById("hero-cardcont2").textContent = cardcont2;
    document.getElementById("hero-cardtitle3").textContent = cardtitle3;
    document.getElementById("hero-cardcont3").textContent = cardcont3;
    document.getElementById("hero-cardtitle4").textContent = cardtitle4;
    document.getElementById("hero-cardcont4").textContent = cardcont4;

    //console.log("Datos completos de la API:", data); // Log para ver la estructura completa
    //console.log("Datos de Background:", heroData.Background); // Verificar el campo Background
    // Establece la imagen de fondo desde Strapi si existe
    /*if (heroData.Background && heroData.Background.url) {
      const backgroundUrl = `http://localhost:1337${heroData.Background.url}`;
      //console.log("URL de fondo desde Strapi:", backgroundUrl); // Verifica que esta URL sea correcta
      (document.getElementById(
        "hero-background"
      ).style.backgroundImage = `url(${backgroundUrl})`),
        "important";
    }*/
  } catch (error) {
    console.error("Error al obtener el contenido de Hero:", error);
  }
} // FIN de Función para OBTENER y MOSTRAR los datos de HERO

// Llama a la función al cargar la página
document.addEventListener("DOMContentLoaded", fetchHeroContent);

// FUNCIÓN PARA: ///////////////////////////////////////////////////// (2) CARGAR CONTENIDO DEL HERO PARA EDICIÓN ////////////////////////////////////////////////////////////////////////////
/**
 * loadContent
 * Carga el contenido de Hero desde la API de Strapi y lo muestra en el editor.
 * - Solicita el contenido de Hero para edición.
 * - Asigna los valores a los campos del formulario de edición.
 */
async function loadContent() {
  try {
    const response = await fetch("http://localhost:1337/api/hero");
    if (!response.ok) {
      throw new Error("Error al obtener el contenido: " + response.status);
    }
    const data = await response.json();

    //console.log("Datos recibidos de la API:", data); // Log para verificar la estructura de los datos

    // Actualizar lógica para manejar la estructura recibida
    if (data && data.data) {
      const heroData = data.data; // Accede a la sección correcta de los datos
      document.getElementById("edit-title").value = heroData.Titulo || "";
      document.getElementById("edit-subtitle").value = heroData.Subtitulo || "";
      document.getElementById("edit-cardtitle1").value =
        heroData.CardTitle1 || "";
      document.getElementById("edit-cardcont1").value =
        heroData.CardCont1 || "";
      document.getElementById("edit-cardtitle2").value =
        heroData.CardTitle2 || "";
      document.getElementById("edit-cardcont2").value =
        heroData.CardCont2 || "";
      document.getElementById("edit-cardtitle3").value =
        heroData.CardTitle3 || "";
      document.getElementById("edit-cardcont3").value =
        heroData.CardCont3 || "";
      document.getElementById("edit-cardtitle4").value =
        heroData.CardTitle4 || "";
      document.getElementById("edit-cardcont4").value =
        heroData.CardCont4 || "";
      /*  document.getElementById("edit-background").value =
              heroData.Background || "";*/
    } else {
      console.error("Estructura de datos no esperada. Datos completos:", data);
      alert(
        "La estructura de los datos no es la esperada. Revisa la consola para más detalles."
      );
    }
  } catch (error) {
    console.error("Error al cargar el contenido:", error);
    alert("No se pudo cargar el contenido. Por favor, intenta de nuevo.");
  }
} // FIN de Función para CARGAR CONTENIDO del HERO para Edición

// FUNCIÓN PARA:  /////////////////////////////////////////////////////// (3) ACTUALIZAR EL CONTENIDO DEL HERO EN LA BD de Strapi //////////////////////////////////////////////////////////
/**
 * updateContent
 * Actualiza el contenido del Hero en la API de Strapi.
 * - Envía una solicitud HTTP PUT con los nuevos datos.
 * - Requiere un token JWT almacenado en localStorage.
 */
async function updateContent() {
  const token = localStorage.getItem("token");
  const newTitle = document.getElementById("edit-title").value;
  const newSubtitle = document.getElementById("edit-subtitle").value;
  const newCardTitle1 = document.getElementById("edit-cardtitle1").value;
  const newCardCont1 = document.getElementById("edit-cardcont1").value;
  const newCardTitle2 = document.getElementById("edit-cardtitle2").value;
  const newCardCont2 = document.getElementById("edit-cardcont2").value;
  const newCardTitle3 = document.getElementById("edit-cardtitle3").value;
  const newCardCont3 = document.getElementById("edit-cardcont3").value;
  const newCardTitle4 = document.getElementById("edit-cardtitle4").value;
  const newCardCont4 = document.getElementById("edit-cardcont4").value;

  try {
    const response = await fetch("http://localhost:1337/api/hero", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: {
          Titulo: newTitle,
          Subtitulo: newSubtitle,
          CardTitle1: newCardTitle1,
          CardCont1: newCardCont1,
          CardTitle2: newCardTitle2,
          CardCont2: newCardCont2,
          CardTitle3: newCardTitle3,
          CardCont3: newCardCont3,
          CardTitle4: newCardTitle4,
          CardCont4: newCardCont4,
        },
      }),
    });

    if (response.ok) {
      alert("Contenido actualizado con éxito");
      window.location.reload(); // Recargar la página después de guardar cambios
    } else {
      alert("Error al actualizar el contenido");
    }
  } catch (error) {
    console.error("Error al actualizar el contenido:", error);
  }
} // FIN de Función para actualizar contenido del HERO en la BD de Strapi

//////////////////////////////////////////////////////////////////////////////// ABOUT ////////////////////////////////////////////////////////////////////////////////////////

// <!-- Funciones para trabajar con el About desde la API de Strapi-->
// URL de la API de Strapi
const apiURLabout = "http://localhost:1337/api/about";

// FUNCIÓN PARA: ////////////////////////////////////////////////// (1) OBTENER Y MOSTRAR DATOS DEL ABOUT /////////////////////////////////////////////////////////////////////
/**
 * fetchAboutContent
 * Obtiene el contenido de la seccion About desde la API de Strapi y lo muestra en el sitio web.
 * - Realiza una solicitud HTTP GET a la API.
 * - Parsea la respuesta y actualiza el contenido de la seccion About.
 * - Asigna valores a los elementos HTML correspondientes.
 */
async function fetchAboutContent() {
  try {
    const response = await fetch(apiURLabout + "?populate=*");
    const data = await response.json();

    // Verifica la estructura exacta de los datos
    //console.log("Datos completos de About:", data);

    if (data && data.data) {
      const aboutData = data.data;

      // Asegúrate de que los `id` en HTML coincidan
      document.getElementById("about-title").textContent =
        aboutData.Title || "";
      document.getElementById("about-intro").textContent =
        aboutData.Intro || "";
      document.getElementById("about-compromise").textContent =
        aboutData.Compromiso || "";
      document.getElementById("about-mision").textContent =
        aboutData.Mision || "";
      document.getElementById("about-vision").textContent =
        aboutData.Vision || "";
      document.getElementById("about-values").textContent =
        aboutData.Valores || "";
      document.getElementById("about-final").textContent =
        aboutData.Final || "";
    } else {
      console.error("Estructura de datos no esperada en About.");
    }
  } catch (error) {
    console.error("Error al obtener el contenido de About:", error);
  }
} // FIN de Función para OBTENER y MOSTRAR los datos del ABOUT

// Llama a la función al cargar la página
document.addEventListener("DOMContentLoaded", fetchAboutContent);

// FUNCIÓN PARA: ////////////////////////// //////////////////////////////////// (2) CARGAR CONTENIDO DEL ABOUT PARA EDICIÓN //////////////////////////////////////////////////////////////
/**
 * loadAboutContent
 * Carga el contenido de About desde la API de Strapi y lo muestra en el editor.
 * - Solicita el contenido de About para edición.
 * - Asigna los valores a los campos del formulario de edición.
 */
async function loadAboutContent() {
  //console.log("Iniciando carga del About...");
  try {
    const response = await fetch("http://localhost:1337/api/about");
    if (!response.ok) {
      throw new Error(
        "Error al obtener el contenido del About: " + response.status
      );
    }
    const data = await response.json();
    //console.log("Datos del About recibidos:", data); // Verificar datos recibidos

    if (data && data.data) {
      const aboutData = data.data;

      // Verificar cada propiedad en la consola antes de asignar
      /*console.log("Title:", aboutData.Title);
            console.log("Intro:", aboutData.Intro);
            console.log("Compromiso:", aboutData.Compromiso);
            console.log("Mision:", aboutData.Mision);
            console.log("Vision:", aboutData.Vision);
            console.log("Valores:", aboutData.Valores);
            console.log("Final:", aboutData.Final);*/

      document.getElementById("edit-title-about").value = aboutData.Title || "";
      document.getElementById("edit-intro").value = aboutData.Intro || "";
      document.getElementById("edit-compromise").value =
        aboutData.Compromiso || "";
      document.getElementById("edit-mision").value = aboutData.Mision || "";
      document.getElementById("edit-vision").value = aboutData.Vision || "";
      document.getElementById("edit-values").value = aboutData.Valores || "";
      document.getElementById("edit-final").value = aboutData.Final || "";
    } else {
      console.error("Estructura de datos no esperada. Datos completos:", data);
      alert(
        "La estructura de los datos no es la esperada. Revisa la consola para más detalles."
      );
    }
  } catch (error) {
    console.error("Error al cargar el contenido del About:", error);
    alert("No se pudo cargar el contenido. Por favor, intenta de nuevo.");
  }
} // FIN de Función para CARGAR CONTENIDO del ABOUT para Edición

// FUNCIÓN PARA: ////////////////////////// //////////////////////////// (3) ACTUALIZAR EL CONTENIDO DEL ABOUT EN LA BD de Strapi //////////////////////////////////////////////////////////////
/**
/**
 * updateAboutContent
 * Actualiza el contenido del About en la API de Strapi.
 * - Envía una solicitud HTTP PUT con los nuevos datos.
 * - Requiere un token JWT almacenado en localStorage.
 */
async function updateAboutContent() {
  const token = localStorage.getItem("token");
  const newTitle = document.getElementById("edit-title-about").value;
  const newIntro = document.getElementById("edit-intro").value;
  const newCompromise = document.getElementById("edit-compromise").value;
  const newMision = document.getElementById("edit-mision").value;
  const newVision = document.getElementById("edit-vision").value;
  const newValues = document.getElementById("edit-values").value;
  const newFinal = document.getElementById("edit-final").value;

  try {
    const response = await fetch("http://localhost:1337/api/about", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: {
          Title: newTitle,
          Intro: newIntro,
          Compromiso: newCompromise,
          Mision: newMision,
          Vision: newVision,
          Valores: newValues,
          Final: newFinal,
        },
      }),
    });

    if (response.ok) {
      alert("Contenido actualizado con éxito");
      window.location.reload(); // Recargar la página después de guardar cambios
    } else {
      alert("Error al actualizar el contenido");
    }
  } catch (error) {
    console.error("Error al actualizar el contenido:", error);
  }
} // FIN de la Función para ACTUALIZAR el contenido del ABOUT en la BD de Strapi

//////////////////////////////////////////////////////////////////////////////// STATS ////////////////////////////////////////////////////////////////////////////////////////

// <!-- Funciones para trabajar com el HERO desde la API de Strapi-->
// URL de la API de Strapi
const apiURLstat = "http://localhost:1337/api/stat";

// FUNCIÓN PARA: ////////////////////////////////////////////////// (1) OBTENER Y MOSTRAR DATOS DEL STAT ///////////////////////////////////////////////////////////////////////
/**
 * fetchHeroContent
 * Obtiene el contenido de la seccion Stat desde la API de Strapi y lo muestra en el sitio web.
 * - Realiza una solicitud HTTP GET a la API.
 * - Parsea la respuesta y actualiza el contenido de la seccion Stat.
 * - Asigna valores a los elementos HTML correspondientes.
 */
async function fetchStatContent() {
  try {
    const response = await fetch(apiURLstat + "?populate=*");
    const data = await response.json();

    if (data && data.data) {
      const statData = data.data;

      // Asigna los valores de texto a los elementos HTML correspondientes
      if (document.getElementById("stat-stat1")) {
        document.getElementById("stat-stat1").textContent =
          statData.Stat1 || "";
      }
      if (document.getElementById("stat-stat2")) {
        document.getElementById("stat-stat2").textContent =
          statData.Stat2 || "";
      }
      if (document.getElementById("stat-stat3")) {
        document.getElementById("stat-stat3").textContent =
          statData.Stat3 || "";
      }
      if (document.getElementById("stat-stat4")) {
        document.getElementById("stat-stat4").textContent =
          statData.Stat4 || "";
      }

      // Actualiza los atributos data-purecounter-end con el valor numérico correspondiente
      const stat1Element = document.getElementById("stat-stat1n");
      if (stat1Element && statData.Stat1n != null) {
        const stat1nValue = parseInt(statData.Stat1n, 10);
        if (!isNaN(stat1nValue)) {
          stat1Element.setAttribute("data-purecounter-end", stat1nValue);
          stat1Element.setAttribute("data-purecounter-start", "0");
          stat1Element.setAttribute("data-purecounter-duration", "2");
        }
      }

      const stat2Element = document.getElementById("stat-stat2n");
      if (stat2Element && statData.Stat2n != null) {
        const stat2nValue = parseInt(statData.Stat2n, 10);
        if (!isNaN(stat2nValue)) {
          stat2Element.setAttribute("data-purecounter-end", stat2nValue);
          stat2Element.setAttribute("data-purecounter-start", "0");
          stat2Element.setAttribute("data-purecounter-duration", "2");
        }
      }

      const stat3Element = document.getElementById("stat-stat3n");
      if (stat3Element && statData.Stat3n != null) {
        const stat3nValue = parseInt(statData.Stat3n, 10);
        if (!isNaN(stat3nValue)) {
          stat3Element.setAttribute("data-purecounter-end", stat3nValue);
          stat3Element.setAttribute("data-purecounter-start", "0");
          stat3Element.setAttribute("data-purecounter-duration", "2");
        }
      }

      const stat4Element = document.getElementById("stat-stat4n");
      if (stat4Element && statData.Stat4n != null) {
        const stat4nValue = parseInt(statData.Stat4n, 10);
        if (!isNaN(stat4nValue)) {
          stat4Element.setAttribute("data-purecounter-end", stat4nValue);
          stat4Element.setAttribute("data-purecounter-start", "0");
          stat4Element.setAttribute("data-purecounter-duration", "2");
        }
      }

      // Re-inicializa PureCounter para que los cambios surtan efecto
      new PureCounter();
    }

    //console.log("Datos completos de la API:", data); // Log para ver la estructura completa
  } catch (error) {
    console.error("Error al obtener el contenido de Stat:", error);
  }
} // FIN de Función para OBTENER y MOSTRAR los datos de STAT

// Llama a la función al cargar la página
document.addEventListener("DOMContentLoaded", fetchStatContent);

// FUNCIÓN PARA: ///////////////////////////////////////////////////// (2) CARGAR CONTENIDO DEL STAT PARA EDICIÓN ////////////////////////////////////////////////////////////////////////////
/**
 * loadContent
 * Carga el contenido de Stat desde la API de Strapi y lo muestra en el editor.
 * - Solicita el contenido de Stat para edición.
 * - Asigna los valores a los campos del formulario de edición.
 */
async function loadStatContent() {
  try {
    const response = await fetch("http://localhost:1337/api/stat");
    if (!response.ok) {
      throw new Error("Error al obtener el contenido: " + response.status);
    }
    const data = await response.json();

    // console.log("Datos recibidos de la API:", data); // Log para verificar la estructura de los datos

    // Actualizar lógica para manejar la estructura recibida
    if (data && data.data) {
      const statData = data.data;

      // Verificar si los elementos existen antes de asignarles valores
      if (document.getElementById("edit-stat1")) {
        document.getElementById("edit-stat1").value = statData.Stat1 || "";
      }
      if (document.getElementById("edit-stat1n")) {
        document.getElementById("edit-stat1n").value = statData.Stat1n || "";
      }
      if (document.getElementById("edit-stat2")) {
        document.getElementById("edit-stat2").value = statData.Stat2 || "";
      }
      if (document.getElementById("edit-stat2n")) {
        document.getElementById("edit-stat2n").value = statData.Stat2n || "";
      }
      if (document.getElementById("edit-stat3")) {
        document.getElementById("edit-stat3").value = statData.Stat3 || "";
      }
      if (document.getElementById("edit-stat3n")) {
        document.getElementById("edit-stat3n").value = statData.Stat3n || "";
      }
      if (document.getElementById("edit-stat4")) {
        document.getElementById("edit-stat4").value = statData.Stat4 || "";
      }
      if (document.getElementById("edit-stat4n")) {
        document.getElementById("edit-stat4n").value = statData.Stat4n || "";
      }
    } else {
      console.error("Estructura de datos no esperada. Datos completos:", data);
      alert(
        "La estructura de los datos no es la esperada. Revisa la consola para más detalles."
      );
    }
  } catch (error) {
    console.error("Error al cargar el contenido:", error);
    alert("No se pudo cargar el contenido. Por favor, intenta de nuevo.");
  }
} // FIN de Función para CARGAR CONTENIDO del STAT para Edición

// FUNCIÓN PARA:  /////////////////////////////////////////////////////// (3) ACTUALIZAR EL CONTENIDO DEL HERO EN LA BD de Strapi //////////////////////////////////////////////////////////
/**
 * updateContent
 * Actualiza el contenido del Sat en la API de Strapi.
 * - Envía una solicitud HTTP PUT con los nuevos datos.
 * - Requiere un token JWT almacenado en localStorage.
 */
async function updateStatContent() {
  console.log("Se ha llamado a la función updateStatContent"); // Verifica si la función se llama correctamente

  const token = localStorage.getItem("token");

  if (!token) {
    alert("No hay una sesión activa. Por favor, inicia sesión.");
    return;
  }

  // Obtener los valores de los campos del formulario
  const newStat1 = document.getElementById("edit-stat1").value;
  const newStat1n = document.getElementById("edit-stat1n").value;
  const newStat2 = document.getElementById("edit-stat2").value;
  const newStat2n = document.getElementById("edit-stat2n").value;
  const newStat3 = document.getElementById("edit-stat3").value;
  const newStat3n = document.getElementById("edit-stat3n").value;
  const newStat4 = document.getElementById("edit-stat4").value;
  const newStat4n = document.getElementById("edit-stat4n").value;

  // Validación de campos numéricos (deben ser cadenas)
  if (
    isNaN(newStat1n) ||
    isNaN(newStat2n) ||
    isNaN(newStat3n) ||
    isNaN(newStat4n)
  ) {
    alert("Por favor, asegúrate de que los campos numéricos sean válidos.");
    return;
  }

  const dataToSend = {
    data: {
      Stat1: newStat1,
      Stat1n: newStat1n.toString(), // Convertir a cadena
      Stat2: newStat2,
      Stat2n: newStat2n.toString(), // Convertir a cadena
      Stat3: newStat3,
      Stat3n: newStat3n.toString(), // Convertir a cadena
      Stat4: newStat4,
      Stat4n: newStat4n.toString(), // Convertir a cadena
    },
  };

  console.log("Datos a enviar:", JSON.stringify(dataToSend));

  try {
    // Usar la URL correcta para Single Type
    const response = await fetch("http://localhost:1337/api/stat", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataToSend),
    });

    console.log("Respuesta del servidor:", response);

    if (response.ok) {
      alert("Contenido actualizado con éxito");
      // Recargar la página para ver los cambios reflejados
      window.location.reload();
    } else {
      const errorData = await response.json();
      console.error("Error en la respuesta:", errorData);
      alert(
        `Error al actualizar el contenido: ${
          errorData.error.message || JSON.stringify(errorData.error)
        }`
      );
    }
  } catch (error) {
    console.error("Error al actualizar el contenido:", error);
    alert("No se pudo actualizar el contenido. Por favor, intenta de nuevo.");
  }
}
// FIN de Función para ACTUALIZAR contenido del Stat en la BD de Strapi

// FUNCIÓN PARA: //////// ABRIR modal de Edición ///////////
/**
 * openModal
 * Abre un modal especifico dado su ID.
 * @param {string} modalId - El ID del modal a abrir.
 */
function openModal(modalId) {
  document.getElementById(modalId).style.display = "block";
}

// FUNCIÓN PARA: //////// CERRAR modal de Edición ///////////
/**
 * closeModal
 * Cierra un modal especifico dado su ID.
 * @param {string} modalId - El ID del modal a cerrar.
 */
function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

// <!-- Script para manejo de autenticación, edición y cierre de sesión -->
document.addEventListener("DOMContentLoaded", () => {
  // Asegurarse de que los modales estén ocultos al cargar la página
  closeModal("loginModal");
  closeModal("editorModal");
});

// FUNCIÓN PARA: ////////// AUTENTICACIÓN ////////////////
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
    const response = await fetch("http://localhost:1337/api/auth/local", {
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
      alert("Autenticación Exitosa");
      closeModal("loginModal");
      await loadContent();
      openModal("editorModal");
    } else {
      alert("Error de Autenticación");
    }
  } catch (error) {
    console.error("Error de autenticación:", error);
    alert("Ocurrió un problema durante la Autenticación.");
  }
}

// FUNCIÓN PARA: //////////// ABRIR el modal correcto al hacer clic en el enlace del menú //////////////
/**
 * openEditor
 * Abre el editor para modificar contenido.
 * - Si hay un token JWT almacenado, carga el contenido de Hero y About.
 * - Si no hay token, muestra el modal de inicio de sesión.
 */
async function openEditor() {
  if (localStorage.getItem("token")) {
    try {
      //console.log("Intentando cargar Hero...");
      await loadContent();
      //console.log("Hero cargado exitosamente.");

      //console.log("Intentando cargar About...");
      await loadAboutContent();
      //console.log("About cargado exitosamente.");

      //console.log("Intentando cargar Stat...");
      await loadStatContent();
      //console.log("Stat cargado exitosamente.");

      openModal("editorModal");
    } catch (error) {
      //console.error("Error cargando contenidos:", error);
    }
  } else {
    openModal("loginModal");
  }
}

// FUNCIÓN PARA: ///////////////// CERRAR Sesión /////////////////////
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
    alert("Sesión cerrada con éxito");
    // Redirigir al usuario a la página de inicio de sesión o página principal
    window.location.href = "index.html";
  } else {
    alert("No es necesario cerrar la sesión, no hay ninguna sesión activa");
  }
}
// <!-- FIN de Script para manejo de autenticación, edición y cierre de sesión -->
