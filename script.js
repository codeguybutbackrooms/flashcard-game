const topics = [
  { name: "Math", color: "tomato" },
  { name: "Science", color: "seagreen" },
  { name: "History", color: "royalblue" },
  { name: "Art", color: "purple" }
];

const fullQuestions = {
  Math: {
    Easy: [
      { q: "2 + 2 = ?", a: "4" },
      { q: "5 - 3 = ?", a: "2" },
      { q: "3 × 3 = ?", a: "9" },
      { q: "10 ÷ 2 = ?", a: "5" },
      { q: "What comes after 7?", a: "8" }
    ],
    Medium: [
      { q: "Square root of 49?", a: "7" },
      { q: "12 × 4 = ?", a: "48" },
      { q: "100 ÷ 5 = ?", a: "20" },
      { q: "(3 + 5) × 2 = ?", a: "16" },
      { q: "25% of 80?", a: "20" }
    ],
    Hard: [
      { q: "Derivative of x²?", a: "2x" },
      { q: "π (3 decimal places)?", a: "3.142" },
      { q: "Solve for x: 2x - 3 = 7", a: "5" },
      { q: "Area of circle, r=3?", a: "28.27" },
      { q: "Limit of (1 + 1/n)^n?", a: "e" }
    ]
  },
  Science: {
    Easy: [
      { q: "What planet do we live on?", a: "Earth" },
      { q: "Water freezes at (°C)?", a: "0" },
      { q: "Gas we breathe in?", a: "Oxygen" },
      { q: "What color is the sky?", a: "Blue" },
      { q: "Organ that pumps blood?", a: "Heart" }
    ],
    Medium: [
      { q: "Planet with rings?", a: "Saturn" },
      { q: "What is H2O?", a: "Water" },
      { q: "Center of an atom?", a: "Nucleus" },
      { q: "DNA stands for?", a: "Deoxyribonucleic acid" },
      { q: "How many legs do insects have?", a: "6" }
    ],
    Hard: [
      { q: "Newton’s second law?", a: "F = ma" },
      { q: "Formula for glucose?", a: "C6H12O6" },
      { q: "Organelle that makes energy?", a: "Mitochondria" },
      { q: "Speed of light (km/s)?", a: "300000" },
      { q: "Negative charge particle?", a: "Electron" }
    ]
  },
  History: {
    Easy: [
      { q: "First President of USA?", a: "George Washington" },
      { q: "WWII ended in what year?", a: "1945" },
      { q: "Who discovered America?", a: "Christopher Columbus" },
      { q: "Egyptian writing system?", a: "Hieroglyphics" },
      { q: "Famous wall in China?", a: "Great Wall" }
    ],
    Medium: [
      { q: "Wrote the Declaration of Independence?", a: "Thomas Jefferson" },
      { q: "Empire that built the Colosseum?", a: "Roman Empire" },
      { q: "Who was Napoleon?", a: "French military leader" },
      { q: "What started in 1914?", a: "World War I" },
      { q: "Where is Machu Picchu?", a: "Peru" }
    ],
    Hard: [
      { q: "Last emperor of Russia?", a: "Nicholas II" },
      { q: "Berlin Wall fell in?", a: "1989" },
      { q: "What was the Black Death?", a: "Plague" },
      { q: "Who was Cleopatra?", a: "Queen of Egypt" },
      { q: "What is the Magna Carta?", a: "Charter of rights" }
    ]
  },
  Art: {
    Easy: [
      { q: "Red + blue = ?", a: "Purple" },
      { q: "Who painted Mona Lisa?", a: "Leonardo da Vinci" },
      { q: "What do you draw with?", a: "Pencil" },
      { q: "Opposite of black?", a: "White" },
      { q: "Color of grass?", a: "Green" }
    ],
    Medium: [
      { q: "Sistine Chapel ceiling painter?", a: "Michelangelo" },
      { q: "Van Gogh’s art style?", a: "Post-Impressionism" },
      { q: "What is origami?", a: "Paper folding" },
      { q: "Sculpture with no arms?", a: "Venus de Milo" },
      { q: "RGB stands for?", a: "Red Green Blue" }
    ],
    Hard: [
      { q: "What is cubism?", a: "Abstract art with geometric shapes" },
      { q: "Salvador Dalí’s movement?", a: "Surrealism" },
      { q: "Painter of 'Persistence of Memory'?", a: "Salvador Dalí" },
      { q: "Ukiyo-e is from which country?", a: "Japan" },
      { q: "Medium used in fresco painting?", a: "Wet plaster" }
    ]
  }
};

let selectedTopic = "";
let selectedDifficulty = "";
let currentIndex = 0;
let correctCount = 0;
let incorrectCount = 0;

const topicsDiv = document.getElementById("topics");
const difficultiesDiv = document.getElementById("difficulties");

topics.forEach(topic => {
  const btn = document.createElement("button");
  btn.textContent = topic.name;
  btn.style.backgroundColor = topic.color;
  btn.onclick = () => {
    selectedTopic = topic.name;
    document.getElementById("screen-topic").classList.add("hidden");
    document.getElementById("screen-difficulty").classList.remove("hidden");
  };
  topicsDiv.appendChild(btn);
});

["Easy", "Medium", "Hard"].forEach(level => {
  const btn = document.createElement("button");
  btn.textContent = level;
  btn.style.backgroundColor = "gray";
  btn.onclick = () => {
    selectedDifficulty = level;
    startGame();
  };
  difficultiesDiv.appendChild(btn);
});

function startGame() {
  currentIndex = 0;
  correctCount = 0;
  incorrectCount = 0;
  document.getElementById("screen-difficulty").classList.add("hidden");
  document.getElementById("screen-game").classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  const currentQ = fullQuestions[selectedTopic][selectedDifficulty][currentIndex];
  document.getElementById("question-text").textContent = currentQ.q;
  document.getElementById("answer-text").textContent = "Answer: " + currentQ.a;
  document.getElementById("user-answer").value = "";
  document.getElementById("flashcard").classList.remove("flipped");
  document.getElementById("result-buttons").classList.add("hidden");
  const total = fullQuestions[selectedTopic][selectedDifficulty].length;
  const current = currentIndex + 1;
  const percent = (currentIndex / total) * 100;
  document.getElementById("progress-label").textContent = `Question ${current} of ${total}`;
  document.getElementById("progress-bar-fill").style.width = percent + "%";
}


function flipCard() {
  document.getElementById("flashcard").classList.add("flipped");
  document.getElementById("result-buttons").classList.remove("hidden");
}

document.getElementById("correct-btn").onclick = () => {
  correctCount++;
  goToNext();
};

document.getElementById("incorrect-btn").onclick = () => {
  incorrectCount++;
  goToNext();
};

function goToNext() {
  document.getElementById("result-buttons").classList.add("hidden");
  currentIndex++;
  const total = fullQuestions[selectedTopic][selectedDifficulty].length;
  if (currentIndex >= total) {
    showResults();
  } else {
    showQuestion();
  }
}

function showResults() {
  document.getElementById("screen-game").classList.add("hidden");
  document.getElementById("screen-result").classList.remove("hidden");
  document.getElementById("progress-bar-fill").style.width = "100%";
  document.getElementById("progress-label").textContent = "Done!";
  const grade = calculateGrade(correctCount);
  const feedback = getFeedback(grade);
  document.getElementById("box-correct").textContent = `✅ Correct answers: ${correctCount}/5`;
  document.getElementById("box-incorrect").textContent = `❌ Incorrect answers: ${incorrectCount}/5`;
  document.getElementById("box-grade").textContent = `🏅 Grade: ${grade}`;
  document.getElementById("box-feedback").textContent = `💬 You are: ${feedback} at this topic!`;
}


function calculateGrade(score) {
  if (score === 5) return "A+";
  if (score === 4) return "A";
  if (score === 3) return "B+";
  if (score === 2) return "C";
  if (score === 1) return "D";
  return "F";
}

function getFeedback(grade) {
  switch (grade) {
    case "A+":
    case "A":
      return "Good";
    case "B+":
    case "C":
      return "Normal";
    default:
      return "Bad";
  }
}

