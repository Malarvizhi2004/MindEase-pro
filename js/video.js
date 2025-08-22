const carouselCards = document.getElementById("carouselCards");
const moodVideosContainer = document.getElementById("moodVideos");
const moodTitle = document.getElementById("moodTitle");
const youtubeLinksDiv = document.getElementById("youtubeLinks");
const videoModal = document.getElementById("videoModal");
const fullscreenVideo = document.getElementById("fullscreenVideo");
const positiveMsg = document.getElementById("positiveMsg");

let pauseCarouselRotation = false;
let angle = 0;
let currentIndex = 0;

const carouselClips = [
  { type: 'image', src: '../Images/happyimg.jpg', mood: 'happy' },
  { type: 'image', src: '../Images/sad.111.jpeg', mood: 'sad' },
  { type: 'image', src: '../Images/angryimg.jpg', mood: 'angry' },
  { type: 'image', src: '../Images/calm1img.jpg', mood: 'calm' },
  { type: 'image', src: '../Images/anxious111.jpg', mood: 'anxious' },
  { type: 'image', src: '../Images/dreamimg1.jpg', mood: 'dreamy' }
];

const moodVideos = {
  happy: {
    video: { src: '../videos/happy.mp4', msg: 'Stay joyful and energetic! 😊' },
    links: [
      'https://www.youtube.com/watch?v=d-diB65scQU',
      'https://www.youtube.com/watch?v=ZbZSe6N_BXs',
      'https://www.youtube.com/watch?v=PT2_F-1esPk',
      'https://www.youtube.com/watch?v=9bZkp7q19f0',
      'https://www.youtube.com/watch?v=KxGRhd_iWuE'
    ]
  },
  sad: {
    video: { src: '../videos/sad.mp4', msg: 'It’s okay to feel sad. 🌧️' },
    links: [
      'https://www.youtube.com/watch?v=io1WL9oU3YE',
      'https://www.youtube.com/watch?v=K9X9cHZ5PHE',
      'https://www.youtube.com/watch?v=vS9B1H9FNRA',
      'https://www.youtube.com/watch?v=TWcyIpul8OE',
      'https://www.youtube.com/watch?v=RB-RcX5DS5A'
    ]
  },
  angry: {
    video: { src: '../videos/angry.mp4', msg: 'Take a deep breath... 😤' },
    links: [
      'https://www.youtube.com/watch?v=IQ6W1bS1QXM',
      'https://www.youtube.com/watch?v=Ud4HgY9W9PU',
      'https://www.youtube.com/watch?v=KTnhsAVpYyE',
      'https://www.youtube.com/watch?v=Z8Z51no1TD0',
      'https://www.youtube.com/watch?v=60ItHLz5WEA'
    ]
  },
  calm: {
    video: { src: '../videos/calm.mp4', msg: 'Enjoy the calm. 🌲' },
    links: [
      'https://www.youtube.com/watch?v=1ZYbU82GVz4',
      'https://www.youtube.com/watch?v=2OEL4P1Rz04',
      'https://www.youtube.com/watch?v=b4rXbMyaU1g',
      'https://www.youtube.com/watch?v=eKFTSSKCzWA',
      'https://www.youtube.com/watch?v=5qap5aO4i9A'
    ]
  },
  anxious: {
    video: { src: '../videos/anxious.mp4', msg: 'You’re safe. Breathe. 🌊' },
    links: [
      'https://www.youtube.com/watch?v=MJoczdESU24',
      'https://www.youtube.com/watch?v=RZuJ_OsaxzY',
      'https://www.youtube.com/watch?v=vn2jQ3Y_dWo',
      'https://www.youtube.com/watch?v=IcrbM1l_BoI',
      'https://www.youtube.com/watch?v=GBIIQ0kP15E'
    ]
  },
  dreamy: {
    video: { src: '../videos/dream.mp4', msg: 'Drift into your imagination. 🌙' },
    links: [
      'https://www.youtube.com/watch?v=xpD_HZtGmUY',
      'https://www.youtube.com/watch?v=bNlNz2qjv3I',
      'https://www.youtube.com/watch?v=Un3r0xA3o7g',
      'https://www.youtube.com/watch?v=-1Y2WfcCb4M',
      'https://www.youtube.com/watch?v=wzjWIxXBs_s'
    ]
  }
};

function createCarousel() {
  carouselCards.innerHTML = '';
  const count = carouselClips.length;
  const step = 360 / count;
  const radius = 400;

  carouselClips.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = i;
    card.style.transform = `rotateY(${i * step}deg) translateZ(${radius}px)`;

    const handleClick = () => {
      selectMood(item.mood);
      focusCarousel(i);
      pauseCarouselRotation = true;
    };

    const img = document.createElement('img');
    img.src = item.src;
    img.alt = 'Mood image';
    img.style.width = '100%';
    img.onclick = handleClick;
    card.appendChild(img);

    carouselCards.appendChild(card);
  });
}

function focusCarousel(index) {
  const step = 360 / carouselClips.length;
  angle = -step * index;
  carouselCards.style.transform = `rotateY(${angle}deg)`;
  currentIndex = index;
}

function animateCarousel() {
  if (!pauseCarouselRotation) {
    angle += 0.2;
    carouselCards.style.transform = `rotateY(${angle}deg)`;
  }
  requestAnimationFrame(animateCarousel);
}

function selectMood(mood) {
  const moodObj = moodVideos[mood];
  if (!moodObj) return;

  moodTitle.innerText = `Videos for "${mood}" mood`;
  moodVideosContainer.innerHTML = '';
  youtubeLinksDiv.innerHTML = '';

  const vid = document.createElement('video');
  vid.src = moodObj.video.src;
  vid.setAttribute('muted', true);
  vid.setAttribute('loop', true);
  vid.autoplay = true;
  vid.onclick = () => playInModal(moodObj.video.src, moodObj.video.msg);
  moodVideosContainer.appendChild(vid);

  const header = document.createElement('h3');
  header.innerText = "🎥 Recommended YouTube Videos:";
  youtubeLinksDiv.appendChild(header);

  moodObj.links.forEach(link => {
    const a = document.createElement('a');
    a.href = link;
    a.textContent = link;
    a.target = '_blank';
    youtubeLinksDiv.appendChild(a);
  });

  // 🎯 Automatically rotate carousel to matching mood image
  const moodIndex = carouselClips.findIndex(item => item.mood === mood);
  if (moodIndex !== -1) {
    focusCarousel(moodIndex);
    pauseCarouselRotation = true;
  }
}

function playInModal(src, message) {
  fullscreenVideo.src = src;
  videoModal.style.display = 'flex';
  positiveMsg.innerText = message;
}

function closeModal() {
  videoModal.style.display = 'none';
  fullscreenVideo.pause();
  fullscreenVideo.currentTime = 0;
}

createCarousel();
animateCarousel();
