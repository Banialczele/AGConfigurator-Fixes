// Tworzenie opcji dla selecta dot. rodzaju struktury
function createStructureTypesListSelect() {
	const select = document.getElementById("structureType");
	const fragment = document.createDocumentFragment();

	STRUCTURE_TYPES.forEach(elem => {
		const option = createOption(elem.type[lang], elem.type[lang], {
			class: "structureOption",
			selected: elem.type[lang] === initSystem.structureType,
		});
		fragment.appendChild(option);
	});

	select.innerHTML = "";
	select.appendChild(fragment);

	select.addEventListener("change", event => {
		initSystem.structureType = event.target.value;
		createDetectedGasListSelect();
	});
}

function createDetectedGasListSelect() {
	const select = document.getElementById("gasDetected");
	const fragment = document.createDocumentFragment();

	select.innerHTML = "";

	const structure = STRUCTURE_TYPES.find(e => e.type[lang] === initSystem.structureType);
	if (!structure) return;

	structure.detection.forEach((gas, i) => {
		const device = structure.devices[i];
		if (device.class !== "detector") return;
		const option = createOption(gas, gas, {
			class: "gasOption",
			"data-devicename": device.type,
			"data-devicetype": device.class,
			selected: gas === initSystem.gasDetected,
		});
		fragment.appendChild(option);
	});

	select.appendChild(fragment);

	select.addEventListener("change", event => {
		const opt = event.target.selectedOptions[0];
		const selectedStructure = STRUCTURE_TYPES.find(structure => structure.type[lang] === initSystem.structureType);
		const selectedGasDetector = selectedStructure.devices.find(device => device.type === opt.dataset.devicename);
		initSystem.gasDetected = opt.value;
		initSystem.detector = selectedGasDetector;
		initSystem.deviceType = selectedGasDetector.class;
	});
}

function createBatteryBackUpListSelect() {
	const select = document.getElementById("batteryBackUp");
	const fragment = document.createDocumentFragment();
	const isPL = window.location.href.includes("lang=pl");

	const yesOption = createOption("YES", isPL ? "Tak" : "Yes", {
		class: "batteryBackupOption",
		selected: initSystem.batteryBackUp === "YES",
	});

	const noOption = createOption("NO", isPL ? "Nie" : "No", {
		class: "batteryBackupOption",
		selected: initSystem.batteryBackUp !== "YES",
	});

	fragment.appendChild(yesOption);
	fragment.appendChild(noOption);

	select.innerHTML = "";
	select.appendChild(fragment);
}

// Pomocnicza funkcja do tworzenia opcji
function createOption(value, text, attributes = {}) {
	const option = document.createElement("option");
	option.value = value;
	option.textContent = text;
	Object.entries(attributes).forEach(([key, val]) => {
		if (val === true) option.setAttribute(key, key);
		else if (val !== false && val != null) option.setAttribute(key, val);
	});
	return option;
}

// Ustawienie domyślnych wartości dla inputa liczby urządzeń oraz odległości między urządzeniami
function setInputDefaultData() {
	document.getElementById("amountOfDetectors").value = initSystem.amountOfDetectors;
	document.getElementById("EWL").value = initSystem.EWL;
}

// Ustawienie nasłuchiwania zdarzeń dot. zmiany wybranego typu struktury systemu
function setFormSelectChangeEvent() {
	const structureType = document.getElementById("structureType");
	structureType.addEventListener("change", event => {
		const gasDetected = document.getElementById("gasDetected");
		gasDetected.value = gasDetected.options[0].value;
		initSystem.detector.type = gasDetected.options[0].dataset.devicename;
	});
}

function checkBusLength() {
	const amountOfDetectors = initSystem.amountOfDetectors;
	const busLength = systemData.bus[0].wireLength;
	return amountOfDetectors * busLength;
}

// Inicjowanie formularza wraz z domyślnymi ustawieniami
function formInit() {
	createStructureTypesListSelect();
	createDetectedGasListSelect();
	createBatteryBackUpListSelect();
	setInputDefaultData();
	setFormSelectChangeEvent();
}

function handleErrorPopup(message) {
	const popupcontainer = document.querySelector(".configuratorPanel ");
	const df = document.createDocumentFragment();
	const paragraph = document.createElement(`p`);
	const paragraphContainer = document.createElement(`div`);
	const closeButton = document.createElement(`button`);
	closeButton.classList.add(`formPopUpParagraphCloseButton`);
	closeButton.innerText = "X";
	paragraph.classList.add(`formPopupParagraph`);
	paragraphContainer.classList.add(`formPopupContainer`);

	paragraphContainer.classList.add("formPopupContainerToggle");
	paragraphContainer.classList.add("panelContainer");
	paragraph.innerHTML = message;
	closeButton.addEventListener(`click`, () => {
		paragraphContainer.replaceChildren();
		paragraphContainer.classList.remove(`formPopupContainerToggle`)
		paragraphContainer.classList.remove(`panelContainer`)

	});
	paragraphContainer.appendChild(closeButton);
	paragraphContainer.appendChild(paragraph);
	df.appendChild(paragraphContainer);
	popupcontainer.appendChild(df);
}

// Przetwarzanie formularza dot. systemu
function handleFormSubmit() {
	//Zatwierdzenie formularza, przypisanie wybranych przez użytkownika parametrów do obiektu inicjującego podgląd systemu i wygenerowanie podglądu
	const form = document.querySelector(".form");
	form.addEventListener("submit", event => {
		event.preventDefault();
		const system = document.getElementById("system");
		initSystem.amountOfDetectors = parseInt(document.getElementById("amountOfDetectors").value);
		const structureType = document.getElementById("structureType").value;
		systemData.structureType = STRUCTURE_TYPES.find(structure => structure.type[lang] === structureType);

		const selectedGas = document.getElementById("gasDetected").value;

		systemData.batteryBackUp = document.getElementById("batteryBackUp").value;

		systemData.devicesTypes = { detectors: [], signallers: [] };
		systemData.bus = [];
		systemData.supplyType = initSystem.supplyType;
		systemData.devicesTypes.detectors.push(systemData.structureType.devices.find(device => device.gasDetected === selectedGas));
		for (let i = 0; i < initSystem.amountOfDetectors; i++) {
			systemData.bus.push({
				index: i + 1,
				detector: initSystem.detector,
				wireLength: parseInt(document.getElementById("EWL").value),
				description: "",
			});
		}
		const busLengthTotal = checkBusLength();
		try {
			if (busLengthTotal <= 1000) {
				setSystem();
				system.scrollIntoView({ behavior: "smooth", block: "start" });
			} else {
				throw new Error("Błąd! Zbyt długa odległość między urządzeniami!");
				return;
			}
		} catch ({ name, message }) {
			handleErrorPopup(message);
		}

		// initSystem = {};
		// analiseSystem(systemData);
	});
}
