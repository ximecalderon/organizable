import apiFetch from "./api-fetch.js";

export function createBoard(data = { name, color }) {
  return apiFetch("boards", { body: data });
}

export function getBoard(boardId) {
  return apiFetch("boards/" + boardId);
}

export function getBoards() {
  return apiFetch("boards");
}

export async function updateBoard(boardId, data = { name, color, closed, starred }) {
  const { token, ...board } = await apiFetch("boards/" + boardId, {
    body: data,
    method: "PATCH",
  });
  return board;
}

export function deleteBoard(boardId) {
  return apiFetch("boards/" + boardId, { method: "DELETE" });
}

