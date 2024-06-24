import logoImg from "../assets/battleship.png";
import "../styles/logo.css";

const logo = () => {
  const bemClass = "logo";

  const logoEl = document.createElement("div");
  logoEl.classList.add(bemClass);

  const logoImgEl = new Image();
  logoImgEl.classList.add(`${bemClass}__img`);
  logoImgEl.src = logoImg;
  logoImgEl.alt = "logo";

  const logoTextEl = document.createElement("h1");
  logoTextEl.classList.add(`${bemClass}__text`);
  logoTextEl.textContent = "Battleship Game";

  logoEl.append(logoImgEl, logoTextEl);

  return logoEl;
};

export default logo;
