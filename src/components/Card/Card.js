/**
 * GLOBAL VARIABLES
 */
// Lists to store which of the tasks are completed (its checkbox.checked is true) and which not. This approach can seem redundant, given the tasks list can be accessed any time through the taskContainer and every tasks needs to pass through a loop for filtering. However, this way we are saving the resourses needed to check whether its checkbox is checked or not and also avoid to query the documents too many times. In addition, storing them into js arrays allow us to use a number of useful methods.
// Both lists will be updated each time a tasks is checked or unchecked and when the. The activeTasks will aslo be updated when a new task is created and. The completedTasks is cleared when the Clear Completed option is selected
let activeTasks = Array.from(document.querySelectorAll(".task"));
let completedTasks = [];
// Stores the id of the current filtering section in the page
let currentId = "showAll";
// Stores the span with a label that is displayed in the background in case that there are no tasks in that filtering section
let advice;

/**
 * EVENT LISTENERS
 */

// Checks if a task checkbox has been checked or unchecked to change its style. Updates activeTaks and completedTasks lists
document.addEventListener("change", (event) => {
  // First, we check if the change event in the document was trigger by pressing the dropdown
  if (event.target.matches("#dropdown")) {
    // If the tasks list has been opened, we filter the tasks, this action fulfills the purpose to show the advice label in case that it corresponds when the tasks list is opened, otherwise, if the advice was displayed and then the dropdown was closed and opened again, the advice would just disappear
    if (event.target.checked) {
      filterTasks(currentId);
    } else {
      // Removes the advice if exists and makes its variable null. This way it does not overlaps with the dropdown's advice
      advice?.remove();
      advice = null;
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
  // Update the track lists. As we access the checkboxs, and they are inside a div inside the whole tasks div, we have to call the checkbox.parentNode.parentNode so we store the task div
  if (checkbox.checked) {
    completedTasks.push(checkbox.parentNode.parentNode);
    activeTasks = activeTasks.filter(
      (element) => element.querySelector(".checkbox") !== checkbox
    );
  } else {
    completedTasks = completedTasks.filter(
      (element) => element.querySelector(".checkbox") !== checkbox
    );
    activeTasks.push(checkbox.parentNode.parentNode);
  }
  // If the current filter section is not'showAll', we filter the tasks again, this way if an active tasks is checked as completed being in the active filter, it will be removed from the view and if a completed tasks is unchecked being in the completed section it will aslo be removed from the view
  if (currentId !== "showAll") {
    filterTasks(currentId);
  }
  // Updates the active tasks counter
  setItemsCounter();
});

// Listens to the event that is dispatched in the Dropdown.js script when a new tasks is added to the lisks of tasks
document.addEventListener("addedNewTask", (event) => {
  // Adds the new task, passed as the element of the event, to the activeTasks list
  activeTasks.push(event.detail.element);
  // Updates the items counter
  setItemsCounter();
  // Checks if a new task has been added in the taskContainer and updates the filter in case that the currentId is showCompleted. By validating that we avoid to call filterTasks needlessly.
  if (currentId === "showCompleted") {
    filterTasks(currentId);
  }
});

// Event Listener for the filtering buttons in the cardFooter. Checks if the div that contains the buttons has been pressed
document.getElementById("cardFooter").addEventListener("click", (e) => {
  // Check if the triggered event's target is a button
  if (e.target.matches("button")) {
    // Call the function that handles the possible buttons and passes the pressed button's id only if the dropdown is open and the pressed button is different to the current filter section. This way we avoid wasting resourses.
    if (
      document.getElementById("dropdown").checked &&
      e.target.getAttribute("id") !== currentId
    ) {
      filterTasks(e.target.getAttribute("id"));
    }
  }
});

// Calls the displayConfirmation() method if the clearCompleted button's pressed
document.getElementById("clearCompleted").addEventListener("click", () => {
  displayConfirmation();
});

/**
 * FUNCTIONS
 */

// Takes the id of the that is now selected, resets the style of the three buttons and applies the selected style to the one that matches the id. Updates the value of the global variable 'currentId'
const updateSelectedButton = (selectedId) => {
  // We access the list of buttons in the cardFooter by querying them with their element's type selector. Them loop through each one of them with the forEach method and uses and anonymous function to give the selected sytle only to the button with the id equal to selectedId
  document
    .getElementById("cardFooter")
    .querySelectorAll("button")
    .forEach((button) => {
      button.id === selectedId
        ? (button.style.border = "1.5px solid #f5e4e4")
        : (button.style.border = "none");
    });
  // document.getElementById(selectedId).style.border = "1.5px solid #f5e4e4";
  // Updates the global variable currentId with the id of the selected button
  currentId = selectedId;
};

// This function handles the change of filter selection, so it takes the id of the pressed button as argument
const filterTasks = (buttonId) => {
  // Uses a switch to handle the three posibilities
  switch (buttonId) {
    case "showAll":
      setShowAll();
      break;
    case "showActive":
      setShowActive();
      break;
    case "showCompleted":
      setShowCompleted();
      break;
  }
  // Updates the selected button by calling this funtion. As a reminder, the currentId variable is updated inside this function
  updateSelectedButton(buttonId);
};

// Function that shows all the tasks, completed and active, and set corresponding transitions
const setShowAll = () => {
  // Removes the background advice if exists and make its variable null
  advice?.remove();
  advice = null;
  // Checks if there is any tasks at all, if not, displays an advice at the background
  if (activeTasks.length <= 0 && completedTasks.length <= 0) {
    displayAdvice("there are no tasks yet");
    return;
  }
  // Loop through the activeTasks list
  for (let i = 0; i < activeTasks.length; i++) {
    // Make the activeTasks visible
    activeTasks[i].style.display = "flex";
    // Handles the transition if the previous filter was showCompleted. The tasks are first moved fully to the right and then back to normal position after some milisecons so it gives the impression that they are coming from the right
    if (currentId === "showCompleted") {
      activeTasks[i].style.transform = "translateX(100%)";
      setTimeout(() => {
        activeTasks[i].style.transform = "translateX(0)";
      }, 300);
    }
  }
  // Loop through the completedTasks list
  for (let i = 0; i < completedTasks.length; i++) {
    // Make the completed tasks visible
    completedTasks[i].style.display = "flex";
    // Delay the translation to the normal position
    setTimeout(() => {
      completedTasks[i].style.transform = "translateX(0)";
    }, 300);
  }
};

// Function that handles the filtering and corresponding transitions to show only the active tasks, that are the ones which checkbox is unchecked
const setShowActive = () => {
  // Removes the background advice if exists and make its variable null
  advice?.remove();
  advice = null;
  // Completed tasks
  for (let i = 0; i < completedTasks.length; i++) {
    // The completed tasks are translated to the completely to the right
    completedTasks[i].style.transform = "translateX(100%)";
    // To give for the translation transition to happend, we delay the disappearance of the tasks, which is achieve by setting its display property to 'none'
    setTimeout(() => {
      completedTasks[i].style.display = "none";
    }, 300);
  }
  // Checks if there is any active tasks, if not it set the advice at the background. Also, stops the execution of the function, but only after the completed tasks are filtered.
  if (activeTasks.length <= 0) {
    displayAdvice("there are no active tasks yet");
    return;
  }
  // Active tasks
  for (let i = 0; i < activeTasks.length; i++) {
    // If the previous filter was show completed
    if (currentId === "showCompleted") {
      // First we make the active tasks visible by setting its display property to flex, becuase in the 'Completed' section, it's set to none so they are not visible
      activeTasks[i].style.display = "flex";
      // Use a setTimeout() fucntion to delay the translation transition, which takes the parameter 0 because it's currenly with a -100% value from the completed filter
      setTimeout(() => {
        activeTasks[i].style.transform = "translateX(0)";
      }, 300);
    }
  }
};

// Function that handles the filtering and transitions to see only the tasks that are completed, this are the ones which checkbox is checked
const setShowCompleted = () => {
  // Removes the background advice if exists and make its variable null
  advice?.remove();
  advice = null;
  // Loop through the activeTasks list to access each one of them an modify its style's properties
  for (let i = 0; i < activeTasks.length; i++) {
    // Translate the active tasks fully to the left
    activeTasks[i].style.transform = "translateX(-100%)";
    // Use a setTimeout function to delay the setting the tasks display's property to 'none'
    setTimeout(() => {
      activeTasks[i].style.display = "none";
    }, 300);
  }
  // Checks if there is any completed tasks, if not displays a label in the tasksContainer
  if (completedTasks.length <= 0) {
    displayAdvice("there are no completed tasks yet");
    return;
  }

  // Loop through the completedTasks list
  for (let i = 0; i < completedTasks.length; i++) {
    // If the previous filter was the show all one, we make the tasks visible and 300ms latter translate them from the left to their normal position
    if (currentId === "showAll") {
      completedTasks[i].style.display = "flex";
      setTimeout(() => {
        completedTasks[i].style.transform = "translateX(0)";
      }, 300);
    } else if (currentId === "showActive") {
      // If the previous filter was showActive, we first set its display to 'none' so when it's translated fully to the left the user don't see the transition. Then we make them visible asigning 'flex' as value of its display and delay its translation to the original position to achive a transition
      completedTasks[i].style.display = "none";
      completedTasks[i].style.transform = "translasteX(-100%)";
      completedTasks[i].style.display = "flex";
      setTimeout(() => {
        completedTasks[i].style.transform = "translateX(0)";
      }, 300);
    }
  }
};

// Displays a span with a label in the taskContainer which text is passed as a parameter
const displayAdvice = (text) => {
  advice = document.createElement("span");
  advice.classList =
    "absolute flex justify-center items-center w-full h-full text-hint";
  advice.textContent = text.toUpperCase();
  setTimeout(() => {
    document.getElementById("tasksContainer").parentNode.appendChild(advice);
  }, 400);
};

// This function updates the span and the left of the CardFooter, that shows how many active tasks are left
const setItemsCounter = () => {
  document.getElementById(
    "itemsCounter"
  ).innerHTML = `${activeTasks.length} items left`;
};

// This fucntion created a small confirmation menu for deleting the completed tasks so they are not deleted accidently. Also, directly executes the corresponding actions based on which button the user press
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
  document.getElementById("buttonsContainer").addEventListener("click", (e) => {
    // Handles the two posible options
    if (e.target.matches("#accept")) {
      // Removes all the completed tasks from the document
      for (let i = 0; i < completedTasks.length; i++) {
        completedTasks[i].remove();
      }
      // Empties the completedTasks list
      completedTasks = [];
      // Removes the whole menu from the documet
      container.remove();
      // Empties the completedTasks list
      completedTasks = [];
      // Updates the activeTasks' counter
      setItemsCounter();
      // Call the filterTasks function only if the current filtering section is not showActive. This is because if we are in the completed filtering section and the completed tasks are deleted, the advice at the background won't be displayed unless the filter is updated. Similarly, if the current filtering section is showAll AND the only tasks in existence are completed, the filter needs to be updated so the advice is shown.
      if (
        currentId === "showCompleted" ||
        (currentId === "showAll" && activeTasks.length <= 0)
      ) {
        filterTasks(currentId);
      }
    } else if (e.target.matches("#cancel")) {
      // If the cancel button is pressed, just removes the menu from the document
      console.log(container);
      container.remove();
    }
  });
};

// Initial call to the function to set the default selected button to showAll
updateSelectedButton(currentId);
// Set the initial count of active tasks
setItemsCounter();
