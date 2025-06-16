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
			"data-devicename": device.name,
			"data-devicetype": device.class,
			selected: gas === initSystem.gasDetected,
		});
		fragment.appendChild(option);
	});

	select.appendChild(fragment);

	select.addEventListener("change", event => {
		const opt = event.target.selectedOptions[0];
		initSystem.detector.type = opt.dataset.devicename;
		initSystem.deviceType = opt.dataset.devicetype;
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

// Inicjowanie formularza wraz z domyślnymi ustawieniami
function formInit() {
	createStructureTypesListSelect();
	createDetectedGasListSelect();
	createBatteryBackUpListSelect();
	setInputDefaultData();
	setFormSelectChangeEvent();
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

		setSystem();
		system.scrollIntoView({ behavior: "smooth", block: "start" });
		// analiseSystem(systemData);
	});
}
