let currentResult = 0;
let logEntries = []; // list of anything
outputResult(currentResult, "");

function writeToLog(operationId, prevResult, operationNumber, newResult) {
	const logEntry = {
		operation: operationId,
		prevResult: prevResult,
		number: operationNumber,
		result: newResult,
	}; // object, dict?
	// values can be ANYTHING.

	logEntries.push(logEntry);
	console.log(logEntries); // built in to JavaScript,
	// that allows to output in development console in the browser
}

function add() {
	// pure function: same result for same input. Works with local variables only.
	// const result = num1 + num2;
	// alert("The result is " + result);
	// this function is provided to you by JS, executed in browser
	const addendum = parseInt(userInput.value);
	const description = `${currentResult} + ${addendum}`;
	const prevResult = currentResult;
	currentResult += addendum;
	// to string: currentResult.toString()
	outputResult(currentResult, description);
	writeToLog("+", prevResult, addendum, currentResult);
}

function subtract() {
	const subtrahend = parseInt(userInput.value);
	const description = `${currentResult} - ${subtrahend}`;
	const prevResult = currentResult;
	currentResult -= subtrahend;
	outputResult(currentResult, description);
	writeToLog("-", prevResult, subtrahend, prevResult, currentResult);
}

function multiply() {
	const multiplicand = parseInt(userInput.value);
	const description = `${currentResult} * ${multiplicand}`;
	const prevResult = currentResult;
	currentResult *= multiplicand;
	outputResult(currentResult, description);
	writeToLog("*", prevResult, multiplicand, currentResult);
}

function divide() {
	const divisor = parseInt(userInput.value);
	const description = `${currentResult} / ${divisor}`;
	const prevResult = currentResult;
	if (divisor == 0) {
		outputResult(currentResult, "Can't divide by zero");
	} else {
		currentResult /= parseInt(userInput.value);
		outputResult(currentResult, description);
		writeToLog("/", prevResult, divisor, currentResult);
	}
}

// in vendor, addBtn is a reference to the add button
addBtn.addEventListener('click', add);
subtractBtn.addEventListener("click", subtract);
multiplyBtn.addEventListener("click", multiply);
divideBtn.addEventListener("click", divide);
