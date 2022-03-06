import DOMHandler from "../dom-handler.js";
import STORE from "../store.js";
import { createList, deleteList } from "../services/lists-services.js";
import { createCard, deleteCard } from "../services/cards-service.js";
import { renderNewListForm, renderLists } from "../components/list-utils.js";
import ListEditMode from "../components/list-edit-mode.js";
import { ColorCode, listenerRedirect, fromLocalStorage } from "../utils.js";
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

function listenCreateCard() {
  const forms = document.querySelectorAll(".js-new-card");

  forms.forEach(form => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const { name } = event.target
      const newCard = { name: name.value }
      const listId = event.target.closest(".list").getAttribute("data-id");

      await createCard(listId, newCard);
      await STORE.fetchCurrentBoard();
      DOMHandler.reload();
    })
  })
};

function listenDeleteCard() {
  const triggers = document.querySelectorAll(".js-card-delete");

  triggers.forEach(trigger => {
    trigger.addEventListener("click", async (event) => {
      event.preventDefault();

      const listId = event.target.closest(".list").getAttribute("data-id");
      const cardId = event.target.getAttribute("data-id");

      await deleteCard(listId, cardId);
      await STORE.fetchCurrentBoard();
      DOMHandler.reload();
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
    listenCreateCard();
    listenDeleteCard();
  },
  title: "lists_page",
};

export default ListsPage