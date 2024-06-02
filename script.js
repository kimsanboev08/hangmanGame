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


function getUnderscores() {
    document.getElementById('underscores').textContent = ('_ '.repeat(word.length)).trim();
}

for (let i = 0; i < 4; i++) {
    categoryElements[i].addEventListener('click', function() {
        const rndInt = Math.floor(Math.random() * 50);
        for (let j = 0; j < 4; j++) {
            if (j === i) continue;
            categoryElements[j].style.backgroundColor = 'rgb(159, 155, 155)';
            categoryElements[j].style.pointerEvents = 'none';
        }
        switch (i) {
            case 0:
                word = animals[rndInt];
                break;
            case 1:
                word = birds[rndInt];
                break;
            case 2:
                word = fruits[rndInt];
                break;
            case 3:
                word = sports[rndInt];
                break;
            default:
                // restart
                break;
        }
        getUnderscores();
        letterDivs.forEach(div => {
            div.style.backgroundColor = 'white';
            div.style.cursor = 'pointer';
        });
        console.log(word);
    });
}


// Start Guessing
letterDivs.forEach(div => {
    // some function
});


/*
restart.addEventListener('click', function() {
    // restart
    console.log(word);
});
*/


