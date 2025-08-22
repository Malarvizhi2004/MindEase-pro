const bgVideo = document.getElementById("bgVideo");
const audio = document.getElementById("breathAudio");
const circle = document.getElementById("breatheCircle");
const instruction = document.getElementById("instructionText");
const countdown = document.getElementById("countdown");
const stopBtn = document.getElementById("stopBtn");
let timer, countdownInterval;

function startMeditation() {
  const minutes = parseInt(document.getElementById("durationInput").value);
  if (isNaN(minutes) || minutes <= 0) {
    alert("Please enter a valid meditation time in minutes.");
    return;
  }

  document.body.style.background = "black";
  bgVideo.style.display = "block";
  audio.play();
  circle.style.display = "block";
  instruction.style.display = "block";
  countdown.style.display = "block";
  stopBtn.style.display = "inline-block";

  document.querySelector("h1").style.display = "none";
  document.querySelector(".intro").style.display = "none";
  document.getElementById("durationInput").style.display = "none";
  document.querySelector("button").style.display = "none";

  let totalSeconds = minutes * 60;
  countdown.innerText = formatTime(totalSeconds);

  countdownInterval = setInterval(() => {
    totalSeconds--;
    countdown.innerText = formatTime(totalSeconds);
    if (totalSeconds <= 0) {
      clearInterval(countdownInterval);
    }
  }, 1000);

  timer = setTimeout(() => {
    alert("⏳ Time's up! Meditation session complete.");
    stopMeditation();
  }, minutes * 60000);
}

function stopMeditation() {
  clearTimeout(timer);
  clearInterval(countdownInterval);
  audio.pause();
  audio.currentTime = 0;

  bgVideo.style.display = "none";
  document.body.style.background = "url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0') no-repeat center/cover";
  circle.style.display = "none";
  instruction.style.display = "none";
  countdown.style.display = "none";
  stopBtn.style.display = "none";

  document.querySelector("h1").style.display = "block";
  document.querySelector(".intro").style.display = "block";
  document.getElementById("durationInput").style.display = "inline-block";
  document.querySelector("button").style.display = "inline-block";
}

function formatTime(seconds) {
  const min = Math.floor(seconds / 60).toString().padStart(2, '0');
  const sec = (seconds % 60).toString().padStart(2, '0');
  return `${min}:${sec}`;
}

// Analytics (localStorage tracking)
localStorage.setItem('selectedTheme', 'Relax');
let tools = JSON.parse(localStorage.getItem('toolsUsed') || '[]');
if (!tools.includes('meditation')) tools.push('meditation');
localStorage.setItem('toolsUsed', JSON.stringify(tools));
