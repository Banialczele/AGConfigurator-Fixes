// Inicjacja głównego obiektu z danymi systemu
function createSystemData(fileData = null) {
	if (fileData) {
		systemData.supplyType = fileData.supplyType;
		systemData.structureType = fileData.structureType;
		systemData.bus = fileData.bus;
		systemData.batteryBackUp = fileData.batteryBackUp;
		systemData.devicesTypes = fileData.devicesTypes;
	} else {
		systemData.devicesTypes = { detectors: [], signallers: [] };
		systemData.bus = [];
		systemData.supplyType = initSystem.supplyType;
		systemData.structureType = initSystem.structureType;
		systemData.batteryBackUp = initSystem.batteryBackUp;
		systemData.devicesTypes.detectors.push(initSystem.detector);
		for (let i = 0; i < initSystem.amountOfDetectors; i++) {
			systemData.bus.push({
				index: i + 1,
				detector: initSystem.detector,
				wireLength: initSystem.EWL,
				description: "",
			});
		}
	}
}

// Generowanie schematu utworzonego systemu
function createSystemDiagram() {
	const systemDiagram = document.getElementById("systemDiagram");
	systemDiagram.replaceChildren();
	systemData.bus.forEach(device => {
		systemDiagram.appendChild(createSegmentDiagram(device));
	});
}

// Tworzenie schematu segmentu urządzenia
function createSegmentDiagram(device) {
	const deviceSegment = document.createElement("div");
	setAttributes(deviceSegment, {
		class: "deviceSegment",
		id: `segmentDiagram${device.index}`,
	});
	deviceSegment.appendChild(createSegmentCheckbox());
	deviceSegment.appendChild(createSegmentImage("warningDevice", device));
	deviceSegment.appendChild(createSegmentBusImageDiagram(device.detector.class));
	deviceSegment.appendChild(createSegmentImage("detector", device));

	return deviceSegment;
}

//Tworzenie checkboxa dla segmentu
function createSegmentCheckbox() {
	const checkBoxContainer = document.createElement(`div`);
	const checkbox = document.createElement(`input`);
	setAttributes(checkBoxContainer, { class: "checkboxContainer" });
	setAttributes(checkbox, {
		type: `checkbox`,
		class: `segmentCheckbox`,
	});
	checkBoxContainer.appendChild(checkbox);
	return checkBoxContainer;
}

//Tworzenie grafiki dla urządzenia
function createSegmentImage(type, device) {
	const container = document.createElement("div");
	const image = document.createElement("img");

	const isDetector = device.detector.class === "detector";
	const isTypeDetector = type === "detector";

	setAttributes(container, { class: `${type}ImageContainer` });
	container.appendChild(image);

	const shouldShow = isTypeDetector === isDetector;
	const src = shouldShow ? `./SVG/${device.detector.type}.svg` : "";
	const alt = `${type === "detector" ? "Detector" : "Warning device"} image`;

	setAttributes(image, { src, alt });
	image.style.visibility = shouldShow ? "visible" : "hidden";

	return container;
}

// Tworzenie obrazu T-Konektora dla schematu segmentu urządzenia
function createSegmentBusImageDiagram(type) {
	const busImageContainer = document.createElement("div");
	const busImage = document.createElement("img");
	setAttributes(busImageContainer, { class: "busImageContainer" });
	setAttributes(busImage, {
		src: `./SVG/tcon${type === "detector" ? "P" : "L"}.svg`,
		alt: "T-Konektor image",
	});
	busImageContainer.appendChild(busImage);

	return busImageContainer;
}

// Generowanie listy działań dla segmentów utworzonego systemu
function createSystemSegmentsActionsList() {
	const actionsList = document.getElementById("actionsList");
	actionsList.replaceChildren();
	actionsList.appendChild(createSegmentActionsPSU());

	systemData.bus.forEach(device => {
		actionsList.appendChild(createSegmentActions(device));
	});
}

// Tworzenie panelu działań dla segmentu urządzenia
function createSegmentActions(device) {
	const actionsSegment = el("div", {
		class: "actionsSegment",
		id: `actionsSegment${device.index}`,
		"data-segmentType": "detectors",
		"data-segmentIndex": `${device.index}`,
	});

	const wrapper = el("div", { class: "wrapper" });
	const deviceTypeWrapper = el("div", { class: "deviceTypeWrapper" });

	deviceTypeWrapper.appendChild(createSegmentDeviceTypeSelect(device));

	if (device.name === "TOLED") {
		deviceTypeWrapper.appendChild(createSegmentTOLEDDescriptionSelect(device));
	}

	wrapper.appendChild(createSegmentIndex(device));
	wrapper.appendChild(deviceTypeWrapper);
	wrapper.appendChild(createSegmentWireLengthInput(device));
	wrapper.appendChild(createSegmentButtons(device));

	actionsSegment.appendChild(wrapper);
	return actionsSegment;
}

// Pomocniczy skrót do tworzenia elementów z atrybutami
function el(tag, attrs = {}, children = []) {
	const element = document.createElement(tag);

	// Ustaw atrybuty
	Object.entries(attrs).forEach(([key, val]) => {
		if (val !== false && val !== null && val !== undefined) {
			element.setAttribute(key, val);
		}
	});

	// Obsługa dzieci (tekst, element, tablica)
	if (!Array.isArray(children)) {
		children = [children];
	}

	children.forEach(child => {
		if (typeof child === "string") {
			element.appendChild(document.createTextNode(child));
		} else if (child instanceof Node) {
			element.appendChild(child);
		}
	});

	return element;
}

// Tworzenie inputa indeksu dla segmentu urządzenia
function createSegmentIndex(device) {
	const input = el("input", {
		class: "segmentId",
		id: `actionsSegmentIndex${device.index}`,
		type: "number",
		min: 0,
		max: 50,
		value: device.index,
		disabled: true,
	});

	const label = el(
		"label",
		{
			class: "segmentIndexLabel",
			for: `actionsSegmentIndex${device.index}`,
		},
		["Segment nr ", input]
	);

	return label;
}

// Tworzenie selecta typu urządzeń dla segmentu urządzenia
function createSegmentDeviceTypeSelect(device) {
	const select = el("select", {
		class: "segmentDeviceSelect",
		id: `actionsSegmentDevice${device.index}`,
	});

	initSystem.selectedStructure.devices.forEach(structureDevice => {
		const text =
			structureDevice.class === "detector"
				? `${TRANSLATION.deviceSegment.detector[lang]} ${structureDevice.gasDetected}`
				: `${TRANSLATION.deviceSegment.signaller[lang]} ${structureDevice.type}`;

		const option = el(
			"option",
			{
				value: structureDevice.type,
				selected: device.type === structureDevice.type ? "selected" : null,
			},
			[text]
		);

		select.appendChild(option);
	});

	const label = el(
		"label",
		{
			class: "segmentDeviceLabel",
			for: `actionsSegmentDevice${device.index}`,
			"data-translate": "segmentDevice",
		},
		[TRANSLATION.systemSegmentDescription[lang]]
	);

	const wrapper = el("div", { class: "formSelectInput" }, [select]);

	return el("div", { class: "segmentDeviceSelectContainer" }, [label, wrapper]);
}

//Funkcja obsługująca zdarzenie zmiany systemu i manipulacją danych w dataSystem
function manipulateDataSystem(index, newDevice) {
	const bus = systemData.bus;
	const devicesTypes = systemData.devicesTypes;

	const selectedDevice = bus.find(el => el.index === index);
	if (!selectedDevice) return;

	const { type: oldType, class: oldClass } = selectedDevice.detector;

	// Zliczenie urządzeń starego typu
	const oldTypeCount = bus.filter(device => device.detector.type === oldType).length;

	// Usuń stary typ z listy, jeśli był ostatnim
	if (oldTypeCount <= 1) {
		devicesTypes[`${oldClass}s`] = devicesTypes[`${oldClass}s`].filter(dev => dev.type !== oldType);
	}

	// Ustaw nowe urządzenie
	selectedDevice.detector = { ...newDevice };

	// Usuń opis dla TOLED
	if (newDevice.type === "TOLED") {
		selectedDevice.detector.description = "";
	}

	// Dodaj nowy typ do odpowiedniej listy, jeśli go tam nie ma
	const classList = devicesTypes[`${newDevice.class}s`];
	if (!classList.some(dev => dev.type === newDevice.type)) {
		classList.push(newDevice);
	}
}
// Ustawienie nasłuchiwania zdarzeń dot. zmiany typu urządzenia w wybranym segmencie
function setSegmentDeviceTypeSelectChangeEvent(event, index) {
	const selectedValue = event.target.value;
	const setDeviceName = event.target[event.target.selectedIndex].value;
	const newDevice = initSystem.selectedStructure.devices.find(device => device.type === setDeviceName);

	const checkboxes = document.querySelectorAll(`.segmentCheckbox`);
	let anyChecked = false;

	checkboxes.forEach((checkbox, i) => {
		if (checkbox.checked) {
			// 1. Najpierw zmieniamy dane systemowe:
			manipulateDataSystem(i + 1, newDevice);
			anyChecked = true;
		}
	});

	if (!anyChecked) {
		manipulateDataSystem(index, newDevice);
	}

	// 2. Dopiero po aktualizacji danych odświeżamy UI segmentów:
	if (anyChecked) {
		checkboxes.forEach((checkbox, i) => {
			if (checkbox.checked) {
				updateSegmentUI(i);
			}
		});
	} else {
		updateSegmentUI(index);
	}

	// Ustawienie wartości selecta (opcjonalne, ale może być potrzebne):
	const refreshedSelect = document.querySelector(`.actionsSegment[data-segmentindex="${index}"] select.segmentDeviceSelect`);
	if (refreshedSelect) {
		refreshedSelect.value = selectedValue;
	}
}
//Aktualizacja pojedynczego segmentu UI
function updateSegmentUI(segmentIndex) {
	// segmentIndex jest 1-based

	const segment = document.querySelector(`.actionsSegment[data-segmentindex="${segmentIndex}"]`);
	if (!segment) return;

	const dataIndex = segmentIndex - 1; // systemData.bus jest 0-based
	const device = systemData.bus[dataIndex]?.detector;
	if (!device) return;

	// --- 1. Aktualizacja UI segmentu ---
	const select = segment.querySelector("select.segmentDeviceSelect");
	if (select) {
		select.value = device.type;
	}

	const deviceTypeWrapper = segment.querySelector(".deviceTypeWrapper");
	if (device.type === "TOLED") {
		if (!deviceTypeWrapper.querySelector(".toledDescriptionSelect")) {
			deviceTypeWrapper.appendChild(createSegmentTOLEDDescriptionSelect());
		}
	} else {
		const toledSelect = deviceTypeWrapper.querySelector(".toledDescriptionSelect");
		if (toledSelect) {
			toledSelect.remove();
		}
	}

	const wireInput = segment.querySelector("input.segmentWireLength");
	if (wireInput) {
		wireInput.value = systemData.bus[dataIndex]?.wireLength || 0;
	}

	// --- 2. Aktualizacja grafik w kontenerach (querySelectorAll + indeks 0-based) ---

	const detectorImgs = document.querySelectorAll(".detectorImageContainer img");
	const signallerImgs = document.querySelectorAll(".warningDeviceImageContainer img");
	const busImgs = document.querySelectorAll(".busImageContainer img");

	const detectorImg = detectorImgs[dataIndex];
	if (detectorImg) {
		if (device.class === "detector") {
			detectorImg.src = `./SVG/${device.type}.svg`;
			detectorImg.style.visibility = "visible";
		} else {
			setAttributes(detectorImg, { src: "", alt: "Detector image" });
			detectorImg.style.visibility = "hidden";
		}
	}

	const signallerImg = signallerImgs[dataIndex];
	if (signallerImg) {
		if (device.class === "signaller") {
			signallerImg.src = `./SVG/${device.type}.svg`;
			signallerImg.style.visibility = "visible";
		} else {
			setAttributes(signallerImg, { src: "", alt: "Detector image" });
			signallerImg.style.visibility = "hidden";
		}
	}

	const busImg = busImgs[dataIndex];
	if (busImg) {
		const isDetector = device.class === "detector";
		busImg.src = `./SVG/${isDetector ? "tconP" : "tconL"}.svg`;
	}

	// --- 3. Aktualizacja globalnych stanów ---
	setSystemStateDetectorsList();
	setSystemStateSignallersList();
	setSystemStateAccessories();
	setSystemStateBusLength();
	setSystemStatePowerConsumption();
}
// Tworzenie selecta rodzaju etykiety dla segmentu urządzenia typu TOLED
function createSegmentTOLEDDescriptionSelect(device) {
	const container = el("div", { class: "toledContainer toledDescriptionSelect" });
	const label = el("label", { class: "toledDescription" }, TRANSLATION.systemSegmentText[lang]);
	const wrapper = el("div", { class: "formSelectInput" });
	const select = el("select", { class: "toledSelect" });

	TOLED_OPTIONS.forEach(option => {
		const optionEl = el(
			"option",
			{
				value: option.type[lang],
				"data-translate": option.translate,
				selected: option[0],
			},
			option.type[lang]
		);
		select.appendChild(optionEl);
	});

	wrapper.appendChild(select);
	container.appendChild(label);
	container.appendChild(wrapper);
	return container;
}

// Tworzenie inputa długości kabla (odległości od poprzedniego segmentu) dla segmentu urządzenia
function createSegmentWireLengthInput(device) {
	const container = el("div", { class: "segmentWireLengthContainer" });
	const label = el(
		"label",
		{
			class: "segmentWireLengthLabel",
			for: `actionsSegmentWireLength${device.index}`,
			"data-translate": "segmentWireLength",
		},
		TRANSLATION.segmentWireLength[lang]
	);

	const input = el("input", {
		class: "segmentWireLength",
		id: `actionsSegmentWireLength${device.index}`,
		type: "number",
		min: 1,
		value: device.wireLength,
	});

	container.append(label, el("br"), input, document.createTextNode("m"));
	return container;
}

// Ustawienie nasłuchiwania zdarzeń dot. długości kabla (odległości od poprzedniego segmentu) w wybranym segmencie
function setSegmentWireLengthInputChangeEvent(event, index) {
	const newValue = parseInt(event.target.value, 10);
	const wireLength = isNaN(newValue) ? 0 : Math.max(0, newValue);

	const segmentElements = document.querySelectorAll(".deviceSegment");

	segmentElements.forEach((segmentEl, i) => {
		const checkbox = segmentEl.querySelector(".segmentCheckbox");
		if (checkbox && checkbox.checked) {
			const device = systemData.bus.find(d => d.index === i + 1);
			if (device) {
				device.wireLength = wireLength;
			}

			const input = document.querySelector(`#actionsSegment${i + 1} .segmentWireLength`);
			if (input) {
				input.value = wireLength;
			}
		}
	});

	// Upewnij się, że zmieniany segment również się aktualizuje
	const changedDevice = systemData.bus.find(d => d.index === index);
	if (changedDevice) {
		changedDevice.wireLength = wireLength;
	}

	setSystemStateBusLength();
}

// Tworzenie przycisków akcji dla segmentu urządzenia
function createSegmentButtons(device) {
	const container = el("div", { class: "segmentButtonsContainer" });
	const duplicateBtn = el(
		"button",
		{
			class: "duplicateDeviceButton",
			id: `duplicateDevice${device.index}`,
		},
		"+"
	);
	const removeBtn = el(
		"button",
		{
			class: "removeDeviceButton",
			id: `removeDevice${device.index}`,
		},
		"–"
	);

	container.append(duplicateBtn, removeBtn);
	return container;
}

// Ustawienie nasłuchiwania zdarzeń dot. powielenia segmentu z tymi samymi parametrami
function setSegmentDuplicateDeviceButtonClickEvent(index) {
	const newDevice = structuredClone(systemData.bus.find(d => d.index === index));
	newDevice.index = index + 1;

	systemData.bus.forEach(d => {
		if (d.index > index) d.index += 1;
	});

	systemData.bus.splice(index, 0, newDevice);
	updateSegmentUI(index);
	updateSegmentSelect();
}

// Ustawienie nasłuchiwania zdarzeń dot. usunięcia segmentu
function setSegmentRemoveDeviceButtonClickEvent(index) {
	const device = systemData.bus.find(d => d.index === index);

	const sameTypeCount = systemData.bus.filter(d => d.detector.type === device.detector.type).length;
	if (sameTypeCount <= 1) {
		const typeList = systemData.devicesTypes[`${device.detector.class}s`];
		systemData.devicesTypes[`${device.detector.class}s`] = typeList.filter(t => t.type !== device.detector.type);
	}

	systemData.bus = systemData.bus.filter(d => d.index !== index);
	systemData.bus.forEach(d => {
		if (d.index > index) d.index -= 1;
	});
	updateSegmentUI(index);
}

// Tworzenie panelu działań dla segmentu jednostki sterującej
function createSegmentActionsPSU() {
	const actionsSegment = el("div", {
		class: "actionsSegment",
		id: "actionsSegment0",
		"data-segmentType": "PSU",
		"data-segmentIndex": "0",
	});

	const wrapper = el("div", { class: "wrapper" });

	const segmentIndexLabel = el(
		"label",
		{
			class: "segmentIndexLabel",
			for: "actionsSegmentIndex0",
		},
		"Segment nr "
	);

	const segmentIndexInput = el("input", {
		class: "segmentId",
		id: "actionsSegmentIndex0",
		type: "number",
		min: 0,
		max: 50,
		value: 0,
		disabled: true,
	});

	segmentIndexLabel.appendChild(segmentIndexInput);

	const segmentDeviceLabel = el(
		"label",
		{
			class: "segmentDeviceLabel",
			id: "segmentDeviceLabel",
			for: "actionsSegmentDevice0",
		},
		TRANSLATION.systemSegmentDescription[lang]
	);

	const segmentDeviceInput = el("input", {
		class: "segmentDeviceSelect",
		id: "actionsSegmentDevice0",
		value: systemData.supplyType,
	});

	segmentDeviceLabel.append(el("br"), segmentDeviceInput);

	wrapper.append(segmentIndexLabel, segmentDeviceLabel);
	actionsSegment.appendChild(wrapper);
	return actionsSegment;
}

// Tworzenie panelu stanu systemu
function setSystemStatePanel() {
	setSystemStateDetectorsList();
	setSystemStateSignallersList();
	setSystemStateAccessories();
	setSystemStateBusLength();
	setSystemStatePowerConsumption();
}

function setDetectorQuantity(detector) {
	return systemData.bus.filter(d => d.detector.gasDetected === detector.gasDetected).length;
}
function setSignallerQuantity(signaller) {
	return systemData.bus.filter(d => d.detector.type === signaller.type).length;
}

// Ustawienie typów gazu mierzonych przez wybrane czujniki + liczebności tych czujników w panelu stanu
function setSystemStateDetectorsList() {
	const detectorsList = document.getElementById("detectorsList");
	const detectors = systemData.devicesTypes.detectors;
	const existingItems = Array.from(detectorsList.children);

	const existingMap = new Map();
	existingItems.forEach(li => {
		const gas = li.querySelector("div:first-child")?.textContent;
		if (gas) existingMap.set(gas, li);
	});

	detectors.forEach(detector => {
		const quantity = setDetectorQuantity(detector);
		if (existingMap.has(detector.gasDetected)) {
			const li = existingMap.get(detector.gasDetected);
			const quantitySpan = li.querySelector("div:nth-child(2) span");
			if (quantitySpan.textContent !== String(quantity)) {
				quantitySpan.textContent = quantity;
			}
			existingMap.delete(detector.gasDetected);
		} else {
			const detectorListItem = document.createElement("li");
			const detectorTypeContainer = document.createElement("div");
			const detectorQuantityContainer = document.createElement("div");
			const detectorQuantity = document.createElement("span");

			detectorTypeContainer.textContent = detector.gasDetected;
			detectorQuantity.textContent = quantity;

			detectorQuantityContainer.appendChild(detectorQuantity);
			detectorQuantityContainer.appendChild(document.createTextNode(`${TRANSLATION.quantity[lang]}`));
			detectorListItem.appendChild(detectorTypeContainer);
			detectorListItem.appendChild(detectorQuantityContainer);
			detectorsList.appendChild(detectorListItem);
		}
	});

	// Usuń niepotrzebne
	existingMap.forEach(li => detectorsList.removeChild(li));
}

function createListItem(label, count) {
	const signallerListItem = document.createElement("li");
	const signallerTypeContainer = document.createElement("div");
	const signallerQuantityContainer = document.createElement("div");
	const signallerQuantity = document.createElement("span");

	signallerTypeContainer.textContent = label;
	signallerQuantity.textContent = count;
	signallerQuantityContainer.appendChild(signallerQuantity);
	signallerQuantityContainer.appendChild(document.createTextNode(`${TRANSLATION.quantity[lang]}`));
	signallerListItem.appendChild(signallerTypeContainer);
	signallerListItem.appendChild(signallerQuantityContainer);

	return signallerListItem;
}

// Ustawienie rodzajów sygnalizatorów + ich liczebności w panelu stanu
function setSystemStateSignallersList() {
	const signallersList = document.getElementById("signallersList");
	const existingItems = Array.from(signallersList.children);

	// Zliczanie sygnalizatorów według typu
	let toledCount = 0;
	let otherCount = 0;
	systemData.bus.forEach(device => {
		if (device.detector.type === "TOLED") toledCount++;
		else if (device.detector.type === "Teta SOLERT" || device.detector.type === "Teta SZOA") otherCount++;
	});

	const expected = new Map();
	if (toledCount > 0) expected.set("Tablica ostrzegawcza", toledCount);
	if (otherCount > 0) expected.set("Optyczno-akustyczne", otherCount);

	// Mapowanie istniejących li po labelu
	const existingMap = new Map();
	existingItems.forEach(li => {
		const label = li.querySelector("div:first-child")?.textContent;
		if (label) existingMap.set(label, li);
	});

	// Aktualizuj lub dodaj
	expected.forEach((count, label) => {
		if (existingMap.has(label)) {
			const li = existingMap.get(label);
			const quantitySpan = li.querySelector("div:nth-child(2) span");
			if (quantitySpan.textContent !== String(count)) quantitySpan.textContent = count;
			existingMap.delete(label);
		} else {
			signallersList.appendChild(createListItem(label, count));
		}
	});

	// Usuń zbędne
	existingMap.forEach(li => signallersList.removeChild(li));
}

// Ustawienie akcesoriów + ich liczebności w panelu stanu
function setSystemStateAccessories() {
	const accessoriesList = document.getElementById("accessoriesList");
	const existingItems = Array.from(accessoriesList.children);
	const totalCount = systemData.bus.length;
	const label = "T-Konektor";

	let accessoryItem = null;

	// Szukamy istniejącego elementu
	for (const li of existingItems) {
		const text = li.querySelector("div:first-child")?.textContent;
		if (text === label) {
			accessoryItem = li;
			break;
		}
	}

	if (accessoryItem) {
		// Aktualizujemy liczbę, jeśli się zmieniła
		const quantitySpan = accessoryItem.querySelector("div:nth-child(2) span");
		if (quantitySpan.textContent !== String(totalCount)) {
			quantitySpan.textContent = totalCount;
		}
		// Usuwamy inne elementy (jeśli jakieś są)
		existingItems.forEach(li => {
			if (li !== accessoryItem) accessoriesList.removeChild(li);
		});
	} else {
		// Tworzymy nowy element
		accessoriesList.replaceChildren(); // Czyścimy, bo jest tylko 1 element
		const accessoryListItem = document.createElement("li");
		const accessoryTypeContainer = document.createElement("div");
		const accessoryQuantityContainer = document.createElement("div");
		const accessoryQuantity = document.createElement("span");

		accessoryTypeContainer.textContent = label;
		accessoryQuantity.textContent = totalCount;
		accessoryQuantityContainer.appendChild(accessoryQuantity);
		accessoryQuantityContainer.appendChild(document.createTextNode(`${TRANSLATION.quantity[lang]}`));
		accessoryListItem.appendChild(accessoryTypeContainer);
		accessoryListItem.appendChild(accessoryQuantityContainer);
		accessoriesList.appendChild(accessoryListItem);
	}
}

// Ustawienie długości magistrali w panelu stanu
function setSystemStateBusLength() {
	const busLength = document.getElementById("busLength");
	const busLengthValue = systemData.bus.reduce((acc, device) => acc + device.wireLength, 0);
	if (busLength.textContent !== String(busLengthValue)) {
		busLength.textContent = busLengthValue;
	}
}
// Ustawienie wartości zużycia energii dla systemu w panelu stanu
function setSystemStatePowerConsumption(value = 25) {
	const powerConsumption = document.getElementById("powerConsumption");
	if (powerConsumption.textContent !== String(value)) {
		powerConsumption.textContent = value;
	}
}

// Tworzenie panelu z listą rodzajów wykorzystanych w systemie urządzeń
function createSystemUsedDevicesPanel() {
	const systemUsedDevicesContainer = document.getElementById("usedDevicesContainer");
	systemUsedDevicesContainer.replaceChildren();
	const { detectors, signallers } = systemData.devicesTypes;

	//ZNALEZIENIE OBRAZU JEDNOSTKI STERUJĄCEJ
	systemUsedDevicesContainer.appendChild(setSystemUsedPSU(systemData.supplyType));
	detectors.forEach(detector => systemUsedDevicesContainer.appendChild(setSystemUsedDevice(detector)));
	signallers.forEach(signaller => systemUsedDevicesContainer.appendChild(setSystemUsedDevice(signaller, true)));
}

// Ustawienie wykorzystanego w systemie rodzaju jednostki sterującej
// USTAWIENIE JEDNOSTKI STERUJĄCEJ
function setSystemUsedPSU(supplyType) {
	const systemUsedPSU = document.createElement("div");
	const systemUsedPSUDataContainer = document.createElement("div");
	const systemUsedPSUImageContainer = document.createElement("div");
	setAttributes(systemUsedPSU, { class: "usedDeviceItem", id: "usedPSU" });
	setAttributes(systemUsedPSUDataContainer, {
		class: "systemUsedDeviceDataContainer",
	});
	setAttributes(systemUsedPSUImageContainer, {
		class: "usedDeviceImageContainer",
	});
	const systemUsedPSUName = document.createElement("p");
	const systemUsedPSUType = document.createElement("p");
	const systemUsedPSUBreak = document.createElement("br");
	const systemUsedPSUDocsLink = document.createElement("a");
	const systemUsedPSUImage = document.createElement("img");
	setAttributes(systemUsedPSUName, { class: "usedDeviceName" });
	setAttributes(systemUsedPSUType, {
		class: "systemUsedDeviceType",
		"data-translate": "controlUnitModule",
	});
	setAttributes(systemUsedPSUDocsLink, {
		class: "usedDeviceDocs",
		href: "https://www.atestgaz.pl/produkt/modul-js-teta-mod-control-1",
		target: "_blank",
		"data-translate": "appliedDevicesDocTech",
	});
	setAttributes(systemUsedPSUImage, {
		src: `./PNG/Teta MOD Control 1.png`,
		alt: `control unit image`,
	});
	systemUsedPSUName.appendChild(document.createTextNode(supplyType));
	systemUsedPSUType.appendChild(document.createTextNode(`${TRANSLATION.controlUnitModule[lang]}`));
	systemUsedPSUDocsLink.appendChild(document.createTextNode(`${TRANSLATION.appliedDevicesDocTech[lang]}`));
	systemUsedPSUDataContainer.appendChild(systemUsedPSUName);
	systemUsedPSUDataContainer.appendChild(systemUsedPSUType);
	systemUsedPSUDataContainer.appendChild(systemUsedPSUBreak);
	systemUsedPSUDataContainer.appendChild(systemUsedPSUDocsLink);
	systemUsedPSUImageContainer.appendChild(systemUsedPSUImage);
	systemUsedPSU.appendChild(systemUsedPSUDataContainer);
	systemUsedPSU.appendChild(systemUsedPSUImageContainer);
	return systemUsedPSU;
}

// Ustawienie wykorzystanego w systemie rodzaju urządzenia
//ZESTAWIENIE URZĄDZEŃ
function setSystemUsedDevice(device, isSignaller = false) {
	const systemUsedDevice = document.createElement("div");
	const systemUsedDeviceDataContainer = document.createElement("div");
	const systemUsedDeviceImageContainer = document.createElement("div");
	setAttributes(systemUsedDevice, {
		class: "usedDeviceItem",
		id: `used${device.type.replace(/ |\+/g, "")}Device`,
	});
	setAttributes(systemUsedDeviceDataContainer, {
		class: "systemUsedDeviceDataContainer",
	});
	setAttributes(systemUsedDeviceImageContainer, {
		class: "usedDeviceImageContainer",
	});
	const systemUsedDeviceName = document.createElement("p");
	const systemUsedDeviceType = document.createElement("p");
	const systemUsedDeviceBreak = document.createElement("br");
	const systemUsedDeviceImage = document.createElement("img");
	setAttributes(systemUsedDeviceName, { class: "usedDeviceName" });
	setAttributes(systemUsedDeviceType, { class: "systemUsedDeviceType" });
	setAttributes(systemUsedDeviceImage, {
		src: `./PNG/${device.type}.png`,
		alt: `${device.type} image`,
	});
	systemUsedDeviceName.appendChild(document.createTextNode(device.type));
	if (!isSignaller) {
		systemUsedDeviceType.appendChild(document.createTextNode(`${TRANSLATION.deviceDescription[lang]} ${device.gasDetected}`));
	} else {
		systemUsedDeviceType.appendChild(document.createTextNode(`${TRANSLATION.signallerDescription[lang]}`));
	}
	systemUsedDeviceDataContainer.appendChild(systemUsedDeviceName);
	systemUsedDeviceDataContainer.appendChild(systemUsedDeviceType);
	systemUsedDeviceDataContainer.appendChild(systemUsedDeviceBreak);
	if (device.type === "Teta EcoWent+MiniDet") {
		const systemUsedDeviceDocsLink1 = document.createElement("a");
		const systemUsedDeviceDocsLink2 = document.createElement("a");
		setAttributes(systemUsedDeviceDocsLink1, {
			class: "usedDeviceDocs",
			"data-translate": "appliedDevicesDocTech",
			href: "https://www.atestgaz.pl/produkt/czujnik-gazu-teta-ecowent",
			target: "_blank",
		});
		setAttributes(systemUsedDeviceDocsLink2, {
			class: "usedDeviceDocs",
			"data-translate": "appliedDevicesDocTech",
			href: "https://www.atestgaz.pl/produkt/czujnik-gazu-teta-minidet",
			target: "_blank",
		});
		systemUsedDeviceDocsLink1.appendChild(document.createTextNode(`${TRANSLATION.appliedDevicesDocTech[lang]} CO`));
		systemUsedDeviceDocsLink2.appendChild(document.createTextNode(`${TRANSLATION.appliedDevicesDocTech[lang]} LPG`));
		systemUsedDeviceDataContainer.appendChild(systemUsedDeviceDocsLink1);
		systemUsedDeviceDataContainer.appendChild(systemUsedDeviceDocsLink2);
	} else {
		const systemUsedDeviceDocsLink = document.createElement("a");
		setAttributes(systemUsedDeviceDocsLink, {
			class: "usedDeviceDocs",
			href: device.docs,
			target: "_blank",
			"data-translate": "appliedDevicesDocTech",
		});
		systemUsedDeviceDocsLink.appendChild(document.createTextNode(`${TRANSLATION.appliedDevicesDocTech[lang]}`));
		systemUsedDeviceDataContainer.appendChild(systemUsedDeviceDocsLink);
	}
	systemUsedDeviceImageContainer.appendChild(systemUsedDeviceImage);
	systemUsedDevice.appendChild(systemUsedDeviceDataContainer);
	systemUsedDevice.appendChild(systemUsedDeviceImageContainer);

	return systemUsedDevice;
}

function setupSystemEventHandlers() {
	const container = document.getElementById("systemContainer") || document;

	container.addEventListener("change", event => {
		const sel = event.target;
		const segmentEl = sel.closest(".actionsSegment");
		if (!segmentEl) return;
		const index = parseInt(segmentEl.dataset.segmentindex, 10);
		if (sel.matches("select.segmentDeviceSelect")) {
			setSegmentDeviceTypeSelectChangeEvent(event, index);
			if (event.target.value === "TOLED") {
				const segmentEl = document.querySelector(`.actionsSegment[data-segmentindex="${index}"]`);
				const deviceTypeWrapper = segmentEl.querySelector(`.deviceTypeWrapper`);

				// Tylko jeśli nie ma już tego pola
				if (!deviceTypeWrapper.querySelector(".toledDescriptionSelect")) {
					deviceTypeWrapper.appendChild(createSegmentTOLEDDescriptionSelect());
				}
				updateSegmentUI(index);
			}
		} else if (sel.matches("input.segmentWireLength")) {
			setSegmentWireLengthInputChangeEvent(event, index);
			updateSegmentUI(index);
		} else if (sel.matches("input.segmentCheckbox")) {
		}
	});

	container.addEventListener("click", event => {
		const btn = event.target;
		const segmentEl = btn.closest(".actionsSegment");
		let index = segmentEl ? parseInt(segmentEl.dataset.segmentindex, 10) : null;

		if (btn.matches("button.duplicateDeviceButton")) {
			setSegmentDuplicateDeviceButtonClickEvent(index);
			updateSegmentUI(index + 1);
		}
		// Usunięcie segmentu
		else if (btn.matches("button.removeDeviceButton")) {
			setSegmentRemoveDeviceButtonClickEvent(index);
		}
		// Zaznacz wszystkie
		else if (btn.matches(".checkAll")) {
			document.querySelectorAll(".segmentCheckbox").forEach(cb => (cb.checked = true));
		}
		// Odznacz wszystkie
		else if (btn.matches(".unCheckAll")) {
			document.querySelectorAll(".segmentCheckbox").forEach(cb => (cb.checked = false));
		}
	});
}

// Tworzenie systemu
function setSystem() {
	createSystemDiagram();
	createSystemSegmentsActionsList();
	createSystemUsedDevicesPanel();
	setSystemStatePanel();
}

// Ustawienie nasłuchiwania zdarzeń dot. eksportu systemu do pliku CSV
function setExportToCSVButtonEvent() {
	const exportToCSVButton = document.getElementById("exportToCSV");
	exportToCSVButton.addEventListener("click", () => exportToJSON());
}

// Ustawienie nasłuchiwania zdarzeń dot. eksportu zestawienia urządzeń do pliku JSON
function setExportToJSONButtonEvent() {
	const exportToCSVButton = document.getElementById("exportToJSON");
	exportToCSVButton.addEventListener("click", () => exportToCSV());
}
