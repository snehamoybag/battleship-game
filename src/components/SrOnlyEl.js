import "../styles/sr-only.css";

// screen reader only element
const SrOnlyEl = (elType, textContent) => {
  const srOnlyEl = document.createElement(elType);
  srOnlyEl.classList.add("sr-only");
  srOnlyEl.textContent = textContent;

  return srOnlyEl;
};

export default SrOnlyEl;
