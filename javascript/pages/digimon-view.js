import fetchDigimonById from "../services/fetch-digimon-by-id.js";

export default async function initDigimonView() {
  try {
    const searchParams = new URLSearchParams(window.location.search);
    const digimonId = searchParams.get("id");
    const digimon = await fetchDigimonById(digimonId);
    renderDigimonDetailCard(digimon);
  } catch (e) {
    console.error(e);
    document.getElementById("error-message").classList.remove("hide");
  } finally {
    document.getElementById("loader").classList.add("hide");
  }
}

function renderDigimonDetailCard(digimon) {
  document.getElementById("digimon-container").innerHTML = `
    <article id="digimon-card" class="digimon-card">
        <img src="${digimon.image}" alt="Imagen representativa de ${digimon.name}">
         <div class="digimon-information">
            <h3>#${String(digimon.id).padStart(3, "0")}</h3>
            <h2>${digimon.name}</h2>
              <div class="extra-info">
                <p>${digimon.type}</p>
                <p>${digimon.attribute}</p>
            </div>
            <p>${digimon.description}</p>
            
          </div>
      </article>
    `;
}
