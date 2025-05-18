const todoInput = document.getElementById("todoInput");
const taskList = document.getElementById("taskList");

//Add Task
function addTask() {
  const newTask = todoInput.value.trim();
  if (newTask === "") {
    alert("Please enter a task.");
  }

  //Check for duplicates (case in-sensitive)
  const existingTasks = Array.from(taskList.children).map((li) =>
    li.childNodes[0].nodeValue.trim().toLowerCase()
  );

  if (existingTasks.includes(newTask.toLowerCase())) {
    alert("This task already exists!");
    return;
  }

  //Create and append task
  let li = document.createElement("li");
  li.innerHTML = todoInput.value;
  taskList.appendChild(li);
  let span = document.createElement("span");
  span.innerHTML = "❌";
  li.appendChild(span);

  todoInput.value = "";
  saveData();
  updateTaskCounts();
}

// Click Handler: Toggle complete or delete task
taskList.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
      updateTaskCounts();
    } else if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
      updateTaskCounts();
    }
  },
  false
);

//Save to localstorage
function saveData() {
  localStorage.setItem("tasks", taskList.innerHTML);
}

//Load from localstorage
function showData() {
  taskList.innerHTML = localStorage.getItem("tasks");
  updateTaskCounts();
}

//Update total and unfinsihed tasks

function updateTaskCounts() {
  const tasks = document.querySelectorAll("#taskList li");
  const total = tasks.length;
  const unfinished = Array.from(tasks).filter(
    (task) => !task.classList.contains("checked")
  ).length;

  document.getElementById("totalTasks").innerText = total;
  document.getElementById("unfinishedTasks").innerText = unfinished;
}

//Initial call on page load
showData();
