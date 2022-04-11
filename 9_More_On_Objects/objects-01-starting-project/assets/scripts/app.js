const favMovieTitleInput = document.getElementById("title");
const favMovieExtraNameInput = document.getElementById("extra-name");
const favMovieExtraValInput = document.getElementById("extra-value");
const favMovieAddBtn = document.getElementById("add-movie-btn");

const filterTitleInput = document.getElementById("filter-title");
const filterSearchBtn = document.getElementById("search-btn");

const movieUl = document.getElementById("movie-list");

let movieList = [];

function _getMovie() {
	let movie = null;
	const movieTitle = favMovieTitleInput.value;
	if (movieTitle.trim() !== "") {
		const extraInfoName = favMovieExtraNameInput.value;
		const extraInfoVal = favMovieExtraValInput.value;
		if (extraInfoName.trim() !== "") {
			movie = {
				title: movieTitle,
				[extraInfoName]: extraInfoVal,
			};
		} else {
			movie = {
				title: movieTitle,
			};
		}
		// using this keyword
		movie.getStringRepr = function () {
			strList = [];
			strList.push(this.title);
			for (key in this) {
				if (key !== "title" && key !== "getStringRepr") {
					strList.push(key + ": " + this[key]);
				}
			}
			return strList.join(" - ");
		};
	}
	return movie;
}

function _addMovieElem(movie) {
	if (movie) {
		const movieElem = document.createElement("li");
		movieElem.textContent = movie.getStringRepr();
		movieUl.appendChild(movieElem);
	}
}

function _clearMovieElems() {
	movieUl.innerHTML = "";
}

function _clearInput() {
	favMovieTitleInput.value = "";
	favMovieExtraNameInput.value = "";
	favMovieExtraValInput.value = "";
	filterTitleInput.value = "";
}

function handleAddMovie() {
	const movie = _getMovie();

	if (movie) {
		movieUl.classList.add("visible");
		movieList.push(movie);
		_addMovieElem(movie);
	}

	_clearInput();
}

function handleFilterMovies() {
	console.log(this);
	const filteringTitle = filterTitleInput.value;
	if (filteringTitle.trim() !== "") {
		const filteredMovieList = movieList.filter((val) =>
			val.title.includes(filteringTitle)
		);

		_clearMovieElems();

		for (const movie of filteredMovieList) {
			_addMovieElem(movie);
		}

		if (filteredMovieList.length === 0) {
			movieUl.classList.remove("visible");
		}
	} else {
		// reset UI to all movie list
		_clearMovieElems();
		for (const movie of movieList) {
			_addMovieElem(movie);
		}
	}
	_clearInput();
}

favMovieAddBtn.addEventListener("click", handleAddMovie);
filterSearchBtn.addEventListener("click", handleFilterMovies);

/**
 * spread operator on objects
 * const person = {
 * 	name: "Max",
 * 	hobbies: ["Sports", "Cooking"]
 * };
 *
 * const person2 = { ...person };
 * // takes all key-value pairs of the object you passed and merge those key value pairs on the new object
 *
 * // This is a shallow copy. Deep copy has to be done manually *********
 * // we have to overwrite the one needed to manually copy
 *
 * const person3 = { ...person, hobbies: [...porson.hobbies] };
 *
 * // deep copy on the level of person
 *
 * // another way to copy
 * cosnt person4 = Object.assign(target, source);
 *
 * // Object destructuring
 * const { info, ...otherProp } = movie; // in array, LHS can be named any variable, because the ORDER was the important thing.
 * // FOR objects LHS has to have variable name equal to the field name. ...otherProp holds all other properties not
 * // destrucutred by name,
 * // YOU CAN ASSIGN NEW NAME TO THE DESCTUCTURED OBJECT PROPERTY by using a colon:
 * const { title: movieTitle } = info;
 * // but the extraction needs to be by name.,
 *
 * also can't call methods extracted that have this keyword in them. That this will refer to the global WINDOW OBJECT.
 * NOT THE OBJECT YOU EXTRACTED FROM. For THIS to work, method has to be called with the object.
 * We can work with extracted methods with this through the help of bind(). Preconfigure which argument a method takes.
 * getFormatterTitle = getFormattedTitle.bind(movie); // here movie is the this object.
 *
 * Aside rfom bind() we might use call(). function.call(thisArg, ...argArray)
 * bind() prepares callback for future execution. bind() returns a new function object.
 * call() instead executes the function right away. It's like calling the function, but with that extra twist
 * of OVERWRITING what THIS refers to.
 * let text = getFormatterTittle.call(movie);
 *
 * apply() is similar to call. It executes the function right away. The difference is, the variable number argument is
 * and array, andinside that array goes your other args. call() allows you to pass additional arguments as a comma
 * separated list, apply allows you to pass additional args as an array.
 *
 * // To check if a property exists:
 * 'propertyKey' in info
 * // this checks if the property is in info.
 * // we could also check if the property is undefined
 * movie.info === undefined
 *
 */
/**
 * You can declare methods without colons:
 * const newMovie = {
 * 	info: { ... },
 * 	id: Math.random().toString(),
 * 	getFormattedTitle() {
 * 		return this.info.title.toUpperCase();
 * 	}
 * }
 *
 * // THOUGH, behind the scenes this method declaration is not exactly the same as the shorthand. But we'll cover that
 * later.
 *
 * Also, this inside a callback, is refering to the object scope where the callback is called.
 * addMovieBtn.addEventListener("click", addMovieHandler);
 * this refers to who's responsible for calling.
 * The browser binds "this" for you (on event listeners) to the DOM element that triggered the event.
 * HOWEVER, ONLY IF YOU'RE NOT USING AN ARROW FUNCTION.
 * FOR ARROW FUNCTION THIS BECOMES WINDOW.
 * SO "this" does not exist for arrow function. They use the global "this". Only functions declared using the function
 * keyword have "this" that is overwritten according to the caller.
 * So "this" inside arrow functions are the same as "this" outside. Simply they don't know what it is.
 * Even arrow functions inside objects, "this" refers to how they would work outside, outside the object - window.
 *
 * Arrow functions shine when you need to pass the outer object reference to the callback passed inside the method
 * of that object.
 * const members = {
 * 	teamName: "Blue Rockets",
 * 	people: ["Max", "Manuel"],
 * 	getTeamMembers() {
 * 	this.people.forEach(p => console.log(p + " - " + this.teamName));
 * 	}
 * }
 *
 * So here, the consumer passed into forEach, is an arrow function. Who reveives this as it's surrounding,
 * that is the members object. Which is exactly what we need, without passing in the object.
 *
 * So the arrow function does not change parent's binding of "this"
 *
 *
 * GETTER AND SETTER
 * get keyword. Like python @property
 * const newMovie = {
 * 	info: {
 * 		set title(val) {
 * 			if (val.rtim() === "") {
 * 				this._title = "DEFAULT"; // internal hidden property
 * 				return;
 * 			}
 * 			this._title = val;
 * 		},
 * 		get title() {
 * 		return this._title.toUpperCase();
 * 		}
 * 	},
 *
 * }
 * // if you omit getter, you have a write-only property. If you omit setter, you have a read-only property.
 *
 */
