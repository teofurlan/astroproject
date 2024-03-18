let menuButton = document.getElementById("menuButton");
let menu = document.getElementById("Menu");

let mainMenu = document.getElementById("mainMenu");
let timeButton = document.getElementById("timeButton");

let timeMenuButtons = document.querySelectorAll(".time-menu__button");

let selectedTime

timeMenu.classList.add("time-menu--closed");

menuButton.addEventListener("click", () => {
  menu.classList.toggle("menu--opened");
});

timeButton.addEventListener("click", () => {
  mainMenu.classList.toggle("main-menu--closed");
  timeMenu.classList.toggle("time-menu--closed");
});

// timeMenu.addEventListener('click', (event) => {
//     if (event.target.classList.contains("time-menu__button") || event.target.classList.contains("menu__text")) {
//         mainMenu.classList.toggle("main-menu--closed");
//         timeMenu.classList.toggle("time-menu--closed")
//     }
// })

timeMenuButtons.forEach((button) => {
  button.addEventListener("click", () => {
    console.log(button.querySelector(".menu__subtext").textContent.substring(0, 2));
    mainMenu.classList.toggle("main-menu--closed");
    timeMenu.classList.toggle("time-menu--closed");
    document.dispatchEvent(new CustomEvent('selectedTime', { detail: button.querySelector(".menu__subtext").textContent}))
  });
});

