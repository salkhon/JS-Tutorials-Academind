class MoreInfo {
	#moreInfoElem;
	/**
	 * @param {HTMLLIElement} hostProjectLiElem
	 */
	constructor(hostProjectLiElem) {
		this.#moreInfoElem = document.createElement("div");
		this.#moreInfoElem.classList.add("card");

		// substitute for innerHTML
		const tooltipTemplate = document.getElementById("tooltip");
		// creates a new node based on the content of the provided node
		const tooltipTemplateBody = document.importNode(
			// @ts-ignore
			tooltipTemplate.content,
			true
		);
		// inserting dynamic data
		tooltipTemplateBody.querySelector("p").textContent =
			hostProjectLiElem.dataset.extraInfo;
		this.#moreInfoElem.append(tooltipTemplateBody);
		// this shortens long html codes.

		this.moreInfoElem.style.position = "absolute"; //  avoids rendering space relative to elements
		this.#moreInfoElem.style.visibility = "hidden";
		hostProjectLiElem.appendChild(this.#moreInfoElem);
	}

	get moreInfoElem() {
		return this.#moreInfoElem;
	}
}

class Project {
	#pid;
	#title;
	#description;
	#moreInfoButtonElem;
	#finActButtonElem;
	#listElem;
	#moreInfo;

	/**
	 * @param {HTMLLIElement} projectLiElem
	 */
	constructor(projectLiElem) {
		this.#pid = projectLiElem.id;
		this.#title = projectLiElem.querySelector("h2").textContent;
		this.#description = projectLiElem.querySelector("p").textContent;
		let buttonElems = projectLiElem.querySelectorAll("button");
		this.#moreInfoButtonElem = buttonElems[0];
		this.#finActButtonElem = buttonElems[1];
		this.#listElem = projectLiElem;
		this.#moreInfo = new MoreInfo(this.#listElem);
		// console.log(projectLiElem.dataset);
		// console.log(projectLiElem.getBoundingClientRect());
		this.connectDrag();
	}

	connectDrag() {
		this.#listElem.addEventListener("dragstart", (event) => {
			event.dataTransfer.setData("text/plain", this.#pid);
			event.dataTransfer.effectAllowed = "move";
		});
	}

	get pid() {
		return this.#pid;
	}

	get title() {
		return this.#title;
	}

	get description() {
		return this.#description;
	}

	get finishActivateButtonElem() {
		return this.#finActButtonElem;
	}

	get moreInfoButtonElem() {
		return this.#moreInfoButtonElem;
	}

	get listElem() {
		return this.#listElem;
	}

	get moreInfo() {
		return this.#moreInfo;
	}

	switchButtonLabel() {
		if (this.#finActButtonElem.textContent === "Finish") {
			this.#finActButtonElem.textContent = "Activate";
		} else {
			this.#finActButtonElem.textContent = "Finish";
		}
	}
}

class ProjectList {
	#projects;
	#ulElem;

	/**
	 * @param {HTMLUListElement} projectUlElem
	 */
	constructor(projectUlElem) {
		this.#projects = Array.from(projectUlElem.querySelectorAll("li")).map(
			(projLiElem) => new Project(projLiElem)
		);
		this.#ulElem = projectUlElem;
		this.connectDroppable();
	}

	connectDroppable() {
		this.#ulElem.addEventListener("dragenter", (event) => {
			// @ts-ignore
			if (event.dataTransfer.types[0] === "text/plain") {
				event.preventDefault();
			}
			this.#ulElem.classList.add("droppable");
		});

		this.#ulElem.addEventListener("dragover", (event) => {
			// @ts-ignore
			if (event.dataTransfer.types[0] === "text/plain") {
				event.preventDefault();
			}
			this.#ulElem.classList.add("droppable");
		});

		this.#ulElem.addEventListener("dragleave", (event) => {
			// flickers because once a child item (<li>) is entered, the event is fired, and propagated.
			// we have to check that the event source is not of the child of the <ul>.
			// @ts-ignore
			if (event.relatedTarget.closest("ul") != this.#ulElem) {
				this.#ulElem.classList.remove("droppable");
			}
		});

		this.#ulElem.addEventListener("drop", (event) => {
			const projId = event.dataTransfer.getData("text/plain");

			// checking if dropped on different list
			if (this.projects.find((proj) => proj.pid === projId)) {
				return;
			}

			/** @type {HTMLButtonElement} */
			const projectFinActButtonElem = document.querySelector(`#${projId} button:last-of-type`);

			projectFinActButtonElem.click();
		});
	}

	get projects() {
		return this.#projects;
	}

	/**
	 * @param {Project} project
	 */
	addProject(project) {
		this.#projects.push(project);
		this.#ulElem.appendChild(project.listElem);
		project.listElem.scrollIntoView({ behavior: "smooth" });
		project.switchButtonLabel();
	}

	/**
	 * @param {Project} project
	 */
	removeProject(project) {
		const index = this.#projects.indexOf(project);
		if (index !== -1) {
			this.#projects.splice(index, 1);
			this.#ulElem.removeChild(project.listElem);
		}
	}

	/**
	 * @param {Project} project
	 */
	hasProject(project) {
		return this.#projects.includes(project);
	}
}

class ProjectManager {
	/**
	 * @param {ProjectList} activeProjects
	 * @param {ProjectList} finishedProjects
	 */
	constructor(activeProjects, finishedProjects) {
		this.activeProjects = activeProjects;
		this.finishedProjects = finishedProjects;
	}

	/**
	 * @param {Event} event
	 * @param {Project} proj
	 */
	switchProjectList(proj, event) {
		console.log(event.type); // events are supposed to be passed at the end, if bound

		if (this.activeProjects.hasProject(proj)) {
			this.activeProjects.removeProject(proj);
			this.finishedProjects.addProject(proj);
		} else if (this.finishedProjects.hasProject(proj)) {
			this.finishedProjects.removeProject(proj);
			this.activeProjects.addProject(proj);
		}
	}

	/**
	 * @param {Project} proj
	 * @param {Event} event
	 */
	handleMoreInfo(proj, event) {
		const projLiElem = proj.listElem;
		const moreInfoElem = proj.moreInfo.moreInfoElem;

		if (moreInfoElem.style.visibility == "visible") {
			moreInfoElem.style.visibility = "hidden";
		} else {
			// since project moves from list to list, the moreInfo tip will need dynamic positions
			// since we are rendering it in "absolute" position, we need project Elem coordinates
			const projElemTop = projLiElem.offsetTop;
			const projElemLeft = projLiElem.offsetLeft;
			const projElemHeight = projLiElem.clientHeight;
			const projectsListScoll = projLiElem.parentElement.scrollTop;

			const x = projElemLeft + 20;
			const y = projElemTop + projElemHeight - 10 - projectsListScoll;

			moreInfoElem.style.left = x + "px";
			moreInfoElem.style.top = y + "px";
			moreInfoElem.style.visibility = "visible";
		}
	}
}

class App {
	static run() {
		// setting up project lists

		/** @type {HTMLUListElement} */
		const activeProjectUlElem = document.querySelector(
			"section#active-projects ul"
		);
		const activeProjects = new ProjectList(activeProjectUlElem);

		/** @type {HTMLUListElement} */
		const finishedProjectsUlElem = document.querySelector(
			"section#finished-projects ul"
		);
		const finishedProjects = new ProjectList(finishedProjectsUlElem);

		const projectManager = new ProjectManager(
			activeProjects,
			finishedProjects
		);

		// setting event listeners to project buttons (not adding)
		activeProjects.projects.forEach((proj) => {
			proj.finishActivateButtonElem.onclick =
				projectManager.switchProjectList.bind(projectManager, proj);
			proj.moreInfoButtonElem.onclick =
				projectManager.handleMoreInfo.bind(projectManager, proj);
		});

		finishedProjects.projects.forEach((proj) => {
			proj.finishActivateButtonElem.onclick =
				projectManager.switchProjectList.bind(projectManager, proj);
			proj.moreInfoButtonElem.onclick =
				projectManager.handleMoreInfo.bind(projectManager, proj);
		});

		// returns a timer id, so that you can stop the timer if you want to
		const timerid = setTimeout(App.startAnalytics, 5000); // 5000ms

		document
			.getElementById("stop-analytics-btn")
			.addEventListener("click", () => {
				clearTimeout(timerid);
			});
	}

	static startAnalytics() {
		const analyticsScript = document.createElement("script");
		analyticsScript.src = "assets/scripts/analytics.js";
		analyticsScript.defer = true;
		document.head.append(analyticsScript);
		console.log("Analytics started...");
		// whenever startAnalytics is executed, the script is loaded and executed.
	}
}

App.run();
