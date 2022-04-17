import DOMHandler from "../dom-handler.js";
import { input } from "../components/inputs.js";
import { login } from "../services/session-service.js";
import { listenerRedirect, root } from "../utils.js";
import SignupPage from "./signup-page.js";
import HomePage from "./home-page.js";
import STORE from "../store.js";

function displayErrors(errors) {
  if (errors) {
    return `<span class="input__error-message">${errors}</span>`
  }
  return ""
};

function render() {
  STORE.setCurrentPage(LoginPage.title);
  const { errors } = LoginPage.state;

  return `
    <section class="section-full bg-gray-100">
      <div class="container flex flex-column gap-8 items-center">
        <img src="assets/images/logo.png" alt="organizable logo" />
        <h1 class="heading">Login</h1>
        <form action="" class="full-width container-sm flex flex-column gap-4 js-login-form">
          ${input({
    label: "username",
    id: "username",
    name: "username",
    placeholder: "username",
    required: "required",
    icon: "assets/icons/user.svg",
  })}
                  ${input({
    type: "password",
    label: "password",
    id: "password",
    name: "password",
    placeholder: "******",
    required: "required",
    icon: "assets/icons/key.svg",
  })}
          <button type="submit" class="button button--secondary width-full">
            Login
          </button>
          ${displayErrors(errors)}
        </form>
        <a href="" class="to-signup">Create Account</a>
      </div>
    </section>
  `
}

// Creates functions for page listeners
function listenLogin() {
  const loginForm = document.querySelector(".js-login-form");

  loginForm.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
      const { username, password } = event.target;

      const data = {
        username: username.value,
        password: password.value,
      };

      const user = await login(data);
      STORE.setUser(user);

      await STORE.fetchBoards();

      DOMHandler.load(HomePage, root);
    } catch (error) {
      const response = JSON.parse(error.message);
      LoginPage.state.errors = response.message;
      DOMHandler.reload();
    }
  })
}

// Creates object to export
const LoginPage = {
  toString() {
    return render();
  },
  addListeners() {
    listenLogin();
    listenerRedirect(".to-signup", SignupPage);
  },
  title: "login",
  state: {
    errors: null,
  }
}

export default LoginPage