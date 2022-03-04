import { listenerRedirect } from "../utils.js";
import STORE from "../store.js";

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
            ${renderOption({ id: "closed-boards", title: "Closed Boards", icon: "/assets/icons/box.svg" })}
            ${renderOption({ id: "my-profile", title: "My Profile", icon: "/assets/icons/user.svg" })}
          </ul>
      </div>
      <div class="option option-exit">
          <img src="/assets/icons/exit.svg" alt="user-icon" class="icon">
          <span class="primary-500">Logout</span>
      </div>
    </aside>
  `
}

// Creates object to export
const Sidebar = {
  toString() {
    return render();
  },
  addListeners() {
    listenerRedirect("#home", HomePage)
    // listenerRedirect("#closed-boards", ClosedBoardsPage)
    // listenerRedirect("#my-profile", ProfilePage)
  }
}

export default Sidebar