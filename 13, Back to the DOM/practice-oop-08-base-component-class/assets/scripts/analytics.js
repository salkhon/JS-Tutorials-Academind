const timerhandle = setInterval(() => {
	console.log("sending analytics data");
}, 2000);

document.getElementById("stop-analytics").addEventListener("click", () => {
	clearInterval(timerhandle);
});
