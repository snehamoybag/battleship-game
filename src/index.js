import HeaderEl from "./components/HeaderEl";
import BattleshipEl from "./components/BattleshipEl";
import "./index.css";

const bodyEl = document.body;
const headerEl = HeaderEl();

const battleShipEl = BattleshipEl();

const mainEl = document.createElement("main");
mainEl.append(battleShipEl);

bodyEl.append(headerEl, mainEl);
