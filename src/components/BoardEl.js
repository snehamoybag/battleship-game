import BlockEl from "./BlockEl";
import "../styles/board.css";

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

  board.forEach((row) =>
    row.forEach((column) => {
      // column === block
      const blockEl = BlockEl(
        column,
        enableBlockClick,
        () => handleBlockClick(...column.cordinate),
        hasGameStarted,
        showShips,
      );
      boardBodyEl.append(blockEl);
    }),
  );

  if (hasGameStarted) {
    titleEl.append(numberOfShipsLeftEl);
  }

  boardEl.append(titleEl, boardBodyEl);
  return boardEl;
};

export default BoardEl;
