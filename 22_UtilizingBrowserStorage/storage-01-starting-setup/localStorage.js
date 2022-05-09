const storeButton = document.getElementById("store-btn");
const retrieveButton = document.getElementById("retrieve-btn");

const userId = "u123";

const user = {
	name: "Max",
	age: 30,
	hobbies: ["Sports", "Cooking"],
};

storeButton.addEventListener("click", () => {
	localStorage.setItem("uid", userId);
	localStorage.setItem("user", JSON.stringify(user));
});

retrieveButton.addEventListener("click", () => {
	const extractedId = localStorage.getItem("uid");
	const extractedUser = JSON.parse(localStorage.getItem("user"));
	if (extractedUser) {
		console.log(extractedUser);
	} else {
		console.log("no user found");
	}
	if (extractedId) {
		console.log(`Got the id - ${extractedId}`);
	} else {
		console.log("Could not find id");
	}
});
