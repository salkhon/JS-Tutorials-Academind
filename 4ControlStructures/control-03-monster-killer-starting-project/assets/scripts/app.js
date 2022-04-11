const ATTACK_VALUE = 10;
const STRONG_ATTACK = 17;
const MONSTER_ATTACK = 14;
const HEAL = 20;

const EVENT_PLAYER_ATTACK = "PLAYER ATTACK";
const EVENT_MONSTER_ATTACK = "MONSTER ATTACK";
const EVENT_HEAL = "HEAL";
const EVENT_GAME_OVER = "GAME OVER";

function getMaxLifeValues() {
	let chosenMaxLife = parseInt(
		prompt("Maximum life for you and the monster.", "100")
	);

	if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
		throw {message: 'Unvalid user input, not a number'}; // object 
	}
	return chosenMaxLife;
}

const chosenMaxLife = undefined;

try {
	chosenMaxLife = getMaxLifeValues();
} catch (error) {
	console.log('error caught');
	console.log(error);
	chosenMaxLife = 100;
	// throw error;
} finally {
	console.log('in finally');
}

// parseInt catches the error, and return NaN, so not for you to catch.
// So you can throw your own.
/**
 * 
 */
if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
	// is parseInt can't convert
	chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
let battleLog = [];

adjustHealthBars(chosenMaxLife);

function writeToLog(
	ev,
	val,
	finalMonsterHealth = currentMonsterHealth,
	finalPlayerHealth = currentPlayerHealth
) {
	let logEntry = {
		event: ev,
		value: val,
		finalMonsterHealth: finalMonsterHealth,
		finalPlayerHealth: finalPlayerHealth,
	};

	if (ev === EVENT_PLAYER_ATTACK) {
		logEntry.target = "MONSTER"; // property creation
	} else if (ev === EVENT_MONSTER_ATTACK || ev === EVENT_HEAL) {
		logEntry.target = "PLAYER";
	}
	battleLog.push(logEntry);
}

function playerAttacks(maxDamage) {
	actualDamage = dealMonsterDamage(maxDamage);
	currentMonsterHealth -= actualDamage;
	writeToLog(EVENT_PLAYER_ATTACK, actualDamage);
}

function monsterAttacks(maxDamage) {
	actualDamage = dealPlayerDamage(maxDamage);
	currentPlayerHealth -= actualDamage;
	writeToLog(EVENT_MONSTER_ATTACK, actualDamage);
}

function reset() {
	currentMonsterHealth = chosenMaxLife;
	currentPlayerHealth = chosenMaxLife;
	resetGame(chosenMaxLife);
}

function determineGameStatus() {
	if (currentPlayerHealth <= 0 && hasBonusLife) {
		removeBonusLife();
		increasePlayerHealth(1 - currentPlayerHealth);
		currentPlayerHealth = 1;
		hasBonusLife = false;
	} else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
		alert("You lost!");
		reset();
		writeToLog(EVENT_GAME_OVER, "Lost");
	} else if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
		alert("You won!");
		reset();
		writeToLog(EVENT_GAME_OVER, "Won");
	} else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
		alert("It's a draw!");
		reset();
		writeToLog(EVENT_GAME_OVER, "Draw");
	}
}

function attackHandler(event) {
	let maxDamage =
		event.target === strongAttackBtn ? STRONG_ATTACK : ATTACK_VALUE;

	damageDone = playerAttacks(maxDamage);
	damageTaken = monsterAttacks(MONSTER_ATTACK);
	determineGameStatus();
}

function healPlayerHandler(event) {
	let healVal;
	if (currentPlayerHealth + HEAL >= chosenMaxLife) {
		alert("Max health reached");
		healVal = chosenMaxLife - currentPlayerHealth;
	} else {
		healVal = HEAL;
	}
	increasePlayerHealth(healVal);
	currentPlayerHealth += healVal;
	monsterAttacks(MONSTER_ATTACK);
	determineGameStatus();
	writeToLog(EVENT_HEAL, healVal);
}

function printLogHandler() {
	for (let i = 0; i < 3; i++) {
		console.log('----------')
	}
	let i = 0;
	for (const logEntry of battleLog) {
		console.log(`#${i}`);
		for (const key in logEntry) {
			console.log(`${key}: ${logEntry[key]}`);
		}
		i++;
	}
	// console.log(battleLog);
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", attackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogHandler);

// !! transforms truthy values to true.
// non Falsy assignment: const name = someInput || 'Sal';
// assigns 'Sal' if someInput has falsy.

// last val: const name = isLoggedIn && 'Max';

// UNLIKE OTHER BOOLEAN OPERATORS, OR || AND &&  BOTH RETURN ACTUAL VALUE INSTEAD OF
// RETURNING TRUE FALSE. SO THE RESULT OF || && DEPEND ON ITS COMPONENTS

// switch case always uses ===

// js has labelled control break and continue.
/*
outerWhile: do {
	innerFor: for (let k = 0; k < 5; k++) {
		if (k === 4) {
			break outerWhile; // or
			// continue outerWhile; inifinite loop careful!
		}
	}
	j++;
} while (j < 3);

can break loops on one part of the code from another part from multithreading!

*/

/*
Some errors cannot be avoided. (beyond your control as a developer)
- User Input errors 
- Network errors (eg. server is offline) ... 

*/
