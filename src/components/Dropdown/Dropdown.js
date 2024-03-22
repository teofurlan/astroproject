const dropdownCheckbox = document.getElementById("dropdown");

dropdownCheckbox.addEventListener("click", () => {
  const tasksContainer = document.getElementById("tasksContainer");
  tasksContainer.parentNode.querySelector("span")?.remove();
  if (dropdownCheckbox.checked) {
    tasksContainer.style.minHeight = "12rem";
    tasksContainer.style.maxHeight = "100%";
  } else {
    tasksContainer.style.maxHeight = "0";
    tasksContainer.style.minHeight = "0";
    const span = document.createElement("span");
    span.classList = "m-auto text-hint";
    span.textContent = "The task list is closed".toUpperCase();
    setTimeout(() => {
      tasksContainer.parentNode.appendChild(span);
    }, 400);
  }
});

// Event Listener that triggers when the the Dropdown's text input is focused and the enter is pressed
document.getElementById("newTask").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    // Adds the new task component to the tasksContainer inside the Card
    const task = createNewTask(document.getElementById("newTask").value);
    if (task) {
      document.getElementById("tasksContainer").appendChild(task);
      // Resets the text input
      document.getElementById("newTask").value = "";
      // Dispatched event to check when a new task is added
      document.dispatchEvent(new CustomEvent("addedNewTask", { detail: { element: task }}));
    }
  }
});

// Takes taskDescription (string) as parameter and returns the node that represents the Task.astro component with the taskDescription as content of its label
const createNewTask = (taskDescription) => {
  if (taskDescription === "") {
    return;
  }
  // Selects the template that's used to create a new Task component and clones it
  const taskTemplate = document
    .getElementById("tasksContainer")
    .querySelector(".template")
    .cloneNode(true);
  // Makes it visible
  taskTemplate.style.display = "flex";
  // Removes the selectorClass that makes the filtering buttons ignore this template task
  taskTemplate.classList.remove("template");
  taskTemplate.classList.remove("hidden");
  // Add 'task' as its selectorClass so it is filtered by the buttons
  taskTemplate.classList.add("task");
  taskTemplate.classList.add("flex");
  taskTemplate.querySelector("input").classList.add("checkbox");
  // Set new ids
  const newId = Math.random().toString(36).substring(7);
  taskTemplate.querySelector("input").id = `checkbox-${newId}`;
  taskTemplate.querySelector("label").htmlFor = `checkbox-${newId}`;
  taskTemplate.querySelector("label").id = `label-${newId}`;
  // Set new task description
  taskTemplate.querySelector("label").innerHTML = taskDescription;
  return taskTemplate;
};
