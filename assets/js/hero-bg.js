let selectedImageUrl = null;

async function fetchHeroBackgrounds() {
  try {
    const response = await fetch(
      "http://localhost:1337/api/hero?populate=Background"
    );
    const heroData = await response.json();

    console.log("Datos recibidos de Strapi:", heroData);

    const backgroundImages = heroData.data.Background;

    if (backgroundImages && backgroundImages.length > 0) {
      renderBackgroundImages(backgroundImages);
    } else {
      console.log('No hay imágenes disponibles en el campo "Background"');
    }
  } catch (error) {
    console.error("Error al obtener las imágenes de fondo:", error);
  }
}

function renderBackgroundImages(backgroundImages) {
  const container = document.getElementById("backgroundSelection");
  container.innerHTML = ""; // Limpiar el contenido anterior

  backgroundImages.forEach((image) => {
    const imgElement = document.createElement("img");
    imgElement.src = `http://localhost:1337${image.url}`;
    imgElement.alt = image.name;
    imgElement.classList.add("thumbnail");

    imgElement.onclick = () => {
      document
        .querySelectorAll(".thumbnail")
        .forEach((img) => img.classList.remove("selected"));
      imgElement.classList.add("selected");
      selectedImageUrl = image.url;
      console.log("Imagen seleccionada:", selectedImageUrl);

      // Actualizar en tiempo real el fondo del hero
      updateHeroBackground();
    };

    container.appendChild(imgElement);
  });
}

async function saveBackground() {
  if (!selectedImageUrl) {
    alert("Por favor, selecciona una imagen antes de guardar.");
    return;
  }

  try {
    await fetch("http://localhost:1337/api/hero", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          Background: [
            {
              url: selectedImageUrl,
            },
          ],
        },
      }),
    });

    document.getElementById("confirmationMessage").style.display = "block";

    // Actualizar la imagen en el hero del sitio
    updateHeroBackground();
  } catch (error) {
    console.error("Error al guardar el fondo seleccionado:", error);
  }
}

function updateHeroBackground() {
  const heroElement = document.getElementById("hero");
  heroElement.style.backgroundImage = `url(http://localhost:1337${selectedImageUrl})`;
  console.log("Actualización en el Hero con:", selectedImageUrl);
}

// Inicializar la carga de imágenes al cargar la página
fetchHeroBackgrounds();
