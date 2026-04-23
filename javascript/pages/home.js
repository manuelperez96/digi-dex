import getPaginatedDigimon from "../services/fetch-paginated-digimons.js";

let currentPage = 0;
let loading = false;
let lastSearch = "";

export default async function initHome() {
  setupSearchButton();
}

function setupSearchButton() {
  const searcherInput = document.getElementById("search-bar");
  const searcherButton = document.getElementById("search-button");
  const hideableContent = document.getElementById("hideable-content");
  const gridList = document.getElementById("grided-list");
  const errorText = document.getElementById("error-text");
  const loader = document.getElementById("loader");

  searcherButton.onclick = async () => {
    try {
      loader.classList.remove("hide");
      errorText.classList.add("hide");
      hideableContent.classList.add("hide");
      lastSearch = searcherInput.value;
      currentPage = 0;
      const result = await getPaginatedDigimon(
        searcherInput.value,
        currentPage,
      );
      currentPage = result.nextPage;
      gridList.innerHTML = "";
      renderDigimons(result.digimonList);
    } catch (e) {
      console.error(e);
      errorText.classList.remove("hide");
    } finally {
      loading = false;
      loader.classList.add("hide");
    }
  };
}

function renderDigimons(digimonList) {
  const gridList = document.getElementById("grided-list");
  const hideableContent = document.getElementById("hideable-content");

  gridList.classList.remove("hide");
  for (const digimon of digimonList) {
    const params = new URLSearchParams();
    params.append("id", digimon.id);

    gridList.innerHTML += `
      <a class="card-link" href="./digimon-view.html?${params}">
      <article class="digimon-card">
 <div class="upper-information">
            <div class="type">${digimon.type}</div>
            <div class="attribute">${digimon.attribute}</div>
            <div class="id">#${String(digimon.id).padStart(3, "0")}</div>
          </div>
                <div class="information">
             <div class="information-text">
              <h2> ${digimon.name}</h2>
              <p>${digimon.description}</p>
            </div>
          <img src="${digimon.image}" alt="Imagen de ${digimon.name}">
          </div>
        </article>
      </a>
        `;
  }

  hideableContent.classList.remove("hide");

  window.addEventListener("scroll", loadMoreDigimons);
}

async function loadMoreDigimons() {
  if (getScrollPercentage() >= 0.8 && currentPage > 0 && !loading) {
    loading = true;
    let result = await getPaginatedDigimon(lastSearch, currentPage);

    currentPage = result.nextPage;
    console.log(currentPage);
    console.log(lastSearch);
    renderDigimons(result.digimonList);
    loading = false;
  }
}

/// Return a value from 0 to 1, indicating the current scroll position.
function getScrollPercentage() {
  const documentHeight = document.documentElement.scrollHeight;
  const viewportHeight = window.innerHeight;

  return window.scrollY / (documentHeight - viewportHeight);
}
