const questionEl = document.getElementById('question');
const answerInput = document.getElementById('answerInput');
const submitBtn = document.getElementById('submitBtn');
const feedbackEl = document.getElementById('feedback');
const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restartBtn');

let correctAnswers = 0;
let currentAnswer = null;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateQuestion() {
  const a = getRandomInt(1, 12);
  const b = getRandomInt(1, 12);
  const operators = ['+', '-', '*'];
  const operator = operators[getRandomInt(0, operators.length - 1)];

  let questionText = `${a} ${operator} ${b}`;
  switch (operator) {
    case '+':
      currentAnswer = a + b;
      break;
    case '-':
      currentAnswer = a - b;
      break;
    case '*':
      currentAnswer = a * b;
      break;
  }

  questionEl.textContent = `What is ${questionText}?`;
}

function updateScore() {
  scoreEl.textContent = correctAnswers;
}

function resetGame() {
  correctAnswers = 0;
  feedbackEl.textContent = 'Ready for a new challenge!';
  updateScore();
  generateQuestion();
  answerInput.value = '';
  answerInput.focus();
}

function submitAnswer() {
  const userValue = parseInt(answerInput.value, 10);
  if (Number.isNaN(userValue)) {
    feedbackEl.textContent = 'Please enter a valid number.';
    return;
  }

  if (userValue === currentAnswer) {
    correctAnswers += 1;
    if (correctAnswers >= 5) {
      feedbackEl.textContent = 'You answered 5 questions correctly! You win! Starting over...';
      setTimeout(resetGame, 1200);
      return;
    }
    feedbackEl.textContent = 'Correct! Keep going.';
    updateScore();
  } else {
    feedbackEl.textContent = `Incorrect. The right answer was ${currentAnswer}. Try the next question.`;
  }

  answerInput.value = '';
  answerInput.focus();
  generateQuestion();
}

submitBtn.addEventListener('click', submitAnswer);
answerInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    submitAnswer();
  }
});
restartBtn.addEventListener('click', resetGame);

resetGame();
