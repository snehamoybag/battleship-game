import "../styles/board.css";

const board = (boardBluePrint) => {
  const bemClass = "board";

  const boardEl = document.createElement("div");
  boardEl.classList.add(bemClass);

  // helper functioin that creates row element
  const getRowEl = () => {
    const rowEl = document.createElement("div");
    rowEl.classList.add(`${bemClass}__row`);

    return rowEl;
  };

  const columnEls = boardBluePrint.map((column) => {
    const columnEl = document.createElement("div");
    columnEl.classList.add(`${bemClass}__column`);

    // fill column with rows
    const rowEls = column.map(() => getRowEl());
    columnEl.append(...rowEls);

    return columnEl;
  });

  // append columns and it's rows to board
  boardEl.append(...columnEls);

  return boardEl;
};

export default board;
