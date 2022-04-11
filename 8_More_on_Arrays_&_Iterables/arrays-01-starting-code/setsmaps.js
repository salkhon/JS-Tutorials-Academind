const ids = new Set(); // Set constructor
console.log(ids);
const repeatedNums = [1, 1, 2, 2, 3, 3];
const uniqueNums = new Set(repeatedNums);
console.log(uniqueNums);
// cannot access set elements by index
uniqueNums.add(4);
console.log(uniqueNums.has(4));
// .entries() return arrays of arrays containing k-v.
// FOR SETS KEY = VALUE
for (const [key, val] of uniqueNums.entries()) {
	console.log(key, val);
}
if (uniqueNums.has(1)) {
	uniqueNums.delete(1);
}
console.log(uniqueNums);

// Maps
const person1 = { name: "Max" };
const person2 = { name: "Manuel" };
// we might want to keep the object lean, so not add any more property - thus use a map.
// const personData = new Map([['key', 'somevalue'], [], []...])
const personDataMap = new Map([[person1, [{ date: "Yesterday", price: 10 }]]]);
console.log(personDataMap);
console.log("Purchases by person1: ", personDataMap.get(person1));

personDataMap.set(person2, [{ date: "Two Weeks ago", price: 100}]);
console.log(personDataMap);

for (const [key, val] of personDataMap.entries()) {
    console.log(key.name, "'s purchase list: ", val);
}

// maps in a way are pretty similar to objects. 
/**
 * Maps
 * - Can use any values (and types) as keys
 * - Better performance for large quantities of data
 * - Better performance when adding + removing data frequently
 * 
 * Objects
 * - Only may use strings, numbers or symbols as keys
 * - Perfect for small / medium-sized sets of data
 * - Easier / quicker to create (typically also with bettwe performance)
 * 
 */

// weak set
let person = {name: "Max"};
const personsWS = new WeakSet(); // CAN ONLY STORE OBJECTS
personsWS.add(person);
// has only 3 mthods. 
console.log(personsWS);
person = null; // for weak set, nulling out the main pointer, release the object for garbage collection. 
//. whereas sets will hold the object. 
// you could delete(), but that might be cumbersome for a lot of element.

// For weak set, if you reset all other places where you pointed this object, the weakset will not hold onto it. 
// SO that the weakset allows garbage collection to delete items that are part of the set as long no other part your code has
// any reference to it. 

console.log("Might be garbage collected", personsWS);

// Same for weak map vs map.
// on a weakmap has way less methods than before. Because you can't loop through the entries
// because you can't guarantee the amount of entries. So no size properties as well. \
person = {name: "Max"};
const personDataWM = new WeakMap();
personDataWM.set(person, "Extra info");

person = null;
// can garbage collect max. 
