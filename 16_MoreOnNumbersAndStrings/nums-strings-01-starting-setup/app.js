function randomNumber(lowerLim, upperLim) {
	return lowerLim + (upperLim - lowerLim) * Math.random();
}

function randomIntBetween(lower, upper) {
	return Math.floor(lower + (upper - lower + 1) * Math.random()); // next decimal space for each int.
}

console.log(randomNumber(5, 15));
console.log(randomIntBetween(5, 15));

function productDescription(strings, productName, productPrice) {
	console.log(strings); // array of the template literals non variable strings
	console.log(productName); // first variable string
	console.log(productPrice); //  second variable string
	return "This is a product";
}

const prodName = "JS Course";
const prodPrice = 29.99;
const productOutput = productDescription`This product (${prodName}) is ${prodPrice}.`;

console.log(productOutput);
