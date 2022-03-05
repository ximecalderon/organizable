import { ColorCode } from "../utils.js";

function renderOptions(board) {
  if (board.closed) {
    return `
    <div class="board-card__button js-restore" data-id="${board.id}">
      <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.35564 5.35296L3.65146 3.06001L4.50479 2.20775V3.41379V10.9998C4.50479 11.1322 4.55745 11.2593 4.65138 11.3531C4.74534 11.447 4.8729 11.4998 5.00604 11.4998C5.13919 11.4998 5.26675 11.447 5.3607 11.3531C5.45464 11.2593 5.5073 11.1322 5.5073 10.9998V3.41379V2.20775L6.36063 3.06001L8.65292 5.34943C8.74713 5.43901 8.8727 5.48861 9.00311 5.48748C9.13473 5.48634 9.26052 5.4336 9.35341 5.34083C9.44627 5.24808 9.49884 5.12274 9.49998 4.99184C9.50111 4.86214 9.45166 4.73703 9.36201 4.64298L5.36065 0.646614C5.2667 0.552809 5.13916 0.5 5.00604 0.5C4.87293 0.5 4.74539 0.552809 4.65144 0.646614L0.646539 4.64651C0.646521 4.64653 0.646503 4.64654 0.646485 4.64656C0.552617 4.74037 0.5 4.86743 0.5 4.99979C0.5 5.13212 0.552597 5.25916 0.646432 5.35296H1.35564ZM1.35564 5.35296C1.35563 5.35298 1.35561 5.35299 1.35559 5.35301M1.35564 5.35296L1.35559 5.35301M1.35559 5.35301C1.26164 5.44678 1.13413 5.49957 1.00104 5.49957M1.35559 5.35301L1.00104 5.49957M1.00104 5.49957C0.867973 5.49957 0.74048 5.4468 0.646539 5.35307L1.00104 5.49957Z" fill="#303036" stroke="#5C5C5C"/>
      </svg>
    </div>
    <div class="board-card__button js-delete" data-id="${board.id}">
      <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.8333 4.83333L13.1105 14.9521C13.0482 15.8243 12.3225 16.5 11.4481 16.5H4.55178C3.67739 16.5 2.95165 15.8243 2.88935 14.9521L2.16659 4.83333M6.33325 8.16667V13.1667M9.66658 8.16667V13.1667M10.4999 4.83333V2.33333C10.4999 1.8731 10.1268 1.5 9.66658 1.5H6.33325C5.87301 1.5 5.49992 1.8731 5.49992 2.33333V4.83333M1.33325 4.83333H14.6666" stroke="#5C5C5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    `
  }
  return `
  <div class="board-card__button js-close" data-id="${board.id}">
    <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.8333 4.83333L13.1105 14.9521C13.0482 15.8243 12.3225 16.5 11.4481 16.5H4.55178C3.67739 16.5 2.95165 15.8243 2.88935 14.9521L2.16659 4.83333M6.33325 8.16667V13.1667M9.66658 8.16667V13.1667M10.4999 4.83333V2.33333C10.4999 1.8731 10.1268 1.5 9.66658 1.5H6.33325C5.87301 1.5 5.49992 1.8731 5.49992 2.33333V4.83333M1.33325 4.83333H14.6666" stroke="#5C5C5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
  <div class="board-card__button js-favorite ${board.starred ? "active" : ""}" data-id="${board.id}" data-favorite="${board.starred}">
    <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.04896 1.92664C8.34833 1.00537 9.65167 1.00538 9.95105 1.92664L11.0208 5.21864C11.1547 5.63063 11.5386 5.90957 11.9718 5.90958L15.4333 5.90971C16.402 5.90975 16.8047 7.1493 16.0211 7.71871L13.2208 9.75341C12.8703 10.008 12.7237 10.4594 12.8575 10.8714L13.927 14.1635C14.2263 15.0847 13.1719 15.8508 12.3882 15.2815L9.58775 13.247C9.23728 12.9924 8.76272 12.9924 8.41225 13.247L5.61179 15.2815C4.82809 15.8508 3.77367 15.0847 4.07297 14.1635L5.14249 10.8714C5.27634 10.4594 5.1297 10.008 4.77924 9.75341L1.97894 7.71871C1.19528 7.1493 1.59804 5.90975 2.56672 5.90971L6.02818 5.90958C6.46137 5.90957 6.8453 5.63063 6.97918 5.21864L8.04896 1.92664Z" fill="#none" stroke="#5C5C5C" stroke-width="2"/>
    </svg>
  </div>
  `
}

function renderBoard(board) {
  return `
  <div class="js-board board-card ${ColorCode[board.color]}" data-id="${board.id}">
    <span class="js-board">${board.name}</span>
    <div class="board-card__footer js-board">
      ${renderOptions(board)}
    </div>
  </div>
  `
}

export default function renderBoards(boards) {
  return boards.map(renderBoard).join("")
}