// Behind the scenes: Classes and OOP
/**
 * What happens behind the scnes of classes and objects?
 *
 * Constructor functions (without classes)
 *
 * Prototypes and Prototypical Inheritance
 */

/**
 * Constructor Functions
 *
 * behind the scenes JS uses a concept that has been around for a while.
 * We have a constructor() in the class, and that is related to this "constructor function",
 *
 * Constructor Functions
 * - Blueprint for Objects
 * - Properties and Methods
 *
 * Class
 * - Blueprint for Objects
 * - Properties and methods
 *
 * In modern browsers and scripts we typically work as a class. But behind the scenes this class would essentially be written
 * as a function. With a capital letter, indicating this function should not be called as a normal function.
 * Rather should be called with the new keyword.
 */

// class Person {
//     name = "Max";

//     constructor() {
//         this.age = 30;
//     }

//     greet() {
//         console.log("Hi I am", this.name, "and I am", this.age, "years old");
//     }
// }
console.log("Constructor function and prototype inheritance------------");
function Person() {
	this.age = 30;
	this.name = "Max";
	this.greet = function () {
		console.log("Hi I am", this.name, "and I am", this.age, "years old");
	};
}

const person = new Person();
person.greet();

/**
 * We can't expect this function returns an object here, because it has no return keyword.
 * it only returns an object because of the "new" keyword.
 *
 * The "new" keyword behind the scenes, executes such a function that sets "this" equal to the object that's being
 * created. (this = {})
 * It adds all these properties to the object and returns the created object.
 *
 * The constructor() inside a class effectively allows to define the "function"'s body, instructions that should run based
 * on the blueprint - inside a class. Great for initializing.
 *
 * However, methods created in class on shorthand note are traeated a bit differently, more on that later. Concept of prototype.
 */

/**
 * What are "Prototpyes"?
 * JavaScript uses "Prototypical Inheritance"
 * The class Syntax is basically just "syntactic sugar"
 * Constructor Functions & Prototypes power JavaScript Objects
 *
 * class Person {}
 * function Person() {}
 * ------------------------------ Created based on constructor function (class) ---------> Person
 * ----------- Default prototype or manually assigned prototype ----------------> Person.prototype {}
 * Every constructor function you build has a special "prototype" property which is not added to the objects you create
 * based on it - because it is not part of the function body but a property of that function object.
 *
 * Constructor prototype is assigned to instance upon creation.
 *
 * Prototype is an object itself. Why does every object have a prototype?
 * - It's how JavaScript shares code in the end.
 * Prototype Objects == "Fallback Objects"
 *
 * person { name: ..., greet() {} }
 * person.sayHello(); There is no sayHello() method on the person object.
 * It will fail if the prototype or the prototype of the prototype does not have this method.
 *
 * person's prototype -----> person {}
 * Prototypes are also objects. Prototypes have prototypes - will come back to the chain of prototypes later.
 *
 * If JavaScipt tries to access a certain method or property and does not find it in the object, it automatically looks
 * at the prototype object and looks for the property there.
 * If it does not find in the prototype of the object, it look at the prototype of the prototype all the way to the
 * end of the chain.
 * If not found, for a property it would return undefined and for a method it would return an error.
 */

console.log(person.toString()); // deos not throw and error. But it works.

// Why does toString() work? Because there is some invisible base object on which our object is based.

console.log(person);
/**
 * Person {age: 30, name: 'Max', greet: ƒ}
	age: 30
	greet: ƒ ()
	name: "Max"
	[[Prototype]]: Object
 */

/**
 * we see we have a [[Prototype]] prototype. It's a special property.
 * It shows you what the prototype of this object is.
 *
 * You can think of prototype as kind of a base class.
 *
 * Where we can ask for properties and methods we don't have in our class.
 * Like toString().
 */

/**
 * The Prototype Chain
 *
 * function Person() {} / class Person {}
 *
 * const p = new Person();
 * p.breathe(); // say our class or ctor function does not have a breathe method.
 *
 * // JS first checks if it was defined in Person itself? (ie. set up in blueprint)
 * // If no, then we look to the prototype.
 * p.__proto__.breathe(); // Modern ,p.[[Prototype]].breathe()
 *
 * It's called prototype, but it's basically a base class of the object in the end.
 *
 * If the object's prototype does not have a breathe method, it checks prototype of the prototype.
 *
 * p.__proto__.__proto__.breathe()
 *
 * Continues till Object.prototype
 */

console.log(person.__proto__);
// every function including the ctor is in the end stored as an object.
/**
 * As on anyother object, you can assign properties.
 */

console.dir(Person);
/**
 * ƒ Person()
	arguments: null
	caller: null
	length: 0
	name: "Person"
	prototype: {constructor: ƒ}
	[[FunctionLocation]]: app.js:41
	[[Prototype]]: ƒ ()
	[[Scopes]]: Scopes[2]
 */

/**
 * so console.dir() shows a prototype property for the Person ctor function, along with __proto__.
 * In short, __proto__ is present in EVERY object in JS.
 *
 * However, "prototype" property does not exist on EVERY object. It only exists on function objects. Whatever you assign to
 * "prototype" will be assigned as a prototype to any object built using this constructor function.
 */
// so,
console.log(person.__proto__ === Person.prototype);

/**
 * "prototype" is not something the Person constructor function would reach out to - that would be handled with Person.__proto__.
 * Person.prototype can be used to assigned an object, that will be assigned as a __proto__ to any object you build based
 * on that constructor function.
 */

// Person.prototype = {
// 	printAge() {
// 		console.log(this.age); // "this" inside prototype refers to the object you call the method.
// 	}
// }; // so when I create an object based on Person(), I have this object/method available.

Person.prototype.printAge = function () {
	console.log(this.age);
};

const per = new Person();
per.greet();
per.printAge(); // so it's just like inheritance
console.dir(per);

// So every object has fallback object, __proto__. Creates a chain leading to Object.__proto__ by default.
// Constructor function objects also have .prototype property. That content (object) is assigned as __proto__ of the instance
// created by that constructor function.

/**
 * "extends" works with prototypes to make functionality available to all classes that extends the base class.
 * When super() is called, it creates and object of the parent class and sets it as the __proto__ of the child class.
 */
console.log("Class instances and inheritance-----------");

class AgedPerson {
	printAge() {
		console.log(this.age);
	}
}

class Person1 extends AgedPerson {
	name = "Max";

	constructor() {
		super();
		this.age = 30;
	}

	greet() {
		console.log("Hi I am", this.name, "and I am", this.age, "years old");
	}
}

const p1 = new Person1();
console.dir(p1);
console.dir(p1.__proto__);
/**
 * Person1
		age: 30
		name: "Max"
		[[Prototype]]: AgedPerson
			constructor: class Person1
			greet: ƒ greet()
			[[Prototype]]: Object
				constructor: class AgedPerson
				printAge: ƒ printAge()
				[[Prototype]]: Object
	
	AgedPerson
		constructor: class Person1
		greet: ƒ greet()
		[[Prototype]]: Object
			constructor: class AgedPerson
			printAge: ƒ printAge()
			[[Prototype]]: Object
 */

// prototype seems to be AgedPerson but it contains the greet() method! And the printAge() method is insied the prototy
// of the prototype! Not what it like in manual .prototype assignment. This has to do with how JS adds methods to objects.
// It does this a bit differently with classes, than with constructor functions.

// In the case of manual .prototyep assignment, the prototype does not have a constructor function. Because I did not assign
// it one.
// A better approach is to NOT REPLACE THE .prototype but the append it.
// Person.prototype.printAge = function() {}
// That way __proto__ will presenrve the constructor function, using which you can create objects.
console.log("Working with __proto__ and .prototype----------------");
const p2 = new person.__proto__.constructor(); // can make sense if you don't have direct access to the constructor.
console.dir(p2);

// the default prototype every object gets, thanks to it being assigned as adefault to be assigned protoype for every
// constructor function can be found on the global Object class or Object constructor function.

console.dir(Object); // does not have toString(). But __proto__ does.
// that is becuase what's contained in Object ctor function, are static properties. It's instance properties are in
// __proto__.
// So all objects don't have the Object constructor function as the root of it'r __proto__ chain. Does not have Object
// static fields and methods. But has Object.prototype content.
console.dir(Object.prototype); // assigned to all object instances __proto__.
// but Object.prototype has no prototype. End of chain.

/**
 * The main take away is the difference between __proto__ and .prototype and how it works with instances and constructor
 * function (classes) objects separately.
 */

// We use classes because it skips all these. However, the behind the scenes is a must know for all JS devs. Occassionally
// we might have to use prototypes because classes might not be suppoerted.

/**
 * There is a difference between constructor functions and classes. Although they seem equivalent in use of .prototype and
 * __proto__.
 *
 * We have seen the greet() method being a part of Person1 object, showing up in __proto__, inside AgedPerson object.
 * And printAge() is not added inside AgedPerson object, rather in the __proto__ of AgedPerson object.
 * It seems one layer of extra __proto__ is used for methods. Fields and properties behave normally, but methods have an
 * added layer of __proto__.
 *
 * __proto__ of every object has the IT'S constructor function. Under the header of it's parent. Also contains
 * functions that are not added as a property. And THAT object has __proto__ containing THAT object's constructor
 * function. If THAT object was Object instance, then the __proto__ containing Object constructor function is the end
 * of __proto__ chain.
 */

/**
 * object instances have instance fields, that have values according to instance preference. That is created every time an
 * object is instantiated. However, method objects are the same, without variance. Therefore to optimize and use less memory,
 * JS objects of the same class, can share methods. So we put them in __proto__ of each instance - that is the same method
 * object for all instances, with different "this" value.
 *
 * By adding the methods to a __proto__, JS makes sure that whenever we create a Person object, WE USE THE SAME PROTOTYPE
 * fallback object.
 *
 * This enables, less memory usage and better performance.
 */

const pers1 = new Person1();
const pers2 = new Person1();
console.log("__proto__ is equal for all instances");
console.log(pers1.__proto__ === pers2.__proto__);

// The equivalent for constuctor function notation would be,
Person.prototype.greet = function () {
	console.log("Hi I am", this.name, "and I am", this.age, "years old");
};

const personLikeClass = new Person();
console.dir(personLikeClass);

// can create new instance sof methods in classes by assigning function() to field or inside the constructor.

// Getting and Setting __proto__ of an instance.
// This is a niche usecase, rarely needed.
console.log("Setting and getting __proto__ -------------");
const course = {
	title: "JavaScript - The Complete Guide",
	rating: 5,
};

console.log(course.__proto__);
console.log(Object.getPrototypeOf(course)); // same output as __proto__
Object.setPrototypeOf(course, {
	...Object.getPrototypeOf(course), // appending not overwriting
	printRating: function () {
		console.log(this.rating.toString(), "/ 5");
	},
}); // overwrite __proto__

course.printRating();

const student = Object.create({
	printProgress: function () {
		console.log(this.progress);
	},
}); // {}, twist: firsst parameter is set as __proto__ for the created object, second param defines properties for 
// each fields. 

student.name = "Max";

Object.defineProperty(student, "progress", {
	configurable: true,
	enumerable: true,
	value: 0.8,
	writable: false,
});

console.log(student);
