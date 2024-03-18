
let menuDisplayButton = document.getElementById("menuDisplayButton")
let optionsContainer = document.getElementById("optionsContainer")
menuDisplayButton?.addEventListener("click", () => {
  if (optionsContainer) {
    if (optionsContainer.classList.contains("menu-options__opened")) {
      optionsContainer.classList.remove("menu-options__opened")
    } else {
      optionsContainer.classList.add("menu-options__opened")
    }
  }
})
