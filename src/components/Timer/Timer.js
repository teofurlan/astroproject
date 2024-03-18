const timerButton = document.querySelector(".timer-button");
const timerText = document.getElementById("timerText");
// Overlay
const overlayText = document.getElementById("overlayText");
// Progress Bar
const circumference = 1445;
// Global variables
let isCounting = false;
let selectedPeriods;
// let interval;
let intervalsText = ["20:00", "05:00", "08:00"];
let alarmPath = '/sounds/1.mp3'

const setTime = () => {
  selectedPeriods = selectedPeriods.split(" ");
  intervalsText = [];
  for (let i in selectedPeriods) {
    intervalsText.push(
      selectedPeriods[i].substring(1, 2) === "s"
        ? "00:" +
            selectedPeriods[i]
              .substring(0, selectedPeriods[i].length - 1)
              .padStart(2, "0")
        : selectedPeriods[i]
            .substring(0, selectedPeriods[i].length - 1)
            .padStart(2, "0") + ":00"
    );
    timerText.innerHTML = intervalsText[0];
  }
};

const setProgressBar = (time, count, reset = false) => {
  const timerBar = document.getElementById("timerBar");

  if (reset) {
    timerBar.style.strokeDashoffset = "0";
  } else {
    const porcentage = (count / time) * 100;
    const progress = circumference - (circumference * porcentage) / 100;
    timerBar.style.strokeDashoffset = `${progress}`;
    console.log();
  }
};

const setIntervalTypes = (intervalsSeconds) => {
  return {
    pomodoro: {
      count: 0,
      time: intervalsSeconds[0],
    },
    shortBreak: {
      count: 0,
      time: intervalsSeconds[1],
    },
    longBreak: {
      count: 0,
      time: intervalsSeconds[2],
    },
  };
};

const setIntervalsSeconds = () => {
  return intervalsText.map((interval) => calculateTotalSeconds(interval));
};

const formatTime = (count) => {
  let minutes = Math.floor(count / 60)
    .toString()
    .padStart(2, "0");
  let seconds = (count % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const calculateTotalSeconds = (time) => {
  return parseInt(time.split(":")[0]) * 60 + parseInt(time.split(":")[1]);
};

const playAudioOnce = (audioPath) => {
  let audio = new Audio(audioPath)
  // Play the audio
  audio.play();
  // Event listener to stop further playback after the audio ends
  audio.addEventListener('ended', function endedHandler() {
    // Remove the event listener
    audio.removeEventListener('ended', endedHandler);
    // Pause the audio
    audio.pause();
  });
}


const pomodoroTimer = () => {

  let intervalId;
  let currentInterval;
  let intervalsSeconds = setIntervalsSeconds();
  let intervalTypes = setIntervalTypes(intervalsSeconds);

  document.addEventListener("selectedTime", (event) => {
    selectedPeriods = event.detail;
    setTime();
    clearInterval(intervalId);
    isCounting = false;
    intervalsSeconds = setIntervalsSeconds();
    intervalTypes = setIntervalTypes(intervalsSeconds);
    setProgressBar(0, 0, true)
  });

  let isCounting = false;

  timerButton.addEventListener("click", () => {
    intervalsSeconds = setIntervalsSeconds();
    if (!isCounting) {
      startTimer();
      // Change the text of the overlay to stop
      overlayText.innerHTML = "STOP";
      isCounting = !isCounting;
    } else {
      // Change the overlay's text to start
      overlayText.innerHTML = "START";
      isCounting = !isCounting;
      clearInterval(intervalId);
      // Restart the timer text to the initial time
      timerText.innerHTML = formatTime(intervalTypes[currentInterval].time);
      setProgressBar(0, 0, true)
    }
  });
  let startTimer = () => {
    let count;
    let duration;
    switch (true) {
      case intervalTypes.pomodoro.count > 0 &&
        intervalTypes.pomodoro.count % 4 === 0:
        // Long breaks condition
        duration = intervalsSeconds[2];
        currentInterval = "longBreak";
        console.log("long break", intervalTypes.longBreak.count);
        break;
      case intervalTypes.shortBreak.count < intervalTypes.pomodoro.count &&
        intervalTypes.pomodoro.count % 4 !== 0:
        // Short breaks condition
        duration = intervalsSeconds[1];
        currentInterval = "shortBreak";
        console.log("short break", intervalTypes.shortBreak.count);
        break;
      default:
        duration = intervalsSeconds[0];
        currentInterval = "pomodoro";
        console.log("pomodoro", intervalTypes.pomodoro.count);
        break;
    }
    count = duration;
    intervalId = setInterval(() => {
      count--;
      timerText.innerHTML = formatTime(count);
      setProgressBar(duration, count);

      if (count <= 0) {
        playAudioOnce(alarmPath)
        intervalTypes[currentInterval].count++
        clearInterval(intervalId);
        setProgressBar(0, 0, true);
        switch (true) {
          case intervalTypes.pomodoro.count > 0 &&
            intervalTypes.pomodoro.count % 4 === 0:
            // Long breaks condition
            timerText.innerHTML = intervalsText[2];
            break;
          case intervalTypes.shortBreak.count < intervalTypes.pomodoro.count &&
            intervalTypes.pomodoro.count % 4 !== 0:
            // Short breaks condition
            timerText.innerHTML = intervalsText[1];
            break;
          default:
            timerText.innerHTML = intervalsText[0];
            break;
        }
        overlayText.innerHTML = "START";
        isCounting = !isCounting;
      }
    }, 1000);
  };
};

pomodoroTimer();
