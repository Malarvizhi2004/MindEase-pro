// Theme Logic
const themes = {
  light: { bg: '#ffffff', text: '#000000' },
  dark: { bg: '#000000', text: '#ffffff' },
  ocean: { bg: '#0077be', text: '#ffffff' },
  sunset: { bg: '#ff5e62', text: '#ffffff' },
  lemonade: { bg: '#f5e050', text: '#000000' },
  grape: { bg: '#800080', text: '#ffffff' },
  peach: { bg: '#f4a261', text: '#ffffff' },
  sky: { bg: '#bde0fe', text: '#000000' }
};

function setTheme(themeName) {
  const theme = themes[themeName];
  document.documentElement.style.setProperty('--bg', theme.bg);
  document.documentElement.style.setProperty('--text', theme.text);
  localStorage.setItem('theme', themeName);
}

window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme') || 'light';
  setTheme(saved);
});

// Game 1: Color Rhythm
const colors = ['red', 'green', 'blue', 'yellow'];
let sequence = [], userSequence = [], level = 0, isPlaying = false;
const bubbles = document.querySelectorAll('.bubble');
const status = document.getElementById('status');

bubbles.forEach(bubble => {
  bubble.addEventListener('click', () => {
    if (!isPlaying) return;
    const color = bubble.dataset.color;
    userSequence.push(color);
    flash(bubble);
    checkInput();
  });
});

function flash(bubble) {
  bubble.classList.add('active');
  setTimeout(() => bubble.classList.remove('active'), 300);
}

function playSequence() {
  isPlaying = false;
  userSequence = [];
  let i = 0;
  const interval = setInterval(() => {
    const color = sequence[i];
    const bubble = document.querySelector(`.bubble.${color}`);
    flash(bubble);
    i++;
    if (i >= sequence.length) {
      clearInterval(interval);
      isPlaying = true;
      status.textContent = `Your Turn (Level ${level})`;
    }
  }, 600);
}

function checkInput() {
  const index = userSequence.length - 1;
  if (userSequence[index] !== sequence[index]) {
    status.textContent = `❌ Wrong! Game Over. Final Score: Level ${level}`;
    isPlaying = false;
    return;
  }
  if (userSequence.length === sequence.length) {
    status.textContent = `✅ Good! Level ${level} Complete.`;
    setTimeout(nextLevel, 1000);
  }
}

function nextLevel() {
  level++;
  const nextColor = colors[Math.floor(Math.random() * colors.length)];
  sequence.push(nextColor);
  status.textContent = `Watch... Level ${level}`;
  playSequence();
}

function startGame() {
  sequence = [];
  userSequence = [];
  level = 0;
  status.textContent = 'Get Ready...';
  setTimeout(nextLevel, 1000);
}

// Game 2: Color Match
const red = document.getElementById("red"),
      green = document.getElementById("green"),
      blue = document.getElementById("blue"),
      yourColor = document.getElementById("yourColor"),
      targetColor = document.getElementById("targetColor"),
      rVal = document.getElementById("rVal"),
      gVal = document.getElementById("gVal"),
      bVal = document.getElementById("bVal"),
      resultText = document.getElementById("resultText");

let targetRGB = [0, 0, 0];

function setYourColor() {
  const r = red.value, g = green.value, b = blue.value;
  yourColor.style.background = `rgb(${r},${g},${b})`;
  rVal.textContent = r;
  gVal.textContent = g;
  bVal.textContent = b;
}

function randomColor() {
  return [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
}

function newColor() {
  targetRGB = randomColor();
  targetColor.style.background = `rgb(${targetRGB[0]},${targetRGB[1]},${targetRGB[2]})`;
  resultText.textContent = '';
  setYourColor();
}

function checkMatch() {
  const r = parseInt(red.value),
        g = parseInt(green.value),
        b = parseInt(blue.value);
  const diff = Math.abs(r - targetRGB[0]) + Math.abs(g - targetRGB[1]) + Math.abs(b - targetRGB[2]);

  const messages = {
    perfect: [
      "🎯 Bang on! You're a color ninja!",
      "🔥 That’s a bullseye! You nailed it!",
      "✅ Perfect match! Are you a designer? 😉"
    ],
    close: [
      "🔍 Very close! Tweak it a little more.",
      "🧐 Nearly perfect! Almost there!",
      "👏 Great effort! Just a small nudge."
    ],
    decent: [
      "🤔 Not bad! Try fine-tuning your sliders.",
      "🎨 Hmm... You’re in the neighborhood.",
      "😅 Close-ish! Don’t give up yet."
    ],
    far: [
      "😬 Oof, that was way off!",
      "🧩 Umm... different puzzle maybe? Try again!",
      "😂 Are you trying to match or remix?"
    ],
    random: (arr) => arr[Math.floor(Math.random() * arr.length)]
  };

  let feedback = "";
  if (diff < 20) feedback = messages.random(messages.perfect);
  else if (diff < 60) feedback = messages.random(messages.close);
  else if (diff < 120) feedback = messages.random(messages.decent);
  else feedback = messages.random(messages.far);

  resultText.innerHTML = feedback;
}

red.addEventListener("input", setYourColor);
green.addEventListener("input", setYourColor);
blue.addEventListener("input", setYourColor);

window.addEventListener("DOMContentLoaded", newColor);
