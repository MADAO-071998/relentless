const button = document.querySelector("button");
const list = document.querySelector("ul");
const input = document.querySelector("input");

button.addEventListener("click", function () {
  const value = input.value.trim();

  if (!value) return;

  const li = document.createElement("li");
  li.textContent = value;
  list.appendChild(li);

  input.value = "";
});
