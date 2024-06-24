import logo from "./logo";

const header = () => {
  const headerEl = document.createElement("header");

  headerEl.append(logo());
  return headerEl;
};

export default header;
