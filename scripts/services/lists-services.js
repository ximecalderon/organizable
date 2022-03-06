import apiFetch from "./api-fetch.js";

export function createList(boardId, data = { name }) {
  return apiFetch(`boards/${boardId}/lists`, { body: data });
}

export function deleteList(boardId, listId) {
  return apiFetch(`boards/${boardId}/lists/` + listId, { method: "DELETE" });
}
