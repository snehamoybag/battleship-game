import Game from "../scripts/classes/Game";
import Player from "../scripts/classes/Player";
import BoardEl from "./BoardEl";
import ButtonEl from "./ButtonEl";
import "../styles/game.css";

// battleship component
const BattleshipEl = () => {
  const game = new Game();
  const human = new Player("Human");
  const bot = new Player("Bot");

  const battleShipEl = document.createElement("div");
  battleShipEl.classList.add("game");

  const buttonsWrapperEl = document.createElement("div");
  buttonsWrapperEl.classList.add("game__btns-wrapper");

  const getHandleBlockClick = (player, event) => {
    return (nthRow, nthColumn) => {
      player.recieveAttack(nthRow, nthColumn);
      battleShipEl.dispatchEvent(event);
    };
  };

  const humanBoardEventName = "render-human-board";
  const humanBoardRenderEvent = new Event(humanBoardEventName);
  const showShipsClassName = "show-ships";

  const renderHumanBoardEl = () => {
    const id = "human-board";
    const showShips = game.hasStarted === false;

    const boardEl = BoardEl(
      id,
      "Human's Board",
      human.board,
      getHandleBlockClick(human, humanBoardRenderEvent),
      game.hasStarted,
      showShips,
    );

    if (!game.hasStarted) {
      boardEl.classList.add(showShipsClassName);
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

  const handleGameStart = () => {};

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
  return battleShipEl;
};

export default BattleshipEl;
