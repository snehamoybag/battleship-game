import ButtonEl from "./ButtonEl";

const BattleshipButtonEls = (
  handleRandomize,
  handleStartGame,
  handleRestartGame,
) => {
  const buttonsWrapperEl = document.createElement("div");
  buttonsWrapperEl.classList.add("game__btns-wrapper");

  // handle game and ui buttons
  const handleButtonsOnStartGame = (
    randomizeButtonEl,
    startGameButtonEl,
    restartGameButtonEl,
  ) => {
    handleStartGame();

    randomizeButtonEl.remove();
    startGameButtonEl.remove();
    buttonsWrapperEl.append(restartGameButtonEl);
  };

  const randomizeButtonEl = ButtonEl(
    "Randomize",
    ["btn", "btns--randomize"],
    handleRandomize,
  );

  const restartGameButtonEl = ButtonEl(
    "Restart Game",
    ["btn", "btn--restart-outline"],
    handleRestartGame,
  );

  const startGameButtonEl = ButtonEl("Start Game", ["btn", "btn--start"], () =>
    handleButtonsOnStartGame(
      randomizeButtonEl,
      startGameButtonEl,
      restartGameButtonEl,
    ),
  );

  buttonsWrapperEl.append(randomizeButtonEl, startGameButtonEl);

  return buttonsWrapperEl;
};

export default BattleshipButtonEls;
