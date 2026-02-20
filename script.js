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

// Render function
function render() {
  list.innerHTML = "";

  habits.forEach(function (habit) {
    const li = document.createElement("li");
    li.textContent = habit.name;

    if (habit.completed) {
      li.classList.add("completed");
    }

    li.addEventListener("click", function () {
      habits = habits.map(function (h) {
        if (h.id === habit.id) {
          return { ...h, completed: !h.completed };
        }
        return h;
      });

      localStorage.setItem("habits", JSON.stringify(habits));
      render();
    });

    list.appendChild(li);
  });
}

// Initial render
render();
