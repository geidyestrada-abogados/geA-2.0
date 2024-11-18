// Funciones para acceder a la API de Strapi, cargar el contenido y actualizarlo en la BD de Strapi.

//? ================================================================================================================================================================================
//? ABOUT Section
//? ================================================================================================================================================================================

// <!-- Funciones para trabajar con el About desde la API de Strapi-->
// URL de la API de Strapi
const apiURLabout = "gea-strapi.up.railway.app/api/about";

//? ================================================================================================
//? (1) OBTENER Y MOSTRAR DATOS DEL ABOUT
//? ================================================================================================

/**
 * fetchAboutContent
 * Obtiene el contenido de la seccion About desde la API de Strapi y lo muestra en el sitio web.
 * - Realiza una solicitud HTTP GET a la API.
 * - Parsea la respuesta y actualiza el contenido de la seccion About.
 * - Asigna valores a los elementos HTML correspondientes.
 */

//? -- INICIO FUNCIÓN --> fetchAboutContent() (Obtener y mostrar los datos del About) /////////////////////////////////////////////////////////////////////////////////////////////////
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
}

//* Llama a la función al cargar la página
document.addEventListener("DOMContentLoaded", fetchAboutContent);
//? -- FIN DE FUNCIÓN --> fetchAboutContent() (Obtener y mostrar los datos del About) /////////////////////////////////////////////////////////////////////////////////////////////////

//? ==========================================================================================
//? (2) CARGAR CONTENIDO DEL ABOUT PARA EDICIÓN
//? ==========================================================================================

/**
 * loadAboutContent
 * Carga el contenido de About desde la API de Strapi y lo muestra en el editor.
 * - Solicita el contenido de About para edición.
 * - Asigna los valores a los campos del formulario de edición.
 */

//? -- INICIO FUNCIÓN -- loadContent() (Cargar contenido del About en el Editor) ////////////////////////////////////////////////////////////////////////////////////////////////////////
async function loadAboutContent() {
  //console.log("Iniciando carga del About...");
  try {
    const response = await fetch("gea-strapi.up.railway.app/api/about");
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
}
//? -- FIN DE FUNCIÓN -- loadContent() (Cargar contenido del About en el Editor) /////////////////////////////////////////////////////////////////////////////////////////////////////

//? ======================================================================================
//? FUNCIONES PARA SELECCIONAR IMAGEN DEL ABOUT EN EDITOR
//? ======================================================================================

let geidypicImageUrl = null;
let geidypicImageId = null; // Para almacenar el ID de la imagen seleccionada

//? Función para obtener las imágenes de Geidy
async function fetchAboutGeidypic() {
  try {
    const response = await fetch(
      "gea-strapi.up.railway.app/api/about?populate=Geidypic"
    );
    const aboutData = await response.json();
    const geidypicImages = aboutData.data.Geidypic;

    console.log("Datos recibidos de Strapi:", aboutData); // Verificar que se reciben los datos
    console.log("Imágenes recibidas de Strapi:", geidypicImages);

    if (geidypicImages && geidypicImages.length > 0) {
      // Seleccionar la primera imagen del arreglo
      const firstImageUrl = `gea-strapi.up.railway.app${geidypicImages[0].url}`;
      updateGeidypicImage(firstImageUrl); // Llamar a la función para actualizar la imagen en el DOM
    } else {
      console.log("No hay imágenes disponibles en el campo `Geidypic`");
    }
  } catch (error) {
    console.error("Error al obtener las imágenes de Geidypic:", error);
  }
}

//? Función para obtener y mostrar las imágenes de Geidypic en el editor
async function fetchAndRenderGeidypicImages() {
  try {
    const response = await fetch(
      "gea-strapi.up.railway.app/api/about?populate=Geidypic"
    );
    const aboutData = await response.json();

    const geidypicImages = aboutData.data.Geidypic;

    console.log("Datos recibidos para el editor de Geidypic:", aboutData);

    if (geidypicImages && geidypicImages.length > 0) {
      renderGeidypicImages(geidypicImages);
    } else {
      console.log("No hay imágenes disponibles en el campo `Geidypic`");
    }
  } catch (error) {
    console.error("Error al obtener las imágenes de Geidypic:", error);
  }
}

//? Función para mostrar las miniaturas de las imágenes en el editor
function renderGeidypicImages(geidypicImages) {
  const container = document.getElementById("geidypicSelection");
  if (!container) {
    console.error("Contenedor #geidypicSelection no encontrado en el DOM.");
    return;
  }

  container.innerHTML = ""; // Limpiar el contenido anterior

  geidypicImages.forEach((image) => {
    const imgElement = document.createElement("img");
    imgElement.src = `gea-strapi.up.railway.app${image.url}`;
    imgElement.alt = image.name;
    imgElement.classList.add("thumbnail");

    imgElement.onclick = () => {
      document
        .querySelectorAll(".thumbnail")
        .forEach((img) => img.classList.remove("selected"));
      imgElement.classList.add("selected");

      // Guarda la URL e ID de la imagen seleccionada para usarlos en la vista previa o actualización
      geidypicImageUrl = image.url;
      geidypicImageId = image.id;

      console.log("Imagen seleccionada para vista previa:", geidypicImageUrl);

      // Actualizar la vista previa en el editor
      updateGeidypicPreview();
    };

    container.appendChild(imgElement);
  });
}

//? Función para actualizar la vista previa de la imagen seleccionada
function updateGeidypicPreview() {
  const previewElement = document.getElementById("geidypicPreview");
  if (previewElement) {
    previewElement.style.backgroundImage = `url(gea-strapi.up.railway.app${geidypicImageUrl})`;
    console.log("Vista previa actualizada con:", geidypicImageUrl);
  } else {
    console.error("No se encontró el contenedor de vista previa.");
  }
}

//? Llama a la función al cargar la página para mostrar las imágenes en el editor
document.addEventListener("DOMContentLoaded", fetchAndRenderGeidypicImages);

//? Función para guardar la imagen de Geidy en Strapi
async function saveGeidypic() {
  if (!geidypicImageId) {
    alert("Por favor, selecciona una imagen antes de guardar.");
    return;
  }

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No estás autenticado. Por favor inicia sesión.");
      return;
    }

    // Obtiene el arreglo actual `Geidypic` de Strapi
    const currentResponse = await fetch(
      "gea-strapi.up.railway.app/api/about?populate=Geidypic"
    );
    const currentData = await currentResponse.json();
    const existingGeidypicImages = currentData.data.Geidypic || [];

    // Ordena el arreglo poniendo la imagen seleccionada al inicio
    const reorderedImages = [
      { id: geidypicImageId },
      ...existingGeidypicImages
        .filter((img) => img.id !== geidypicImageId)
        .map((img) => ({ id: img.id })),
    ];

    // Envía el arreglo completo actualizado a Strapi
    const response = await fetch("gea-strapi.up.railway.app/api/about", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Incluye el token de autenticación
      },
      body: JSON.stringify({
        data: {
          Geidypic: reorderedImages, // Envía el arreglo completo
        },
      }),
    });

    const responseData = await response.json();
    console.log("PUT response data:", responseData);

    const updatedResponse = await fetch(
      "gea-strapi.up.railway.app/api/about?populate=Geidypic"
    );
    const updatedData = await updatedResponse.json();
    console.log(
      "Estado de Geidypic tras actualizar:",
      updatedData.data.Geidypic
    );

    document.getElementById("confirmationMessage").style.display = "block";
    updateGeidypicBackground(); // Actualiza la imagen en el hero
  } catch (error) {
    console.error("Error al guardar el fondo seleccionado:", error);
  }
}

//? Función para actualizar la imagen de fondo del About en tiempo real
//? Función para actualizar la imagen en el DOM
function updateGeidypicImage(imageUrl) {
  const imageElement = document.getElementById("geidypicImage");
  if (imageElement) {
    imageElement.src = imageUrl;
    console.log("Imagen de Geidypic actualizada con URL:", imageUrl);
  } else {
    console.warn("Elemento de imagen no encontrado.");
  }
}

//* Ejecutar la carga de imágenes al cargar la página
//* Llama a la función al cargar la página
document.addEventListener("DOMContentLoaded", fetchAboutGeidypic);

//? FIN DE FUNCIONES PARA SELECCIONAR IMAGEN DEL ABOUT EN EDITOR //////////////////////////////////////////////////////////////////////////////////////////////////////////////

//? ==========================================================================================
//? (3) ACTUALIZAR EL CONTENIDO DEL ABOUT EN LA BD de Strapi
//? ==========================================================================================

/**
/**
 * updateAboutContent
 * Actualiza el contenido del About en la API de Strapi.
 * - Envía una solicitud HTTP PUT con los nuevos datos.
 * - Requiere un token JWT almacenado en localStorage.
 */

//? -- INICIO FUNCIÓN --> updateContent() (Función para cargar y mostrar la primera imagen de Geidy en el About) /////////////////////////////////////////////////////////////////
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
    const response = await fetch("gea-strapi.up.railway.app/api/about", {
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
      alert("Contenido actualizado con éxito.");
      window.location.reload(); // Recargar la página después de guardar cambios
    } else {
      alert("Error al actualizar el contenido.");
    }
  } catch (error) {
    console.error("Error al actualizar el contenido:", error);
  }
}
//? -- FIN DE FUNCIÓN --> updateContent() (Función para cargar y mostrar la primera imagen de Geidy en el About) /////////////////////////////////////////////////////////////////

//? FIN de Función para actualizar contenido del ABOUT en la BD de Strapi
