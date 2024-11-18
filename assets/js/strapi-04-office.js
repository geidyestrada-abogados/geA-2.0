// Funciones para acceder a la API de Strapi, cargar el contenido y actualizarlo en la BD de Strapi.

//TODO ========================================================================================================================================================
//TODO OFFICE Section
//TODO ========================================================================================================================================================

// <!-- Funciones para trabajar con el Office desde la API de Strapi-->
// URL de la API de Strapi
const apiURLoffice = "http://localhost:1337/api/office";

//TODO =========================================================================================
//TODO (1) OBTENER Y MOSTRAR DATOS DE OFFICE
//TODO =========================================================================================

/**
 * fetchOfficeContent
 * Obtiene el contenido de la seccion Office desde la API de Strapi y lo muestra en el sitio web.
 * - Realiza una solicitud HTTP GET a la API.
 * - Parsea la respuesta y actualiza el contenido de la seccion Office.
 * - Asigna valores a los elementos HTML correspondientes.
 */

//TODO -- INICIO FUNCIÓN --> fetchOfficeContent() (Obtener y mostrar los datos de OFFICE) //////////////////////////////////////////////////////////////////////////
async function fetchOfficeContent() {
  try {
    const response = await fetch(apiURLoffice + "?populate=*");
    const data = await response.json();

    const officeData = data.data;
    const title = officeData.Title;
    const intro = officeData.Intro;
    const item1 = officeData.Item1;
    const item2 = officeData.Item2;
    const item3 = officeData.Item3;
    const item4 = officeData.Item4;
    const office = officeData.Office;

    document.getElementById("office-title").textContent = title;
    document.getElementById("office-intro").textContent = intro;
    document.getElementById("office-item1").textContent = item1;
    document.getElementById("office-item2").textContent = item2;
    document.getElementById("office-item3").textContent = item3;
    document.getElementById("office-item4").textContent = item4;

    console.log("Datos completos de la API:", data); // Log para ver la estructura completa
    console.log("Datos de Imagen Office OK:", officeData.Office); // Verificar el campo Office de la imagen

    // Establece la imagen de la oficina desde Strapi si existe
    if (officeData.Office && officeData.Office.url) {
      const officeUrl = `http://localhost:1337${officeData.Office.url}`;
      const baseUrl = "http://localhost:1337"; // Cambia esto si usas otra URL base para Strapi
      const largeImageUrl = `${baseUrl}${officeData.Office.formats.large.url}`; // Utiliza 'large' o el formato deseado

      console.log("URL de fondo desde Strapi:", officeUrl); // Verifica que esta URL sea correcta
      document.getElementById("office-office").src = officeUrl;
    }
  } catch (error) {
    console.error("Error al obtener el contenido de Office:", error);
  }
}

// Llama a la función al cargar la página
document.addEventListener("DOMContentLoaded", fetchOfficeContent);
//TODO -- FIN DE FUNCIÓN --> fetchOfficeContent() (Obtener y mostrar los datos de OFFICE) //////////////////////////////////////////////////////////////////////////

//TODO ========================================================================================
//TODO (2) CARGAR CONTENIDO DE OFFICE PARA EDICIÓN
//TODO ========================================================================================

/**
 * loadOfficeContent
 * Carga el contenido de Office desde la API de Strapi y lo muestra en el editor.
 * - Solicita el contenido de Office para edición.
 * - Asigna los valores a los campos del formulario de edición.
 */

//TODO -- INICIO FUNCIÓN -- loadOfficeContent() (Cargar contenido de OFFICE en el Editor) ///////////////////////////////////////////////////////////////////////////////////////////////
async function loadOfficeContent() {
  try {
    const response = await fetch("http://localhost:1337/api/office?populate=*");
    if (!response.ok) {
      throw new Error(
        "Error al obtener el contenido del Office: " + response.status
      );
    }
    const data = await response.json();
    console.log("Respuesta de la API para Office:", data); // Depuración

    if (data && data.data) {
      const officeData = data.data;

      // Asigna los valores a los elementos correspondientes en el editor
      document.getElementById("edit-title-office").value =
        officeData.Title || "";
      document.getElementById("edit-intro-office").value =
        officeData.Intro || "";
      document.getElementById("edit-item1").value = officeData.Item1 || "";
      document.getElementById("edit-item2").value = officeData.Item2 || "";
      document.getElementById("edit-item3").value = officeData.Item3 || "";
      document.getElementById("edit-item4").value = officeData.Item4 || "";

      // Verificar y establecer la imagen de la oficina en la sección Office
      if (officeData.Office && officeData.Office.length > 0) {
        const officeUrl = officeData.Office[0].url;

        // Completa la URL con el dominio de Strapi si es relativa
        const fullOfficeUrl = officeUrl.startsWith("http")
          ? officeUrl
          : `http://localhost:1337${officeUrl}`;

        document.getElementById(
          "office"
        ).style.backgroundImage = `url(${fullOfficeUrl})`;
        document.getElementById("office").style.backgroundSize = "cover";
        document.getElementById("office").style.backgroundPosition = "center";
        document.getElementById("office").style.backgroundRepeat = "no-repeat";
      } else {
        console.warn(
          "La imagen de la oficina no está disponible en los datos."
        );
      }
    } else {
      console.error("Estructura de datos no esperada. Datos completos:", data);
      alert(
        "La estructura de los datos no es la esperada. Revisa la consola para más detalles."
      );
    }
  } catch (error) {
    console.error("Error al cargar el contenido del Office:", error);
    alert("No se pudo cargar el contenido. Por favor, intenta de nuevo.");
  }
}
// Inicializar la carga del contenido al cargar la página
document.addEventListener("DOMContentLoaded", loadOfficeContent);
//TODO -- FIN DE FUNCIÓN -- loadOfficeContent() (Cargar contenido de OFFICE en el Editor) ///////////////////////////////////////////////////////////////////////////////////////////////

//TODO =====================================================
//TODO FUNCIONES PARA SELECCIONAR IMAGEN DE OFFICE EN EDITOR
//TODO =====================================================

let selectedOfficeUrl = null;
let selectedOfficeId = null; // Para almacenar el ID de la imagen seleccionada

//TODO Función para obtener las imágenes de la Oficina ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function fetchOfficeBackgrounds() {
  try {
    const response = await fetch(
      "http://localhost:1337/api/office?populate=Office"
    );
    const officeData = await response.json();

    console.log("Datos recibidos de Strapi:", officeData); // Verificar que se reciben los datos

    const officeImages = officeData.data.Office;
    if (officeImages && officeImages.length > 0) {
      renderOfficeImages(officeImages);
    } else {
      console.log("No hay imágenes disponibles en el campo `Office`");
    }
  } catch (error) {
    console.error("Error al obtener las imágenes de la Oficina:", error);
  }
}

//TODO Función para mostrar miniaturas de las imágenes de fondo
function renderOfficeImages(officeImages) {
  const container = document.getElementById("officeSelection");
  container.innerHTML = ""; // Limpiar el contenido anterior

  officeImages.forEach((image) => {
    const imgElement = document.createElement("img");
    imgElement.src = `http://localhost:1337${image.url}`;
    imgElement.alt = image.name;
    imgElement.classList.add("thumbnail");

    imgElement.onclick = () => {
      document
        .querySelectorAll(".thumbnail")
        .forEach((img) => img.classList.remove("selected"));
      imgElement.classList.add("selected");
      selectedOfficeUrl = image.url;
      selectedOfficeId = image.id; // Guardar el ID de la imagen seleccionada

      console.log("Imagen seleccionada URL:", selectedOfficeUrl);
      console.log("Imagen seleccionada ID:", selectedOfficeId);

      updateOfficeBackground();
      updateOfficePreview();
    };

    container.appendChild(imgElement);
  });
}

//TODO Función para actualizar la vista previa ampliada en el editor
function updateOfficePreview() {
  const previewElement = document.getElementById("officePreview");
  if (previewElement && selectedOfficeUrl) {
    previewElement.style.backgroundImage = `url(http://localhost:1337${selectedOfficeUrl})`;
    console.log("Vista previa actualizada con:", selectedOfficeUrl);
  }
}

//TODO Función para guardar la imagen de Office en Strapi
async function saveOffice() {
  if (!selectedOfficeId) {
    alert("Por favor, selecciona una imagen antes de guardar.");
    return;
  }

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No estás autenticado. Por favor inicia sesión.");
      return;
    }

    // Obtiene el arreglo actual `Office` de Strapi
    const currentResponse = await fetch(
      "http://localhost:1337/api/office?populate=Office"
    );
    const currentData = await currentResponse.json();
    const existingOfficeImages = currentData.data.Office || [];

    // Ordena el arreglo poniendo la imagen seleccionada al inicio
    const reorderedImages = [
      { id: selectedOfficeId },
      ...existingOfficeImages
        .filter((img) => img.id !== selectedOfficeId)
        .map((img) => ({ id: img.id })),
    ];

    // Envía el arreglo completo actualizado a Strapi
    const response = await fetch("http://localhost:1337/api/office", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Incluye el token de autenticación
      },
      body: JSON.stringify({
        data: {
          Office: reorderedImages, // Envía el arreglo completo
        },
      }),
    });

    const responseData = await response.json();
    console.log("PUT response data:", responseData);

    const updatedResponse = await fetch(
      "http://localhost:1337/api/office?populate=Office"
    );
    const updatedData = await updatedResponse.json();
    console.log("Estado de Office tras actualizar:", updatedData.data.Office);

    document.getElementById("confirmationMessage").style.display = "block";
    updateOfficeBackground(); // Actualiza la imagen en Office
  } catch (error) {
    console.error("Error al guardar la imagen seleccionada:", error);
  }
}

//TODO Función para actualizar la imagen Office en tiempo real
function updateOfficeBackground() {
  const officeElement = document.getElementById("office");
  if (officeElement && selectedOfficeUrl) {
    officeElement.style.backgroundImage = `url(http://localhost:1337${selectedOfficeUrl})`;
    console.log("Actualización en el Office con:", selectedOfficeUrl);
  }
}

//TODO Ejecutar la carga de imágenes al cargar la página
fetchOfficeBackgrounds();

//TODO FIN DE FUNCIONES PARA SELECCIONAR IMAGEN DE OFFICE EN EDITOR //////////////////////////////////////////////////////////////////////////////////////////////////////////////

//TODO ==========================================================================================
//TODO (3) ACTUALIZAR EL CONTENIDO DE OFFICE EN LA BD de Strapi
//TODO ==========================================================================================

/**
/**
 * updateOfficeContent
 * Actualiza el contenido del Office en la API de Strapi.
 * - Envía una solicitud HTTP PUT con los nuevos datos.
 * - Requiere un token JWT almacenado en localStorage.
 */

//TODO -- INICIO FUNCIÓN --> updateOfficeContent() (Función para cargar y mostrar la primera imagen de la oficina en Office) ////////////////////////////////////////////////
async function updateOfficeContent() {
  const token = localStorage.getItem("token");
  const newTitle = document.getElementById("edit-title-office").value;
  const newIntro = document.getElementById("edit-intro-office").value;
  const newItem1 = document.getElementById("edit-item1").value;
  const newItem2 = document.getElementById("edit-item2").value;
  const newItem3 = document.getElementById("edit-item3").value;
  const newItem4 = document.getElementById("edit-item4").value;

  try {
    const response = await fetch("http://localhost:1337/api/office", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: {
          Title: newTitle,
          Intro: newIntro,
          Item1: newItem1,
          Item2: newItem2,
          Item3: newItem3,
          Item4: newItem4,
        },
      }),
    });

    if (response.ok) {
      alert("Contenido actualizado con éxito.");
      window.location.reload(); // Recargar la página después de guardar cambios
    } else {
      alert("Error al actualizar el contenido.");
    }
  } catch (error) {
    console.error("Error al actualizar el contenido:", error);
  }
}
//TODO -- FIN DE FUNCIÓN --> updateOfficeContent() (Función para cargar y mostrar la primera imagen de la oficina en Office) ////////////////////////////////////////////////
