let highScore = localStorage.getItem('highScore') || 0;
document.getElementById('high-score-box').innerText = `🏆 High Score: ${highScore}`;

    let selectedPet = '🐱';
    let petName = 'Pet';
    let score = 0;
    let gameInterval;

    function startGame() {
      selectedPet = document.getElementById('pet-select').value;
      petName = document.getElementById('pet-name').value || 'Your Pet';
      document.getElementById('pet-emoji').innerText = selectedPet;
      document.getElementById('name-label').innerText = petName;
      document.getElementById('menu').style.display = 'block';
      
    }

    function showSection(section) {
      document.querySelectorAll('#game-area, #eat-area, #sleep-area, #outing-area')
        .forEach(el => el.style.display = 'none');

      if (section === 'game') {
        document.getElementById('game-area').style.display = 'block';
        startBallGame();
      } else if (section === 'eat') {
        document.getElementById('eat-area').style.display = 'block';
        document.getElementById('foodPet').innerText = selectedPet;
        document.getElementById('reaction').innerText = '';
       } else if (section === 'sleep') {
  document.getElementById('sleep-area').style.display = 'block';
  document.getElementById('sleepPet').innerText = selectedPet;
}

      else if (section === 'outing') {
  document.getElementById('outing-area').style.display = 'block';
  document.getElementById('pet-outing').innerText = selectedPet;
  document.getElementById('pet-outing-name').innerText = petName;
  
      }
    }

    function backToMenu() {
      document.getElementById('menu').style.display = 'block';
      document.querySelectorAll('#game-area, #eat-area, #sleep-area, #outing-area')
        .forEach(el => el.style.display = 'none');
      clearInterval(gameInterval);
      clearInterval(sleepTimer);
      document.querySelectorAll('.ball').forEach(ball => ball.remove());
      score = 0;
      document.getElementById('score').innerText = "Score: 0";
    }

    function startBallGame() {
      const box = document.getElementById('game-box');
      const catcher = document.getElementById('catcher');
      catcher.innerText = selectedPet;

      document.addEventListener('keydown', e => {
        let left = parseInt(window.getComputedStyle(catcher).left);
        if (e.key === 'ArrowLeft' && left > 0) {
          catcher.style.left = (left - 20) + 'px';
        } else if (e.key === 'ArrowRight' && left < 250) {
          catcher.style.left = (left + 20) + 'px';
        }
      });

      gameInterval = setInterval(() => {
        const ball = document.createElement('div');
        ball.classList.add('ball');
        ball.innerText = '🎾';
        ball.style.left = Math.floor(Math.random() * 260) + 'px';
        box.appendChild(ball);

        const fall = setInterval(() => {
          const ballTop = parseInt(window.getComputedStyle(ball).top);
          const ballLeft = parseInt(ball.style.left);
          const catcherLeft = parseInt(catcher.style.left);

          if (ballTop > 350 && Math.abs(ballLeft - catcherLeft) < 40) {
  score++;
  document.getElementById('score').innerText = "Score: " + score;

  // High score logic
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('highScore', highScore);
    document.getElementById('high-score-box').innerText = `🏆 High Score: ${highScore}`;
    document.getElementById('appreciation-message').innerText = `🎉 New High Score! You're amazing! 🌟🐾`;
  } else {
    document.getElementById('appreciation-message').innerText = '';
  }

  ball.remove();
  clearInterval(fall);
}

        }, 50);
      }, 1000);
    }

    // Food Tray
    const foodTray = document.getElementById("foodTray");
    const pet = document.getElementById("foodPet");
    const reaction = document.getElementById("reaction");

    const reactions = ["Yummy! 😋", "Delicious! 🤤", "So good! 😍", "More please! 🐾", "Mmm... 😻"];

    foodTray.addEventListener("mouseenter", () => {
      foodTray.classList.add("paused");
    });

    foodTray.addEventListener("mouseleave", () => {
      foodTray.classList.remove("paused");
    });

    foodTray.addEventListener("click", (e) => {
      if (e.target.classList.contains("food-item")) {
        const food = e.target.textContent;
        const foodFly = document.createElement("div");
        foodFly.classList.add("food-fly");
        foodFly.textContent = food;
        foodFly.style.left = `${e.target.offsetLeft}px`;
        foodTray.appendChild(foodFly);
        setTimeout(() => foodFly.remove(), 1000);
        pet.innerHTML = "😋";
        reaction.textContent = reactions[Math.floor(Math.random() * reactions.length)];
        setTimeout(() => {
          pet.innerHTML = selectedPet;
          reaction.textContent = "";
        }, 2000);
      }
    });

    // Sleep timer logic
    let countdownEl = document.getElementById('countdown');
    let sleepTimer;
    let remaining = 0;

    function startSleep() {
      const time = parseInt(document.getElementById('sleepTime').value);
      if (isNaN(time) || time <= 0) {
        alert("Please enter a valid number of seconds.");
        return;
      }

      clearInterval(sleepTimer);
      remaining = time;
      updateTimerText();

      sleepTimer = setInterval(() => {
        remaining--;
        updateTimerText();
        if (remaining <= 0) {
          clearInterval(sleepTimer);
          backToMenu();
        }
      }, 1000);
    }

    function updateTimerText() {
      countdownEl.textContent = `Waking up in ${remaining} second${remaining === 1 ? '' : 's'}...`;
    }


    

let petOuting = document.getElementById('pet-outing');
let walkInterval = null;
let walkPos = 50;
let walking = false;

function walkPet() {
  if (!walking) {
    walking = true;
    const sceneWidth = document.querySelector(".scene").offsetWidth;

    walkInterval = setInterval(() => {
      if (walkPos >= sceneWidth - 100) {
        walkPos = -100; // Reset to start from left again inside scene
      } else {
        walkPos += 5;
      }
      petOuting.style.left = walkPos + 'px';
      petOuting.style.transform = `translateY(${Math.sin(walkPos / 20) * 10}px)`;
    }, 50);
  }
}


function stopWalk() {
  if (walkInterval) {
    clearInterval(walkInterval);
    walking = false;
  }
}

function takeSelfie() {
  const flash = document.getElementById('flash');
  flash.style.animation = 'none';
  void flash.offsetWidth; // Restart animation
  flash.style.animation = 'flashAnim 0.5s ease-in-out';
}

// When outing section opens, update the pet emoji
document.getElementById("outing-area").addEventListener("show", () => {
  petOuting.textContent = selectedPet;
});
