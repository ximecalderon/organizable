import DOMHandler from "../dom-handler.js";
import { input } from "../components/inputs.js";
import { signup } from "../services/user-service.js";
import { listenerRedirect, root } from "../utils.js";
import LoginPage from "./login-page.js";
import HomePage from "./home-page.js";
import STORE from "../store.js";

function render() {
  STORE.setCurrentPage(SignupPage.title);
  const { errors } = SignupPage.state

  return `
    <section class="section-full bg-gray-100">
      <div class="container flex flex-column gap-8 items-center">
        <img src="/assets/images/logo.png" alt="rankable logo" />
        <h1 class="heading">Create Account</h1>
        <form action="" class="full-width container-sm flex flex-column gap-4 js-signup-form">
          ${input({
    label: "username",
    id: "username",
    name: "username",
    placeholder: "username",
    required: "required",
    icon: "/assets/icons/user.svg",
    error: errors.username
  })}
          ${input({
    type: "email",
    label: "email",
    id: "email",
    name: "email",
    placeholder: "email@example.com",
    required: "required",
    icon: "/assets/icons/mail.svg",
    error: errors.email
  })}
          ${input({
    label: "first name",
    id: "first_name",
    name: "first_name",
    placeholder: "First Name",
    icon: "/assets/icons/data.svg",
    error: errors.first_name
  })}
          ${input({
    label: "last name",
    id: "last_name",
    name: "last_name",
    placeholder: "Last Name",
    icon: "/assets/icons/data.svg",
    error: errors.last_name
  })}
          ${input({
    type: "password",
    label: "password",
    id: "password",
    name: "password",
    placeholder: "*******",
    required: "required",
    icon: "/assets/icons/key.svg",
    error: errors.password
  })}
          <button type="submit" class="button button--secondary width-full">
            Create account
          </button>
        </form>
        <a href="" class="to-login">Login</a>
      </div>
    </section>
  `
}

// Creates functions for page listeners
function listenSignup() {
  const loginForm = document.querySelector(".js-signup-form");

  loginForm.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
      const { username, email, first_name, last_name, password } = event.target;

      const newUser = {
        username: username.value,
        email: email.value,
        first_name: first_name.value,
        last_name: last_name.value,
        password: password.value,
      };
      const user = await signup(newUser);
      STORE.setUser(user);

      DOMHandler.load(HomePage, root)
    } catch (error) {
      console.log(error)
      SignupPage.state.errors = error.message;
      DOMHandler.reload();
    }
  })
}

// Creates object to export
const SignupPage = {
  toString() {
    return render();
  },
  addListeners() {
    listenSignup();
    listenerRedirect(".to-login", LoginPage);
  },
  title: "signup",
  state: {
    errors: {}
  }
}

export default SignupPage