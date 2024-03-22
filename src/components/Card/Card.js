document.addEventListener("change", (e) => {
    if (!e.target.matches(".checkbox")) {
      return;
    }
    const id = e.target.getAttribute("id").split("-")[1];
    console.log("checkbox checked " + id);
    const checkbox = document.getElementById(`checkbox-${id}`);
    const label = document.getElementById(`label-${id}`);
    if (checkbox.checked) {
      label.style.textDecoration = 'line-through'
      label.style.color = "#d0d0d0";
    } else {
      label.style.textDecoration = 'none'
      label.style.color = "#272424";

    }
  });