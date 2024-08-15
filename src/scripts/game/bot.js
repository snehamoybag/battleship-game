import getRandomNumInRange from "../helpers/getRandomNumInRange";
import isInbound from "../helpers/isInbound";

const getRandomUnAttackedCordinate = (board) => {
  const minIndex = 0;
  const maxIndex = board.length - 1;

  let nthRow = 0;
  let nthColumnn = 0;

  // if the block is already attacked, we need to find a new block that is not attacked
  while (board[nthRow][nthColumnn].isAttacked) {
    nthRow = getRandomNumInRange(minIndex, maxIndex);
    nthColumnn = getRandomNumInRange(minIndex, maxIndex);
  }

  const unAttackedBlockCordinate = [nthRow, nthColumnn];
  return unAttackedBlockCordinate;
};

const isAttackSuccessful = (board, cordinate) => {
  if (!cordinate) return false;

  const [nthRow, nthColumn] = cordinate;
  const block = board[nthRow][nthColumn];

  return block.ship !== null;
};

const getBlockEl = (boardEl, cordinate) => {
  const dataSetValue = String(cordinate);
  return boardEl.querySelector(`[data-cordinate='${dataSetValue}']`);
};

const getShip = (board, cordinate) => {
  const [nthRow, nthColumn] = cordinate;
  return board[nthRow][nthColumn].ship;
};

const clickBlock = (blockEl, delay) => {
  // make sure click event happens after the custom event on block has been dispatched
  // making it async will to make sure all syncronous task run before the click event
  setTimeout(() => {
    blockEl.disabled = false;
    blockEl.click();
  }, delay);
};

const getPotentialShipCordinates = (cordinate, shipSize) => {
  if (!cordinate) return null;

  const directions = {
    top: [],
    bottom: [],
    left: [],
    right: [],
  };

  const [nthRow, nthColumn] = cordinate;

  // fill the directions
  for (let i = 1; i < shipSize; i++) {
    directions.top.push([nthRow - i, nthColumn]);
    directions.bottom.push([nthRow + i, nthColumn]);
    directions.left.push([nthRow, nthColumn - i]);
    directions.right.push([nthRow, nthColumn + i]);
  }

  return directions;
};

// states
let prevAttackCordinate = null;
let attackedShip = null;
let potentialShipCordinates = null;
let direction = "top";

const resetStates = () => {
  prevAttackCordinate = null;
  attackedShip = null;
  potentialShipCordinates = null;
  direction = "top";
};

const switchDirection = () => {
  switch (direction) {
    case "top":
      direction = "bottom";
      break;
    case "bottom":
      direction = "left";
      break;
    case "left":
      direction = "right";
      break;
    case "right":
      direction = "top";
      break;
    default:
      direction = "top";
      break;
  }
};

const attackInCurrentDirection = (board, boardEl, delay) => {
  if (!potentialShipCordinates) return;

  const attackInOppositeDirection = () => {
    switchDirection();
    attackInCurrentDirection(board, boardEl, delay);
  };

  const attackCordinate = potentialShipCordinates[direction][0];
  const isAttackCordinateInbound = isInbound(
    0,
    board.length - 1,
    attackCordinate,
  );

  if (!isAttackCordinateInbound) {
    attackInOppositeDirection();
    return;
  }

  const attackBlock = board[attackCordinate[0]][attackCordinate[1]];
  const attackBlockEl = getBlockEl(boardEl, attackCordinate);

  if (!attackBlockEl || attackBlock.isAttacked === true) {
    attackInOppositeDirection();
    return;
  }

  // if attacke block is valid
  clickBlock(attackBlockEl, delay);
  prevAttackCordinate = attackCordinate;
  potentialShipCordinates[direction].shift(); // remove the attack cordinate
};

// handle bot turn
const playBotTurn = (humanBoard, humanBoardEl, isGameOver, delay = 0) => {
  if (isGameOver) {
    return;
  }

  // first ever attack
  if (!prevAttackCordinate) {
    const randomCordinate = getRandomUnAttackedCordinate(humanBoard);
    const blockEl = getBlockEl(humanBoardEl, randomCordinate);

    clickBlock(blockEl, delay);
    prevAttackCordinate = randomCordinate;
    return;
  }

  const wasPreAttackSuccessful = isAttackSuccessful(
    humanBoard,
    prevAttackCordinate,
  );

  if (wasPreAttackSuccessful) {
    // get the ship that got hit in the previous attack
    if (!attackedShip) {
      attackedShip = getShip(humanBoard, prevAttackCordinate);
    }

    if (!potentialShipCordinates) {
      potentialShipCordinates = getPotentialShipCordinates(
        prevAttackCordinate,
        attackedShip.size,
      );
    }

    // if ship sank after previous attack, attack a new random block
    if (attackedShip.isSunk()) {
      resetStates();
      playBotTurn(humanBoard, humanBoardEl, isGameOver, delay);
      return;
    }
    // if ship did not sink, continue attack in the current direction
    if (!attackedShip.isSunk()) {
      attackInCurrentDirection(humanBoard, humanBoardEl, delay);
    }
  }

  if (!wasPreAttackSuccessful) {
    // if we were not attacking any ship
    if (!attackedShip) {
      resetStates();
      playBotTurn(humanBoard, humanBoardEl, isGameOver, delay);
      return;
    }

    // if we were attacking a ship
    if (attackedShip && !attackedShip.isSunk()) {
      switchDirection();
      attackInCurrentDirection(humanBoard, humanBoardEl, delay);
    }
  }
};

export default playBotTurn;
