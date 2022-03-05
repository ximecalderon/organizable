import DOMHandler from "../dom-handler.js";
import STORE from "../store.js";
import { root } from "../utils.js";
import { updateBoard, deleteBoard } from "../services/boards-service.js";
import Sidebar from "../components/sidebar.js";
import renderBoards from "../components/board.js";

function render() {
  STORE.setCurrentPage(ClosedBoardsPage.title);
  const boards = STORE.boards.filter(board => board.closed == true);

  return `
    ${Sidebar}
    <div id="main-content">
      <div class="content bg-gray-100">
        <h1 class="heading">Closed Boards</h1>
        <div class="board-cards">
          ${renderBoards(boards)}
        </div>
      </div>
    </div>
  `
};

function listenDeleteBoard() {
  const triggers = document.querySelectorAll(".js-delete")

  triggers.forEach(trigger => {
    trigger.addEventListener("click", async (event) => {
      event.preventDefault();
      const boardId = trigger.getAttribute('data-id');

      await deleteBoard(boardId);
      await STORE.fetchBoards();
      DOMHandler.reload();
    })
  })
};

// Creates object to export
const ClosedBoardsPage = {
  toString() {
    return render();
  },
  addListeners() {
    Sidebar.addListeners();
    listenDeleteBoard();
  },
  title: "closed_boards",
};

export default ClosedBoardsPage