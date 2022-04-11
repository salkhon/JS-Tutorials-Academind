const startGameBtn = document.getElementById("start-game-btn");

const ROCK = "ROCK";
const PAPER = "PAPER";
const SCISSORS = "SCISSORS";

const DEFAULT_SELECTION = ROCK;

const DRAW = "DRAW";
const PLAYER_WINS = "PLAYER_WINS";
const COMPUTER_WINS = "COMPUTER_WINS";

let gameIsRunning = false;

function getPlayerChoice() {
	let selection = prompt(`${ROCK}, ${PAPER} or ${SCISSORS}?`).toUpperCase();

	if (selection !== ROCK && selection !== PAPER && selection !== SCISSORS) {
		alert(`Invalid choice! We chose ${DEFAULT_SELECTION} for you!`);
		selection = DEFAULT_SELECTION;
	}
	return selection;
}

function getComputerChoice() {
	const random = Math.random();
	let choice = DEFAULT_SELECTION;
	if (random < 1 / 3) {
		choice = ROCK;
	} else if (random < 2 / 3) {
		choice = PAPER;
	} else {
		choice = SCISSORS;
	}
	return choice;
}

function getWinner(cChoice, pChoice) {
	result = DRAW;
	if (
		(cChoice === ROCK && pChoice === PAPER) ||
		(cChoice === PAPER && pChoice === SCISSORS) ||
		(cChoice === SCISSORS && pChoice === ROCK)
	) {
		result = PLAYER_WINS;
	} else if (
		(pChoice === ROCK && cChoice === PAPER) ||
		(pChoice === PAPER && cChoice === SCISSORS) ||
		(pChoice === SCISSORS && cChoice === ROCK)
	) {
		result = COMPUTER_WINS;
	}
	return result;
}

// when you have an anonymous function, you can use a lambda.
// startGameBtn.addEventListener("click", function () {
startGameBtn.addEventListener("click", () => {
	if (gameIsRunning) {
		return;
	}
	gameIsRunning = true;
	console.log("Game started");
	const playerChoice = getPlayerChoice();
	console.log("Player Choice:", playerChoice);

	const computerChoice = getComputerChoice();
	console.log("Computer Choice:", computerChoice);

	const winner = getWinner(computerChoice, playerChoice);
	console.log(winner);

	let message = `You picked ${playerChoice}, computer picked ${computerChoice}\n
	Therefore you `;
	if (winner === PLAYER_WINS) {
		message += "won";
	} else if (winner === COMPUTER_WINS) {
		message += "lost";
	} else {
		message += "had a draw";
	}
	alert(message);
	gameIsRunning = false;
});

// const start_func = function() {
//     console.log('Game is starting...');
// }   // this apporach does not hoist

// startGame();
// start_func();
// startGameBtn.addEventListener('click', startGame);
// can also put name for anonymous functions when passing as event Listener.
// Would be like declaring a normal function inside the argument space.

// const person = {
//     greet: function greet() {
//         console.log('Hello there!');
//     }
// };

// person.greet();
// console.log('type of function: ', typeof startGame);
// console.log(startGame);
// console.dir(startGame);

// In JS you can leave out parameter values when calling a function.
// It will not throw an error, it will init that parameter with the value of undefined.

// If you pass undefined when a default argument exists the parameter takes the default value.
// so for default argument has the same effect as not passing in an argument.
// JS does not throw error if you have DEFAULT value for parameters before other params without default value.
// However it does not change the argument sequence. So if the first argument is given, it will go to the
// first param even if it has a default value and the latter param does not. The latter param will have undefined.
// So not useful, therefore recommended that params with default values come last.

// Ternary operators can be used when assigning default values to params.

// ...nums -> pulling elements or kv pairs out of the collection. UNPACKING
// ...nums -> in param list, it packs. PACKING. Has to be LAST param.
// This is called REST param.
// all function s have a default arg. `arguments`. Built into JS.
// Gives an array-like object with all the arguments to the function.
// This was used pre-Rest argument. But Rest operator is new and encouraged.

function sumUp(...nums) {
	function is_number(value) {
		return !isNaN(value);
	}

	let sum = 0;
	for (const num of numbers) {
		if (is_number(num)) {
			sum += num;
		}
	}
	return sum;
}

// bind() prepares your callback according to your setting. 
// Setting an argument for a callback without calling.
// function.bind(this, arg1, arg2 ...) will create a new function and returns its reference. 
// Which will be be preconfigured regarding the argument it receives. 
// When the function is called in the receiver of the callback, all arguments will be APPENDED to the bind() args.
/*
function combine(cb, operation, ...nums) {
	...
	cb(result); // appended to the ALREADY BOUND messageText sent initially. 
}

function showResult(messageText, result) {
	alert(messageText + ' ' + result);
}

combine(showResult.bind(this, 'The result after adding is: '), 'ADD', 1, 2, 3, 5); // messageText is bound
*/

// similar to bind() the call() and apply() methods specify parameters. 
// Also immediately EXECUTES the function. 
// Later on that, when we use it. 
