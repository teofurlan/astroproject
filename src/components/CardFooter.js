import { check } from "astro/jsx/server.js";

const showAllButton = document.getElementById("showAll");
const showActiveButton = document.getElementById("showActive");
const showCompletedButton = document.getElementById("showCompleted");
let isShowAllButtonSelected = false;
let isShowActiveButtonSelected = false;
let isShowCompletedButtonSelected = false;
let tasks = document.getElementsByClassName("task");
console.log(tasks.length)
showAllButton.addEventListener("click", () => {
  if (!isShowAllButtonSelected) {
    for (let i = 0; i < tasks.length; i++) {
      let checkbox = tasks[i].getElementsByTagName('input')
      if (checkbox.checked) 
      {
        console.log(checkbox)
      }
    }
  } else {
  }
  isShowAllButtonSelected = !isShowActiveButtonSelected;
});