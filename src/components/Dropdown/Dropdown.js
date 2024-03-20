const dropdownCheckbox = document.getElementById("dropdown");

dropdownCheckbox.addEventListener("change", () => {
  if (dropdownCheckbox.checked) {
    console.log("Open");
  } else {
    console.log("Close");
  }
});
