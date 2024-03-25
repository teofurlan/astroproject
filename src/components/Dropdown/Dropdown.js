import { createTask } from "../../services/Tasks";

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
document.getElementById("textInput").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    // Adds the new taskElement component to the tasksContainer inside the Card
    createNewTask(document.getElementById("textInput").value).then(
      (taskElement) => {
        if (taskElement) {
          document.getElementById("tasksContainer").appendChild(taskElement);
          // Resets the text input
          document.getElementById("textInput").value = "";
          print()
          // Dispatched event to check when a new taskElement is added
          document.dispatchEvent(
            new CustomEvent("addedNewTask", {
              detail: { element: taskElement },
            })
          );
        }
      }
    );
  }
});

// Takes taskDescription (string) as parameter and returns the node that represents the taskElement.astro component with the taskDescription as content of its label
export const createNewTask = async (description) => {
  if (description === "") {
    return;
  }
  const task = await createTask(description);
  try {
    // Stores the new taskElement in the server
    console.log("task", task);
    // Selects the template that's used to create a new taskElement component and clones it
    const taskElement = document
      .getElementById("tasksContainer")
      .querySelector(".template")
      .cloneNode(true);
    // Makes it visible
    taskElement.style.display = "flex";
    // Removes the selectorClass that makes the filtering buttons ignore this template taskElement
    taskElement.classList.remove("template");
    taskElement.classList.remove("hidden");
    // Add 'taskElement' as its selectorClass so it is filtered by the buttons
    taskElement.classList.add("taskElement");
    taskElement.classList.add("flex");
    taskElement.querySelector("input").classList.add("checkbox");
    // Set new taskElement description
    taskElement.querySelector("label").innerHTML = task.description;
    // Set new ids
    taskElement.querySelector("input").id = `checkbox-${task.id}`;
    taskElement.querySelector("label").htmlFor = `checkbox-${task.id}`;
    taskElement.querySelector("label").id = `label-${task.id}`;
    // Set the state of the checkbox input
    taskElement.querySelector("input").checked = task.completed;
    // Returns an HTML Node
    return taskElement;
  } catch (error) {
    throw error;
  }
};
