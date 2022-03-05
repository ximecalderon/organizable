import DOMHandler from "../dom-handler.js";
import STORE from "../store.js";
import { root } from "../utils.js";
import { updateBoard } from "../services/boards-service.js";
import CreateBoardPopup from "./create-board.js";
import Sidebar from "../components/sidebar.js";
import renderBoards from "../components/board.js";

function renderStarred(starredBoards) {
  if (starredBoards.length != 0) {
    return `
    <h2 class="heading heading--sm">Starred Boards</h2>
    <div class="board-cards">
      ${renderBoards(starredBoards)}
    </div>
    `
  }
  return ""
};

function renderOthers(otherBoards) {
  return `
  <h2 class="heading heading--sm">Boards</h2>
  <div class="board-cards">
    ${renderBoards(otherBoards)}
    <div class="board-card new-board">
        <span>Create Board</span>
    </div>
  </div>
  `
};

function render() {
  STORE.setCurrentPage(HomePage.title);
  const boards = STORE.boards.filter(board => board.closed == false);

  const starredBoards = boards.filter(board => board.starred == true)
  const otherBoards = boards.filter(board => board.starred == false)

  return `
    ${Sidebar}
    <div id="main-content">
      <div class="content bg-gray-100">
        <h1 class="heading">My Boards</h1>
        ${renderStarred(starredBoards)}
        ${renderOthers(otherBoards)}
      </div>
    </div>
  `
};

function listenCreateBoard() {
  const trigger = document.querySelector(".new-board")

  trigger.addEventListener("click", event => {
    event.preventDefault();
    DOMHandler.addChild(CreateBoardPopup, root)
  })
};

function listenToggleFavorite() {
  const triggers = document.querySelectorAll(".js-favorite")

  triggers.forEach(trigger => {
    trigger.addEventListener("click", async (event) => {
      event.preventDefault();
      const boardId = trigger.getAttribute('data-id');
      const favorite = trigger.getAttribute('data-favorite');

      const updated = await updateBoard(boardId, { starred: (favorite == "true" ? false : true) });

      await STORE.fetchBoards();
      DOMHandler.reload();
    })
  })
};

function listenCloseBoard() {
  const triggers = document.querySelectorAll(".js-close")

  triggers.forEach(trigger => {
    trigger.addEventListener("click", async (event) => {
      event.preventDefault();
      const boardId = trigger.getAttribute('data-id');

      await updateBoard(boardId, { closed: true });
      await STORE.fetchBoards();
      DOMHandler.reload();
    })
  })
};

// Creates object to export
const HomePage = {
  toString() {
    return render();
  },
  addListeners() {
    Sidebar.addListeners();
    listenCreateBoard();
    listenCloseBoard();
    listenToggleFavorite();
  },
  title: "home",
};

export default HomePage