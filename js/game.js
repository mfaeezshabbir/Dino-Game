const character = document.getElementById("character");
const obstacle = document.getElementById("obstacle");
const startModal = document.getElementById("startModal");
const startButton = document.getElementById("startButton");

startButton.addEventListener("click", () => {
  startModal.style.display = "none";
  startGame();
});


const jumpHeight = 150;
const gravity = 10;
let isJumping = false;
let isGameOver = false;
// Function to start the game
function startGame() {
  // Add your game initialization code here
  
  character.style.animation = "run 0.5s infinite";
  
  document.addEventListener("keydown", jump);
  
  function jump(event) {
    if (event.keyCode === 32 && !isJumping && !isGameOver) {
      isJumping = true;
      jumpUp();
    }
  }
  
  function jumpUp() {
    let jumpHeightReached = false;
  
    const jumpInterval = setInterval(() => {
      const characterBottom = parseInt(
        window.getComputedStyle(character).getPropertyValue("bottom")
      );
  
      if (characterBottom >= jumpHeight) {
        jumpHeightReached = true;
      }
  
      if (jumpHeightReached) {
        clearInterval(jumpInterval);
        fall();
      } else {
        character.style.bottom = characterBottom + gravity + "px";
      }
    }, 20);
  }
  
  function fall() {
    const fallInterval = setInterval(() => {
      const characterBottom = parseInt(
        window.getComputedStyle(character).getPropertyValue("bottom")
      );
  
      if (characterBottom <= 0) {
        clearInterval(fallInterval);
        isJumping = false;
      } else {
        character.style.bottom = characterBottom - gravity + "px";
      }
    }, 20);
  }
  
  function checkCollision() {
    const characterBottom = parseInt(
      window.getComputedStyle(character).getPropertyValue("bottom")
    );
    const obstacleLeft = parseInt(
      window.getComputedStyle(obstacle).getPropertyValue("left")
    );
  
    if (
      characterBottom <= 50 &&
      obstacleLeft <= 60 &&
      obstacleLeft >= 0 &&
      !isGameOver
    ) {
      isGameOver = true;
      character.style.animation = "none";
      alert("Game Over! Your Score: " + score);
      location.reload();
    }
  }
  
  let score = 0;
  
  function updateScore() {
    if (!isGameOver) {
      score++;
      document.getElementById("score").innerText = score;
    }
  }
  
  setInterval(updateScore, 1000);
  
  function generateObstacle() {
    const obstacleLeft = parseInt(
      window.getComputedStyle(obstacle).getPropertyValue("left")
    );
  
    if (obstacleLeft <= -20) {
      const randomHeight = Math.floor(Math.random() * 80) + 20; // Adjusted obstacle height
      obstacle.style.height = randomHeight + "px";
      obstacle.style.left = "100%";
    } else {
      obstacle.style.left = obstacleLeft - 10 + "px";
      checkCollision();
    }
  }
  
  setInterval(generateObstacle, 20);
}

// Call the start game modal
startModal.style.display = "block";
