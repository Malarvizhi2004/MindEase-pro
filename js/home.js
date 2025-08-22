// ✅ Quotes
const quotes = [
  "You're stronger than you think.",
  "This too shall pass.",
  "Every day is a second chance.",
  "Healing takes time, and that’s okay.",
  "You are doing your best — and that is enough."
];

window.onload = () => {
  document.getElementById("quoteText").textContent =
    quotes[Math.floor(Math.random() * quotes.length)];
};

// ✅ Chatbot
function toggleChatbot() {
  const box = document.getElementById("chatbotBox");
  box.style.display = box.style.display === "block" ? "none" : "block";
}

function suggest(mood) {
  const response = document.getElementById("chatResponse");
  switch (mood) {
    case "sad": response.textContent = "Try journaling or a calming game."; break;
    case "happy": response.textContent = "Great! Spread the joy."; break;
    case "angry": response.textContent = "Try deep breathing or music."; break;
    case "calm": response.textContent = "Enjoy the peace. Maybe try meditation?"; break;
    case "anxious": response.textContent = "Try breathing exercises or journaling."; break;
    case "tired": response.textContent = "Consider some rest or light meditation."; break;
    default: response.textContent = "Explore your mood page!";
  }
}

function selectMood(mood) {
  localStorage.setItem('mood', mood);
  let moodCounts = JSON.parse(localStorage.getItem('moodCounts') || '{}');
  moodCounts[mood] = (moodCounts[mood] || 0) + 1;
  localStorage.setItem('moodCounts', JSON.stringify(moodCounts));
  window.location.href = 'mood.html';
}

// ✅ Navbar Toggle
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// ✅ Close nav when clicking outside
document.addEventListener("click", function (event) {
  if (!menuToggle.contains(event.target) && !navLinks.contains(event.target)) {
    navLinks.classList.remove("show");
  }
});
