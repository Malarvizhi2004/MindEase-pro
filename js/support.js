const supportData = [
  {
    title: '💬 Emotional Guidance',
    tips: [
      'Breathe deeply for 4-7-8 counts.',
      'Journal your feelings for 10 mins.',
      'Talk to a friend or use a voice note.',
      'Use “I feel” instead of “I am” language.'
    ]
  },
  {
    title: '🏞️ Peaceful Places',
    tips: [
      'Visit a garden or rooftop.',
      'Sit under a tree with a book.',
      'Go to a local temple or calm space.',
      'Take a nature walk and stay offline.'
    ]
  },
  {
    title: '🧘‍♀️ Self-Care Ideas',
    tips: [
      'Try yoga or slow stretching.',
      'Have a solo dance party.',
      'Do skincare or a warm shower.',
      'Create something: doodle or craft.'
    ]
  },
  {
    title: '💡 Positive Suggestions',
    tips: [
      'Write down 3 wins from your day.',
      'Make a playlist that uplifts you.',
      'Visualize a goal with eyes closed.',
      'Write a kind message to your future self.'
    ]
  },
  {
    title: '📞 Emergency Guidance',
    tips: [
      'Call a local support line or friend.',
      'Sit in a safe public space.',
      'Drink water, focus on breath.',
      'Do the “5 senses” grounding method.'
    ]
  },
  {
    title: '🌈 Motivational Boost',
    tips: [
      '“You’re stronger than you think.”',
      'Look at a photo of your happy memory.',
      'Read a powerful quote aloud.',
      'Create a simple goal and do it now.'
    ]
  }
];

const container = document.getElementById('card-container');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalList = document.getElementById('modal-list');

supportData.forEach((item) => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `<h3>${item.title}</h3><p>Click to explore support tips.</p>`;
  card.onclick = () => openModal(item.title, item.tips);
  container.appendChild(card);
});

function openModal(title, tips) {
  modalTitle.textContent = title;
  modalList.innerHTML = tips.map(tip => `<li>${tip}</li>`).join('');
  modal.style.display = 'flex';
}

function closeModal() {
  modal.style.display = 'none';
}

window.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
