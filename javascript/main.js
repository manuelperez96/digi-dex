import initHome from "./pages/home.js";
import initDigimonView from "./pages/digimon-view.js";

const page = document.body.dataset.page;

switch (page) {
  case "home":
    initHome();
    break;
  case "digimon-view":
    initDigimonView();
    break;
}
