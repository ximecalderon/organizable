import DOMHandler from "../dom-handler.js";
import STORE from "../store.js";
import { createList } from "../services/lists-services.js";
import { renderNewListForm, renderLists } from "../components/lists.js";
import { root, ColorCode, listenerRedirect, fromLocalStorage } from "../utils.js";
import HomePage from "./home-page.js";

function render() {
  STORE.setCurrentPage(ListsPage.title);
  const board = STORE.currentBoard;
  const lists = board.lists;

  return `
  <header class="bg-gray-100 full-width flex justify-center p-y-3">
    <div class="flex justify-center gap-4 js-return">
      <img src="/assets/icons/arrow.svg" alt="">
      <img src="/assets/images/logo.png" alt="organizable logo" />
    </div>
  </header>
  <section class="board-view ${ColorCode[board.color]}">
    <h1 class="heading">${board.name}</h1>
    <div class="todo-lists">
      ${renderLists(lists)}
      ${renderNewListForm()}
    </div>
  </section>
  `
};

async function listeReturn() {
  await STORE.fetchBoards();
  listenerRedirect(".js-return", HomePage);
};

function listenNewList() {
  const form = document.querySelector(".js-new-list");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const { name } = event.target;

      const boardId = fromLocalStorage("current-boardID")
      const newList = { name: name.value }

      await createList(boardId, newList);
      DOMHandler.reload();
    } catch (error) {
      console.log(error)
    }
  })
}

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