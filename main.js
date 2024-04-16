let pieces = [];
let startTime, timerInterval;
let moves = 0;
let puzzleSize = 3;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function changePuzzleSize() {
    const puzzleSizeSelect = document.getElementById("puzzle-size");
    puzzleSize = parseInt(puzzleSizeSelect.value);
    initializePuzzle();
}

function initializePuzzle() {
pieces = [...Array(puzzleSize * puzzleSize).keys()];
shuffleArray(pieces);
moves = 0;
startTime = new Date();
clearInterval(timerInterval);
timerInterval = setInterval(updateTimer, 1000);

const puzzleContainer = document.getElementById("puzzle-container");

// Clear the puzzle container
puzzleContainer.innerHTML = "";

puzzleContainer.style.gridTemplateColumns = `repeat(${puzzleSize}, 120px)`;
for (let i = 0; i < puzzleSize * puzzleSize; i++) {
const piece = document.createElement("div");
piece.className = "puzzle-piece";
piece.textContent = pieces[i] === 0 ? "" : pieces[i];
piece.onclick = () => movePiece(i);

puzzleContainer.appendChild(piece);
}

// Clear the win message
document.getElementById("win-message").textContent = "";
}

function movePiece(index) {
    const piece = pieces[index];
    const emptyIndex = pieces.indexOf(0);

    const row = Math.floor(index / puzzleSize);
    const col = index % puzzleSize;
    const emptyRow = Math.floor(emptyIndex / puzzleSize);
    const emptyCol = emptyIndex % puzzleSize;

    if (Math.abs(row - emptyRow) + Math.abs(col - emptyCol) === 1) {
        pieces[index] = 0;
        pieces[emptyIndex] = piece;
        moves++;
        updatePuzzleDisplay();
        checkWinCondition();
    }
}

function updatePuzzleDisplay() {
    const puzzlePieces = document.querySelectorAll(".puzzle-piece");
    for (let i = 0; i < puzzlePieces.length; i++) {
        puzzlePieces[i].textContent = pieces[i] === 0 ? "" : pieces[i];
        if (pieces[i] === i + 1 || (i === pieces.length - 1 && pieces[i] === 0)) {
            puzzlePieces[i].classList.add("solved");
        } else {
            puzzlePieces[i].classList.remove("solved");
        }
    }
}

const backgroundMusic = document.getElementById("background-music");
const winningSound = document.getElementById("winning-sound");
const startMusicButton = document.getElementById("start-music-button");



// Add an event listener to start the background music when the button is clicked
startMusicButton.addEventListener("click", () => {
    backgroundMusic.play();
    startMusicButton.disabled = true; // Disable the button after starting the music
});


// Play winning sound when the player wins the game
function playWinningSound() {
winningSound.play();
}


// Modify the checkWinCondition function to play the winning sound
function checkWinCondition() {
const puzzleContainer = document.getElementById("puzzle-container");
const solvedTheme = puzzleContainer.className; // Get the theme of the solved puzzle

if (pieces.slice(0, -1).every((value, index) => value === index + 1)) {
clearInterval(timerInterval);
document.getElementById("win-message").textContent = ` Congratulation You solved the puzzle in ${moves} moves!`;

// Play winning sound
playWinningSound();
}
}




function updateTimer() {
    const currentTime = new Date();
    const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
    document.getElementById("timer").textContent = `Time: ${elapsedSeconds} seconds`;
}

initializePuzzle();
function changeTheme() {
const selectedTheme = document.getElementById("theme-select").value;
document.body.className = selectedTheme;
}