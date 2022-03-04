import DOMHandler from "../dom-handler.js";
import HomePage from "./home-page.js";
import { root } from "../utils.js";

function render() {
  return `
  <div class="board-edit-view">
  <div class="popup">
      <form class="board-form__container">
          <div class="board-card bg-green-100">
              <div class="board__input-container ">
                  <input
                      type="text"
                      placeholder="Board Name"
                      class="input__content"
                      id="name"
                      name="name"
                      required
                  />
              </div>
              <div class="board-card__footer">
                  <button type="submit" class="button button--sm button--subtle">Create</button>
              </div>
          </div>
          <div class="palette__options">
              <div class="color-option bg-green-100"></div>
              <div class="color-option bg-melon"></div>
              <div class="color-option bg-blue"></div>
              <div class="color-option bg-orange"></div>
              <div class="color-option bg-violet"></div>
              <div class="color-option bg-pink"></div>
              <div class="color-option bg-green-200"></div>
              <div class="color-option bg-gray"></div>
              <div class="color-option bg-cyan"></div>
          </div>
      </form>
      <img class="close" src="/assets/icons/close-white.svg" alt="close icon">
  </div>
</div>
  `
};

function listenCancel() {
  const trigger = document.querySelector(".close");

  trigger.addEventListener("click", event => {
    event.preventDefault();
    DOMHandler.load(HomePage, root)
  })
};

// Creates object to export
const CreateBoardPopup = {
  toString() {
    return render();
  },
  addListeners() {
    listenCancel()
  },
  title: "create-board",
  state: {
    errors: null,
  }
}

export default CreateBoardPopup