import Board from "../game/Board";
import board from "./board";

const main = () => {
  const mainEl = document.createElement("main");

  const playerBoardContainerEl = document.createElement("div");
  playerBoardContainerEl.classList.add("board-container");

  const playerBoardHeading = document.createElement("h2");
  playerBoardHeading.textContent = "Player Board";

  playerBoardContainerEl.append(playerBoardContainerEl, new Board().board);
  mainEl.append(board(playerBoardContainerEl));

  return mainEl;
};

export default main;
