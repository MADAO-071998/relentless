const button = document.querySelector("button");
const list = document.querySelector("ul");
const input = document.querySelector("input");

// Load state from storage
let habits = JSON.parse(localStorage.getItem("habits")) || [];

// Add habit
button.addEventListener("click", function () {
  const value = input.value.trim();
  if (!value) return;

  habits.push(value);
  localStorage.setItem("habits", JSON.stringify(habits));

  input.value = "";
  render();
});

// Render function
function render() {
  list.innerHTML = "";

  habits.forEach(function (habit, index) {
    const li = document.createElement("li");
    li.textContent = habit;

    li.addEventListener("click", function () {
      habits.splice(index, 1);
      localStorage.setItem("habits", JSON.stringify(habits));
      render();
    });

    list.appendChild(li);
  });
}

// Initial render
render();
