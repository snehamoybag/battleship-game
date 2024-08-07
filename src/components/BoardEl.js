import BlockEl from "./BlockEl";
import "../styles/board.css";

const BoardEl = (
  boardId,
  titleText,
  board,
  handleBlockClick,
  hasGameStarted,
  showShips = false,
) => {
  const boardEl = document.createElement("div");
  boardEl.classList.add("board");
  boardEl.id = boardId;

  const titleEl = document.createElement("h2");
  titleEl.classList.add("board__title");
  titleEl.textContent = titleText;

  const boardBodyEl = document.createElement("div");
  boardBodyEl.classList.add("board__body");

  board.forEach((row) =>
    row.forEach((column) => {
      const blockEl = BlockEl(
        column,
        () => handleBlockClick(...column.cordinate),
        hasGameStarted,
        showShips,
      );
      boardBodyEl.append(blockEl);
    }),
  );

  boardEl.append(titleEl, boardBodyEl);
  return boardEl;
};

export default BoardEl;
