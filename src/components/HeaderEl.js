import LogoEl from "./LogoEl";

const HeaderEl = () => {
  const headerEl = document.createElement("header");
  headerEl.classList.add("header");

  headerEl.append(LogoEl());

  return headerEl;
};

export default HeaderEl;
