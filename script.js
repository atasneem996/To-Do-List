//Get necessary elements
const inputBox = document.getElementById("input-box");
const addTaskBtn = document.querySelector(".addtask");
const listContainer = document.getElementById("list-container");

// Load saved tasks from localStorage on page load
window.onload = function () {
  loadTasks();
};

// Function to add a new task
function addTask(taskText, isNew = true) {
  // Create list item
  const li = document.createElement("li");
  li.innerHTML = `
        <i class="fa-regular fa-circle"></i>
        <span>${taskText}</span>
        <i class="fa-solid fa-pencil edit-icon"></i>
        <i class="fa-solid fa-trash remove-icon"></i>
    `;

  // Append the task to the list container
  listContainer.appendChild(li);

  // Event listener for marking task as done
  li.querySelector(".fa-circle").addEventListener("click", function () {
    li.classList.toggle("checked");
    this.classList.toggle("fa-check-circle");
    this.classList.toggle("fa-circle");
    saveTasks(); // Save task status
  });

  // Event listener for removing task
  li.querySelector(".remove-icon").addEventListener("click", function () {
    li.remove();
    saveTasks(); // Save after removing
  });

  // Event listener for editing task
  li.querySelector(".edit-icon").addEventListener("click", function () {
    const newText = prompt("Edit task:", li.querySelector("span").textContent);
    if (newText !== null && newText.trim() !== "") {
      li.querySelector("span").textContent = newText;
      saveTasks(); // Save after editing
    }
  });

  // If the task is new, save it to localStorage
  if (isNew) {
    saveTasks();
  }
}

// Add task on button click
addTaskBtn.addEventListener("click", function () {
  const taskText = inputBox.value.trim();
  if (taskText !== "") {
    addTask(taskText); // Add the task
    inputBox.value = ""; // Clear input field
  }
});

// Optionally, allow pressing "Enter" to add tasks
inputBox.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const taskText = inputBox.value.trim();
    if (taskText !== "") {
      addTask(taskText); // Add the task
      inputBox.value = ""; // Clear input field
    }
  }
});

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  listContainer.querySelectorAll("li").forEach(function (li) {
    tasks.push({
      text: li.querySelector("span").textContent,
      checked: li.classList.contains("checked"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(function (task) {
    const li = document.createElement("li");
    li.innerHTML = `
            <i class="fa-regular ${
              task.checked ? "fa-check-circle" : "fa-circle"
            }"></i>
            <span>${task.text}</span>
            <i class="fa-solid fa-pencil edit-icon"></i>
            <i class="fa-solid fa-trash remove-icon"></i>
        `;
    if (task.checked) {
      li.classList.add("checked");
    }
    listContainer.appendChild(li);

    // Add event listeners for the loaded tasks
    li.querySelector(".fa-circle, .fa-check-circle").addEventListener(
      "click",
      function () {
        li.classList.toggle("checked");
        this.classList.toggle("fa-check-circle");
        this.classList.toggle("fa-circle");
        saveTasks();
      }
    );

    li.querySelector(".remove-icon").addEventListener("click", function () {
      li.remove();
      saveTasks();
    });

    li.querySelector(".edit-icon").addEventListener("click", function () {
      const newText = prompt(
        "Edit task:",
        li.querySelector("span").textContent
      );
      if (newText !== null && newText.trim() !== "") {
        li.querySelector("span").textContent = newText;
        saveTasks();
      }
    });
  });
}
