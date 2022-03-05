import { fromLocalStorage, saveToLocalStorage } from "./utils.js";
import { getBoards } from "./services/boards-service.js"

async function fetchBoards() {
  const boards = await getBoards();
  this.boards = boards;
};

function getCurrentUser() {
  const user = fromLocalStorage("user")
  this.user = user
};

const STORE = {
  currentPage: fromLocalStorage("current-page") || "login",
  user: null,
  getCurrentUser,
  // currentBoardId: null,
  boards: [],
  fetchBoards,
  setUser(user) {
    saveToLocalStorage("user", user)
    this.user = user;
  },
  setCurrentPage(page) {
    saveToLocalStorage("current-page", page);
    this.currentPage = page;
  }
};

export default STORE;