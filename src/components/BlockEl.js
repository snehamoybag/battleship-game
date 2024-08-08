import SrOnlyEl from "./SrOnlyEl";
import "../styles/block.css";

const BlockEl = (block, handleClick, hasGameStarted, showShips = true) => {
  const blockEl = document.createElement("button");
  blockEl.type = "button";

  blockEl.classList.add("block");

  if (block.ship && showShips) blockEl.classList.add("ship");

  if (!hasGameStarted || block.isAttacked) blockEl.disabled = true;

  if (hasGameStarted) {
    blockEl.classList.add("cursor-pointer");
    blockEl.onclick = handleClick;
  }

  if (block.isAttacked && block.ship) {
    blockEl.classList.add("hit");
  }

  if (block.isAttacked && !block.ship) {
    blockEl.classList.add("miss");
  }

  let blockText = `${block.cordinate[0]}, ${block.cordinate[1]}`;

  const blockTextEl = SrOnlyEl("span", blockText);

  blockEl.append(blockTextEl);
  return blockEl;
};

export default BlockEl;
