import Game from "../scripts/classes/Game";
import Player from "../scripts/classes/Player";
import BattleshipPlayerTurnEl from "./BattleshipPlayerTurnEl";
import BoardEl from "./BoardEl";
import BattleshipButtonEls from "./BattleshipButtonEls";
import GameOverEl from "./GameOverEl";
import playBotTurn from "../scripts/game/bot";
import "../styles/game.css";
import "../styles/btn.css";

// battleship component
const BattleshipEl = () => {
  const game = new Game();
  const human = new Player("Human");
  const bot = new Player("Bot");

  game.currentPlayer = human;

  const switchCurrentPlayer = () => {
    const prevPlayer = game.currentPlayer;
    game.currentPlayer = prevPlayer === human ? bot : human;
  };

  const battleShipEl = document.createElement("div");
  battleShipEl.classList.add("game");

  const boardsEl = document.createElement("div");
  boardsEl.classList.add("game__boards");

  const renderEventName = "render";
  const renderEvent = new CustomEvent(renderEventName, { bubbles: true });

  const renderPlayerTurnEl = () => {
    const id = "player-turn";
    let turnText = "";

    if (game.hasStarted) {
      turnText = game.currentPlayer === human ? "Your Turn" : "Bot's Turn";
    } else {
      turnText = "Take Positions";
    }

    const playerTurnEl = BattleshipPlayerTurnEl(id, turnText);
    const domPlayerTurnEl = battleShipEl.querySelector(`#${id}`);

    if (domPlayerTurnEl) {
      domPlayerTurnEl.replaceWith(playerTurnEl);
    } else {
      battleShipEl.prepend(playerTurnEl);
    }
  };

  const handleGameRestart = () => location.reload();

  const handleGameOver = () => {
    const winner = game.currentPlayer;
    const winnerText = winner === human ? "You Win!" : "You Lose!";
    const ONE_SECOND = 1000;

    setTimeout(() => {
      battleShipEl.append(GameOverEl(winnerText, handleGameRestart));
    }, ONE_SECOND);
  };

  const getHandleBlockClick = (player) => {
    return (nthRow, nthColumn) => {
      player.recieveAttack(nthRow, nthColumn);

      const attackedShip = player.board[nthRow][nthColumn].ship;
      const didAttackHitAShip = attackedShip !== null;

      const isGameOver = player.numberOfShipsLeft === 0;
      game.isOVer = isGameOver; // update game state

      if (!isGameOver && !didAttackHitAShip) {
        switchCurrentPlayer();
      }

      battleShipEl.dispatchEvent(renderEvent);

      if (isGameOver) handleGameOver();
    };
  };

  const humanBoardId = "human-board";
  const renderHumanBoardEl = () => {
    const enableBlockClick = false; // prevent clicking own board by mistake
    const showShips = true;

    const boardEl = BoardEl(
      humanBoardId,
      "Your Board",
      human.numberOfShipsLeft,
      human.board,
      enableBlockClick,
      getHandleBlockClick(human),
      game.hasStarted,
      showShips,
    );

    const domBoardEl = boardsEl.querySelector(`#${humanBoardId}`);

    if (domBoardEl) {
      domBoardEl.replaceWith(boardEl);
    } else {
      boardsEl.append(boardEl);
    }
  };

  const botBoardId = "bot-board";
  const renderBotBoardEl = () => {
    const enableClick = game.currentPlayer === human;
    const showShip = false;

    const boardEl = BoardEl(
      botBoardId,
      "Bot's Board",
      bot.numberOfShipsLeft,
      bot.board,
      enableClick,
      getHandleBlockClick(bot),
      game.hasStarted,
      showShip,
    );

    const domBoardEl = boardsEl.querySelector(`#${botBoardId}`);

    if (domBoardEl) {
      domBoardEl.replaceWith(boardEl);
    } else {
      boardsEl.append(boardEl);
    }
  };

  const handleBotTurn = () => {
    const humanBoardDomEl = document.querySelector(`#${humanBoardId}`);
    const ONE_SECOND = 1000;

    playBotTurn(human.board, humanBoardDomEl, game.isOVer, ONE_SECOND);
  };

  const handleRandomize = () => {
    human.placeShipsRandomly();
    renderHumanBoardEl();
  };

  const handleGameStart = () => {
    game.start();
    renderPlayerTurnEl();
    renderHumanBoardEl();
    renderBotBoardEl();
  };

  const buttonEls = BattleshipButtonEls(
    handleRandomize,
    handleGameStart,
    handleGameRestart,
  );

  battleShipEl.append(boardsEl, buttonEls);

  // initial render
  renderPlayerTurnEl();
  renderHumanBoardEl();
  renderBotBoardEl();

  // listen for custom events
  battleShipEl.addEventListener(renderEventName, () => {
    renderPlayerTurnEl();
    renderHumanBoardEl();
    renderBotBoardEl();

    if (game.currentPlayer === bot) {
      handleBotTurn();
    }
  });

  return battleShipEl;
};

export default BattleshipEl;
