import { input } from "../components/inputs.js";
import Sidebar from "../components/sidebar.js";
import STORE from "../store.js";
import DOMHandler from "../dom-handler.js";
import { root } from "../utils.js";
import { updateUser, deleteUser } from "../services/user-service.js";
import LoginPage from "./login-page.js";

function render() {
  STORE.setCurrentPage(ProfilePage.title);
  const { errors } = ProfilePage.state;
  const user = STORE.user;
  return `
    ${Sidebar}
    <div id="main-content" class="flex flex-column gap-8">
      <h1 class="heading">My Profile</h1>
      <div class="container flex flex-column gap-8 items-center">
        <form action="" class="js-update full-width container-sm flex flex-column gap-4">
          ${input({
    label: "username",
    id: "username",
    name: "username",
    placeholder: "username",
    required: "required",
    value: user.username,
    icon: "/assets/icons/user.svg",
    error: errors.username,
  })}
          ${input({
    label: "Email",
    id: "email",
    name: "email",
    placeholder: "email@example.com",
    required: "required",
    value: user.email,
    icon: "/assets/icons/mail.svg",
    error: errors.mail,
  })}
          ${input({
    label: "First name",
    id: "firstName",
    name: "firstName",
    placeholder: "First Name",
    value: user.firstName,
    icon: "/assets/icons/data.svg",
    error: errors.firstName,
  })}
          ${input({
    label: "Last name",
    id: "lastName",
    name: "lastName",
    placeholder: "Last Name",
    value: user.lastName,
    icon: "/assets/icons/data.svg",
    error: errors.lastName,
  })}
          <button type="submit" class="button button--primary width-full">
            Update Profile
          </button>
          <button type="button" class="js-delete-user button button--secondary width-full">
            Delete My Account
          </button>
        </form>
      </div>
    </div>
  `
};

function listenUpdateUser() {
  const form = document.querySelector(".js-update");

  form.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
      const { username, email, first_name, last_name } = event.target;

      const updatedData = {
        username: username.value,
        email: email.value,
        first_name: firstName.value,
        last_name: lastName.value,
      };

      const userId = STORE.user.id;
      const updatedUser = await updateUser(userId, updatedData);

      STORE.setUser(updatedUser);
      DOMHandler.reload();
    } catch (error) {
      console.log(error)
      ProfilePage.state.errors = error.message;
      DOMHandler.reload();
    }
  })
};

function listenDeleteUser() {
  const trigger = document.querySelector(".js-delete-user");

  trigger.addEventListener("click", async (event) => {
    event.preventDefault();
    const userId = STORE.user.id;

    const confirmation = confirm("\nThis is an irreversible action.\nAre you sure you want to continue?");

    if (confirmation) {
      await deleteUser(userId);
      STORE.setUser(null);
      DOMHandler.load(LoginPage, root);
    }
  })
};

// Creates object to export
const ProfilePage = {
  toString() {
    return render();
  },
  addListeners() {
    Sidebar.addListeners();
    listenUpdateUser();
    listenDeleteUser();
  },
  title: "my_profile",
  state: {
    errors: {},
  }
};

export default ProfilePage