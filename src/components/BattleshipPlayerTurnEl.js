const BattleshipPlayerTurnEl = (id, playerName = "") => {
  const playerTurnEl = document.createElement("h2");
  playerTurnEl.classList.add("game__player-turn");
  playerTurnEl.id = id;

  const capitalized =
    playerName.slice(0, 1).toUpperCase() + playerName.slice(1);

  playerTurnEl.textContent = `${capitalized}'s Turn`;

  return playerTurnEl;
};

export default BattleshipPlayerTurnEl;
