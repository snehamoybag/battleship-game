import BlockEl from "./BlockEl";
import "../styles/board.css";

const isInbound = (board, nthRow, nthColumn) => {
  const startIndex = 0;
  const lastIndex = board.length - 1;

  const isRowInbound = nthRow >= startIndex && nthRow <= lastIndex;
  const isColumnInbound = nthColumn >= startIndex && nthColumn <= lastIndex;

  return isRowInbound && isColumnInbound;
};

const hasDeadShipBesideIt = (board, block) => {
  const [nthRow, nthColumn] = block.cordinate;

  const surroundingCordinates = {
    top: [nthRow - 1, nthColumn],
    topLeft: [nthRow - 1, nthColumn - 1],
    topRight: [nthRow - 1, nthColumn + 1],
    bottom: [nthRow + 1, nthColumn],
    bottomLeft: [nthRow + 1, nthColumn - 1],
    bottomRight: [nthRow + 1, nthColumn + 1],
    left: [nthRow, nthColumn - 1],
    right: [nthRow, nthColumn + 1],
  };

  const cordinateValues = Object.values(surroundingCordinates);

  return cordinateValues.some(([nthRow, nthColumn]) => {
    if (!isInbound(board, nthRow, nthColumn)) return false;

    const block = board[nthRow][nthColumn];
    const ship = block.ship;

    if (ship && ship.isSunk()) {
      return true;
    }

    return false;
  });
};

const BoardEl = (
  boardId,
  titleText,
  numberOfShipsLeft,
  board,
  enableBlockClick,
  handleBlockClick,
  hasGameStarted,
  showShips = true,
) => {
  const boardEl = document.createElement("div");
  boardEl.classList.add("board");
  boardEl.id = boardId;

  const titleEl = document.createElement("h2");
  titleEl.classList.add("board__title");
  titleEl.textContent = titleText;

  const numberOfShipsLeftEl = document.createElement("span");
  numberOfShipsLeftEl.textContent = `(Ships left: ${numberOfShipsLeft})`;

  const boardBodyEl = document.createElement("div");
  boardBodyEl.classList.add("board__body");

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      const block = board[i][j];

      if (!block.ship && hasDeadShipBesideIt(board, block)) {
        block.isAttacked = true;
      }

      const blockEl = BlockEl(
        block,
        enableBlockClick,
        () => handleBlockClick(...block.cordinate),
        hasGameStarted,
        showShips,
      );

      boardBodyEl.append(blockEl);
    }
  }

  if (hasGameStarted) {
    titleEl.append(numberOfShipsLeftEl);
  }

  boardEl.append(titleEl, boardBodyEl);
  return boardEl;
};

export default BoardEl;
