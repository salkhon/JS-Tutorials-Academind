const storeButton = document.getElementById("store-btn");
const retrieveButton = document.getElementById("retrieve-btn");

const userId = "u123";

const user = {
	name: "Max",
	age: 30,
	hobbies: ["Sports", "Cooking"],
};

const dbRequest = indexedDB.open("StorageDummy", 1);

/** @type {IDBDatabase} */
let db;

// triggers when when open request succeeds.
dbRequest.addEventListener("success", (event) => {
	// for openning existing db
	db = event.target.result;
});

dbRequest.addEventListener("upgradeneeded", (event) => {
	// to interact with db, you need upgradeneeded event
	// will run when creating new db, or new version
	db = event.target.result;
	const objStore = db.createObjectStore("products", {
		keyPath: "id",
	}); // primary key

	objStore.transaction.addEventListener("complete", (event) => {
		// triggers when table is created

		// .objectStore() selects from multiple table names passed into db.transation()
		const productStore = db
			.transaction("products", "readwrite")
			.objectStore("products");
		productStore.add({
			id: "p1",
			title: "A first product",
			price: 12.99,
			tags: ["Expensive", "Luxurious"],
		});
	});
});

dbRequest.addEventListener("error", (event) => {
	console.log("ERROR!");
});

storeButton.addEventListener("click", () => {
	if (!db) {
		console.log("no db");
		return;
	}
	const productStore = db
		.transaction("products", "readwrite")
		.objectStore("products");
	productStore.add({
		id: "p2",
		title: "A second product",
		price: 122.99,
		tags: ["Expensive", "Luxurious"],
	});
});

retrieveButton.addEventListener("click", () => {
	if (!db) {
		console.log("no db");
		return;
	}
	const productStore = db
		.transaction("products", "readwrite")
		.objectStore("products");

	const request = productStore.get("p2");
	request.addEventListener("success", (event) => {
		console.log(request.result);
	});
});
