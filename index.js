import { tokenKey } from "./scripts/config.js";
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

function App() {
  const token = sessionStorage.getItem(tokenKey);
  let module;

  if (!token) {
    if (["login", "signup"].includes(STORE.currentPage)) {
      module = router[STORE.currentPage];
    } else {
      module = LoginPage;
    }
    return DOMHandler.load(module, "#root");
  }

  // try {
  //   const { token, ...user } = await getUser();
  //   const lists = await getLists();
  //   console.log(user);
  //   STORE.setLists(lists);
  //   STORE.setUser(user);
  //   module = router[STORE.currentPage];
  // } catch (error) {
  //   console.log(error);
  //   sessionStorage.removeItem(tokenKey);
  //   module = LoginPage;
  // }

  module = router[STORE.currentPage];
  return DOMHandler.load(module, "#root");
}

App();

// DOMHandler.load(LoginPage, "#root");
