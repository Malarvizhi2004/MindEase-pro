let mediaRecorder;
let audioChunks = [];
let recordedAudioBlob = null;

const suggestions = {
  happy: "You are shining with joy. Keep this light alive!",
  sad: "It’s okay to feel low. This too shall pass.",
  anxious: "Take a deep breath. You are safe, and everything will be okay.",
  angry: "Pause. Breathe. Let go of what you cannot control.",
  relaxed: "Embrace the calm. Your mind is at peace."
};

function handleMoodChange() {
  const mood = document.getElementById("mood").value;
  document.getElementById("suggestionText").innerText = mood ? suggestions[mood] : '';
  showSongsForMood(mood);
}

function speakText(text) {
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  speechSynthesis.speak(utterance);
}

function playCustomText() {
  const text = document.getElementById("customText").value.trim();
  if (!text) return alert("Please write something.");
  speakText(text);
}

function saveMyText() {
  const text = document.getElementById('customText').value.trim();
  if (!text) return alert('Please write something before saving!');

  const entries = JSON.parse(localStorage.getItem('moodEntries') || '[]');
  const timestamp = new Date().toLocaleString();

  entries.push({
    type: 'text',
    content: text,
    time: timestamp
  });

  localStorage.setItem('moodEntries', JSON.stringify(entries));
  document.getElementById('customText').value = '';
  showSavedEntries();
}

async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];
    mediaRecorder.start();

    mediaRecorder.ondataavailable = e => audioChunks.push(e.data);

    mediaRecorder.onstop = () => {
      recordedAudioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      alert("Recording saved in memory. Click 'Save Entry' to store.");
    };

    alert("Recording started...");
  } catch (err) {
    alert("Microphone access denied.");
  }
}

function stopRecording() {
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
  }
}

function saveAudioEntry() {
  if (!recordedAudioBlob) return alert("No recording found. Record audio first.");

  const reader = new FileReader();
  reader.onloadend = function () {
    const base64Audio = reader.result;

    const entries = JSON.parse(localStorage.getItem('moodEntries') || '[]');
    const timestamp = new Date().toLocaleString();

    entries.push({
      type: 'audio',
      audioBase64: base64Audio,
      time: timestamp
    });

    localStorage.setItem('moodEntries', JSON.stringify(entries));
    recordedAudioBlob = null;
    showSavedEntries();
  };

  reader.readAsDataURL(recordedAudioBlob);
}

function deleteEntry(index) {
  const entries = JSON.parse(localStorage.getItem('moodEntries') || '[]');
  entries.splice(index, 1);
  localStorage.setItem('moodEntries', JSON.stringify(entries));
  showSavedEntries();
}

function showSavedEntries() {
  const savedList = document.getElementById('savedList');
  savedList.innerHTML = '';
  const entries = JSON.parse(localStorage.getItem('moodEntries') || '[]');

  if (entries.length === 0) {
    savedList.innerHTML = '<p>No saved entries yet.</p>';
    return;
  }

  entries.forEach((entry, index) => {
    const entryDiv = document.createElement('div');
    entryDiv.className = 'saved-entry';

    const time = document.createElement('small');
    time.textContent = `🕒 Saved on ${entry.time}`;

    const controls = document.createElement('div');
    controls.className = 'saved-controls';

    const playBtn = document.createElement('button');
    playBtn.innerHTML = '▶️ Play';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑️ Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = () => deleteEntry(index);

    if (entry.type === 'text') {
      const content = document.createElement('div');
      content.className = 'saved-content';
      content.textContent = entry.content;
      playBtn.onclick = () => speakText(entry.content);
      entryDiv.appendChild(content);
    } else if (entry.type === 'audio') {
      const audio = document.createElement('audio');
      audio.controls = true;
      audio.src = entry.audioBase64 || entry.audio;
      playBtn.onclick = () => {
        audio.currentTime = 0;
        audio.play();
      };
      entryDiv.appendChild(audio);
    }

    controls.appendChild(playBtn);
    controls.appendChild(deleteBtn);
    entryDiv.appendChild(time);
    entryDiv.appendChild(controls);

    savedList.appendChild(entryDiv);
  });
}

function showSongsForMood(mood) {
  const moodSongs = {
    happy: [
      { name: "Happy – Pharrell Williams", url: "https://www.youtube.com/watch?v=y6Sxv-sUYtM" },
      { name: "Best Day – American Authors", url: "https://www.youtube.com/watch?v=Y66j_BUCBMY" }
    ],
    sad: [
      { name: "Fix You – Coldplay", url: "https://www.youtube.com/watch?v=k4V3Mo61fJM" },
      { name: "Let Her Go – Passenger", url: "https://www.youtube.com/watch?v=RBumgq5yVrA" }
    ],
    anxious: [
      { name: "Weightless – Marconi Union", url: "https://www.youtube.com/watch?v=UfcAVejslrU" }
    ],
    angry: [
      { name: "Numb – Linkin Park", url: "https://www.youtube.com/watch?v=kXYiU_JCYtU" }
    ],
    relaxed: [
      { name: "Dreamscape – Relaxing Music", url: "https://www.youtube.com/watch?v=2OEL4P1Rz04" }
    ]
  };

  const list = document.getElementById("songList");
  list.innerHTML = "";
  if (!moodSongs[mood]) return;
  moodSongs[mood].forEach(song => {
    const link = document.createElement("a");
    link.href = song.url;
    link.target = "_blank";
    link.className = "song-link";
    link.textContent = "🎵 " + song.name;
    list.appendChild(link);
  });
}

function toggleSaved() {
  const savedEl = document.getElementById("savedItems");
  savedEl.style.display = savedEl.style.display === "none" ? "block" : "none";
}

window.onload = showSavedEntries;
