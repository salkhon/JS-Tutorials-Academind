const storeButton = document.getElementById("store-btn");
const retrieveButton = document.getElementById("retrieve-btn");

const userId = "u123";

const user = {
	name: "Max",
	age: 30,
	hobbies: ["Sports", "Cooking"],
};

storeButton.addEventListener("click", () => {
	document.cookie = `uid=${userId}; max-age=50`;
	const user = { name: "Max", age: 30 };
	document.cookie = `user=${JSON.stringify(user)}`;
});

retrieveButton.addEventListener("click", () => {
	const cookieDataArr = document.cookie.split(";");
	const cookieDataArrWithoutWhiteSpace = cookieDataArr.map((item) =>
		item.trim()
	);

	console.log(cookieDataArrWithoutWhiteSpace);

	// cookie order changes after adding and expiry, so don't retrive with index, use search methods
	// const userKeyValString = cookieDataArrWithoutWhiteSpace[1];
	const userCookieIndex = cookieDataArrWithoutWhiteSpace.findIndex((item) =>
		item.includes("user")
	);
	if (userCookieIndex != -1) {
		const userKeyValString =
			cookieDataArrWithoutWhiteSpace[userCookieIndex];
		const [userKeyString, userValString] = userKeyValString.split("=");

		console.log(JSON.parse(userValString));
	} else {
		console.log("cookie not found");
	}
});
