

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

    if (event.target.value === "") { return }
    // // Adds the new taskElement component to the tasksContainer inside the Card
    // createNewTask(document.getElementById("textInput").value).then(
    //   (taskElement) => {
    //     if (taskElement) {
    //       document.getElementById("tasksContainer").appendChild(taskElement);

    //       print()
    //       // Dispatched event to check when a new taskElement is added

    //     }
    //   }
    // );
    document
      .getElementById("textInput")
      .dispatchEvent(
        new CustomEvent("addedNewTask", { detail: event.target.value })
      );
    // Resets the text input
    document.getElementById("textInput").value = "";
  }
});

// // Event Listener that triggers when the the Dropdown's text input is focused and the enter is pressed
// document.getElementById("textInput").addEventListener("keypress", (event) => {
//   if (event.key === "Enter") {
//     event.preventDefault();
//     // Adds the new taskElement component to the tasksContainer inside the Card
//     createNewTask(document.getElementById("textInput").value).then(
//       (taskElement) => {
//         if (taskElement) {
//           document.getElementById("tasksContainer").appendChild(taskElement);
//           // Resets the text input
//           document.getElementById("textInput").value = "";
//           print()
//           // Dispatched event to check when a new taskElement is added
//           document.dispatchEvent(
//             new CustomEvent("addedNewTask", {
//               detail: { element: taskElement },
//             })
//           );
//         }
//       }
//     );
//   }
// });
