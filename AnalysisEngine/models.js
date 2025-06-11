const PowerSupplies = [
	{ type: "24V", supplyVoltage_V: 24 },
	{ type: "24V + UPS", supplyVoltage_V: 21 },
	{ type: "48V / 48V + UPS", supplyVoltage_V: 48 },
];

const Cables = [
	{ type: "2 x 1 mm2", resistivity_OhmPerMeter: 0.0181 },
	{ type: "2 x 1,5 mm2", resistivity_OhmPerMeter: 0.0121 },
	{ type: "2 x 2,5 mm2", resistivity_OhmPerMeter: 0.00741 },
	{ type: "2 x 4 mm2", resistivity_OhmPerMeter: 0.00461 },
];

const DeviceCl = {
	detector: "detector",
	signaller: "signaller",
	valveCtrl: "valveCtrl",
};

const tetaEcoWentDevice = {
	type: `Teta EcoWent`,
	power_W: 0.3,
	current_A: 0.006,
	minVoltage_V: 12,
	class: DeviceCl.detector,
	gasDetected: "CO",
	doc: "https://www.atestgaz.pl/produkt/czujnik-gazu-teta-ecowent",
}; // see adms://s:192.168.0.251/b:archidemes/i:165964

const tetaEcoDetDevice = {
	type: `Teta EcoDet`,
	power_W: 1.27,
	current_A: 0.008,
	minVoltage_V: 12,
	class: DeviceCl.detector,
	gasDetected: "LPG",
	doc: "https://www.atestgaz.pl/produkt/czujnik-gazu-teta-ecodet",
}; // see ://s:192.168.0.251/b:archidemes/i:165964

const tetaEcoWentMiniDetDevice = {
	type: `Teta EcoWent+MiniDet`,
	power_W: 1.27,
	current_A: 0.008,
	minVoltage_V: 12,
	isBig: true,
	class: DeviceCl.detector,
	gasDetected: "CO+LPG",
	doc: "https://www.atestgaz.pl/produkt/czujnik-gazu-teta-ecowent",
}; // see adms://s:192.168.0.251/b:archidemes/i:165964

const tetaEcoTermDevice = {
	type: `Teta EcoTerm`,
	power_W: 1.27,
	current_A: 0.008,
	minVoltage_V: 12,
	class: DeviceCl.detector,
	gasDetected: "NG",
	doc: "",
}; // see adms://s:192.168.0.251/b:archidemes/i:165964

const tetaEcoHDevice = {
	type: "Teta EcoH",
	power_W: 1.8,
	current_A: 0.002,
	minVoltage_V: 12,
	class: DeviceCl.detector,
	gasDetected: "H2",
	doc: "",
}; // see adms://s:192.168.0.251/b:archidemes/i:226424

const tetaEcoNDevice = {
	type: "Teta EcoN",
	power_W: 1.27,
	current_A: 0.008,
	minVoltage_V: 12,
	class: DeviceCl.detector,
	gasDetected: "NO2",
	doc: "https://www.atestgaz.pl/produkt/czujnik-gazu-teta-econ",
}; // see EcoTerm

const toledDevice = {
	type: "TOLED",
	power_W: 2.62,
	current_A: -0.005,
	minVoltage_V: 15,
	class: DeviceCl.signaller,
	doc: "https://www.atestgaz.pl/produkt/tablica-ostrzegawcza-toled",
}; // see adms://s:192.168.0.251/b:archidemes/i:226424

const tetaSZOADevice = {
	type: "Teta SZOA",
	power_W: 2.91,
	current_A: -0.007,
	minVoltage_V: 15,
	class: DeviceCl.signaller,
	doc: "https://www.atestgaz.pl/produkt/sygnalizator-teta-szoa",
}; // see adms://s:192.168.0.251/b:archidemes/i:226424

const tetaSOLERTDevice = {
	type: "Teta SOLERT",
	power_W: 2.2,
	current_A: 0.021,
	minVoltage_V: 15,
	class: DeviceCl.signaller,
	doc: "",
}; // see adms://s:192.168.0.251/b:archidemes/i:226424 + adms://s:192.168.0.251/b:archidemes/i:165964

const tetaControlVDevice = {
	type: "Teta Control V",
	power_W: 3.47,
	current_A: -0.011,
	minVoltage_V: 15,
	class: DeviceCl.valveCtrl,
	doc: "https://www.atestgaz.pl/produkt/sterownik-zaworu-control-v",
}; // see adms://s:192.168.0.251/b:archidemes/i:226424

const facilityTypeGarage = {
	type: {
		pl: "Garaże i parkingi podziemne",
		en: "Garage or underground parking",
	},
	devices: [tetaEcoWentDevice, tetaEcoDetDevice, tetaEcoWentMiniDetDevice, tetaEcoNDevice, tetaSZOADevice, tetaSOLERTDevice, toledDevice],
	detection: [tetaEcoWentDevice.gasDetected, tetaEcoDetDevice.gasDetected, tetaEcoWentMiniDetDevice.gasDetected, tetaEcoNDevice.gasDetected],
};

const facilityTypeBattery = {
	type: {
		pl: "Akumulatornie",
		en: "Battery room",
	},
	devices: [tetaEcoHDevice, tetaSZOADevice, tetaSOLERTDevice, toledDevice],
	detection: [tetaEcoHDevice.gasDetected],
};

const facilityTypeHall = {
	type: {
		pl: "Hala",
		en: "Hall",
	},
	devices: [tetaEcoDetDevice, tetaEcoTermDevice, tetaSZOADevice, tetaSOLERTDevice, toledDevice],
	detection: [tetaEcoDetDevice.gasDetected, tetaEcoTermDevice.gasDetected],
};

const facilityTypeOther = {
	type: {
		pl: "Inne",
		en: "Other",
	},
	devices: [
		tetaEcoWentDevice,
		tetaEcoWentMiniDetDevice,
		tetaEcoDetDevice,
		tetaEcoTermDevice,
		tetaEcoHDevice,
		tetaEcoNDevice,
		toledDevice,
		tetaSZOADevice,
		tetaSOLERTDevice,
		tetaControlVDevice,
	],
	detection: [
		tetaEcoWentDevice.gasDetected,
		tetaEcoWentMiniDetDevice.gasDetected,
		tetaEcoDetDevice.gasDetected,
		tetaEcoTermDevice.gasDetected,
		tetaEcoHDevice.gasDetected,
		tetaEcoNDevice.gasDetected,
	],
};

const STRUCTURE_TYPES = [facilityTypeGarage, facilityTypeBattery, facilityTypeHall, facilityTypeOther];

const Devices = [
	{
		type: "Teta EcoWent",
		power_W: 0.3,
		current_A: 0.006,
		minVoltage_V: 12,
		icon: "EcoWent.svg",
		class: DeviceCl.detector,
	}, // see adms://s:192.168.0.251/b:archidemes/i:165964
	{
		type: "Teta EcoDet",
		power_W: 1.27,
		current_A: 0.008,
		minVoltage_V: 12,
		icon: "EcoDet.svg",
		class: DeviceCl.detector,
	}, // see adms://s:192.168.0.251/b:archidemes/i:165964
	{
		type: "Teta EcoWent + MiniDet",
		power_W: 1.27,
		current_A: 0.008,
		minVoltage_V: 12,
		icon: "EcoWent_MiniPel.svg",
		isBig: true,
		class: DeviceCl.detector,
	}, // see adms://s:192.168.0.251/b:archidemes/i:165964
	{
		type: "Teta EcoTerm",
		power_W: 1.27,
		current_A: 0.008,
		minVoltage_V: 12,
		icon: "EcoTerm.svg",
		class: DeviceCl.detector,
	}, // see adms://s:192.168.0.251/b:archidemes/i:165964
	{
		type: "Teta EcoH",
		power_W: 1.8,
		current_A: 0.002,
		minVoltage_V: 12,
		icon: "TetaEcoH.svg",
		class: DeviceCl.detector,
	}, // see adms://s:192.168.0.251/b:archidemes/i:226424
	{
		type: "Teta EcoN",
		power_W: 1.27,
		current_A: 0.008,
		minVoltage_V: 12,
		icon: "TetaEcoN.svg",
		class: DeviceCl.detector,
	}, // see EcoTerm
	{
		type: "TOLED",
		power_W: 2.62,
		current_A: -0.005,
		minVoltage_V: 15,
		icon: "TOLED.svg",
		class: DeviceCl.signaller,
	}, // see adms://s:192.168.0.251/b:archidemes/i:226424
	{
		type: "Teta SZOA",
		power_W: 2.91,
		current_A: -0.007,
		minVoltage_V: 15,
		icon: "SZOA.svg",
		class: DeviceCl.signaller,
	}, // see adms://s:192.168.0.251/b:archidemes/i:226424
	{
		type: "Teta SOLERT",
		power_W: 2.2,
		current_A: 0.021,
		minVoltage_V: 15,
		icon: "SOLERT.svg",
		class: DeviceCl.signaller,
	}, // see adms://s:192.168.0.251/b:archidemes/i:226424 + adms://s:192.168.0.251/b:archidemes/i:165964
	{
		type: "Control V",
		power_W: 3.47,
		current_A: -0.011,
		minVoltage_V: 15,
		icon: "ControlV.svg",
		class: DeviceCl.valveCtrl,
	}, // see adms://s:192.168.0.251/b:archidemes/i:226424
];

const TOLED_OPTIONS = [
	{ translate: "toledLabelWe", type: { pl: "NADMIAR SPALIN NIE WCHODZIĆ", en: "EXCESS EXHAUST GASES DO NOT ENTER" } },
	{ translate: "toledLabelWj", type: { pl: "NADMIAR SPALIN NIE WJEŻDŻAĆ", en: "EXCESS EXHAUST GASES DO NOT DRIVE IN" } },
	{ translate: "toledLabelOp", type: { pl: "NADMIAR SPALIN OPUŚĆ GARAŻ", en: "EXCESS EXHAUST GASES LEAVE THE GARAGE" } },
	{ translate: "toledLabelWs", type: { pl: "Napis na życzenie klienta", en: "Inscription at the customer'S request" } },
];

// const DEVICEDOCS = {
//   "Teta EcoWent": "https://www.atestgaz.pl/produkt/czujnik-gazu-teta-ecowent",
//   "Teta EcoWent + MiniDet":
//     "https://www.atestgaz.pl/produkt/czujnik-gazu-teta-ecowent",
//   "Teta EcoDet": "https://www.atestgaz.pl/produkt/czujnik-gazu-teta-ecodet",
//   "Teta EcoN": "https://www.atestgaz.pl/produkt/czujnik-gazu-teta-econ",
//   "Teta MiniDet": "https://www.atestgaz.pl/produkt/czujnik-gazu-teta-minidet",
//   "Teta SZOA": "https://www.atestgaz.pl/produkt/sygnalizator-teta-szoa",
//   TOLED: "https://www.atestgaz.pl/produkt/tablica-ostrzegawcza-toled",
//   "Teta EcoH": "https://www.atestgaz.pl/produkt/czujnik-gazu-teta-ecoh",
//   MSV: "https://www.atestgaz.pl/produkt/zawor-odcinajacy-msv",
//   "Teta SOLERT": "https://atestgaz.pl/produkt/teta-solert/",
//   "Control V": "https://www.atestgaz.pl/produkt/sterownik-zaworu-control-v",
// };
