import logo from "../assets/battleship.png";
import "../styles/logo.css";

const LogoEl = () => {
  const logoEl = document.createElement("div");
  const logoElClassName = "logo";
  logoEl.classList.add(logoElClassName);

  const logoImgEl = new Image();
  logoImgEl.classList.add(`${logoElClassName}__img`);
  logoImgEl.src = logo;
  logoImgEl.alt = "site logo";

  const logoTextEl = document.createElement("h2");
  logoTextEl.classList.add(`${logoElClassName}__text`);
  logoTextEl.textContent = "Battleship Game";

  logoEl.append(logoImgEl, logoTextEl);

  return logoEl;
};

export default LogoEl;
