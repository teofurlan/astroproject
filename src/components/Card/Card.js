import {
  createTask,
  deleteCompletedtasksList,
  showServerList,
  toggleTask,
} from "../../services/Tasks";

// Makes a request to the server side to get the list of tasks. Uses the .then() function to handle the promise that's returned by the
fetch("/api/tasks")
  .then((r) => r.json())
  .then((data) => {
    // Get the list of tasks from the promise
    const tasksList = data.tasksList;
    console.log(tasksList)
    // Creates the tasks in the document from the list of tasks in the server
    for (let task of tasksList) {
      createNewTask(task)
    }
    // Set the initial filter so the logic works correctly
    filterTasks("showAll");
    // Set the initial value of the Items Counter
    setItemsCounter();
  });

/**
 * EVENT HANDLING
 */

// Startup
window.onload = () => {
  // Set the initial filter and gives the selected style to its button
  const showAllButton = document.getElementById("showAll");
  showAllButton.dataset.selected = "true";
  showAllButton.style.border = "1.5px solid #f5e4e4";

};

// Checks if a task checkbox has been checked or unchecked to change its style. Updates activeTaks and completedTasks lists
document.addEventListener("change", (event) => {
  const currentFilterId = getCurrentFilterId();
  // First, we check if the change event in the document was trigger by pressing the dropdown
  if (event.target.matches("#dropdown")) {
    // If the tasks list has been opened, we filter the tasks, this action fulfills the purpose to show the advice label in case that it corresponds when the tasks list is opened, otherwise, if the advice was displayed and then the dropdown was closed and opened again, the advice would just disappear
    if (event.target.checked) {
      filterTasks(currentFilterId);
    } else {
      // Removes the advice if exists and makes. This way it does not overlaps with the dropdown's advice
      document.getElementById("advice")?.remove();
    }
    // Stops the execution of the function
    return;
  } else if (!event.target.matches(".checkbox")) {
    // Stops the function if the event's target is not a task checkbox
    return;
  }
  // Get the clicked task from the event
  const checkbox = event.target;
  // Take the checkbox's id to get its corresponding label. Checkbox's id format: [checkbox-id]
  const label = document.getElementById(
    `label-${checkbox.getAttribute("id").split("-")[1]}`
  );
  // Add text-decoration and changes the label color so it has the crossed out style or removes this classes, therefore the styles, from the label classList if already have them
  label.classList.toggle("line-through");
  label.classList.toggle("text-hint");
  // Change the value of the task object in the server side by passing the id of the pressed checkbox
  toggleTask(checkbox.id.split("-")[1]);
  // If the current filter section is not'showAll', we filter the tasks again, this way if an active tasks is checked as completed being in the active filter, it will be removed from the view and if a completed tasks is unchecked being in the completed section it will aslo be removed from the view

  if (currentFilterId !== "showAll") {
    filterTasks(currentFilterId);
  }
  // Updates the active tasks counter
  setItemsCounter();
});

// Listens to the event that is dispatched in the Dropdown.js script when a new tasks is added to the lisks of tasks
document
  .getElementById("textInput")
  .addEventListener("addedNewTask", async (event) => {
    // const task = createNewTask(event.detail);
    const newTask = await createTask(event.detail);
    createNewTask(newTask);
    // .then((taskElement) => {
    //   console.log(taskElement);
    //   // if (taskElement) {
    //   document.getElementById("tasksContainer").appendChild(taskElement);
    //   console.log("Server List");
    //   showServerList();
    //   // }
    // });
    // Updates the items counter
    setItemsCounter();
    // Checks if a new task has been added in the taskContainer and updates the filter in case that the currentId is showCompleted. By validating that we avoid to call filterTasks needlessly.
    const currentFilterId = getCurrentFilterId();
    if (currentFilterId === "showCompleted") {
      filterTasks(currentFilterId);
    }
  });

// Event Listener for the filtering buttons in the cardFooter. Checks if the div that contains the buttons has been pressed
document.getElementById("cardFooter").addEventListener("click", (event) => {
  // Check if the triggered event's target is a button
  if (event.target.matches("button")) {
    // Call the function that handles the possible buttons and passes the pressed button's id only if the dropdown is open and the pressed button is different to the current filter section. This way we avoid wasting resourses.

    if (
      document.getElementById("dropdown").checked &&
      event.target.getAttribute("id") !== getCurrentFilterId()
    ) {
      filterTasks(event.target.getAttribute("id"));
    }
    // Dispatches an event to trigger the style and attribute updating in the cardFooter component's logic. Passes the id of the pressed button in the event's detail
    document
      .getElementById("cardFooter")
      .dispatchEvent(
        new CustomEvent("changeFilter", { detail: event.target.id })
      );
  }
});

// Calls the displayConfirmation() method if the clearCompleted button's pressed
document.getElementById("clearCompleted").addEventListener("click", () => {
  displayConfirmation();
});

/**
 * FUNCTIONS
 */

// This function handles the change of filter selection, so it takes the id of the pressed button as argument
const filterTasks = (newFilterId) => {
  // Stores the previous filterId in a local variable
  const lastFilterId = getCurrentFilterId();
  // Uses a switch to handle the three posibilities
  switch (newFilterId) {
    case "showAll":
      setShowAll(lastFilterId);
      break;
    case "showActive":
      setShowActive(lastFilterId);
      break;
    case "showCompleted":
      setShowCompleted(lastFilterId);
      break;
    default:
      break;
  }
};

/**
 * FILTERING FUNCTIONS
 */

// Function that shows all the tasks, completed and active, and set corresponding transitions
const setShowAll = (lastFilterId) => {
  // Removes the background advice if exists
  document.getElementById("advice")?.remove();
  // Get the list of tasks
  const tasksList = document.querySelectorAll("[data-selector='task']");
  // Checks if there is any tasks at all, if not, displays an advice at the background and stops the function
  if (tasksList.length <= 0) {
    displayAdvice("there are no tasks yet");
    return;
  }
  // Loop through the list of tasks
  for (const task of tasksList) {
    // Makes each task visible
    task.style.display = "flex";
    // Active tasks
    if (!task.querySelector(".checkbox").checked) {
      // Handles the transition if the previous filter was showCompleted. The tasks are first moved fully to the right and then back to normal position after some milisecons so it gives the impression that they are coming from the right
      if (lastFilterId === "showCompleted") {
        task.style.transform = "translateX(100%)";
        setTimeout(() => {
          task.style.transform = "translateX(0)";
        }, 300);
      }
    } else {
      // Completed tasks
      if (lastFilterId === "showCompleted") {
        task.style.display = "none";
        // task.style.transform = "translateX(100%)";
        task.style.transform = "translateX(100%)";
        task.style.display = "flex";
        // setTimeout(() => {
        //   task.style.transform = "translateX(0)";
        // }, 330);
      } else {
        // The completed tasks are translated back to the normal position
      }
      setTimeout(() => {
        task.style.transform = "translateX(0)";
      }, 300);
    }
  }
};

// Function that handles the filtering and corresponding transitions to show only the active tasks, that are the ones which checkbox is unchecked
const setShowActive = (lastFilterId) => {
  // Removes the background advice if exists
  document.getElementById("advice")?.remove();
  // Get the list of tasks
  const tasksList = document.querySelectorAll("[data-selector='task']");
  let activeCount = 0;
  for (const task of tasksList) {
    if (!task.querySelector(".checkbox").checked) {
      // If the previous filter was show completed
      if (lastFilterId === "showCompleted") {
        // First we make the active tasks visible by setting its display property to flex, becuase in the 'Completed' section, it's set to none so they are not visible
        task.style.transform = "translateX(-100%)";
        task.style.display = "flex";
        // Use a setTimeout() fucntion to delay the translation transition, which takes the parameter 0 because it's currenly with a -100% value from the completed filter
        setTimeout(() => {
          task.style.transform = "translateX(0)";
        }, 300);
      }
      activeCount++;
    } else {
      // The completed tasks are translated to the completely to the right
      task.style.transform = "translateX(100%)";
      // To give for the translation transition to happend, we delay the disappearance of the tasks, which is achieve by setting its display property to 'none'
      setTimeout(() => {
        task.style.display = "none";
      }, 300);
    }
  }
  if (activeCount <= 0) {
    displayAdvice("there are no active tasks yet");
  }
};

// Function that handles the filtering and transitions to see only the tasks that are completed, this are the ones which checkbox is checked
const setShowCompleted = (lastFilterId) => {
  // Removes the background advice if exists
  document.getElementById("advice")?.remove();
  // Get the list of tasks
  const tasksList = document.querySelectorAll("[data-selector='task']");
  // Count the amount of completed tasks
  let completedCounter = 0;
  // Loop through the lisf of tasks to validate which is active and which completed.
  for (const task of tasksList) {
    // Checks if the task is active
    if (!task.querySelector(".checkbox").checked) {
      task.style.display = "none";
      if (lastFilterId === "showAll") {
        task.style.transform = "translateX(-100%)";
        setTimeout(() => {
          task.style.display = "none";
        }, 300);
      } else {
        task.style.display = "none";
      }
    } else {
      // In the case that the task is completed...
      task.style.display = "flex";
      if (lastFilterId === "showAll") {
        // task.style.display = "flex";
        task.style.transform = "translateX(-100%)";
        setTimeout(() => {
          task.style.transform = "translateX(0)";
        }, 300);
      } else if (lastFilterId === "showActive") {
        // If the previous filter was showActive, we first set its display to 'none' so when it's translated fully to the left the user don't see the transition. Then we make them visible asigning 'flex' as value of its display and delay its translation to the original position to achive a transition
        task.style.display = "none";
        task.style.transform = "translateX(-100%)";
        task.style.display = "flex";
        setTimeout(() => {
          task.style.transform = "translateX(0)";
        }, 300);
      }
      completedCounter++;
    }
  }
  if (completedCounter <= 0) {
    displayAdvice("there are no completed tasks yet");
  }
};

// Displays a span with a label in the taskContainer which text is passed as a parameter
const displayAdvice = (text) => {
  const advice = document.createElement("span");
  advice.setAttribute("id", "advice");
  advice.classList =
    "absolute flex justify-center items-center w-full h-full text-hint";
  advice.textContent = text.toUpperCase();
  setTimeout(() => {
    document.getElementById("tasksContainer").parentNode.appendChild(advice);
  }, 400);
};

// This function updates the span and the left of the CardFooter, that shows how many active tasks are left
const setItemsCounter = () => {
  document.getElementById("itemsCounter").innerHTML = `${
    Array.from(document.querySelectorAll('[data-selector="task"]')).filter(
      (task) => !task.querySelector("input")?.checked
    ).length
  } items left`;
};

// This fucntion creates a small confirmation menu for deleting the completed tasks so they are not deleted accidently. Also, directly executes the corresponding actions based on which button the user press
const displayConfirmation = () => {
  // Creates the container of the confirmation menu
  let container = document.createElement("div");
  // Uses tailwind classes to give it an overlay appearance over the whole viewport
  container.classList =
    "flex items-center justify-center fixed m-0 h-full w-screen bg-black bg-opacity-50";

  // Stores all the html content of the menu in a string, along side with their styles modified using talwind as well
  let confirmationNodes =
    '<div class="flex flex-col items-center justify-between w-80 h-52 p-5 border bg-white rounded-md relative" >' +
    '<span class="text-general text-base text-center my-5">All completed tasks will be deleted. Do you want to continue?</span>' +
    '<img src="thinking-flork.png" alt="thinking flork" class="absolute top-[-2.5rem] left-8 w-10">' +
    '<div class="flex items-center justify-between w-4/5" id="buttonsContainer">' +
    '<button class="w-24 h-10 border border-hint bg-white text-base hover:drop-shadow-lg rounded-md" id="accept">Accept</button>' +
    '<button class="w-24 h-10 border border-hint bg-white text-base hover:drop-shadow-lg rounded-md" id="cancel">Cancel</button>' +
    "</div>" +
    "<div>";
  // Add all the content to the container through its innerHTML property
  container.innerHTML = confirmationNodes;
  // Adds the whole confirmation menu to the body
  document.querySelector("body").appendChild(container);
  // Adds an EventListener to the container of the buttons in the menu and gets the event as argument
  document
    .getElementById("buttonsContainer")
    .addEventListener("click", (event) => {
      // Handles the two posible options
      if (event.target.matches("#accept")) {
        // Get the list of completed tasks
        const completedTasks = document.querySelectorAll(
          'input.checkbox[type = "checkbox"]:checked'
        );
        // Removes all the completed tasks from the document. As we are deleting the whole task component, we need to remove its grandfather
        for (let task of completedTasks) {
          task.parentNode.parentNode.remove();
        }
        // Empties the server list
        deleteCompletedtasksList();
        // Removes the whole menu from the document
        container.remove();
        // Updates the activeTasks' counter
        setItemsCounter();
        // Call the filterTasks function only if the current filtering section is not showActive. This is because if we are in the completed filtering section and the completed tasks are deleted, the advice at the background won't be displayed unless the filter is updated. Similarly, if the current filtering section is showAll AND the only tasks in existence are completed, the filter needs to be updated so the advice is shown.
        const currentFilterId = getCurrentFilterId();
        if (
          currentFilterId === "showCompleted" ||
          (currentFilterId === "showAll" &&
            document.querySelectorAll(
              'input.checkbox[type = "checkbox"]:not(:checked)'
            ).length <= 0)
        ) {
          filterTasks(currentFilterId);
        }
        showServerList()
      } else if (event.target.matches("#cancel")) {
        // If the cancel button is pressed, just removes the menu from the document
        container.remove();
      }
    });
};

// Returns the current filter that's being applied to the tasks
const getCurrentFilterId = () => {
  return document.querySelector('[data-selected="true"]').getAttribute("id");
};

// Takes taskDescription (string) as parameter and returns the node that represents the taskElement.astro component with the taskDescription as content of its label
const createNewTask = async (task) => {
  try {
    // Selects the template that's used to create a new taskElement component and clones it
    const taskElement = document
      .getElementById("tasksContainer")
      .querySelector("[data-selector='template']")
      .cloneNode(true);
    // Changes the the template value in the data-selector attribute that makes filters ignore it for task, which will achieve the opposite
    taskElement.dataset.selector = 'task'
    // Makes it visible
    // taskElement.style.display = "flex";
    taskElement.classList.remove("hidden");
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
    // Adds the element to the taskContainer
    document.getElementById("tasksContainer").appendChild(taskElement);
  } catch (error) {
    throw error;
  }
};
