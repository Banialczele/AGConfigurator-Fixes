// Inicjacja głównego obiektu z danymi systemu
function createSystemDataFromAFile(fileData = null) {
	if (fileData) {
		systemData.supplyType = fileData.supplyType;
		systemData.structureType = fileData.structureType;
		systemData.bus = fileData.bus;
		systemData.batteryBackUp = fileData.batteryBackUp;
		systemData.devicesTypes = fileData.devicesTypes;
	}
}

// Generowanie schematu utworzonego systemu
function createSystemDiagram() {
	const systemDiagram = document.getElementById("systemDiagram");
	const df = document.createDocumentFragment();
	systemDiagram.replaceChildren();
	systemData.bus.forEach(device => {
		df.appendChild(createSegmentDiagram(device));
	});
	systemDiagram.appendChild(df);
}

// Tworzenie schematu segmentu urządzenia
function createSegmentDiagram(device) {
	const deviceSegment = document.createElement("div");
	const df = document.createDocumentFragment();
	setAttributes(deviceSegment, {
		class: "deviceSegment",
		id: `segmentDiagram${device.index}`,
	});
	df.appendChild(createSegmentCheckbox());
	df.appendChild(createSegmentImage("warningDevice", device));
	df.appendChild(createSegmentBusImageDiagram(device.detector.class));
	df.appendChild(createSegmentImage("detector", device));
	deviceSegment.appendChild(df);
	return deviceSegment;
}

//Tworzenie checkboxa dla segmentu
function createSegmentCheckbox() {
	const df = document.createDocumentFragment();
	const checkBoxContainer = document.createElement(`div`);
	const checkbox = document.createElement(`input`);
	setAttributes(checkBoxContainer, { class: "checkboxContainer" });
	setAttributes(checkbox, {
		type: `checkbox`,
		class: `segmentCheckbox`,
	});
	checkBoxContainer.appendChild(checkbox);
	df.appendChild(checkBoxContainer);

	return df;
}

//Tworzenie grafiki dla urządzenia
function createSegmentImage(type, device) {
	const container = document.createElement("div");
	const image = document.createElement("img");
	const df = document.createDocumentFragment();

	const isDetector = device.detector.class === "detector";
	const isTypeDetector = type === "detector";

	setAttributes(container, { class: `${type}ImageContainer` });
	container.appendChild(image);

	const shouldShow = isTypeDetector === isDetector;
	const src = shouldShow ? `./SVG/${device.detector.type}.svg` : "";
	const alt = `${type === "detector" ? "Detector" : "Warning device"} image`;

	setAttributes(image, { src, alt });
	image.style.visibility = shouldShow ? "visible" : "hidden";
	df.appendChild(container);
	return df;
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
	const df = document.createDocumentFragment();
	df.appendChild(createSegmentActionsPSU());

	systemData.bus.forEach(device => {
		df.appendChild(createSegmentActions(device));
	});
	actionsList.appendChild(df);
}

// Tworzenie panelu działań dla segmentu urządzenia
function createSegmentActions(device) {
	const actionsSegment = el("div", {
		class: "actionsSegment",
		id: `actionsSegment${device.index}`,
		"data-segmentType": "detectors",
		"data-segmentIndex": `${device.index}`,
	});

	const df = document.createDocumentFragment();

	const wrapper = el("div", { class: "wrapper" });
	const deviceTypeWrapper = el("div", { class: "deviceTypeWrapper" });

	deviceTypeWrapper.appendChild(createSegmentDeviceTypeSelect(device));

	if (device.name === "TOLED") {
		deviceTypeWrapper.appendChild(createSegmentTOLEDDescriptionSelect(device));
	}

	df.appendChild(createSegmentIndex(device));
	df.appendChild(deviceTypeWrapper);
	df.appendChild(createSegmentWireLengthInput(device));
	df.appendChild(createSegmentButtons(device));

	wrapper.appendChild(df);
	actionsSegment.appendChild(wrapper);
	return actionsSegment;
}

// Pomocniczy skrót do tworzenia elementów z atrybutami
function el(tag, attrs = {}, children = []) {
	const element = document.createElement(tag);
	const df = document.createDocumentFragment();
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
			df.appendChild(document.createTextNode(child));
		} else if (child instanceof Node) {
			df.appendChild(child);
		}
	});
	element.appendChild(df);
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
	const df = document.createDocumentFragment();
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
				selected: device.detector.type === structureDevice.type ? "selected" : null,
			},
			[text]
		);

		df.appendChild(option);
		select.appendChild(df);
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
	const { toledCount, otherCount } = signallerCount();
	const signallerAmount = toledCount + otherCount;

	try {
		if (signallerAmount < 26) {
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
			//kopiowanie wartości obiektu newDevice do selectedDevice.detector
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
		} else {
			throw new Error("Za dużo sygnalizatorów! MAX 26SZT!");
		}
	} catch (error) {
		const popupcontainer = document.querySelector(".popupContainer");
		const popupParagraphText = document.querySelector(".popupParagraphText");
		popupcontainer.classList.add("popupContainerToggle");
		popupcontainer.classList.add("panelContainer");
		popupParagraphText.innerHTML = error;
	}
}
// Ustawienie nasłuchiwania zdarzeń dot. zmiany typu urządzenia w wybranym segmencie
function setSegmentDeviceTypeSelectChangeEvent(event, index) {
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

	if (anyChecked) {
		checkboxes.forEach((checkbox, i) => {
			if (checkbox.checked) {
				updateSegmentUI(i + 1);
			}
		});
	} else {
		updateSegmentUI(index);
	}
}

function updateDeviceSelect(segment, index) {
	const dataIndex = index - 1; // systemData.bus jest 0-based
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
}

function updateDeviceImage(detectorImgs, busImgs, dataIndex, device) {
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

	const busImg = busImgs[dataIndex];
	if (busImg) {
		const isDetector = device.class === "detector";
		busImg.src = `./SVG/${isDetector ? "tconP" : "tconL"}.svg`;
	}
}

function updateSignallerImage(signallerImgs, busImgs, dataIndex, device) {
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
}

// //Aktualizacja pojedynczego segmentu UI
function updateSegmentUI(segmentIndex) {
	// segmentIndex jest 1-based
	// const segment = document.querySelector(`.actionsSegment[data-segmentindex="${segmentIndex}"]`);
	// if (!segment) return;

	const device = systemData.bus[segmentIndex - 1]?.detector;

	const detectorImgs = document.querySelectorAll(".detectorImageContainer img");
	const signallerImgs = document.querySelectorAll(".warningDeviceImageContainer img");
	const busImgs = document.querySelectorAll(".busImageContainer img");

	updateDeviceImage(detectorImgs, busImgs, segmentIndex - 1, device);
	updateSignallerImage(signallerImgs, busImgs, segmentIndex - 1, device);

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

//aktualizacja ilości czujników gazu oraz sygnalizatorów
function updateSystemList(listId, expectedMap) {
	const list = document.getElementById(listId);
	const existingItems = Array.from(list.children);
	const existingMap = new Map();
	existingItems.forEach(li => {
		const label = li.querySelector("div:first-child")?.textContent;
		if (label) existingMap.set(label, li);
	});
	expectedMap.forEach((quantity, label) => {
		if (existingMap.has(label)) {
			const li = existingMap.get(label);
			const quantitySpan = li.querySelector("div:nth-child(2) span");
			if (quantitySpan.textContent !== String(quantity)) {
				quantitySpan.textContent = quantity;
			}
			existingMap.delete(label);
		} else {
			list.appendChild(createListItem(label, quantity));
		}
	});

	existingMap.forEach(li => list.removeChild(li));
}

// Ustawienie typów gazu mierzonych przez wybrane czujniki + liczebności tych czujników w panelu stanu
function setSystemStateDetectorsList() {
	const detectors = systemData.devicesTypes.detectors;
	const expected = new Map();
	detectors.forEach(detector => {
		expected.set(detector.gasDetected, setDetectorQuantity(detector));
	});
	updateSystemList("detectorsList", expected);
}

function createListItem(label, count) {
	const listItem = document.createElement("li");
	const typeContainer = document.createElement("div");
	const quantityContainer = document.createElement("div");
	const quantity = document.createElement("span");
	typeContainer.textContent = label;
	quantity.textContent = count;
	quantityContainer.appendChild(quantity);
	quantityContainer.appendChild(document.createTextNode(`${TRANSLATION.quantity[lang]}`));
	listItem.appendChild(typeContainer);
	listItem.appendChild(quantityContainer);

	return listItem;
}

function signallerCount() {
	// Zliczanie sygnalizatorów według typu
	let toledCount = 0;
	let otherCount = 0;
	systemData.bus.forEach(device => {
		if (device.detector.type === "TOLED") toledCount++;
		else if (device.detector.type === "Teta SOLERT" || device.detector.type === "Teta SZOA") otherCount++;
	});

	return { toledCount, otherCount };
}

// Ustawienie rodzajów sygnalizatorów + ich liczebności w panelu stanu
function setSystemStateSignallersList() {
	const { toledCount, otherCount } = signallerCount();
	const expected = new Map();
	if (toledCount > 0) expected.set("Tablica ostrzegawcza", toledCount);
	if (otherCount > 0) expected.set("Optyczno-akustyczne", otherCount);
	updateSystemList("signallersList", expected);
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
			const deviceTypeWrapper = document.getElementById(`actionsSegment${index}`);
			const toledSelect = deviceTypeWrapper.querySelector(".toledDescriptionSelect");
			if (toledSelect) {
				toledSelect.remove();
			}
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
