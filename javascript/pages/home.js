import getPaginatedDigimon from "../services/fetch-paginated-digimons.js";

export default async function initHome() {
  setupSearchButton();
}

function setupSearchButton() {
  const searcherInput = document.getElementById("search-bar");
  const searcherButton = document.getElementById("search-button");

  searcherButton.onclick = () => {
    console.log(searcherInput.value);
  };
}
