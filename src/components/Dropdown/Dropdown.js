const dropdownCheckbox = document.getElementById("dropdown");

dropdownCheckbox.addEventListener("change", () => {
  if (dropdownCheckbox.checked) {
    console.log("Open");
  } else {
    console.log("Close");
  }
});

document.getElementById('newTask').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    console.log('added new task!')
  }
})
