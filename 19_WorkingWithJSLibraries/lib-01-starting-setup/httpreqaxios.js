const ULElem = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");

const form = document.querySelector("#new-post form");
const fetchButton = document.querySelector("#available-posts button");

const postList = document.querySelector("ul");

function sendHttpRequest(method, url, data) {
	return fetch(url, {
		method: method,
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json", // tells the server, my request has json data.
			rustin: "cohle",
		},
	})
		.then((response) => {
			if (response.status >= 200 && response.status < 300) {
				return response.json();
			} else {
				return response.json().then((errorData) => {
					console.log(errorData);
					throw new Error("Something went wrong server-side");
				});
			}
		})
		.catch((error) => {
			console.log(error); //  only network issues get here
			throw new Error("Something went wrong!!");
		});
}

async function fetchPosts() {
	try {
		const response = await axios.get(
			"https://jsonplaceholder.typicode.com/posts"
		);
		console.log(response);

		const listOfPosts = response;
		for (const post of listOfPosts) {
			const postElem = document.importNode(postTemplate.content, true);
			postElem.querySelector("h2").textContent = post.title.toUpperCase();
			postElem.querySelector("p").textContent = post.body;
			postElem.querySelector("li").id = post.id;
			ULElem.append(postElem);
		}
	} catch (error) {
		alert(error.message);
	}
}

async function createPost(title, content) {
	const userId = Math.random();
	const post = {
		title: title,
		body: content,
		userId: userId,
	};

	sendHttpRequest("POST", "https://jsonplaceholder.typicode.com/posts", post);
}

fetchButton.addEventListener("click", fetchPosts);

form.addEventListener("submit", (event) => {
	event.preventDefault();

	const enteredTitled = event.currentTarget.querySelector("#title").value;
	const enteredContent = event.currentTarget.querySelector("#content").value;

	createPost(enteredTitled, enteredContent);
});

postList.addEventListener("click", (event) => {
	if (event.target.tagName.toLowerCase() === "button") {
		const postId = event.target.closest("li").id;
		const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;

		sendHttpRequest("DELETE", url);
	}
});

const promise = new Promise((resolve, reject) => {
	console.log("executed inside promise");
	resolve("passed in");
}).then((message) => {
	console.log(
		"executed in the callback attached to the promise with: ",
		message
	);
});

console.log("exected on the current run if JS.");
