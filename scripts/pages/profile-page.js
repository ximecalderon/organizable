import { input } from "../components/inputs.js";
import Sidebar from "../components/sidebar.js";
import STORE from "../store.js";

function render() {
  STORE.setCurrentPage(ProfilePage.title);
  const { errors } = ProfilePage.state;
  const user = STORE.user;

  return `
    ${Sidebar}
    <div id="main-content" class="flex flex-column gap-8">
      <h1 class="heading">My Profile</h1>
      <div class="container flex flex-column gap-8 items-center">
        <form action="" class="full-width container-sm flex flex-column gap-4">
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
    id: "first_name",
    name: "first_name",
    placeholder: "First Name",
    value: user.first_name,
    icon: "/assets/icons/data.svg",
    error: errors.first_name,
  })}
          ${input({
    label: "Last name",
    id: "last_name",
    name: "last_name",
    placeholder: "Last Name",
    value: user.last_name,
    icon: "/assets/icons/data.svg",
    error: errors.last_name,
  })}
          <button type="submit" class="button button--primary width-full">
            Update Profile
          </button>
          <button type="button" class="button button--secondary width-full">
            Delete My Account
          </button>
        </form>
      </div>
    </div>
  `
};

// Creates object to export
const ProfilePage = {
  toString() {
    return render();
  },
  addListeners() {
    Sidebar.addListeners();

  },
  title: "my_profile",
  state: {
    errors: {},
  }
};

export default ProfilePage