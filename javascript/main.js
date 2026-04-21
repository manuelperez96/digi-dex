import initHome from "./pages/home.js";

const page = document.body.dataset.page;

switch (page) {
  case "home":
    initHome();
    break;
}
