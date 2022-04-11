const addMovieModal = document.getElementById("add-modal");
const addMovieBtn = document.querySelector("header button");
const backdrop = document.getElementById("backdrop");
const cancelBtnAddMovieModal = addMovieModal.querySelector(
	"button.btn--passive"
);
const addBtnAddMovieModal = addMovieModal.querySelector("button.btn--success");
const textInputAddMovieModal = addMovieModal.querySelector("input#title");
const imageURLInputAddMovieModal =
	addMovieModal.querySelector("input#image-url");
const ratingInputAddMovieModal = addMovieModal.querySelector("input#rating");
const entryTextElem = document.querySelector("main section#entry-text");
const deleteMovieModal = document.getElementById("delete-modal");
const deleteBtnDeleteMovieModal =
	deleteMovieModal.querySelector("button.btn--danger");
const cancelBtnDeleteMovieModal = deleteMovieModal.querySelector(
	"button.btn--passive"
);

const movieList = document.getElementById("movie-list");

const movies = [];

let clickedMovieId = undefined;

function updateUI() {
	if (movies.length === 0) {
		entryTextElem.style.display = "block";
	} else {
		entryTextElem.style.display = "none";
	}
}

function toggleBackdropVisibility() {
	backdrop.classList.toggle("visible");
}

function toggleAddMovieModalVisibility() {
	addMovieModal.classList.toggle("visible");
	toggleBackdropVisibility();
}

function toggleDeleteMovieModalVisibility(movieId) {
	clickedMovieId = typeof movieId === "number" ? movieId : null;
	console.log(`Selected Movie Id: ${movieId}, ${clickedMovieId}`);
	deleteMovieModal.classList.toggle("visible");
	toggleBackdropVisibility();
}

function fetchMovieInput() {
	return {
		id: Math.random(),
		title: textInputAddMovieModal.value,
		imgUrl: imageURLInputAddMovieModal.value,
		rating: parseFloat(ratingInputAddMovieModal.value),
	};
}

function clearMovieInputsInModal() {
	textInputAddMovieModal.value = "";
	imageURLInputAddMovieModal.value = "";
	ratingInputAddMovieModal.value = "";
}

function createMovieElement(movie) {
	const movieElem = document.createElement("li");
	movieElem.classList.add("movie-element");

	const movieImageElem = document.createElement("img");
	movieImageElem.src = movie.imgUrl;
	movieImageElem.classList.add("movie-element__image");

	const movieInfoDivElem = document.createElement("div");
	movieInfoDivElem.classList.add("movie-element__info");

	const movieTitleElem = document.createElement("h2");
	movieTitleElem.textContent = movie.title;

	const movieRatingElem = document.createElement("p");
	movieRatingElem.textContent = movie.rating + "/5 stars";

	movieInfoDivElem.append(movieTitleElem, movieRatingElem);

	movieElem.append(movieImageElem, movieInfoDivElem);

	movieElem.addEventListener(
		"click",
		toggleDeleteMovieModalVisibility.bind(null, movie.id)
	);

	return movieElem;
}

function handleAddMovie() {
	const movie = fetchMovieInput();
	if (
		movie.title.trim() === "" ||
		movie.imgUrl.trim() === "" ||
		movie.rating < 0 ||
		movie.rating > 5
	) {
		alert("Please enter valid values (rating between 0 and 5)");
		return;
	}
	const movieElement = createMovieElement(movie);

	movieList.append(movieElement);
	movies.push(movie);

	toggleAddMovieModalVisibility();
	clearMovieInputsInModal();
	updateUI();
}

function handleBackdropClick() {
	if (addMovieModal.classList.contains("visible")) {
		toggleAddMovieModalVisibility();
	} else if (deleteMovieModal.classList.contains("visible")) {
		toggleDeleteMovieModalVisibility();
	}
}

function handleDeleteMovie() {
	if (clickedMovieId) {
		const movieIndex = movies.indexOf(
			movies.find((movie) => movie.id === clickedMovieId)
		);
		console.log(`Deleting index: ${movieIndex}`);
		movies.splice(movieIndex, 1);
		movieList.children[movieIndex].remove();
		toggleDeleteMovieModalVisibility();
		updateUI();
	}
}

backdrop.addEventListener("click", handleBackdropClick);

addMovieBtn.addEventListener("click", toggleAddMovieModalVisibility);
cancelBtnAddMovieModal.addEventListener("click", toggleAddMovieModalVisibility);
addBtnAddMovieModal.addEventListener("click", handleAddMovie);

cancelBtnDeleteMovieModal.addEventListener(
	"click",
	toggleDeleteMovieModalVisibility
);
deleteBtnDeleteMovieModal.addEventListener("click", handleDeleteMovie);
