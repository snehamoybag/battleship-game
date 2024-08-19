import SrOnlyEl from "./SrOnlyEl";
import "../styles/block.css";

const BlockEl = (
  block,
  enableClick,
  handleClick,
  hasGameStarted,
  showShips = true,
) => {
  const blockEl = document.createElement("button");
  blockEl.classList.add("block");
  blockEl.type = "button";
  blockEl.dataset.cordinate = String(block.cordinate);

  const ship = block.ship;
  const isAttacked = block.isAttacked;
  const isRevealed = block.isRevealed;

  if (showShips && ship) {
    blockEl.classList.add("block--ship");
  }

  if (!isAttacked && isRevealed) {
    blockEl.classList.add("block--revealed");
  }

  // when game starts
  if (hasGameStarted) {
    if (showShips) {
      blockEl.classList.add("translucent");
    }

    if (enableClick) {
      blockEl.classList.add("cursor-pointer");
    }

    if (!isAttacked && !isRevealed) {
      blockEl.onclick = handleClick;
    }

    if (!enableClick || isAttacked || isRevealed) {
      blockEl.disabled = true;
    }
  }

  // marker
  let blockText = `(${block.cordinate[0]}, ${block.cordinate[1]})`;
  const blockTextEl = SrOnlyEl("span", blockText);

  const markerEl = document.createElement("span");
  markerEl.classList.add("block__marker");

  if (ship) {
    markerEl.classList.add("hit");
  } else {
    markerEl.classList.add("miss");
  }

  blockEl.append(blockTextEl);
  // append the marker only after attack is done
  if (isAttacked) {
    blockEl.append(markerEl);
  }

  return blockEl;
};

export default BlockEl;
