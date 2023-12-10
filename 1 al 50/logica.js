document.addEventListener('DOMContentLoaded', function () {

    const gameContainer = document.getElementById('juego-container');

    // aqui se crean los botones y se van al contenedor
    for (let i = 0; i < 25; i++) {
        const button = document.createElement('button');
        button.addEventListener('click', () => handleClick(button));
        gameContainer.appendChild(button);
    }

    // se inicializan los botones
    initializeButtonNumbers();
});

let expectedNumber = 1;
let timerInterval;
let secondsElapsed = 0;
let gameStarted = false; 


function handleClick(button) {
    const currentNumber = parseInt(button.textContent);

    if (currentNumber === expectedNumber) {
        // Aqui se verifica si el jugador ha llegado al número 50
        expectedNumber++;

        if (!gameStarted && currentNumber === 1) {
            // Comienza el cronómetro al hacer clic en el botón con el número 1
            startTimer();
        }

        if (expectedNumber > 50) {
            stopTimer();
            alert("FELICIDADES, has completado el juego");
            resetGame();
        } else {
            // aqui se cambian los numeros por uno entre 26 y 50
            const newNumber = generateUniqueNumber();
            if (newNumber !== null) {
                button.textContent = newNumber;
            } else {
                // Aqui se eliminan los botones
                button.style.display = 'none';
            }
        }
    } 
}

// aqui se inicializan los numeros del 1 al 25
function initializeButtonNumbers() {
    const buttons = document.getElementsByTagName('button');
    const initialNumbers = Array.from({ length: 25 }, (_, index) => index + 1);
    shuffleArray(initialNumbers);
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].textContent = initialNumbers[i];
        buttons[i].style.display = 'block';
    }
}


function resetGame() {  //aqui se reinicia el juego
    expectedNumber = 1;

    // Aqui se muestran todos los botones y se inicializan los números
    const buttons = document.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.display = 'block';
    }
    initializeButtonNumbers();
}

// aqui se mezla la matriz
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function generateUniqueNumber() {  //Aqui se genera un número entre 26 y 50 y de forma que no se repitan
    const existingNumbers = Array.from(document.getElementsByTagName('button'), button => parseInt(button.textContent));  
    const availableNumbers = Array.from({ length: 25 }, (_, index) => index + 26).filter(num => !existingNumbers.includes(num));

    if (availableNumbers.length > 0) {
        const randomNumber = availableNumbers[Math.floor(Math.random() * availableNumbers.length)];
        return randomNumber;
    } else {
        return null;
    }
}

function startTimer() { //aqui esta la funcion para que el cronómetro empiece a contar
    const timerElement = document.getElementById('timer');
    gameStarted = true;

    const startTime = new Date().getTime();

    timerInterval = setInterval(function () {
        const currentTime = new Date().getTime();
        secondsElapsed = Math.floor((currentTime - startTime) / 1000);
        timerElement.textContent = `Tiempo: ${secondsElapsed} segundos`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    gameStarted = false; 
}

