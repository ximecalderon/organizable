import apiFetch from "./api-fetch.js";

export function createCard(listId, data = { name }) {
  return apiFetch("lists/" + listId + "/cards", { body: data });
}

export function deleteCard(listId, CardId) {
  return apiFetch("lists/" + listId + "/cards/" + CardId, { method: "DELETE" });
}
