// Tworzenie opcji dla selecta dot. rodzaju struktury
function createStructureTypesListSelect() {
	const structureTypeSelect = document.getElementById("structureType");
	STRUCTURE_TYPES.forEach((elem, i) => {
		const structureOption = document.createElement("option");
		setAttributes(structureOption, {
			class: "structureOption",
			value: elem.type[lang],
			// "data-translate": `${STRUCTURE_TYPES[i].translate}`
		});
		if (elem.type[lang] === initSystem.structureType) {
			setAttributes(structureOption, { selected: "selected" });
		}
		structureOption.appendChild(document.createTextNode(elem.type[lang]));
		structureTypeSelect.appendChild(structureOption);
	});
	// Wyłapanie zmian w select dot. wybranego typu struktury, przypisanie go do obiektu inicjującego podgląd systemu, a następnie wygenerowanie listy możliwych do wyboru typu gazu
	structureTypeSelect.addEventListener("change", event => {
		initSystem.structureType = event.target[event.target.selectedIndex].value;
		createDetectedGasListSelect();
	});
}

// Tworzenie opcji dla selecta dot. typu gazu
function createDetectedGasListSelect() {
	const gasDetectedSelect = document.getElementById("gasDetected");
	gasDetectedSelect.replaceChildren();
	const constructionType = STRUCTURE_TYPES.find(elem => elem.type[lang] === initSystem.structureType);
	constructionType.detection.forEach((gasDetected, i) => {
		if (constructionType.devices[i].class === "detector") {
			const gasOption = document.createElement("option");
			setAttributes(gasOption, {
				class: "gasOption",
				value: gasDetected,
				"data-deviceName": constructionType.devices[i].name,
				"data-deviceType": constructionType.devices[i].class,
			});
			if (gasDetected === initSystem.gasDetected) {
				setAttributes(gasOption, { selected: "selected" });
			}
			gasOption.appendChild(document.createTextNode(gasDetected));
			gasDetectedSelect.appendChild(gasOption);
		}
	});
	// Wyłapanie zmian w select dot. wybranego typu gazu i przypisanie nazwy czujnika + rodzaju czujnika do obiektu inicjującego podgląd systemu
	gasDetectedSelect.addEventListener("change", event => {
		const option = event.target;
		initSystem.detector.type = option[option.selectedIndex].dataset.devicename;
		initSystem.deviceType = option[option.selectedIndex].dataset.devicetype;
	});
}

// Tworzenie opcji dla selecta dot. możliwości akumulatorowego podtrzymywania pracy
function createBatteryBackUpListSelect() {
	const batteryBackUpSelect = document.getElementById("batteryBackUp");
	const yesOption = document.createElement("option");
	const noOption = document.createElement("option");
	let HREF = window.location.href;
	setAttributes(yesOption, { class: "batteryBackupOption", value: "YES" });
	setAttributes(noOption, { class: "batteryBackupOption", value: "NO" });
	if (initSystem.batteryBackUp === "YES") {
		setAttributes(yesOption, { selected: "selected" });
	} else {
		setAttributes(noOption, { selected: "selected" });
	}
	if (HREF.includes(`lang=pl`)) {
		yesOption.appendChild(document.createTextNode("Tak"));
		noOption.appendChild(document.createTextNode("Nie"));
	} else {
		yesOption.appendChild(document.createTextNode("Yes"));
		noOption.appendChild(document.createTextNode("No"));
	}
	batteryBackUpSelect.appendChild(yesOption);
	batteryBackUpSelect.appendChild(noOption);
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

		// initSystem.structureType = document.getElementById("structureType").value;
		const structureType = document.getElementById("structureType").value;
		initSystem.selectedStructure = STRUCTURE_TYPES.find(structure => structure.type[lang] === structureType);

		initSystem.gasDetected = document.getElementById("gasDetected").value;
		initSystem.detector = initSystem.selectedStructure.devices.find(device => device.gasDetected === initSystem.gasDetected);

		initSystem.batteryBackUp = document.getElementById("batteryBackUp").value;
		initSystem.EWL = parseInt(document.getElementById("EWL").value);

		createSystemData();
		setSystem();
		system.scrollIntoView({ behavior: "smooth", block: "start" });
		// analiseSystem(systemData);
	});
}
