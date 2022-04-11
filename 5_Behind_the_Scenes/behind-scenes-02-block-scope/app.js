// 'use strict';

let name = "Salman";
// let name = 'Salman' // redeclaring error
var namev = "Salman";
var namev = "SalmanSal"; // okay, but not very healthy.

if (name === "Salman") {
	var hobbies = ["ComputerScience", "Films"]; // accessible outside if block, in the global space!
	console.log(hobbies);
}

function greet() {
	let age = 30;
	let name = "Sal";
	console.log(name, age);
}

// cannot access age because it's local to greet(). Can acess name, because it is global.
console.log(name, hobbies);

greet();

// var is discouraged. let maintains clean scoping.

// intialozation for let vs var:

console.log(userName); // not error, but gets undefined!!
// with let and const we get error but with var we don't

var userName = "Salmann";
// JS has a special feature called HOISTING
// The JS Engine reads your entire script first, and loads functions, and registers them.
// Which is why you can call functions before the code for defining them.
// The JSEngine does the same for var declaration.
// For variables declaration created with var, it actually pulls this var declaration to the beginning
// of your file, and then just leaves your initilizations down where it hoisted from.

// It does the same thing for let and const, but it does not initialize the variable by undefined.
// It just declares it but assigns no initial value at all, therefore you get the error saying
// no initialization. But var declaration hoists and assings undefined.
// Again, this is counter intuitive to structured code, so discouraged.

// With var you can redeclare the same variable in the same scope.
// Again, redeclaring the value is absolutely unnecessary.

// JS can also create a variable, without let, var or const. Same way python does.
// JS is a forgiving language, so it accepts that.

// To disable such forgingin behavior, JS has a special mode that you can turn on.
// It was introduced with ES5, even though modern JS syntax already prohibits some 
// of the thigns you can rule out with strict mode, it might still be worth turning it on. 

// It can be turned on by adding a string at the beginning of a file or a function. 
// 'use strict';
// browsers understand this and they know you want strict mode for this script or this function where
// you placed in. Only for this script or this function. Strict mode disables certain behaviors.
// For example, 
// - var undefined hoisting
// - using var to declare keywords as variable names. 

// var undefined = null; // HOLY CRAP!

// Parse and Compile:
// 1. Write script. Import in html file.
// 2. Browser reads html file, detects script import.
// 3. Whenever the browser encounters a script import, or an inline script
//	- it will execute it. So the browser executes the imported or the inline script. 
// 4. Exact details depend on the browser and the engine used.
//	The JS code you write is the same, but what the browser does with that code in detail, 
// 	that differs.

// Parsing: Browser reads the javascript code, loads it.
// Execution: Effect of that code.

// Browsers have a JS engine, google has V8. Firefox has spidermonkey. 
// These engines do that parsing and execution and they typically consist of 
// two parts. Interpreter and a compiler. 
// The compiler is a just in time compiler(JIT). 

// Interpreter loads the script, read it - translates in byte code, which is easier to execute. 
// Then it runs. The interpreter executes line by line in an unoptimized way. Which means the
// script execution works - but not as fast as possible.
// For the best possible performance, you don't just want to interpret the code - you want to
// compile it to machine code, and hand it off to your OS. Because that will always be faster.
// That translation from byte code to machine code is what the compiler does. 
// So the interpreter does not just start executing your script, it also hands off the byte code
// to the compiler.

// Compiler: Built in to the JS Engine. For V8, that's named TurboFan. 
// While the interpreter already started execution, now compiles to machine code. 
// Compilation happens side by side with the interpreter executing your script. 
// Machine code is handed off to your machine that is executed the fastest possible way. 

// The JS engine applies some optimization techniques. To speed up execution and compilation time. 
// For example, code that did not change between the last execution and the current execution is 
// not recompiled, instead the already compiled code is taken again. 
// So if an existing part of the script is executed again, the already compiled code can be 
// taken.

// Browser gives some APIs. Which are built in. Can be used in JS code. 
// For example: - working with the loaded html code. 
// - getting the user's location. 
// They are a part of the browser, written in C++. The browser gives you communication
// bridges which you can call in your JS Script. 
// When the code is interpreted and compiled the browser knows where to find these APIs, 
// and includes these calls to that native API into the interpreted or compiled code.
// Therefore the finished compiled code also has access to these browser APIs.

// JS Engine
// All about managing memory and managing execution steps.
// We have the heap and the stack. 

// Heap: Long term memory, memory allocation, the browser stores data in system memory and manages access to it
// OS allocates memory to the browser application.

// Stack: Execution Context, manages your program flow (function calls and communication)
// Short term memory.

// Function implementations are stored into heap.
// The stack controls 'which thing is happening'. JS is single threaded.

// Another important concept that is a part of modern browsers is the event loop.
// Will help us with async code. Helps us with event listeners, click listerens we added to buttons.
// Stack that pushes and pops execution, implies that once the stack is empty, execution can't resume
// Execution is complete. However when we add Button click listeners, after adding the stack becomes
// empty. If we click the button afterwards the script executes code, so how does it do that?
// This is done through the event loop that exists in the browser, not the JS engine.
// The browser communicates with the engine. 
// The click listeners are information being passed to the browser, therefore the JS engine
// does not care at all about these ongoing listeners, the browser manages. 
// The browser pings the JS engine, whenver it has a new event fired by the listers set up
// by the JS code. 
// Whenever such a listener is triggerred by the button, which is part of the page rendered the browser
// so the browser knows when it happens, the browser pushes information to your script.
// The browser does so with the help of the event loop.

// copy reference values
// let anotherPerson = { ...person };
// pulls out all the key-val pairs in person and adds them as new k-v pairs in anotherPerson

// addListener does not add if the listener is the same as already stored.
// so if a callback is passed, a new function is pased every time, so 
// memory leak occurs.
