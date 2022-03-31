import DOMHandler from "../dom-handler.js";
import HomePage from "./home-page.js";
import STORE from "../store.js";
import { root, ColorCode } from "../utils.js";
import { createBoard } from "../services/boards-service.js"
import { radio } from "../components/inputs.js"

function renderColorOptions() {
  return Object.keys(ColorCode).reduce((HTMLstring, color) => {
    return HTMLstring + radio({ name: "color", value: color, classList: ColorCode[color], defaultInput: "lime" })
  }, "")
}

function render() {
  return `
  <div class="board-edit-view">
  <div class="popup">
      <form class="board-form__container">
          <div id="js-new-board" class="board-card bg-green-100">
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
      <img class="close" src="assets/icons/close-white.svg" alt="close icon">
  </div>
</div>
  `
};

function listenColorSelected() {
  const colorRadios = document.querySelectorAll("input[type='radio']");

  colorRadios.forEach(colorRadio => {
    colorRadio.addEventListener("change", () => {
      const newBoardCard = document.getElementById("js-new-board");
      newBoardCard.classList.replace(newBoardCard.classList.item(1), ColorCode[colorRadio.value])
    })
  })
}

function listenSubmit() {
  const form = document.querySelector(".board-form__container");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    let response;
    try {
      const { name, color } = event.target

      const newBoard = {
        name: name.value,
        color: color.value ? color.value : "blue"
      }
      response = await createBoard(newBoard);

      await STORE.fetchBoards();
      DOMHandler.load(HomePage, root)
    } catch (error) {
      console.log(error)
    };
  })
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
    listenCancel();
    listenColorSelected();
    listenSubmit();
  },
  title: "create-board",
  state: {
    errors: null,
  }
}

export default CreateBoardPopup