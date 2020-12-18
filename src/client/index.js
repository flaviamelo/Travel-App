import flatpickr from "flatpickr";
import clickHandler from "./js/clickHandler";

//import scss files
import "./styles/resets.scss";
import "./styles/base.scss";
import "./styles/loader.scss";
import "./styles/error.scss";

//import media
import "./assets/logo.png";
import "./assets/github.png";
import "./assets/linkedin.png";
import "./assets/twitter.png";

flatpickr("#start-date", {
  dateFormat: "d/m/Y",
});

const button = document.querySelector(".trip-form-button");
button.addEventListener("click", clickHandler);
