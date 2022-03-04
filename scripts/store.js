import { fromLocalStorage, saveToLocalStorage } from "./utils.js";
import { getBoards } from "./services/boards-service.js"

async function fetchBoards() {
  const boards = await getBoards();

  this.boards = boards;
  this.starredBoards = boards.filter(
    (board) => board.starred
  );
}

const STORE = {
  currentPage: fromLocalStorage("current-page") || "login",
  user: null,
  // currentBoardId: null,
  boards: [],
  fetchBoards,
  setUser(user) {
    this.user = user;
  },
  setCurrentPage(page) {
    saveToLocalStorage("current-page", page);
    this.currentPage = page;
  }
};

export default STORE;