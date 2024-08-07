const ButtonEl = (text, classes, handleClick) => {
  const buttonEl = document.createElement("button");
  buttonEl.type = "button";
  buttonEl.classList.add(...classes);
  buttonEl.onclick = handleClick;
  buttonEl.textContent = text;

  return buttonEl;
};

export default ButtonEl;
