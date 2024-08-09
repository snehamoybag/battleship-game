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

  const ship = block.ship;
  const isAttacked = block.isAttacked;

  if (showShips && ship) {
    blockEl.classList.add("ship");
  }

  if (hasGameStarted) {
    blockEl.onclick = handleClick;

    if (enableClick) {
      blockEl.classList.add("cursor-pointer");
    }

    if (!enableClick || isAttacked) {
      blockEl.disabled = true;
    }
  }

  let blockText = `(${block.cordinate[0]}, ${block.cordinate[1]})`;

  const blockTextEl = SrOnlyEl("span", blockText);

  const markerEl = document.createElement("span");
  markerEl.classList.add("block__marker");

  if (ship) markerEl.classList.add("hit");
  else markerEl.classList.add("miss");

  // append the marker only after attack is done
  if (isAttacked) {
    blockEl.append(markerEl);
  }

  blockEl.append(blockTextEl);
  return blockEl;
};

export default BlockEl;
