export function input({
  label,
  id,
  name,
  placeholder = "",
  type,
  required = false,
  value = false,
  icon,
  error,
}) {
  return `
  <div class="input">
    ${label
      ? `<label for="${id}" class="content-xs overline">${label}</label>`
      : ""
    }
    <div class="input__container">
      ${icon
      ? `<img
          src="${icon}"
          alt=""
        />`
      : ""
    }
      <input
        type="${type ? type : "text"}"
        placeholder="${placeholder}"
        class="input__content"
        id="${id}"
        name="${name ? name : id}"
        ${value ? `value="${value}"` : ""}
        ${required ? "required" : ""}
      />
    </div>
    ${error ? `<span class="input__error-message">${error}</span>` : ""}
  </div>
  `;
};

export function radio({
  name,
  value,
  classList,
  defaultInput = "",
}) {
  return `
    <input 
      type="radio" 
      id="${value}" 
      name="${name}" 
      value="${value}" 
      class="${classList}" 
      ${defaultInput == value ? "checked='checked'" : ""}   
    >
  `
}
