import { tokenKey } from "./scripts/config.js";
import { root } from "./scripts/utils.js";
import SignupPage from "./scripts/pages/signup-page.js";
import LoginPage from "./scripts/pages/login-page.js";
import HomePage from "./scripts/pages/home-page.js";
import DOMHandler from "./scripts/dom-handler.js";
import STORE from "./scripts/store.js";

const router = {
  login: LoginPage,
  signup: SignupPage,
  home: HomePage,
};

async function App() {
  const token = sessionStorage.getItem(tokenKey);
  let module;

  if (!token) {
    if (["login", "signup"].includes(STORE.currentPage)) {
      module = router[STORE.currentPage];
    } else {
      module = LoginPage;
    }
    return DOMHandler.load(module, root);
  }

  if (["home"].includes(STORE.currentPage)) {
    await STORE.fetchBoards();
    module = router[STORE.currentPage];

    return DOMHandler.load(module, root);
  }
}

await App();

// DOMHandler.load(LoginPage, "#root");
