// // in JavaScript you define a variable with: let userName = 'Max'
// let userName = 'Sal'
// // let keyword is for creating the variable. Reassigning does not need let.
// userName = 'Salman'
// // constants are created with const
// const totalUsers = 15;
const DEFAULT_STARTING_VAL = 20;

let currentResult = DEFAULT_STARTING_VAL; // camelCase is encouraged.
// starting with $ is allowed!
// let $kindOfSpecial;
// let _internalValue;
// In JavaScript using the ; is generally optional.
// If you have 2 declarations on the same line you have to use semicolon
// let const a = 1; let const b = 2;
// Generally, you are discouranged to use semicolons.
currentResult = ((currentResult + 10) * 3) / 2 - 1;

// let calculationDescription = '(' + DEFAULT_STARTING_VAL + ' + 10) * 3 / 2 - 1';
// back tick string is like f string in python. ${} to insert values
// backtick strings are called template literal. They also allow multiline strings.

let calculationDescription = `(${DEFAULT_STARTING_VAL} + 10) 
* 3 / 2 - 1`;
// but browsers omit whitespace while rendering page. But that can be undone
// by using white-space: pre; in that element css.

outputResult(currentResult, calculationDescription); // from vendor.js

// Data types: Numbers, Strings

// JavaScript reads the file and idenfies declarations. So declaring functions
// at the bottom and calling them above is okay.

// For functions, we have a special behavior in javascript. The browser loads your
// script - it runs throught it from top to bottom. It parses the entire script.
// Reads it from top to bottom, and will take any functions it finds and automatically
// pull them to the top and be aware of them.

// undefined: Default value of uninitialized variables.
// Never assign undefined as a value manually.

// null: Similar to undefined. But this ought to be assigned to mark no value.
// Never assumed by default. Assigned to "reset", "clear"

// NaN: Not a Number. NOT A TYPE. Technically this is a type of number and
// can therefore be used in calculations.
// Indicates error. Eg. Multiply with text. 3 * 'hi'. Invalid calculation.

// typeof keyword gives type on runtime.

/*
    in order to recognise the html elements in the script they
    have to render the html code. So importing scripts have to be at the bottom.  
    Refer to importing scripts video of Max. 
    Adding scripts at the bottom has performance issues. The script s can't begin executing
    until all of them are downloaded and the html is parsed. The scripts are 
    downloaded at the ending portion of html parsing. So there is a significant delay
    between the html parsing and script execution. This happens because the scripts
    are coded after the html rendering. However, puttong them above will cause undefined referrence errors.
    We can't execute the scripts before the html is parsed. But downloading them before 
    parsing is complete should make the process faster. 
    We want to load the scripts as early as possible and only execute them
    after all html is parsed, to get the best of both worlds. 
    So putting the script tags at the start will start downloading them 
    before html is completely parsed. But 'defer' keyword will prevent executing
    them.
    async: executes script right after downloading. Parsing html is suspended until
		executed. This will only work if no html element is refered in the script.
		When scripts don't interact with the webpage, maybe you send data to 
		background server. With async, the script executes as early as possible, 
		as soon as it is downloaded.
		SO, the order of the script execution is not guaranteed. The app.js might be 
		executed before vendor.js if it is loaded earlier. With 'defer' browser gaurantees order. 
		async is solution only if you have a standalone script that does not rely
		on your html content.
		async and defer are only applicable only for external scripts. 
		If inline script is used, no download is necessary. Such scripts are
		always executed immediately. Therefore they need to put at the bottom 
		of the body section.
*/

// intereesting shortcuts: select next of current word: ctrl + D
// auto complete drop down: ctrl + space

// JavaScript doc: https://developer.mozilla.org/en-US/
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference

// use console.log() to gain insights into your code (flow)
