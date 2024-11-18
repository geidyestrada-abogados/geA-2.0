// Funciones para acceder a la API de Strapi, cargar el contenido y actualizarlo en la BD de Strapi.

//* ========================================================================================================================================================
//* STATS Section
//* ========================================================================================================================================================

// <!-- Funciones para trabajar com el HERO desde la API de Strapi-->
// URL de la API de Strapi
const apiURLstat = "http://localhost:1337/api/stat";

//* =========================================================================================
//* (1) OBTENER Y MOSTRAR DATOS DE STATS
//* =========================================================================================

// FUNCIÓN PARA: ////////////////////////////////////////////////// (1) OBTENER Y MOSTRAR DATOS DEL STAT ///////////////////////////////////////////////////////////////////////
/**
 * fetchHeroContent
 * Obtiene el contenido de la seccion Stat desde la API de Strapi y lo muestra en el sitio web.
 * - Realiza una solicitud HTTP GET a la API.
 * - Parsea la respuesta y actualiza el contenido de la seccion Stat.
 * - Asigna valores a los elementos HTML correspondientes.
 */

//* -- INICIO FUNCIÓN --> fetchStatContent() (Obtener y mostrar los datos de Stats) //////////////////////////////////////////////////////////////////////////
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
}

// Llama a la función al cargar la página
document.addEventListener("DOMContentLoaded", fetchStatContent);

//* -- FIN FUNCIÓN --> fetchStatContent() (Obtener y mostrar los datos de Stats) /////////////////////////////////////////////////////////////////////////////////////////////

//* ========================================================================================
//* (2) CARGAR CONTENIDO DE STATS PARA EDICIÓN
//* ========================================================================================

/**
 * loadContent
 * Carga el contenido de Stat desde la API de Strapi y lo muestra en el editor.
 * - Solicita el contenido de Stat para edición.
 * - Asigna los valores a los campos del formulario de edición.
 */

//* -- INICIO FUNCIÓN -- loadContent() (Cargar contenido de Stats en el Editor) ///////////////////////////////////////////////////////////////////////////////////////////////
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
}
//* -- FIN FUNCIÓN --> loadContent() (Cargar contenido de STATS en el Editor) ////////////////////////////////////////////////////////////////////////////////////////////////////

//* ==========================================================================================
//* (3) ACTUALIZAR EL CONTENIDO DE STATS EN LA BD de Strapi
//* ==========================================================================================

/**
 * updateContent
 * Actualiza el contenido del Sat en la API de Strapi.
 * - Envía una solicitud HTTP PUT con los nuevos datos.
 * - Requiere un token JWT almacenado en localStorage.
 */

//* -- INICIO FUNCIÓN --> updateStatContent() (Función para actualizar los contenidos de STATS en la BD) ////////////////////////////////////////////////
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
      alert("Contenido actualizado con éxito.");
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
//* -- FIN DE FUNCIÓN --> updateStatContent() (Función para actualizar los contenidos de STATS en la BD) ////////////////////////////////////////////////
