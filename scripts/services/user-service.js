import { tokenkey } from "../config.js";
import apiFetch from "./api-fetch.js";

export async function signup(credentials = { username, email, first_name, last_name, password }) {
  const { token, ...user } = await apiFetch("users", { body: credentials });
  sessionStorage.setItem(tokenkey, token);
  return user;
}
