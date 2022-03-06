import { fromLocalStorage, saveToLocalStorage } from "./utils.js";
import { getBoards, getBoard } from "./services/boards-service.js"
import { getUser } from "./services/user-service.js"

async function fetchBoards() {
  const boards = await getBoards();
  this.boards = boards;
};

async function fetchCurrentBoard() {
  const boardId = fromLocalStorage("current-boardID");

  const currentBoard = await getBoard(boardId);
  this.currentBoard = currentBoard;
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
  currentBoard: null,
  setCurrentBoardId(id) {
    saveToLocalStorage("current-boardID", id)
  },
  fetchCurrentBoard,
  fetchBoards,
  setUser(user) {
    saveToLocalStorage("user", user)
    this.user = user;
  },
  currentList: null,
  setCurrentList(id) {
    const list = this.currentBoard.lists.find(list => list.listId == id)
    this.currentList = list;
  },
  setCurrentPage(page) {
    saveToLocalStorage("current-page", page);
    this.currentPage = page;
  }
};

export default STORE;