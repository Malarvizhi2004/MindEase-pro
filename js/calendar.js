let currentDate = new Date();
let selectedDate = null;
let memories = JSON.parse(localStorage.getItem("memories")) || {};
let reminders = JSON.parse(localStorage.getItem("reminders")) || [];

function renderCalendar() {
  const datesEl = document.getElementById("dates");
  const monthYear = document.getElementById("monthYear");
  datesEl.innerHTML = "";

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  monthYear.textContent = `${currentDate.toLocaleString("default", { month: "long" })} ${year}`;

  for (let i = 0; i < firstDay; i++) {
    datesEl.appendChild(document.createElement("div"));
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const cell = document.createElement("div");
    cell.className = "date";
    cell.textContent = i;
    const key = `${year}-${month}-${i}`;
    if (memories[key]) {
      memories[key].forEach((mem, index) => {
        const memEl = document.createElement("div");
        memEl.className = "memory";
        memEl.innerHTML = `${mem} <button onclick="deleteMemory('${key}', ${index})">x</button>`;
        cell.appendChild(memEl);
      });
    }

    cell.onclick = () => {
      selectedDate = { year, month, day: i };
      document.querySelectorAll('.date').forEach(d => d.classList.remove('selected'));
      cell.classList.add("selected");
    };

    datesEl.appendChild(cell);
  }
}

function addMemory() {
  const input = document.getElementById("memoryInput");
  const text = input.value.trim();
  if (!selectedDate || !text) return;
  const key = `${selectedDate.year}-${selectedDate.month}-${selectedDate.day}`;
  memories[key] = memories[key] || [];
  memories[key].push(text);
  localStorage.setItem("memories", JSON.stringify(memories));
  input.value = "";
  renderCalendar();
}

function deleteMemory(key, index) {
  if (memories[key]) {
    memories[key].splice(index, 1);
    if (memories[key].length === 0) delete memories[key];
    localStorage.setItem("memories", JSON.stringify(memories));
    renderCalendar();
  }
}

function prevMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
}

function nextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
}

function addReminder() {
  const time = document.getElementById("reminderTime").value;
  const text = document.getElementById("reminderText").value.trim();
  if (!time || !text) return alert("Enter time and reminder.");
  reminders.push({ time, text });
  localStorage.setItem("reminders", JSON.stringify(reminders));
  displayReminders();
  document.getElementById("reminderTime").value = "";
  document.getElementById("reminderText").value = "";
}

function displayReminders() {
  const container = document.getElementById("reminderList");
  container.innerHTML = "";
  reminders.forEach((r, i) => {
    const el = document.createElement("div");
    el.className = "reminder-item";
    el.innerHTML = `${r.time} - ${r.text} <button onclick="deleteReminder(${i})">x</button>`;
    container.appendChild(el);
  });
}

function deleteReminder(i) {
  reminders.splice(i, 1);
  localStorage.setItem("reminders", JSON.stringify(reminders));
  displayReminders();
}

function checkReminderTime() {
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5);
  reminders.forEach((r) => {
    if (r.time === currentTime) {
      alert("🔔 Reminder: " + r.text);
    }
  });
}

renderCalendar();
displayReminders();
setInterval(checkReminderTime, 60000); // Check every minute
