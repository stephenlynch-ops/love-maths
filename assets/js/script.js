// Code that runs once the DOM content has been loaded, before running the game

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    //  let button of buttons is the modern version of a for loop with i++ etc.
    for(let button of buttons){
        button.addEventListener("click", function(){
            if (this.getAttribute("data-type") === "submit"){
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        })
    }

    runGame("addition");


})

/**
 * The main game 'loop', called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType) {
    // Generates two random numbers between 1 and 25. The math.floor gives us a whole number and the +1 means we can get a 0
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else {
        alert(`Unknown game type: ${gameType}`);
        // The throw key word stops the game from running and passes the message to the console for debugging
        throw `Unknown game type: ${gameType}. Aborting!`;
    }
}

/**
 * Checks the answer against the first element in
 * the returned calculateCorrectAnswer array
 */
function checkAnswer() {

    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    // if(isCorrect) is the same as if(isCorrect = true)
    if (isCorrect) {
        alert("Hey you got it right :D");
        incrementScore();
    } else {
        alert(`Awwww.... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);
}

/**
 * Gets the operands (numbers) and the oeprator (plus, minus etc.)
 * directly from the DOM, and returns the correct answer.
 */
function calculateCorrectAnswer() {
    // The parseInt is treating the result as an integer, the default in JavaScript is a string
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}, Aborting!`;
    }
}

/**
 * Gets the current score from the DOM and increments it by 1
 */
function incrementScore() {

        let oldScore = parseInt(document.getElementById("score").innerText);
        document.getElementById("score").innerText = ++oldScore;

}

/**
 * Gets the current incorrect score from the DOM and increments it by 1
 */
function incrementWrongAnswer() {
    
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";
}

function displaySubtractQuestion() {

}

function displayMultiplyQuestion() {

}