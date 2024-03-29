const ULElem = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");

const form = document.querySelector("#new-post form");
const fetchButton = document.querySelector("#available-posts button");

const postList = document.querySelector("ul");

function sendHttpRequest(method, url, data) {
	const promise = new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open(method, url);

		xhr.onload = function () {
			if (xhr.status >= 200 && xhr.status < 300) {
				resolve(xhr.response);
			} else {
				reject(new Error("Something went wrong!")); // server sied errors
			}
		};

		xhr.addEventListener("error", (event) => {
			reject(new Error("Failed to send request!")); // client side errors.
		});

		xhr.send(JSON.stringify(data));
	});

	return promise;
}

async function fetchPosts() {
	try {
		const response = await sendHttpRequest(
			"GET",
			"https://jsonplaceholder.typicode.com/pos"
		);

		const listOfPosts = JSON.parse(response);
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
