import { tokenKey } from "../config.js";
import apiFetch from "./api-fetch.js";

export async function signup(credentials = { username, email, first_name, last_name, password }) {
  const { token, ...user } = await apiFetch("users", { body: credentials });
  sessionStorage.setItem(tokenKey, token);
  return user;
}

export async function getUser(userId) {
  return await apiFetch("users/" + userId);
}

export async function deleteUser(userId) {
  await apiFetch("users/" + userId, { method: "DELETE" });
  sessionStorage.removeItem(tokenKey);
}

export async function updateUser(userId, data = { username, email, first_name, last_name }) {
  const { token, ...user } = await apiFetch("users/" + userId, {
    body: data,
    method: "PATCH",
  });
  return user;
}
