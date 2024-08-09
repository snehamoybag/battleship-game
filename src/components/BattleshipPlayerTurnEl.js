const BattleshipPlayerTurnEl = (id, text) => {
  const playerTurnEl = document.createElement("h2");
  playerTurnEl.classList.add("game__player-turn");
  playerTurnEl.id = id;
  playerTurnEl.textContent = text;

  return playerTurnEl;
};

export default BattleshipPlayerTurnEl;
