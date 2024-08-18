import ButtonEl from "./ButtonEl";
import "../styles/game-over-modal.css";

const GameOverEl = (winnerText, handleRestart) => {
  const gameOverEl = document.createElement("div");
  gameOverEl.classList.add("game-over-modal");

  const winnerTextEl = document.createElement("h2");
  winnerTextEl.textContent = winnerText;

  const restartButtonEl = ButtonEl(
    "Restart Game",
    ["btn", "btn--restart-fill"],
    handleRestart,
  );

  gameOverEl.append(winnerTextEl, restartButtonEl);
  return gameOverEl;
};

export default GameOverEl;
