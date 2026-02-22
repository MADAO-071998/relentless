const button = document.querySelector("button");
const list = document.querySelector("ul");
const input = document.querySelector("input");

// Load state from storage
let habits = JSON.parse(localStorage.getItem("habits")) || [];

// Add habit
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

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    button.click();
  }
});

// Render function
function render() {
  list.innerHTML = "";

  habits.forEach(function (habit) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = habit.name;

    if (habit.completed) {
      span.classList.add("completed");
    }

    const del = document.createElement("button");
    del.textContent = "X";

    span.addEventListener("click", function () {
      habits = habits.map(function (h) {
        if (h.id === habit.id) {
          return { ...h, completed: !h.completed };
        }
        return h;
      });

      localStorage.setItem("habits", JSON.stringify(habits));
      render();
    });

    del.addEventListener("click", function () {
      habits = habits.filter(function (h) {
        return h.id !== habit.id;
      });

      localStorage.setItem("habits", JSON.stringify(habits));
      render();
    });

    li.appendChild(span);
    li.appendChild(del);

    list.appendChild(li);
  });
}

// Initial render
render();
