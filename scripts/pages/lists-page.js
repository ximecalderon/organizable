import DOMHandler from "../dom-handler.js";
import STORE from "../store.js";
import { createList, deleteList } from "../services/lists-services.js";
import { renderNewListForm, renderLists } from "../components/lists.js";
import ListEditMode from "../components/list-edit-mode.js";
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
      const listPos = STORE.currentBoard.lists.length;
      const boardId = fromLocalStorage("current-boardID");

      const newList = { name: name.value, pos: listPos };

      await createList(boardId, newList);
      await STORE.fetchCurrentBoard();
      DOMHandler.reload();
    } catch (error) {
      console.log(error)
    }
  })
};

function listenEditList() {
  const triggers = document.querySelectorAll(".js-list-edit");

  triggers.forEach(trigger => {
    trigger.addEventListener("click", async (event) => {
      event.preventDefault();
      const listId = event.target.getAttribute("data-id");
      const header = document.getElementById(`list-${listId}`)

      STORE.setCurrentList(listId);
      DOMHandler.load(ListEditMode, header)
    })
  })
};

function listenDeleteList() {
  const triggers = document.querySelectorAll(".js-list-delete");

  triggers.forEach(trigger => {
    trigger.addEventListener("click", async (event) => {
      event.preventDefault();
      try {
        const boardId = fromLocalStorage("current-boardID");
        const listId = event.target.getAttribute("data-id");

        await deleteList(boardId, listId);
        await STORE.fetchCurrentBoard();
        DOMHandler.reload();
      } catch (error) {
        console.log(error)
      }
    })
  })
};

// Creates object to export
const ListsPage = {
  toString() {
    return render();
  },
  addListeners() {
    listeReturn();
    listenNewList();
    listenEditList();
    listenDeleteList();
  },
  title: "lists_page",
};

export default ListsPage