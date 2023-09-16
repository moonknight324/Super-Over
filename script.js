const strikeButton = document.getElementById("strike");
const resetButton = document.getElementById("reset");
const t1_Score = document.getElementById("score-team1");
const t1_Wickets = document.getElementById("wickets-team1");
const t2_Score = document.getElementById("score-team2");
const t2_Wickets = document.getElementById("wickets-team2");

const strikeAudio = new Audio("http://bit.ly/so-ball-hit");
const gameOverAudio = new Audio("http://bit.ly/so-crowd-cheer");

var t1Score = 0;
var t1Wickets = 0;
var t2Score = 0;
var t2Wickets = 0;
var t1BallsFaced = 0;
var t2BallsFaced = 0;
var turn = 1;

const possibleOutcomes = [0, 1, 2, 3, 4, 6, "W"];

function gameOver() {
  gameOverAudio.play();
  if (t1Score > t2Score) alert("IND wins");
  if (t2Score > t1Score) alert("PAK wins");
  if (t2Score === t1Score) alert("It is another superover!");
}

function updateScore() {
  t1_Score.textContent = t1Score;
  t1_Wickets.textContent = t1Wickets;
  t2_Score.textContent = t2Score;
  t2_Wickets.textContent = t2Wickets;
}

resetButton.onclick = () => {
  window.location.reload();
};

strikeButton.onclick = () => {
  strikeAudio.pause();
  strikeAudio.currentTime = 0;
  strikeAudio.play();

  const randomElement =
    possibleOutcomes[Math.floor(Math.random() * possibleOutcomes.length)];

  if (turn === 2) {
    t2BallsFaced++;
    document.querySelector(
      `#team2-superover div:nth-child(${t2BallsFaced})`
    ).textContent = randomElement;
    if (randomElement === "W") {
      t2Wickets++;
    }
    else {
      t2Score += randomElement;
    }
    if (
      t2BallsFaced === 6 ||
      t2Wickets === 2 ||
      t2Score > t1Score
    ) {
      turn = 3;
      gameOver();
    }
  }

  if (turn === 1) {
    t1BallsFaced++;
    document.querySelector(
      `#team1-superover div:nth-child(${t1BallsFaced})`
    ).textContent = randomElement;
    if (randomElement === "W") {
      t1Wickets++;
    } else {
      t1Score += randomElement;
    }
    if (t1BallsFaced === 6 || t1Wickets === 2) turn = 2;
  }
  updateScore();
};