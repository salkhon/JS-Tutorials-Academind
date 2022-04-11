const button = document.querySelector("button");
const output = document.querySelector("p");

async function getPosition(options) {
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

async function setTimer(duration) {
	const promise = new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve("Done!");
		}, duration);
	});
	return promise; // can call "then()" on setTimer()
}

async function trackUserHandler() {
	console.log("Clicked!");

	let posData, timerData;

	try {
		posData = await getPosition();
		timerData = await setTimer(2000);
	} catch (error) {
		console.log(error);
	}
	console.log(timerData, posData);
}

button.addEventListener("click", async () => {
	trackUserHandler();
	setTimeout(() => {
		console.log("runs later after call stack empties");
	}, 0);
	console.log("Offloading done.");
});

Promise.race([getPosition(), setTimer(2000)]).then((data) => {
	console.log(data);
});

Promise.all([getPosition(), setTimer(2000)]).then((promiseData) => {
	console.log(promiseData);
});
