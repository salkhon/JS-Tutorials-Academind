class Project {
	#pid;
	#title;
	#description;
	#buttonElem;
	#listElem;

	/**
	 * @param {HTMLLIElement} projectLiElem
	 */
	constructor(projectLiElem) {
		this.#pid = projectLiElem.id;
		this.#title = projectLiElem.querySelector("h2").textContent;
		this.#description = projectLiElem.querySelector("p").textContent;
		this.#buttonElem = projectLiElem.querySelectorAll("button")[1];
		this.#listElem = projectLiElem;
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

	get buttonElem() {
		return this.#buttonElem;
	}

	get listElem() {
		return this.#listElem;
	}

    switchButtonLabel() {
        if (this.#buttonElem.textContent === "Finish") {
            this.#buttonElem.textContent = "Activate";
        } else {
            this.#buttonElem.textContent = "Finish";
        }
    }
}

class ProjectList {
	#projects;
	#ulElem;

	/**
	 * @param {Element} projectUlElem
	 */
	constructor(projectUlElem) {
		this.#projects = Array.from(projectUlElem.querySelectorAll("li")).map(
			(projLiElem) => new Project(projLiElem)
		);
		this.#ulElem = projectUlElem;
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
}

class App {
	run() {
		// setting up project lists
		const activeProjectUlElem = document.querySelector(
			"section#active-projects ul"
		);
		const activeProjects = new ProjectList(activeProjectUlElem);

		const finishedProjectsUlElem = document.querySelector(
			"section#finished-projects ul"
		);
		const finishedProjects = new ProjectList(finishedProjectsUlElem);

		const projectManager = new ProjectManager(
			activeProjects,
			finishedProjects
		);

		// setting event listeners to project buttons
		activeProjects.projects.forEach(
			(proj) =>
				(proj.buttonElem.onclick =
					projectManager.switchProjectList.bind(projectManager, proj))
		);

		finishedProjects.projects.forEach(
			(proj) =>
				(proj.buttonElem.onclick =
					projectManager.switchProjectList.bind(projectManager, proj))
		);
	}
}

const app = new App();
app.run();
