import apiFetch from "./api-fetch.js";

export function createList(boardId, data = { name }) {
  return apiFetch(`boards/${boardId}/lists`, { body: data });
}

export function deleteList(boardId, listId) {
  return apiFetch(`boards/${boardId}/lists/` + listId, { method: "DELETE" });
}

export async function updateList(boardId, listId, data = { name, pos }) {
  const { token, ...list } = await apiFetch("boards/" + boardId + "/lists/" + listId, {
    body: data,
    method: "PATCH",
  });
  return list;
}
