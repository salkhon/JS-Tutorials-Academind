// Arrays and Iterables
// Different ways of creating arrays.
// Working with arrays
// Important array methods
// Other iterables: Maps and sets

/**
 * What's an "iterable"?
 * Technically, Objects that implement the "iterable" protocol and have an @@iterator method
 * (ie. Symbol.iterator)
 * Meaning, objects where you can use the for-of loop.
 *
 * Not every iterable is an array! Other iterables are NodeList, String, Map, Set etc.
 *
 * What's an "Array-like Object"?
 * Technically, Objects that have a length property and use indexes to access items.
 * Not every array like object is an array! Other array-likes are NodeList, String etc.
 * Real arrays have a couple of interesting behavior and a bunch of method available to
 * them, which do not exist on these array-like or iterable objects.
 */

/**
 * const arr = [1]; const arr = Array(1); const arr = new Array(1);
 * const arr = ["Hi"]; const arr = Array("Hi"); const arr = new Array("Hi");
 * const arr = Array.of(1); const arr = Array.of("Hi"); const arr = Array.from("Hi");
 * const arr = Array.from(1);
 */
const numbers = [1, 2, 3]; // common and recemmended way
console.log(numbers);

const moreNumbers = new Array(1, 2); // uses constructor
console.log(moreNumbers);
// single arg in array constructor means length.

const yetMoreNumbers = Array.of(3, 4);
console.log(yetMoreNumbers);

const specialMoreNumbers = Array.from("Hi!"); // This does not accept array content
// ranther takes in an iterable of an array-like to transform it to an array.
console.log(specialMoreNumbers);
// Useful when using NodeList from list DOM. Converting NodeList to array.

const listItems = document.querySelectorAll("li");
console.log(listItems);
const listItemsArray = Array.from(listItems);
console.log(listItemsArray);

// Arrays can store same type, or mixed type
const hobbies = ["Cooking", "Sports"];
const personalData = [30, "Max", { moreDetail: [] }];

// Adding data
hobbies.push("Reading");
console.log(hobbies);
// push always add new element at the end of the array
hobbies.unshift("Coding");
console.log(hobbies);
// unshift adds at the beginning of an array
// unshit and push returns the new length of the array

hobbies.pop(); // removes and returns last element
hobbies.shift(); // removes and returns the first element.

// unshift store, shift removes? What's with the name?
// Shifts all elements of the array one place to the left. The first element gets dropped
// out of the array. Unshift moves right place, so it does the opposite.
// BECAUSE shift and unshit affects all the items in the array, they are SLOWER.

// javascript is a tolerant language. So you can access elements beyond the arrays length,
// that way the array is resized on spot and the element is added to the index.
hobbies[5] = "Reading";
console.log(hobbies);
// This is not a good practice.

// splice inserts element in between element.
// splice() only available to a real array. That might be one of the reasons to convert
// other arrya like or iterables to arrays. Array.from()
hobbies.splice(1, 0, "Good Food"); // replaces the deleted items with items from 3rd arg,
console.log(hobbies);
// in splice() you tell it the index it should start looking inclusive, then delete as many specified
// and then insert items on the place of the deleted items.

hobbies.splice(0, 1, "Netflix");
console.log(hobbies);
// splice returnts the removes elements, so that they are not lost
// -1 starting index starts from the last.
hobbies.splice(-2, 1);
console.log(hobbies);

const testResults = [1, 5.3, 1.5, 10.99, -5, 10];
console.log(testResults.slice(0, 2)); // returns an entirely brand new array, nice way to copy
// slice selects ranges of an array, exclusive ot the right bound. Always selects rightward - even when using negative index
console.log(testResults.slice(2)); // 2:

const twoTestResults = testResults.concat(testResults); // element wise push, copy
testResults.push(testResults); // pushes the object rather than element wise
console.log(twoTestResults);
console.log(testResults);

console.log("Intex of 1.5: " + testResults.indexOf(1.5));
// for reference values, indexOf needs identity
const personData = [
	{
		name: "Max",
	},
	{
		name: "Manuel",
	},
];
console.log("Index of Manuel state: " + personData.indexOf({ name: "Manuel" }));

// to find reference values, by their state - we can use find() or findIndex()
const manuel = personData.find((elem, idx, obj) => elem.name === "Manuel"); // predicate can take 3 args
console.log("Manuel by searching for name attribute: ");
console.log(manuel);
console.log(
	"Index of manuel: " + personData.findIndex((elem) => elem.name === "Manuel")
);

// check if some element is contained, checks identity for reference values
console.log(testResults.includes(-5));

const prices = [10.99, 5.99, 3.99, 6.59];
const tax = 0.19;
const taxAdjustedPrices = [];
prices.forEach((elem, i, arr) => taxAdjustedPrices.push(elem + elem * tax)); // has the for-of iteration over all feature,
// and has the index like for-i
console.log(taxAdjustedPrices);

// map stream
const taxAdjustedPricesStreamed = prices.map(
	(elem, i, arr) => elem + elem * tax
);
console.log(taxAdjustedPricesStreamed);

// sort
// default sort sorts on lexicographic order
console.log(prices.sort());
console.log(prices); // mutates the original object

console.log(
	prices.sort((a, b) => {
		if (a > b) {
			return 1;
		} else if (a < b) {
			return -1;
		} else {
			return 0;
		}
	})
);

// filter
const filteredArray = prices.filter((elem, i, arr) => elem > 6);
console.log(filteredArray);

// Reduce
// Recduces an array to a simpler value. Such as a sum, mean.
// initialValue argument is the starting value of the reduced value
// Executed for every element in the array, previousValue has the initialValue for first element else undefined, for next
// iterations previousValue holds the value returned by each execution.
// currentValue has the current element, also index and array object is there as well.
// Has to return the value which will be set to previousValue after iterating over currentValue.
const sum = prices.reduce(
	(prevVal, curVal, curIdx, arr) => prevVal + curVal,
	0
);
console.log(sum);

const csvdata = "new york;10.99;2000";
const splitData = csvdata.split(";");
console.log(splitData);

const nameFragments = ["Salman", "Khondker"];
const names = nameFragments.join(" "); // by default sep is ,
console.log(names);

// Spread Operator
// Pulls out all elements of an array, gives them to you as a stand alone list of elements
const copiedNameFragments = [...nameFragments];
nameFragments.unshift("Mr.");
console.log(nameFragments, copiedNameFragments);

console.log(Math.min(...prices)); // only works with numbers in arg, not arrays

// To deep copy reference values in an array,
const persons = [
	{ name: "Max", age: 30 },
	{ name: "Manuel", age: 31 },
];
const copiedPersons = persons.map(person => ({ name: person.name, age: person.age}));
// to wrap objects in lambdas, you have to use parenthesis

// Array destructuring
const [title, firstName, lastName] = nameFragments;
console.log("Hello " + lastName + ", " + firstName);
const [_, fn] = nameFragments;
console.log("I'll call you " + fn);

// Different Iterables: Maps, and Sets
// In JS we have 3 major structures, Arrays, Sets, Maps
/**
 * Arrays
 * - Store (nested) data of any kind and length
 * - Iterable, also many special array methods available
 * - Order guaranteed, duplicates allowed, zero-based indec to access elements
 * 
 * Sets
 * - Store (nested) data of any kind and length
 * - Iterable, also some special set methods available
 * - Order is NOT guaranteed, duplicates are NOT allowed, no index-based access
 * 
 * Maps
 * - Store key-value data of any kinf and length, any key values are allowes
 *  For objects you can have only strings, numbers, symbols (later) as key, in maps you can have anything as a key
 * - Iterable, also some spacial map methods available
 * - Order is guaranteed, duplicate keys are NOT allowed, key-based access
 */

