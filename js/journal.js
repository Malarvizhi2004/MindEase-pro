let journal = JSON.parse(localStorage.getItem('moodJournal') || '[]');
let currentEditIndex = null;

function addEntry() {
  const mood = document.getElementById('moodSelect').value;
  const note = document.getElementById('noteInput').value.trim();
  if (!mood || !note) return alert("Please select a mood and write a note.");

  const entry = {
    mood,
    note,
    timestamp: new Date().toLocaleString()
  };
  journal.unshift(entry);
  localStorage.setItem('moodJournal', JSON.stringify(journal));
  document.getElementById('noteInput').value = '';
  renderEntries();
}

function renderEntries() {
  const container = document.getElementById('journalEntries');
  const filter = document.getElementById('filterMood').value;
  container.innerHTML = '';

  const filtered = journal.filter(e => filter ? e.mood === filter : true);

  filtered.forEach((entry, index) => {
    const div = document.createElement('div');
    div.className = `entry ${entry.mood}`;
    div.innerHTML = `
      <div class="mood">${emoji(entry.mood)} ${capitalize(entry.mood)}</div>
      <div class="note">${entry.note}</div>
      <div class="timestamp">${entry.timestamp}</div>
      <div class="entry-buttons">
        <button onclick="editNote(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
      </div>
    `;
    container.appendChild(div);
  });
}

function emoji(mood) {
  return {
    happy: "😊",
    sad: "😢",
    angry: "😠",
    tired: "😴",
    calm: "😌",
    anxious: "😨"
  }[mood] || "😐";
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function editNote(index) {
  currentEditIndex = index;
  document.getElementById('editNoteText').value = journal[index].note;
  document.getElementById('editModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('editModal').style.display = 'none';
}

function saveEdit() {
  const newNote = document.getElementById('editNoteText').value.trim();
  if (!newNote) return alert("Note can't be empty.");
  journal[currentEditIndex].note = newNote;
  localStorage.setItem('moodJournal', JSON.stringify(journal));
  closeModal();
  renderEntries();
}

function deleteNote(index) {
  if (confirm("Are you sure you want to delete this entry?")) {
    journal.splice(index, 1);
    localStorage.setItem('moodJournal', JSON.stringify(journal));
    renderEntries();
  }
}

function exportData() {
  const blob = new Blob([JSON.stringify(journal, null, 2)], {type: 'application/json'});
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'mood-journal.json';
  link.click();
}

renderEntries();
