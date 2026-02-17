let habits = [];

const button = document.querySelector("button");
const list = document.querySelector("ul");
const input = document.querySelector("input");

button.addEventListener("click", function () {
  const value = input.value.trim();
  if (!value) return;
  habits.push(value);
  input.value = "";
  render();
});

function render() {
  list.innerHTML = "";
  habits.forEach(function (habit, index) {
    const li = document.createElement("li");
    li.textContent = habit;
    li.addEventListener("click", function () {
      habits.splice(index, 1);
      render();
    });
    list.appendChild(li);
  });
}
