import Game from "../scripts/classes/Game";
import Player from "../scripts/classes/Player";
import BoardEl from "./BoardEl";
import ButtonEl from "./ButtonEl";
import GameOverEl from "./GameOverEl";
import "../styles/game.css";

// battleship component
const BattleshipEl = () => {
  const game = new Game();
  const human = new Player("Human");
  const bot = new Player("Bot");

  let currentPlayer = human;
  const switchCurrentPlayer = () => {
    currentPlayer = currentPlayer === human ? bot : human;
  };

  const battleShipEl = document.createElement("div");
  battleShipEl.classList.add("game");

  const buttonsWrapperEl = document.createElement("div");
  buttonsWrapperEl.classList.add("game__btns-wrapper");

  const handleGameOver = () => {
    const winner = currentPlayer;
    const winnerText = winner === human ? "You Win!" : "You Lose!";

    battleShipEl.append(GameOverEl(winnerText));
  };

  const getHandleBlockClick = (player, renderEvent) => {
    return (nthRow, nthColumn) => {
      player.recieveAttack(nthRow, nthColumn);

      const attackedShip = player.board[nthRow][nthColumn].ship;
      const didAttackHitAShip = attackedShip !== null;

      const isGameOver = player.numberOfShipsLeft === 0;

      if (!isGameOver && !didAttackHitAShip) {
        switchCurrentPlayer();
      }

      battleShipEl.dispatchEvent(renderEvent);

      if (isGameOver) handleGameOver();
    };
  };

  const humanBoardRenderEventName = "render-human-board";
  const humanBoardRenderEvent = new Event(humanBoardRenderEventName);

  const renderHumanBoardEl = () => {
    const id = "human-board";
    const showShips = game.hasStarted === false;

    const boardEl = BoardEl(
      id,
      "Your Board",
      human.board,
      getHandleBlockClick(human, humanBoardRenderEvent),
      game.hasStarted,
      showShips,
    );

    if (!game.hasStarted) {
      boardEl.classList.add("show-ships");
    }

    const domBoardEl = battleShipEl.querySelector(`#${id}`);

    if (domBoardEl) {
      domBoardEl.replaceWith(boardEl);
    } else {
      battleShipEl.append(boardEl);
    }
  };

  const botBoardRenderEventName = "render-bot-board";
  const botBoardRenderEvent = new Event(botBoardRenderEventName);

  const renderBotBoardEl = () => {
    const id = "bot-board";
    const showShip = false;
    const boardEl = BoardEl(
      id,
      "Bot's Board",
      bot.board,
      getHandleBlockClick(bot, botBoardRenderEvent),
      game.hasStarted,
      showShip,
    );

    const domBoardEl = battleShipEl.querySelector(`#${id}`);

    if (domBoardEl) {
      domBoardEl.replaceWith(boardEl);
    } else {
      battleShipEl.append(boardEl);
    }
  };

  const handleRandomize = () => {
    human.placeShipsRandomly();
    renderHumanBoardEl();
  };

  const handleGameStart = () => {
    game.start();
    buttonsWrapperEl.remove();
    renderBotBoardEl();
    renderHumanBoardEl();
  };

  const randomizeButtonEl = ButtonEl(
    "Randomze",
    ["btns", "btns--randomize"],
    handleRandomize,
  );

  const startGameButtonEl = ButtonEl(
    "Start Game",
    ["btn", "btn--start"],
    handleGameStart,
  );

  // initial render
  renderHumanBoardEl();
  renderBotBoardEl();

  buttonsWrapperEl.append(randomizeButtonEl, startGameButtonEl);
  battleShipEl.append(buttonsWrapperEl);

  // listen for custom events
  battleShipEl.addEventListener(humanBoardRenderEventName, renderHumanBoardEl);
  battleShipEl.addEventListener(botBoardRenderEventName, renderBotBoardEl);

  return battleShipEl;
};

export default BattleshipEl;
