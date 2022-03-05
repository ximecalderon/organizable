import apiFetch from "./api-fetch.js";

export function createList(boardId, data = { name }) {
  return apiFetch(`boards/${boardId}/lists`, { body: data });
}
