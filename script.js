const button = document.querySelector("button");
const list = document.querySelector("ul");
const input = document.querySelector("input");

let habits = JSON.parse(localStorage.getItem("habits")) || [];

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    button.click();
  }
});

button.addEventListener("click", function () {
  const value = input.value.trim();
  if (!value) return;

  habits.push({
    id: Date.now(),
    name: value,
    completed: false,
  });

  localStorage.setItem("habits", JSON.stringify(habits));

  input.value = "";
  render();
});

list.addEventListener("click", function (e) {
  const action = e.target.dataset.action;
  if (!action) return;

  const id = Number(e.target.parentElement.dataset.id);

  if (action === "toggle") {
    habits = habits.map((h) =>
      h.id === id ? { ...h, completed: !h.completed } : h,
    );
  }

  if (action === "delete") {
    habits = habits.filter((h) => h.id !== id);
  }

  localStorage.setItem("habits", JSON.stringify(habits));
  render();
});

function render() {
  list.innerHTML = "";

  habits.forEach(function (habit) {
    const li = document.createElement("li");
    li.dataset.id = habit.id;

    const span = document.createElement("span");
    span.textContent = habit.name;
    span.dataset.action = "toggle";

    if (habit.completed) {
      span.classList.add("completed");
    }

    const del = document.createElement("button");
    del.textContent = "X";
    del.dataset.action = "delete";

    li.appendChild(span);
    li.appendChild(del);

    list.appendChild(li);
  });
}

render();
