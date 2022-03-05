import { fromLocalStorage, saveToLocalStorage } from "./utils.js";
import { getBoards } from "./services/boards-service.js"
import { getUser } from "./services/user-service.js"

async function fetchBoards() {
  const boards = await getBoards();
  this.boards = boards;
};

async function getCurrentUser() {
  const userId = fromLocalStorage("user").id
  const user = await getUser(userId)
  
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