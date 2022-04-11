const button = document.querySelector("button");
const output = document.querySelector("p");

// 1. Normal use of eventloop enqueueing methods:

// function trackUserHandler() {
// 	console.log("Clicked!");
// 	navigator.geolocation.getCurrentPosition(
// 		(posData) => {
// 			setTimeout(() => {
// 				console.log(posData);
// 			}, 2000);
// 		},
// 		(error) => {
// 			console.log(error);
// 		}
// 	);
// 	setTimeout(() => {
// 		console.log("runs later after call stack empties");
// 	}, 0);
// 	console.log("Offloading done.");
// }

// 2. promisifying the old JS event loop methods: (setTimeout())

// button.addEventListener("click", trackUserHandler);

// function setTimer(duration) {
// 	const promise = new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			resolve("Done!");
// 		}, duration);
// 	});
// 	return promise; // can call "then()" on setTimer()
// }

// function trackUserHandler() {
// 	console.log("Clicked!");
// 	navigator.geolocation.getCurrentPosition(
// 		(posData) => {
// 			// 2000 for the wrapped set timeout.
// 			setTimer(2000).then(data => {
// 				console.log(data, posData);
// 			});
// 		},
// 		(error) => {
// 			console.log(error);
// 		}
// 	);
// 	setTimeout(() => {
// 		console.log("runs later after call stack empties");
// 	}, 0);
// 	console.log("Offloading done.");
// }

// button.addEventListener("click", trackUserHandler);

// 3. promisifying navigator.geolocation.getCurrentPostition()

function getPosition(options) {
	const promise = new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			(success) => {
				resolve(success); // rather than enqueuuing further events here, we resolve() and let .then() run it's callback to do the same. 
			},
			(error) => {
				reject(error);
			},
			options
		);
	});
	return promise;
}

function setTimer(duration) {
	const promise = new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve("Done!");
		}, duration);
	});
	return promise; // can call "then()" on setTimer()
}

function trackUserHandler() {
	console.log("Clicked!");

	let positionData;
	getPosition()
		.then((posData) => {
			positionData = posData; // saving for later resolve()
			return setTimer(2000); // THIS DOES NOT HAVE TO BE A PROMISE. IT's automatically 
			// wrapped into a promise
		})
		.catch(error => {
			console.log(error);
			return "I will continue without location";
		})
		.then(data => {
			console.log(data, positionData);
		});

	setTimeout(() => {
		console.log("runs later after call stack empties");
	}, 0);
	console.log("Offloading done.");
}

button.addEventListener("click", trackUserHandler);
