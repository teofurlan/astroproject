// Takes the id of the that is now selected, resets the style of the three buttons and applies the selected style to the one that matches the id. Updates the value of the global variable 'currentId'
document.getElementById("cardFooter").addEventListener("click", (event) => {
    // Cuts the function if the list of tasks is closed
    if (!document.getElementById('dropdown').checked) {
        return;
    }
  // We access the list of buttons in the cardFooter by querying them with their element's type selector. 
  // Then loop through each one of them with the forEach method and uses and anonymous function to give the selected style only to the button which id is equal to the event.target's one
  document
    .getElementById("cardFooter")
    .querySelectorAll("button")
    .forEach((button) => {
      if (button.id === event.target.id) {
        button.style.border = "1.5px solid #f5e4e4";
        button.classList.add("currentFilter");
      } else {
        button.style.border = "none";
        button.classList.remove("currentFilter");
      }
    });
  // document.getElementById(selectedId).style.border = "1.5px solid #f5e4e4";
  // Updates the global variable currentId with the id of the selected button
});
