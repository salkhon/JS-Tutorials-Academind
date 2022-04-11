const buttons = document.querySelectorAll("button");
const contentp = document.getElementById("content").querySelector("p");

/**
 * @param {Event} event
 */
function buttonClickHandler(event) {
	console.log(event);
	// @ts-ignore
	// event.target.disabled = true;
}

function buttonMouseEnterHandler(event) {
	console.log(event);
}

// instead of adding js on html, we can do a similar thing on js, but since js - we add a callback.

// button.onclick = buttonClickHandler;

// downside: only one handler per event.
buttons.forEach((button) => {
	button.addEventListener("click", buttonClickHandler);
	button.addEventListener("mouseenter", buttonMouseEnterHandler);
});

setTimeout(() => {
	buttons.forEach((button) =>
		button.removeEventListener("click", buttonClickHandler)
	);
}, 5000);

// window.addEventListener("scroll", (event) => {
// 	console.log(event);
// 	contentp.after(contentp.cloneNode(true));
// });

let currentElementNumber = 0;

function scrollHandler(event) {
	const distanceToBottom = document.body.getBoundingClientRect().bottom;

	if (document.documentElement.clientHeight + 150 > distanceToBottom) {
		const newDataElement = document.createElement("div");
		currentElementNumber++;
		newDataElement.innerHTML = `<p>Element ${currentElementNumber} </p>`;
		document.body.append(newDataElement);
	}
}

window.addEventListener("scroll", scrollHandler);

const form = document.querySelector("form");

// the form's submit button triggers a submit eventtype on the form.
form.addEventListener("submit", (event) => {
	console.log(event);
	event.preventDefault();
});

buttons[0].addEventListener("click", (event) => {
	event.stopPropagation();
	console.log("Clicked Button");
	console.log(event);
});

const div = document.querySelector("div");
div.addEventListener("click", (event) => {
	console.log("Clicked Div");
	console.log(event);
});

// div.addEventListener("click", (event) => {
// 	console.log("Clicked Div");
// 	console.log(event);
// }, true);

const listItems = document.querySelectorAll("li");
const list = document.querySelector("ul");

// intensive
// listItems.forEach((listItem) => {
// 	listItem.addEventListener("click", (event) => {
// 		// @ts-ignore
// 		event.target.classList.toggle("highlight");
// 	});
// });

// event delegation pattern
list.addEventListener("click", (event) => {
	// @ts-ignore
	event.target.closest("li").classList.toggle("highlight"); // target will refer to the item we clicked.
	form.submit();
});
