function renderCard(card) {
  return `
  <div class="card" data-id="${card.cardId}">
    <p>${card.name}</p>
    <img src="/assets/icons/trash.svg" alt="trash" />
  </div>
  `
}

export function renderCards(cards) {
  if (cards.length != 0) {
    return `
    <div class="card-list js-list-container">
      ${cards.map(renderCard).join("")}
    </div>
  `}
  return ""
}

export function renderNewCardForm() {
  return `
  <form action="" class="card-form">
    <input
      type="text"
      class="card-form__input"
      placeholder="new card"
    />
    <button
      class="button button--secondary button--sm button--only-icon"
    >
      <img
        src="/assets/icons/add.svg"
        alt="add icon"
        class="button__icon"
      />
    </button>
  </form>
  `
}