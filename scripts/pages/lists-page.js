import DOMHandler from "../dom-handler.js";
import STORE from "../store.js";
import { input } from "../components/inputs.js";
import { root, ColorCode, listenerRedirect } from "../utils.js";
import HomePage from "./home-page.js";

function render() {
  STORE.setCurrentPage(ListsPage.title);
  const board = STORE.currentBoard;

  return `
  <header class="bg-gray-100 full-width flex justify-center p-y-3">
    <div class="flex justify-center gap-4 js-return">
      <img src="/assets/icons/arrow.svg" alt="">
      <img src="/assets/images/logo.png" alt="organizable logo" />
    </div>
  </header>
  <section class="board-view ${ColorCode[board.color]}">
    <p>hola desde el board ${board.id}</p>
  </section>
  `
};

async function listeReturn() {
  await STORE.fetchBoards();
  listenerRedirect(".js-return", HomePage);
};

// Creates object to export
const ListsPage = {
  toString() {
    return render();
  },
  addListeners() {
    listeReturn();
  },
  title: "lists_page",
};

export default ListsPage