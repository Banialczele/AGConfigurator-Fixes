const TRANSLATION = {
	configuratorHeader: {
		pl: "Konfigurator Systemów",
		en: "System Configurator",
	},
	teta: "Teta",
	gas: "Gas",
	configuratorDescription: {
		pl: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam porta acelitquis rutrum.",
		en: "The same but in English so it looks smart",
	},
	tetaGasGuidance: {
		pl: "Przewodnik TetaGas",
		en: "TetaGas guidance",
	},
	detectedGas: {
		pl: "Wykrywany gaz",
		en: "Gas detected",
	},
	dwgSchema: {
		pl: "Schematy DWG dla projektanta",
		en: "DWG schemes for designer",
	},
	contact: { pl: "Kontttakt", en: "Conttttttttact" },
	shop: { pl: "skkkklep", en: "Shoooooop" },
	confirmButton: { pl: "Zatwierdź ▶", en: "Confirm ▶" },
	defaultHeader: { pl: "Dane podstawowe", en: "Default data" },
	detectorAmountsLabel: { pl: "Ilość czujników", en: "Detector quantity" },
	quantity: { pl: " szt.", en: " pcs." },
	shadedAmount: { pl: "(max 50szt.)", en: "(max 50pcs.)" },
	structureLabel: { pl: "Rodzaj obiektu", en: "Structure type" },
	batteryBackUpLabel: {
		pl: "Akumulatorowe podtrzymanie pracy",
		en: "Uninterruptible power supply",
	},
	wireLengthLabel: {
		pl: "Orientacyjna odległość między urządzeniami",
		en: "Estimated distance among devices",
	},
	aboutAppDescriptionEntry: {
		pl: "Wprowadź podstawowe dane dotyczące Twojego systemu.",
		en: "Enter basic information about your system.",
	},
	aboutAppDescriptionNext: {
		pl: "W następnym kroku będzie możliwość modyfikowania wprowadzonych danych oraz dodanie sygnalizatorów czy zaworów.",
		en: "In the next step it will be possible to modify the entered data and add signals or valves.",
	},
	aboutAppDescriptionEnd: {
		pl: "Na końcu system dobierze optymalny przekrój kabla dla systemu oraz umożliwi zarówno zapis jak i wygenerowanie zestawienia urządzeń z kodami PW.",
		en: "At the end, the system will select the optimal cable cross-section for the system and will enable both saving and generating a list of devices with PW codes.",
	},
	aboutAppDescriptionInf: {
		pl: "Konfigurator prezentuje system na podstawie konfigurowalnych segmentów zawierających urządzenia. Aktualnie możliwe jest dodanie 50 segmentów do systemu - np 40 segmentów zawierających czujniki gazu oraz 10 segmentów zawierających sygnalizatory.",
		en: "The configurator presents the system based on configurable segments containing devices. Currently, it is possible to add 50 segments to the system - e.g. 40 segments containing gas sensors and 10 segments containing signaling devices.",
	},
	aboutAppDescriptionAbout: {
		pl: "Więcej informacji znajdziecie Państwo w dokumencie ",
		en: "More information can be found in the document ",
	},
	aboutAppDescriptionLink: {
		pl: "Przewodnik Systemu TetaGas",
		en: "TetaGas System Guide",
	},
	fileLoadDesc: {
		pl: "UPUŚRRRRĆ PLIK TUTAJ, ABY WCZYTAĆ WCZEŚNIEJ ZAPISANY SYSTEM",
		en: "DROP A FILE TO LOAD PREVIOUSLY SAVED SYSTEM",
	},
	fileUpload: { pl: "Wczytaj system ▶", en: "Upload system ▶" },
	systemStatusHeader: { pl: "Stan systemu", en: "System status" },
	systemStatusDetectors: { pl: "CZUJNIKI GAZU", en: "GAS DETECTORS" },
	systemStatusSignallers: { pl: "SYGNALIZATORY", en: "SIGNALLERS" },
	systemStatusAccessories: { pl: "AKCESORIA", en: "ACCESSORIES" },
	systemStatusPSU: {
		pl: "JEDNOSTKA STERUJĄCA I ZASILANIE",
		en: "CONTROL UNIT AND POWER",
	},
	busDescLength: { pl: "Długość magistrali", en: "BUS length" },
	controlUnitPowerConsumption: { pl: "Pobór mocy", en: "Power demand" },
	powerSupplyCableDim: { pl: "Przekrój kabla", en: "Wire diameter" },
	psuSystemStatus: { pl: "Status systemu", en: "System status" },
	optimizeSystem: { pl: "Optymalizuj", en: "Optimalize" },
	mainSystemPreview: { pl: "Podgląd systemu", en: "System preview" },
	mainSystemActions: { pl: "Działania", en: "Actions" },
	systemSegmentDescription: { pl: "Urządzenie", en: "Device" },
	systemSegmentText: { pl: "Napis", en: "Text" },
	systemFile: { pl: "Plik", en: "File" },
	mainSystemSaveFile: { pl: "Zapisz system", en: "Save system" },
	mainSystemDownloadFactsheet: {
		pl: "Pobierz zestawienie urządzeń",
		en: "Download factsheet",
	},
	mainSystemUsedDevices: {
		pl: "Zastosowane urządzenia",
		en: "Applied devices",
	},
	appliedDevicesDocTech: {
		pl: "Dokumentacja Techniczna",
		en: "Technical documentation",
	},
	segmentWireLength: {
		pl: "Odległość do poprzedniego segmentu",
		en: "Distance to previous segment",
	},
	controlUnitModule: {
		pl: "Moduł Jednostki Sterującej",
		en: "Control Unit Module",
	},
	editMany: { pl: "Skonfiguruj wiele", en: "Edit multiple" },
	checkboxes: {
		pl: "Czekboksy",
		en: "Checkboxses",
	},
	unCheckAll: {
		pl: "Odznacz wszystkie pola checkbox",
		en: "Deselect all checkboxes",
	},
	checkAll: {
		pl: "Zaznacz wszystkie pola checkbox",
		en: "Check all checkboxes",
	},
	deviceDescription: {
		pl: "Czujnik gazu",
		en: "Gas detector"
	},
	signallerDescription: {
		pl: "Sygnalizator op.-aku.",
		en: "Opt.-acu. signaling device"
	},
	toledDescription: {
		pl: "Tablica ostrzegawcza",
		en: "Warning panel"
	},
	deviceSegment: {
		detector: {
			pl: "Czujnik",
			en: "Detector"
		},
		signaller: {
			pl:"Sygnalizator",
			en: "Signaller"
		}
	}

};

// const usedText = {
// konfiguratorTeta: {
//     name: "Teta"
// },
// konfiguratorGas: {
//     name: "Gas"
// },
//     ups: {
//         pl: 'Akumulatorowe podtrzymanie pracy',
//         en: 'Uninterruptible power supply'
//     },
//     wireDistance: {
//         pl: "Orientacyjna odległość między urządzeniami",
//         en: "Estimated distance among devices"
//     }
// },
// systemStatus: {
//     header: {
//         pl: "Stan systemu",
//         en: "System status"
//     },
//     detectors: {
//         pl: "CZUJNIKI GAZU",
//         en: "GAS DETECTORS"
//     },
//     signallers: {
//         pl: "SYGNALIZATORY",
//         en: "SIGNALLERS"
//     },
//     accessories: {
//         pl: "AKCESORIA",
//         en: "ACCESSORIES"
//     },
//     psu: {
//         header: {
//             pl: "JEDNOSTKA STERUJĄCA I ZASILANIE",
//             en: "CONTROL UNIT AND POWER"
//         },
//         busDesc: {
//             pl: "Długość magistrali",
//             en: "BUS length"
//         },
//         powerDemand: {
//             pl: "Pobór mocy",
//             en: "Power demand"
//         },
//         cableDim: {
//             pl: "Przekrój kabla",
//             en: "Wire diameter"
//         },
//         status: {
//             pl: "Status systemu",
//             en: "System status"
//         }
//     },
//     optimalizeButton: {
//         pl: "Optymalizuj",
//         en: "Optimalize"
//     }
// },
// systemPreview: {
//     pl: "Podgląd systemu",
//     en: "System preview"
// },
// systemActions: {
//     header: {
//         pl: "Działania",
//         en: "Actions"
//     },
//     segmentDesc: {
//         segmentDevice: {
//             pl: "Urządzenie",
//             en: "Device"
//         },
//         segmentText: {
//             pl: "Napis",
//             en: "Text"
//         }
//     }
// },
// fileActions: {
//     header: {
//         pl: "Plik",
//         en: "File"
//     },
//     loadFile: {
//         pl: "Wczytaj system",
//         en: "Load file"
//     },
//     loadDesc: {
//         pl: "UPUŚĆ PLIK TUTAJ, ABY WCZYTAĆ WCZEŚNIEJ ZAPISANY SYSTEM",
//         en: "DROP A FILE TO LOAD PREVIOUSLY SAVED SYSTEM"
//     },
//     saveFile: {
//         pl: "Zapisz system",
//         en: "Save file"
//     },
//     factSheet: {
//         pl: "Pobierz zestawienie urządzeń",
//         en: "Download device factsheet  "
//     }
// },
// appliedDevices: {
//     header: {
//         pl: "Zastosowane urządzenia",
//         en: "Applied devices"
//     },
//     docTech: {
//         pl: "Dokumentacja techniczna",
//         en: "Technical documentation"
//     }
// },
// aboutApp: {
//     pl: {
//         description: {
//             text1: "Wprowadź podstawowe dane dotyczące Twojego systemu.",
//             text2: "W następnym kroku będzie możliwość modyfikowania wprowadzonych danych oraz dodanie sygnalizatorów czy zaworów.",
//             text3: "Na końcu system dobierze optymalny przekrój kabla dla systemu oraz umożliwi zarówno zapis jak i wygenerowanie zestawienia urządzeń z kodami PW.",
//         },
//         details: {
//             text4: "Konfigurator prezentuje system na podstawie konfigurowalnych segmentów zawierających urządzenia. Aktualnie możliwe jest dodanie 50 segmentów do systemu - np 40 segmentów zawierających czujniki gazu oraz 10 segmentów zawierających sygnalizatory.",
//             about: "Więcej informacji znajdziecie Państwo w dokumencie ",
//             link: "Przewodnik Systemu TetaGas."
//         }
//     },
//     en: {
//         description: {
//             text1: "Enter basic information about your system.",
//             text2: "In the next step it will be possible to modify the entered data and add signals or valves.",
//             text3: "At the end, the system will select the optimal cable cross-section for the system and will enable both saving and generating a list of devices with PW codes.",
//         },
//         details: {
//             text4: "The configurator presents the system based on configurable segments containing devices. Currently, it is possible to add 50 segments to the system - e.g. 40 segments containing gas sensors and 10 segments containing signaling devices.",
//             about: "More information can be found in the document ",
//             link: "TetaGas System Guide"
//         }
//     }
// }
// };
