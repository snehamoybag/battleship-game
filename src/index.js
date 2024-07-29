import HeaderEl from "./components/HeaderEl";
import "./index.css";

const bodyEl = document.body;
const headerEl = HeaderEl();
const mainEl = document.createElement("main");

bodyEl.append(headerEl, mainEl);
