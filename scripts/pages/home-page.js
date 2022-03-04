import DOMHandler from "../dom-handler.js";
import STORE from "../store.js";
import { logout } from "../services/session-service.js";
import { listenerRedirect, root } from "../utils.js";
import LoginPage from "./login-page.js";
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
  STORE.setCurrentPage("home");
  
  const boards = STORE.boards;
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

// Creates object to export
const HomePage = {
  toString() {
    return render();
  },
  addListeners() {
    Sidebar.addListeners()
  },
  title: "home",
};

export default HomePage