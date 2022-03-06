import { renderCards, renderNewCardForm } from "./card.js";

export function renderNewListForm() {
  return `
    <div class="list">
    <div class="list__header">
      <form action="" class="card-form js-new-list">
        <input
          type="text"
          id="name"
          name="name"
          class="card-form__input"
          placeholder="new list"
          required="required"
        />
        <button 
          type="submit"
          class="button button--secondary button--sm button--only-icon"
        >
          <img
            src="/assets/icons/add.svg"
            alt="add icon"
            class="button__icon"
          />
        </button>
      </form>
    </div>
  </div>
  `
};

export function listHeader(list) {
  return `
  <h2 class="heading heading--xs">${list.name}</h2>
  <div class="flex gap-4">
    <img src="/assets/icons/edit.svg" alt="edit" class="js-list-edit" data-id="${list.listId}"/>
    <img src="/assets/icons/trash.svg" alt="trash" class="js-list-delete" data-id="${list.listId}" />
  </div>`
};

function renderList(list) {
  const cards = list.cards;

  return `
    <div class="list" data-id="${list.listId}">
      <div id="list-${list.listId}" class="list__header">
        ${listHeader(list)}
      </div>
      <hr class="full-width m-0" />
      ${renderCards(cards)}
      ${renderNewCardForm()}
    </div>
  `
}

export function renderLists(lists) {
  if (lists.length != 0) {
    return `
      ${lists.map(renderList).join("")}
  `}
  return ""
}