/* 
	// form.js - JK_Potato/Computer
	Responsible for changes within the website form (editor)
*/
const sMConfigBar = document.querySelector("#sMConfigBar")

function reDisplay() {
	for (const holder of document.querySelectorAll(".sMModal")) {
		if (holder.classList.contains(sMConfigBar.dataset.currentMenu)) {
			holder.style.display = "block";
		} else {
			holder.style.display = "";
		}
	}

	if (sMConfigBar.dataset.currentMenu == "panelSelector") {
		document.querySelector("#panelSelect").style.display = "flex";
		document.querySelectorAll(".sMConfigOption:has(#panelSelector)")[0].className = "sMConfigOption selected";
	} else {
		document.querySelector("#panelSelect").style.display = "";
		document.querySelectorAll(".sMConfigOption:has(#panelSelector)")[0].className = "sMConfigOption";
	}

	for (const button of document.querySelectorAll(".sMConfigOption")) {
		if ((!button.id) || (button.id == "nightMode")) {
			continue;
		}

		if (button.id == sMConfigBar.dataset.currentMenu) {
			button.className = "sMConfigOption selected";
		} else {
			button.className = "sMConfigOption"
		}
	}
}

for (const button of document.querySelectorAll(".sMConfigOption")) {
	button.onclick = function () {
		if ((!button.id) || (button.id == "nightMode")) {
			return;
		}

		if (sMConfigBar.dataset.currentMenu == button.id) {
			sMConfigBar.dataset.currentMenu = "";
		} else {
			sMConfigBar.dataset.currentMenu = button.id;
		}

		reDisplay();
	}
}

for (const button of document.querySelectorAll(".sMModalTab")) {
	button.onclick = function () {
		if (!button.dataset.tab) {
			return;
		}

		const modal = document.querySelectorAll('.sMModal:has(.sMModalTab[data-tab="' + button.dataset.tab + '"]')[0];

		if (modal.dataset.currentMenu != button.dataset.tab) {
			modal.dataset.currentMenu = button.dataset.tab;
		}

		for (const holder of modal.querySelectorAll(".sMModalContent > *")) {
			if (holder.id != modal.dataset.currentMenu) {
				holder.classList.add("tabHidden");
			} else {
				holder.classList.remove("tabHidden");
			}
		}

		for (const btn of modal.querySelectorAll(".sMModalTab")) {
			if (btn.dataset.tab == button.dataset.tab) {
				btn.className = "sMModalTab selected";
			} else {
				btn.className = "sMModalTab";
			}
		}
	}
}

document.querySelector("#panelSelector").onclick = function () {
	if (sMConfigBar.dataset.currentMenu == this.id) {
		sMConfigBar.dataset.currentMenu = "";
	} else {
		sMConfigBar.dataset.currentMenu = this.id;
	}

	reDisplay();
}

document.getElementsByName("signMaker")[0].onsubmit = function (e) {
	e.preventDefault();
}

document.getElementById("export").onclick = function () {
	/*
	document.querySelector("#modalHolder").style.display = "flex";
	document.querySelector("#downloadContent").showModal();
	document.querySelector("#downloadContent").style.display = "flex";
	app.updatePreview();
	*/
}

document.getElementById("hideConfig").onclick = function () {
	if (sMConfigBar.classList.contains("invisible")) {
		sMConfigBar.classList.remove("invisible");
		this.dataset.tooltip = "Hide";
	} else {
		sMConfigBar.classList.add("invisible");
		this.dataset.tooltip = "Show";
	}
}

document.getElementById("cancelDownload").onclick = function () {
	document.querySelector("#modalHolder").style.display = "none";
	document.querySelector("#downloadContent").style.display = "none";
	document.querySelector("#downloadContent").close();
}

document.querySelector("#closeWelcome").onclick = function () {
	document.querySelector("#modalHolder").style.display = "none";
	localStorage.setItem("closedWelcome", true);
	document.querySelector("#welcomeToSignMaker").close();
}

const toolTip = document.createElement("span");
toolTip.className = "toolTip";
toolTip.style.opacity = 0;
document.body.appendChild(toolTip);
for (const element of document.querySelectorAll("[data-toolTip]")) {
	element.addEventListener("mouseover", () => {
		const boundingRect = element.getBoundingClientRect();
		toolTip.textContent = element.dataset.tooltip;
		toolTip.style.left = (boundingRect.left + ((boundingRect.right - boundingRect.left) / 2)) + "px";
		toolTip.style.top = (boundingRect.top - toolTip.offsetHeight - 10) + "px";
		toolTip.style.opacity = 1;
		toolTip.style.transform = "translateX(-50%)";

		if (sMConfigBar.contains(element)) {
			toolTip.style.fontFamily = "Series D";
		} else {
			toolTip.style.fontFamily = "Inter";
		}
	})

	element.addEventListener("mouseout", () => {
		toolTip.style.opacity = 0;
		toolTip.style.left = "-100px";
		toolTip.style.top = 0;
		toolTip.textContent = "";
		toolTip.style.transform = "";
	})
}

document.querySelector("#nightMode").addEventListener("click", () => {
	document.querySelector("html").dataset.theme = (document.querySelector("html").dataset.theme == "dark") ? ("light") : ("dark");
})

const horizontalScrollOnWheel = document.querySelectorAll('.horizontal-scroll-on-wheel');
horizontalScrollOnWheel.forEach(scrollableElement => {
	scrollableElement.addEventListener('wheel', (event) => {
		if (scrollCooldown) {
			return;
		}
		
		event.preventDefault();
		// Smoothly increase scrollableElement.scrollLeft by event.deltaY;
		scrollableElement.scrollBy({
			left: event.deltaY,
			behavior: 'smooth'
		});
	});
});

if (!localStorage.getItem("closedWelcome")) {
	document.querySelector("#modalHolder").style.display = "flex";
	document.querySelector("#welcomeToSignMaker").showModal();
}