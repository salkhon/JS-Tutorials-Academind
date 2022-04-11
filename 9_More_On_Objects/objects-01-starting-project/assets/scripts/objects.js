// What's an object

// - Core Data structure in JavaSript
// Typically reflects "real-world" entities. eg, button, movie. We all can embody concepts.
// They have properties that make them the concept's embodiment.
// - Allow us to apply real-world logic to coding.

// Made up of properties and methods
//  Store data in properties and actions in methods.
// Allow you to "group" related data together and split your code into logical pieces.

// Reference values are objects.
// Primitive tpyes are: Numbers, Strings, Booleans, null, undefined, Symbol (niche advanced later)
// {...} is called object literal.

const person = {
	name: "Max",
	age: 30,
	hobbies: ["Sports", "Cooking"],
	greet: () => alert("Hi There!"),
};

person.greet();

// adding property
console.log(person.isAdmin);
person.isAdmin = true;
console.log(person.isAdmin);

console.log(person.age);
delete person.age;
console.log(person.age);
// so deleting a property is basically as if we set it to undefined. But the property will show in representation.

// null is the value WE use to RESET something.
// WE NEVER ACTIVELY ASSIGN undefined. It's a default JS value.

// anything you cannuse as a variable name, you can use as a key name. Keys are more flexible than variables.
// So, valid variable name => valid key name. Not vice versa.
// You can use any string as a key! In fact, any key you enter is automatically coerced (auto conversion) into a string.
// An object is just a dictionary of keys (strings) and any kind of values.

let person1 = {
	"first name": "Max", // or first-name
	age: 30,
	hobbies: ["Sports", "Cooking"],
	greet: () => alert("Hi There!"),
};

// However it's not common to create key names like that. We stick to the variable naming rule.

console.log(person1["first name"]);
// so in the end JS objects behave similar to that of python dict. Though the keys are referred with strings or numbers, 
// indices aren't positions, rather mapping.

const movieList = document.getElementById("movie-list");
// we previously accessed background-color css property with variable name format backgroundColor
// With string keys, we can use the css version
movieList.style["background-color"] = "red";
movieList.style.display ="block";

// beside string, you can use 2 other values for property names:
// numbers and symbols

person1 = {
	"first name": "Max", // or first-name
	age: 30,
	hobbies: ["Sports", "Cooking"],
	greet: () => alert("Hi There!"),
	1.5: "Hello"
};
// keys can't be negative numbers, but can be fractions. 
console.log(person1[1.5]);
console.log(person1['1.5']);

// How are these properties inside an object ordered? In the order they are added. 
console.log(person1);

// to name a property after variable content, we use square brackets when defining
const userChosenKeyName = "level";
let person2 = {
	"first name": "Max", // or first-name
	age: 30,
	hobbies: ["Sports", "Cooking"],
	greet: () => alert("Hi There!"),
	1.5: "Hello", 
	[userChosenKeyName]: null
};
// cannot use just vaariable name, because JS will take that literal and name that as key, not the content. 
