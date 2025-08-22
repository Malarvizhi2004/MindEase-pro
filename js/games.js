function showGame(id) {
  document.querySelectorAll('.game-section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// Emoji Match
const emojis = ['🍕', '🐱', '🚀', '🎮', '🌈', '🎵', '🍩', '⚽️'];
let board = [], revealed = [], matched = [], score = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startMatchGame() {
  board = [...emojis, ...emojis];
  shuffle(board);
  matched = [];
  revealed = [];
  score = 0;
  document.getElementById('score').textContent = 'Score: 0';
  renderBoard();
}

function renderBoard() {
  const gameBoard = document.getElementById('gameBoard');
  gameBoard.innerHTML = '';
  board.forEach((emoji, i) => {
    const card = document.createElement('div');
    card.className = 'card';
    if (matched.includes(i)) {
      card.classList.add('matched');
      card.textContent = emoji;
    } else if (revealed.includes(i)) {
      card.classList.add('revealed');
      card.textContent = emoji;
    } else {
      card.textContent = '❓';
    }
    card.onclick = () => revealCard(i);
    gameBoard.appendChild(card);
  });
}

function revealCard(index) {
  if (revealed.length >= 2 || revealed.includes(index) || matched.includes(index)) return;
  revealed.push(index);
  renderBoard();
  if (revealed.length === 2) {
    const [a, b] = revealed;
    if (board[a] === board[b]) {
      matched.push(...revealed);
      score += 10;
    } else {
      score -= 2;
    }
    setTimeout(() => {
      revealed = [];
      document.getElementById('score').textContent = `Score: ${score}`;
      renderBoard();
    }, 800);
  }
}

// Number Guess
let secretNumber = Math.floor(Math.random() * 20) + 1;
function checkGuess() {
  const guess = parseInt(document.getElementById('userGuess').value);
  const result = document.getElementById('guessResult');
  if (guess === secretNumber) {
    result.textContent = '🎉 Correct!';
    result.style.color = 'lime';
  } else if (guess < secretNumber) {
    result.textContent = 'Too low!';
    result.style.color = 'orange';
  } else {
    result.textContent = 'Too high!';
    result.style.color = 'orange';
  }
}
function resetGuess() {
  secretNumber = Math.floor(Math.random() * 20) + 1;
  document.getElementById('userGuess').value = '';
  document.getElementById('guessResult').textContent = '';
}

// Catch the Ball
const canvas = document.getElementById('ballCanvas');
const ctx = canvas.getContext('2d');
const paddle = { x: 125, y: 370, width: 50, height: 10 };
const ball = { x: 150, y: 0, radius: 10, speed: 2 };
let catchScore = 0, animationId;

function drawCatchGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'lime';
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.closePath();

  ball.y += ball.speed;

  if (
    ball.y + ball.radius >= paddle.y &&
    ball.x > paddle.x &&
    ball.x < paddle.x + paddle.width
  ) {
    catchScore++;
    ball.speed += 0.5;
    resetBall();
    document.getElementById('catchScore').innerText = "Score: " + catchScore;
  }

  if (ball.y > canvas.height) {
    stopCatchGame();
    alert("Game Over! Your score: " + catchScore);
    return;
  }

  animationId = requestAnimationFrame(drawCatchGame);
}

function resetBall() {
  ball.x = Math.random() * (canvas.width - 20) + 10;
  ball.y = 0;
}

function startCatchGame() {
  catchScore = 0;
  ball.speed = 2;
  resetBall();
  drawCatchGame();
}

function stopCatchGame() {
  cancelAnimationFrame(animationId);
  document.getElementById('catchScore').innerText = "Score: 0";
}

window.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft' && paddle.x > 0) paddle.x -= 20;
  if (e.key === 'ArrowRight' && paddle.x + paddle.width < canvas.width) paddle.x += 20;
});

// Reaction Time
const reactionBox = document.getElementById('reactionBox');
const reactionResult = document.getElementById('reactionResult');
const bestReaction = document.getElementById('bestReaction');
let startTime, best = null, timeoutID;

// Load best score from localStorage on page load
if (localStorage.getItem('bestReactionTime')) {
  best = parseInt(localStorage.getItem('bestReactionTime'));
  bestReaction.textContent = `Best: ${best} ms`;
} else {
  bestReaction.textContent = 'Best: --';
}

document.getElementById('startReaction').onclick = () => {
  reactionBox.style.display = 'block';
  reactionBox.style.backgroundColor = '#fff';
  reactionBox.textContent = 'Wait for it...';
  reactionResult.textContent = '';
  bestReaction.style.color = '#fff';

  const delay = Math.random() * 2000 + 1000;
  timeoutID = setTimeout(() => {
    startTime = new Date().getTime();
    const colors = ['#4caf50', '#ff5722', '#2196f3', '#9c27b0'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    reactionBox.style.backgroundColor = color;
    reactionBox.textContent = 'Click now!';

    reactionBox.onclick = () => {
      const end = new Date().getTime();
      const reactionTime = end - startTime;
      reactionResult.textContent = `⏱️ Your reaction time: ${reactionTime} ms`;

      // Update best score if needed
      if (best === null || reactionTime < best) {
        best = reactionTime;
        localStorage.setItem('bestReactionTime', best); // store in localStorage
        bestReaction.textContent = `Best: ${best} ms`;
      }

      reactionBox.style.display = 'none';
      reactionBox.onclick = null;
    };
  }, delay);

  reactionBox.onclick = () => {
    clearTimeout(timeoutID);
    reactionBox.textContent = "Too soon!";
    reactionBox.style.backgroundColor = 'red';
    setTimeout(() => reactionBox.style.display = 'none', 1000);
  };
};

// Auto-start match game
startMatchGame();
