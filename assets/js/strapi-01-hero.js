// Funciones para acceder a la API de Strapi, cargar el contenido y actualizarlo en la BD de Strapi.

//! ========================================================================================================================================================
//! HERO Section
//! ========================================================================================================================================================

// <!-- Funciones para trabajar com el HERO desde la API de Strapi-->
// URL de la API de Strapi
const apiURLhero = "https://gea-strapi.up.railway.app/api/hero";

//! =========================================================================================
//! (1) OBTENER Y MOSTRAR DATOS DEL HERO
//! =========================================================================================

/**
 * fetchHeroContent
 * Obtiene el contenido de la seccion Hero desde la API de Strapi y lo muestra en el sitio web.
 * - Realiza una solicitud HTTP GET a la API.
 * - Parsea la respuesta y actualiza el contenido de la seccion Hero.
 * - Asigna valores a los elementos HTML correspondientes.
 */

//! -- INICIO FUNCIÓN --> fetchHeroContent() (Obtener y mostrar los datos del Hero) //////////////////////////////////////////////////////////////////////////
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
    const background = heroData.Background;

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
    //document.getElementById("hero-background").textContent = background;

    console.log("Datos completos de la API:", data); // Log para ver la estructura completa
    console.log("Datos de Background OK:", heroData.Background); // Verificar el campo Background

    // Establece la imagen de fondo desde Strapi si existe
    if (heroData.Background && heroData.Background.url) {
      const backgroundUrl = `https://gea-strapi.up.railway.app${heroData.Background.url}`;
      const baseUrl = "https://gea-strapi.up.railway.app"; // Cambia esto si usas otra URL base para Strapi
      const largeImageUrl = `${baseUrl}${heroData.Background.formats.large.url}`; // Utiliza 'large' o el formato deseado

      console.log("URL de fondo desde Strapi:", backgroundUrl); // Verifica que esta URL sea correcta
      //(document.getElementById("hero-background").style.backgroundImage = `url(${backgroundUrl})`), "important";
      //document.getElementById("hero-background").src = largeImageUrl;
      document.getElementById("hero-background").src = backgroundUrl;
    }
  } catch (error) {
    console.error("Error al obtener el contenido de Hero:", error);
  }
}

// Llama a la función al cargar la página
document.addEventListener("DOMContentLoaded", fetchHeroContent);
//! -- FIN FUNCIÓN --> fetchHeroContent() (Obtener y mostrar los datos del Hero) /////////////////////////////////////////////////////////////////////////////////////////////

//! ========================================================================================
//! (2) CARGAR CONTENIDO DEL HERO PARA EDICIÓN
//! ========================================================================================
/**
 * loadContent
 * Carga el contenido de Hero desde la API de Strapi y lo muestra en el editor.
 * - Solicita el contenido de Hero para edición.
 * - Asigna los valores a los campos del formulario de edición.
 */

//! -- INICIO FUNCIÓN -- loadContent() (Cargar contenido del Hero en el Editor) ///////////////////////////////////////////////////////////////////////////////////////////////
async function loadContent() {
  try {
    const response = await fetch("https://gea-strapi.up.railway.app/api/hero?populate=*");
    if (!response.ok) {
      throw new Error("Error al obtener el contenido: " + response.status);
    }
    const data = await response.json();

    console.log("Datos recibidos de la API:", data);

    if (data && data.data) {
      const heroData = data.data;

      // Asigna los valores a los elementos correspondientes en el editor
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

      // Verificar y establecer la imagen de fondo en la sección hero
      if (heroData.Background && heroData.Background.length > 0) {
        const backgroundUrl = heroData.Background[0].url;

        // Completa la URL con el dominio de Strapi si es relativa
        const fullBackgroundUrl = backgroundUrl.startsWith("http")
          ? backgroundUrl
          : `https://gea-strapi.up.railway.app${backgroundUrl}`;

        document.getElementById(
          "hero"
        ).style.backgroundImage = `url(${fullBackgroundUrl})`;
        document.getElementById("hero").style.backgroundSize = "cover";
        document.getElementById("hero").style.backgroundPosition = "center";
        document.getElementById("hero").style.backgroundRepeat = "no-repeat";
      } else {
        console.warn("La imagen de fondo no está disponible en los datos.");
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

//* Inicializar la carga del contenido al cargar la página
document.addEventListener("DOMContentLoaded", loadContent);
//! -- FIN FUNCIÓN --> loadContent() (Cargar contenido del Hero en el Editor) ////////////////////////////////////////////////////////////////////////////////////////////////////

//! ===================================================
//! FUNCIONES PARA SELECCIONAR IMAGEN DE HERO EN EDITOR
//! ===================================================
let selectedImageUrl = null;
let selectedImageId = null; // Para almacenar el ID de la imagen seleccionada

//! Función para obtener las imágenes de fondo de Hero ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function fetchHeroBackgrounds() {
  try {
    const response = await fetch(
      "https://gea-strapi.up.railway.app/api/hero?populate=Background"
    );
    const heroData = await response.json();

    console.log("Datos recibidos de Strapi:", heroData); // Verificar que se reciben los datos

    const backgroundImages = heroData.data.Background;
    if (backgroundImages && backgroundImages.length > 0) {
      renderBackgroundImages(backgroundImages);
    } else {
      console.log("No hay imágenes disponibles en el campo `Background`");
    }
  } catch (error) {
    console.error("Error al obtener las imágenes de fondo:", error);
  }
}

//! Función para mostrar miniaturas de las imágenes de fondo
function renderBackgroundImages(backgroundImages) {
  const container = document.getElementById("backgroundSelection");
  container.innerHTML = ""; // Limpiar el contenido anterior

  backgroundImages.forEach((image) => {
    const imgElement = document.createElement("img");
    imgElement.src = `https://gea-strapi.up.railway.app${image.url}`;
    imgElement.alt = image.name;
    imgElement.classList.add("thumbnail");

    imgElement.onclick = () => {
      document
        .querySelectorAll(".thumbnail")
        .forEach((img) => img.classList.remove("selected"));
      imgElement.classList.add("selected");
      selectedImageUrl = image.url;
      selectedImageId = image.id; // Guardar el ID de la imagen seleccionada

      console.log("Imagen seleccionada URL:", selectedImageUrl);
      console.log("Imagen seleccionada ID:", selectedImageId);

      updateHeroBackground();
      updateImagePreview();
    };

    container.appendChild(imgElement);
  });
}

//! Función para actualizar la vista previa ampliada en el editor
function updateImagePreview() {
  const previewElement = document.getElementById("imagePreview");
  if (previewElement && selectedImageUrl) {
    previewElement.style.backgroundImage = `url(https://gea-strapi.up.railway.app${selectedImageUrl})`;
    console.log("Vista previa actualizada con:", selectedImageUrl);
  }
}

//! Función para guardar el fondo de Hero en Strapi
async function saveBackground() {
  if (!selectedImageId) {
    alert("Por favor, selecciona una imagen antes de guardar.");
    return;
  }

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No estás autenticado. Por favor inicia sesión.");
      return;
    }

    // Obtiene el arreglo actual `Background` de Strapi
    const currentResponse = await fetch(
      "https://gea-strapi.up.railway.app/api/hero?populate=Background"
    );
    const currentData = await currentResponse.json();
    const existingBackgroundImages = currentData.data.Background || [];

    // Ordena el arreglo poniendo la imagen seleccionada al inicio
    const reorderedImages = [
      { id: selectedImageId },
      ...existingBackgroundImages
        .filter((img) => img.id !== selectedImageId)
        .map((img) => ({ id: img.id })),
    ];

    // Envía el arreglo completo actualizado a Strapi
    const response = await fetch("https://gea-strapi.up.railway.app/api/hero", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Incluye el token de autenticación
      },
      body: JSON.stringify({
        data: {
          Background: reorderedImages, // Envía el arreglo completo
        },
      }),
    });

    const responseData = await response.json();
    console.log("PUT response data:", responseData);

    const updatedResponse = await fetch(
      "https://gea-strapi.up.railway.app/api/hero?populate=Background"
    );
    const updatedData = await updatedResponse.json();
    console.log(
      "Estado de Background tras actualizar:",
      updatedData.data.Background
    );

    document.getElementById("confirmationMessage").style.display = "block";
    updateHeroBackground(); // Actualiza la imagen en el hero
  } catch (error) {
    console.error("Error al guardar el fondo seleccionado:", error);
  }
}

//! Función para actualizar la imagen de fondo del Hero en tiempo real
function updateHeroBackground() {
  const heroElement = document.getElementById("hero");
  if (heroElement && selectedImageUrl) {
    heroElement.style.backgroundImage = `url(https://gea-strapi.up.railway.app${selectedImageUrl})`;
    console.log("Actualización en el Hero con:", selectedImageUrl);
  }
}

//* Ejecutar la carga de imágenes al cargar la página
fetchHeroBackgrounds();
//! FIN DE FUNCIONES PARA SELECCIONAR IMAGEN DE HERO EN EDITOR //////////////////////////////////////////////////////////////////////////////////////////////////////////////

//! ==========================================================================================
//! (3) ACTUALIZAR EL CONTENIDO DEL HERO EN LA BD de Strapi
//! ==========================================================================================
/**
 * updateContent
 * Actualiza el contenido del Hero en la API de Strapi.
 * - Envía una solicitud HTTP PUT con los nuevos datos.
 * - Requiere un token JWT almacenado en localStorage.
 */

//! -- INICIO FUNCIÓN --> updateContent() (Función para cargar y mostrar la primera imagen del arreglo `Background` en Hero) ////////////////////////////////////////////////
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
    const response = await fetch("https://gea-strapi.up.railway.app/api/hero", {
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
      alert("Contenido actualizado con éxito.");
      window.location.reload(); // Recargar la página después de guardar cambios
    } else {
      alert("Error al actualizar el contenido.");
    }
  } catch (error) {
    console.error("Error al actualizar el contenido:", error);
  }
}
//! -- FIN DE FUNCIÓN --> updateContent() (Función para cargar y mostrar la primera imagen del arreglo `Background` en Hero) //////////////////////////////////////////////////////

//! FIN de Funciones para actualizar contenido del HERO en la BD de Strapi
