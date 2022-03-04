import DOMHandler from "../dom-handler.js";
import HomePage from "./home-page.js";
import { root } from "../utils.js";

function renderColorOption(colorClass) {
  return `
  <div class="color-option ${colorClass}"></div>
  `
};

function renderColorOptions() {
  const colorClasses = ["bg-green-100", "bg-melon", "bg-blue", "bg-orange", "bg-violet", "bg-pink", "bg-green-200", "bg-gray", "bg-cyan"];

  return colorClasses.map(renderColorOption).join("")
}

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
            ${renderColorOptions()}
          </div>
      </form>
      <img class="close" src="/assets/icons/close-white.svg" alt="close icon">
  </div>
</div>
  `
};

function listenSelectColor() {
  const colors = document.querySelectorAll(".color-option");

  colors.forEach(color => {
    color.addEventListener("click", event => {
      event.preventDefault();
      const selectedColor = Array.from(colors).find(color => color.classList.contains("selected"));

      if (selectedColor) {
        selectedColor.classList.remove("selected");
        event.target.classList.add("selected");
      } else {
        event.target.classList.add("selected");
      }
    })
  })
};

// function listenSubmit() {
//   const form = document.querySelector(".board-form__container");

//   form.addEventListener("submit", event => {

//   })
// };

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
    listenCancel();
    listenSelectColor();
  },
  title: "create-board",
  state: {
    errors: null,
  }
}

export default CreateBoardPopup