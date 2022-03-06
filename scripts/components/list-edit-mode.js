import DOMHandler from "../dom-handler.js";
import STORE from "../store.js";
import ListsPage from "../pages/lists-page.js";
import { fromLocalStorage, root } from "../utils.js";
import { updateList } from "../services/lists-services.js";

function render() {
  const list = STORE.currentList;

  return `
    <form action="" class="card-form js-list-update" data-id="${list.listId}">
      <input
        type="text"
        id="name"
        name="name"
        class="card-form__input"
        placeholder="Edit mode"
        value="${list.name}"
      />
      <button
        type="submit" class="button button--secondary button--sm button--only-icon"
      >
        <img
          src="/assets/icons/tick.svg"
          alt="add icon"
          class="button__icon"
        />
      </button>
      <button
        class="button button--subtle-2 button--sm button--only-icon js-cancel"
      >
        <img
          src="/assets/icons/cross.svg"
          alt="add icon"
          class="button__icon"
        />
      </button>
    </form>
  `
}

function listenUpdateList() {
  const form = document.querySelector(".js-list-update");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const { name } = event.target;
      const updateData = { name: name.value };

      const boardId = fromLocalStorage("current-boardID");
      const listId = event.target.getAttribute("data-id");

      await updateList(boardId, listId, updateData);
      await STORE.fetchCurrentBoard();

      DOMHandler.load(ListsPage, root);
    } catch (error) {
      console.log(error)
    }
  })
};

function listenCancelEdit() {
  const trigger = document.querySelector(".js-cancel")

  trigger.addEventListener("click", event => {
    event.preventDefault();

    DOMHandler.load(ListsPage, root);
  })
};

const ListEditMode = {
  toString() {
    return render();
  },
  addListeners() {
    listenUpdateList();
    listenCancelEdit()
  }
};

export default ListEditMode