const dropdownCheckbox = document.getElementById("dropdown");

dropdownCheckbox.addEventListener("change", () => {
  const taskContainer = document.getElementById("taskContainer");
  if (dropdownCheckbox.checked) {
    taskContainer.style.minHeight = "12rem";
  } else {
    // taskContainer.style.maxHeight = "0";
    taskContainer.style.minHeight = "0";
  }
});

// Event Listener that triggers when the the Dropdown's text input is focused and the enter is pressed
document.getElementById("newTask").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    // Adds the new task component to the taskContainer inside the Card
    document
      .getElementById("taskContainer")
      .appendChild(createNewTask(document.getElementById("newTask").value));
    // Resets the text input
    document.getElementById("newTask").value = "";
    // Dispatched event to check when a new task is added
    document.dispatchEvent(new CustomEvent("addedNewTask"));
  }
});

// Takes taskDescription (string) as parameter and returns the node that represents the Task.astro component with the taskDescription as content of its label
const createNewTask = (taskDescription) => {
  // Selects the template that's used to create a new Task component and clones it
  const taskTemplate = document
    .getElementById("taskContainer")
    .querySelector(".template")
    .cloneNode(true);
  // Makes it visible
  taskTemplate.style.display = "flex";
  // Removes the selectorClass that makes the filtering buttons ignore this template task
  taskTemplate.classList.remove("template");
  // Add 'task' as its selectorClass so it is filtered by the buttons
  taskTemplate.classList.add("task");
  // Set new ids
  const newId = Math.random().toString(36).substring(7);
  taskTemplate.querySelector("input").id = `checkbox-${newId}`;
  taskTemplate.querySelector("label").id = `label-${newId}`;
  // Set new task description
  taskTemplate.querySelector("label").innerHTML = taskDescription;
  return taskTemplate;
};
