import { appKey } from "./config.js";
import DOMHandler from "./dom-handler.js";
import STORE from "./store.js";

export function fromLocalStorage(key) {
  const data = JSON.parse(localStorage.getItem(appKey)) || {};
  return data[key];
}

export function saveToLocalStorage(key, value) {
  let data = JSON.parse(localStorage.getItem(appKey)) || {};
  data = { ...data, [key]: value };
  localStorage.setItem(appKey, JSON.stringify(data));
}

export function listenerRedirect(triggerSelector, page, containerSelector = "#root") {
  try {
    const trigger = document.querySelector(triggerSelector);

    trigger.addEventListener("click", event => {
      event.preventDefault();
      STORE.setCurrentPage(page.title);
      DOMHandler.load(page, containerSelector)
    })

  } catch (error) {
    console.log(error.message)
  }
}
