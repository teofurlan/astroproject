const showAllButton = document.getElementById("showAll");
const showActiveButton = document.getElementById("showActive");
const showCompletedButton = document.getElementById("showCompleted");
let currentId = showAllButton.id;

document.addEventListener("change", (e) => {
  if (!e.target.matches(".checkbox")) {
    return;
  }
  filterTasks(currentId);
});

document.getElementById("cardFooter").addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    filterTasks(e.target.getAttribute("id"));
  }
});

const updateButtonsSytle = (selectedId) => {
  document
    .getElementById("cardFooter")
    .querySelectorAll("button")
    .forEach((button) => {
      button.style.border = "none";
    });
  document.getElementById(selectedId).style.border = "1.5px solid #f5e4e4";
  currentId = selectedId;
};

const filterTasks = (buttonId) => {
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
  updateButtonsSytle(buttonId);
};

const setShowAll = () => {
  let tasks = document.getElementsByClassName("task");
  for (let i = 0; i < tasks.length; i++) {
    tasks[i].style.display = "flex";
    if (tasks[i].getElementsByTagName("input")[0].checked) {
      tasks[i].style.display = "flex";
      setTimeout(() => {
        tasks[i].style.transform = "translateX(0)";
      }, 200);
    }
    else {
      if (currentId === "showCompleted") {
        tasks[i].style.transform = "translateX(100%)"
        setTimeout(() => {
          tasks[i].style.transform = "translateX(0)";
        }, 200);
      }
    }
  }
};
const setShowActive = () => {
  let tasks = document.getElementsByClassName("task");
  for (let i = 0; i < tasks.length; i++) {
    let checkbox = tasks[i].getElementsByTagName("input")[0];
    if (checkbox.checked) {
      tasks[i].style.transform = "translateX(100%)";
      setTimeout(() => {
        tasks[i].style.display = "none";
      }, 200);
    } else {
      if (currentId === "showAll") {
      } else if (currentId === "showCompleted") {
        tasks[i].style.transform = "translateX(-100%)";
        tasks[i].style.display = "flex";
        setTimeout(() => {
          tasks[i].style.transform = "translateX(0)";
        }, 200);
      }
    }
  }
};
const setShowCompleted = () => {
  let tasks = document.getElementsByClassName("task");
  for (let i = 0; i < tasks.length; i++) {
    let checkbox = tasks[i].getElementsByTagName("input")[0];
    if (!checkbox.checked) {
      if (currentId === "showAll") {
        tasks[i].style.transform = "translateX(-100%)";
        setTimeout(() => {
          tasks[i].style.display = "none";
        }, 200);
      } else {
        tasks[i].style.display = "none";
      }
    } else {
      if (currentId === "showAll") {
        tasks[i].style.display = "flex";
        tasks[i].style.transform = "translateX(0)";
      } else if (currentId === "showActive") {
        tasks[i].style.display = "none";
        tasks[i].style.transform = "translateX(-100%)";

        tasks[i].style.display = "flex";
        setTimeout(() => {
          tasks[i].style.transform = "translateX(0)";
        }, 200);
      }
    }
  }
};

// Initial call to the function to set the default selected button to showAll
updateButtonsSytle(currentId);
