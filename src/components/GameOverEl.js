import ButtonEl from "./ButtonEl";

const GameOverEl = (winnerText) => {
  const gameOverEl = document.createElement("div");
  gameOverEl.classList.add("game-over-modal");

  const winnerTextEl = document.createElement("h2");
  winnerTextEl.textContent = winnerText;

  const restartButtonEl = ButtonEl(
    "Restart Game",
    ["btn", "btn--restart"],
    () => {
      // reload window
      console.log("clicked");
    },
  );

  gameOverEl.append(winnerTextEl, restartButtonEl);
  return gameOverEl;
};

export default GameOverEl;
