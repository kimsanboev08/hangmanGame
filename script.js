'use strict';

// Variables
let animals = [];
let birds = [];
let fruits = [];
let sports = [];

async function fetchData() {
    try {
        // Fetch the JSON data
        const response = await fetch('assets/data/data.json');

        // Check if the fetch was successful
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        // Parse the JSON data
        const data = await response.json();

        // Overwrite the global arrays for each category
        animals = data.animals;
        birds = data.birds;
        fruits = data.fruits;
        sports = data.sports;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

window.onload = fetchData;

const categories = ['animals', 'birds', 'fruits', 'sports'];
const categoryElements = document.getElementsByClassName('category');
const restart = document.getElementsByClassName('restartButton')[0];
const letterDivs = document.querySelectorAll('.alphabetRow > div');
let word = '';
let newUnderScores = '';
let lives = 5;
let categoryChoice = 0;
let score = Number(document.getElementById('score').textContent);


function getUnderscores() {
    newUnderScores = document.getElementById('underscores').textContent = ('_ '.repeat(word.length)).trim();
}

function updateScore(score) {
    let highScore = Number(document.getElementById('highScore').textContent);
    document.getElementById('score').textContent = score;
    if (score >= highScore) {
        document.getElementById('highScore').textContent = score;
    }
}
    

function restage() {
    getUnderscores();
    letterDivs.forEach(div => {
        div.style.backgroundColor = 'white';
        div.style.cursor = 'pointer';
        div.style.pointerEvents = 'auto';
    });
}

function chooseWord(choice) {
    const rndInt = Math.floor(Math.random() * 50);
    switch (choice) {
        case 0:
            word = animals[rndInt].toUpperCase();
            break;
        case 1:
            word = birds[rndInt].toUpperCase();;
            break;
        case 2:
            word = fruits[rndInt].toUpperCase();
            break;
        case 3:
            word = sports[rndInt].toUpperCase();
            break;
        default:
            break;
    }
}

function updateLives(num) {
    document.getElementById('lives').textContent = `Lives: ${num}`;
}

for (let i = 0; i < 4; i++) {
    categoryElements[i].addEventListener('click', function() {
        for (let j = 0; j < 4; j++) {
            if (j === i) continue;
            categoryElements[j].style.backgroundColor = 'rgb(159, 155, 155)';
            categoryElements[j].style.pointerEvents = 'none';
        }
        categoryChoice = i;
        chooseWord(categoryChoice);
        restage();
        console.log(word);
    });
}

restart.addEventListener('click', function() {
    for (let j = 0; j < 4; j++) {
        categoryElements[j].style.backgroundColor = 'white';
        categoryElements[j].style.cursor = 'pointer';
        categoryElements[j].style.pointerEvents = 'auto';
    }
    letterDivs.forEach(div => {
        div.style.backgroundColor = 'rgb(159, 155, 155)';
        div.style.cursor = 'none';
    });
    document.getElementById('underscores').textContent = '_ _ _ _ _';
    score = 0;
    updateScore(score);
});


// Start Guessing
letterDivs.forEach(div => {
    div.addEventListener('click', function() {
        let match = false;
        for (let i = 0; i < word.length; i++) {
            let letter = word.charAt(i);
            if (letter === div.textContent) {
                newUnderScores = newUnderScores.substring(0, i*2) + letter + newUnderScores.substring(i*2 + 1, newUnderScores.length);
                match = true;  
            }
            div.style.pointerEvents = 'none';
        }
        if (match) {
            div.style.backgroundColor = 'green';
        } else {
            div.style.backgroundColor = 'red';
            lives--;
            updateLives(lives);
        }
        document.getElementById('underscores').textContent = newUnderScores.trim();

        // Lost
        if (lives === 0) {
            // You Lose
            // Pop up

        }

        // Guessed the Entire Word
        if (!newUnderScores.includes('_')) {
            lives = 5;
            updateLives(lives);
            chooseWord(categoryChoice);
            restage();
            score++
            updateScore(score);
            console.log(word);
        }
    });
});


