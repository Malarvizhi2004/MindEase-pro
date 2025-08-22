const mood = localStorage.getItem('mood') || 'sad';
const name = localStorage.getItem('nickname') || 'Friend';

const moodData = {
  sad: {
    emoji: '😭',
    heading: "Hi {name},",
    sub: "It's hard to hear you're feeling sad...",
    msg: "We understand your sadness. You're not alone.",
    img: "../Images/sadavathar.png", // crying avatar
  },
  happy: {
    emoji: '😄',
    heading: "Hey {name},",
    sub: "You’re feeling happy!",
    msg: "Enjoy the smiles today.",
    img: "../Images/happyavathar1.png", // happy avatar
  },
  angry: {
    emoji: '😡',
    heading: "Hi {name},",
    sub: "Anger can feel heavy...",
    msg: "Let’s calm together.",
    img: "../Images/angryavathar.png", // angry avatar
  },
  calm: {
    emoji: '😇',
    heading: "Hello {name},",
    sub: "You're calm and centered.",
    msg: "Keep feeling peaceful.",
    img: "../Images/calmavathar.png", // calm avatar
  },
  anxious: {
    emoji: '😰',
    heading: "Hi {name},",
    sub: "Feeling anxious?",
    msg: "Let’s breathe and relax together.",
    img: "../Images/anxiounsavathr1.png", // anxious avatar
  },
  tired: {
    emoji: '😪',
    heading: "Hi {name},",
    sub: "You seem tired...",
    msg: "Rest and recover for tomorrow.",
    img: "../Images/slpava.png", // tired avatar
  }
};

const cfg = moodData[mood];
document.querySelector('.emoji').textContent = cfg.emoji;
document.querySelector('h1').textContent = cfg.heading.replace('{name}', name);
document.getElementById('moodSub').textContent = cfg.sub;
document.getElementById('moodMessage').textContent = cfg.msg;
document.getElementById('avatar').src = cfg.img;

// background stays same across moods (CSS only)

function openToolPage(filename) {
  window.location.href = filename;
}
