import { listenerRedirect } from "../utils.js";
import { logout } from "../services/session-service.js";
import STORE from "../store.js";
import DOMHandler from "../dom-handler.js";
import HomePage from "../pages/home-page.js";
import ClosedBoardsPage from "../pages/closed-boards.js";
import LoginPage from "../pages/login-page.js";

function renderOption({ id, title, icon }) {
  return `
    <li id="${id}" class="option ${STORE.currentPage == id ? 'selected' : ''}">
      <img src="${icon}" alt="${id}-icon" class="icon">
      <span>${title}</span>
    </li>
  `
}

function render() {
  return `
    <aside class="aside">
      <div>
          <div class="logo-container">
              <img src="/assets/images/logo.png" alt="organizable-logo" class="logo">
          </div>
          <ul>
            ${renderOption({ id: "home", title: "My Boards", icon: "/assets/icons/boards.svg" })}
            ${renderOption({ id: "closed_boards", title: "Closed Boards", icon: "/assets/icons/box.svg" })}
            ${renderOption({ id: "my_profile", title: "My Profile", icon: "/assets/icons/user.svg" })}
          </ul>
      </div>
      <div class="option option-exit js-logout">
          <img src="/assets/icons/exit.svg" alt="user-icon" class="icon">
          <span class="primary-500">Logout</span>
      </div>
    </aside>
  `
}

function listenLogout() {
  const trigger = document.querySelector(".js-logout");

  trigger.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      await logout();
      STORE.user = null;

      DOMHandler.load(LoginPage, root);
    } catch (error) {
      console.log(error);
    }
  })
};

// Creates object to export
const Sidebar = {
  toString() {
    return render();
  },
  addListeners() {
    listenLogout();
    listenerRedirect("#home", HomePage);
    listenerRedirect("#closed_boards", ClosedBoardsPage);
    // listenerRedirect("#my-profile", ProfilePage)
  }
}

export default Sidebar