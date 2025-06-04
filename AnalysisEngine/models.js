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
  name: `Teta EcoWent`,
  power_W: 0.3,
  current_A: 0.006,
  minVoltage_V: 12,
  icon: "EcoWent.svg",
  class: DeviceCl.detector,
  gasDetected: "CO",
}; // see adms://s:192.168.0.251/b:archidemes/i:165964

const tetaEcoDetDevice = {   name: `Teta EcoDet`,
  power_W: 1.27,
  current_A: 0.008,
  minVoltage_V: 12,
  icon: "EcoDet.svg",
  class: DeviceCl.detector,
  gasDetected: "LPG",
}; // see ://s:192.168.0.251/b:archidemes/i:165964

const tetaEcoWentMiniDetDevice = { name: `Teta EcoWent+MiniDet`,
  power_W: 1.27,
  current_A: 0.008,
  minVoltage_V: 12,
  icon: "EcoWent_MiniPel.svg",
  isBig: true,
  class: DeviceCl.detector,
  gasDetected: "CO+LPG",
}; // see adms://s:192.168.0.251/b:archidemes/i:165964

const tetaEcoTermDevice = {  name: `Teta EcoTerm`,
  power_W: 1.27,
  current_A: 0.008,
  minVoltage_V: 12,
  icon: "EcoTerm.svg",
  class: DeviceCl.detector,
  gasDetected: "NG",
}; // see adms://s:192.168.0.251/b:archidemes/i:165964

const tetaEcoHDevice = {
  name: "Teta EcoH",
  power_W: 1.8,
  current_A: 0.002,
  minVoltage_V: 12,
  icon: "TetaEcoH.svg",
  class: DeviceCl.detector,
  gasDetected: "H2",
}; // see adms://s:192.168.0.251/b:archidemes/i:226424

const tetaEcoNDevice = {
  name: "Teta EcoN",
  power_W: 1.27,
  current_A: 0.008,
  minVoltage_V: 12,
  icon: "TetaEcoN.svg",
  class: DeviceCl.detector,
  gasDetected: "NO2",
}; // see EcoTerm

const toledDevice = {
  name: "TOLED",
  power_W: 2.62,
  current_A: -0.005,
  minVoltage_V: 15,
  icon: "TOLED.svg",
  class: DeviceCl.signaller,
}; // see adms://s:192.168.0.251/b:archidemes/i:226424

const tetaSZOADevice = {
  name: "Teta SZOA",
  power_W: 2.91,
  current_A: -0.007,
  minVoltage_V: 15,
  icon: "SZOA.svg",
  class: DeviceCl.signaller,
}; // see adms://s:192.168.0.251/b:archidemes/i:226424

const tetaSOLERTDevice = {
  name: "Teta SOLERT",
  power_W: 2.2,
  current_A: 0.021,
  minVoltage_V: 15,
  icon: "SOLERT.svg",
  class: DeviceCl.signaller,
}; // see adms://s:192.168.0.251/b:archidemes/i:226424 + adms://s:192.168.0.251/b:archidemes/i:165964

const tetaControlVDevice = {
  name: "Teta Control V",
  power_W: 3.47,
  current_A: -0.011,
  minVoltage_V: 15,
  icon: "ControlV.svg",
  class: DeviceCl.valveCtrl,
}; // see adms://s:192.168.0.251/b:archidemes/i:226424

const facilityTypeGarage = {
  type: {
    pl: "Garaże i parkingi podziemne",
    en: "Garage or underground parking",
  },
  devices: [
    tetaEcoWentDevice,
    tetaEcoDetDevice,
    tetaEcoWentMiniDetDevice,
    tetaEcoNDevice,
    tetaSZOADevice,
    tetaSOLERTDevice,
    toledDevice,
  ],
  detection: [
    tetaEcoWentDevice.gasDetected,
    tetaEcoDetDevice.gasDetected,
    tetaEcoWentMiniDetDevice.gasDetected,
    tetaEcoNDevice.gasDetected,
  ],
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
  devices: [
    tetaEcoDetDevice,
    tetaEcoTermDevice,
    tetaSZOADevice,
    tetaSOLERTDevice,
    toledDevice,
  ],
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
    tetaEcoNDevice.gasDetected
  ],
};

const STRUCTURE_TYPES = [
  facilityTypeGarage,
  facilityTypeBattery,
  facilityTypeHall,
  facilityTypeOther,
];

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
// { type: "T-conL", icon: "T-conL.svg", typeOfDevice: `bus` },
// { type: "T-conP", icon: "T-conP.svg", typeOfDevice: `bus` },

const TOLED_OPTIONS = [
  { translate: "toledLabelWe", type: "NADMIAR SPALIN NIE WCHODZIĆ" },
  { translate: "toledLabelWj", type: "NADMIAR SPALIN NIE WJEŻDŻAĆ" },
  { translate: "toledLabelOp", type: "NADMIAR SPALIN OPUŚĆ GARAŻ" },
  { translate: "toledLabelWs", type: "Napis na życzenie klienta" },
];

const DEVICEDOCS = {
  "Teta EcoWent": "https://www.atestgaz.pl/produkt/czujnik-gazu-teta-ecowent",
  "Teta EcoWent + MiniDet":
    "https://www.atestgaz.pl/produkt/czujnik-gazu-teta-ecowent",
  "Teta EcoDet": "https://www.atestgaz.pl/produkt/czujnik-gazu-teta-ecodet",
  "Teta EcoN": "https://www.atestgaz.pl/produkt/czujnik-gazu-teta-econ",
  "Teta MiniDet": "https://www.atestgaz.pl/produkt/czujnik-gazu-teta-minidet",
  "Teta SZOA": "https://www.atestgaz.pl/produkt/sygnalizator-teta-szoa",
  TOLED: "https://www.atestgaz.pl/produkt/tablica-ostrzegawcza-toled",
  "Teta EcoH": "https://www.atestgaz.pl/produkt/czujnik-gazu-teta-ecoh",
  MSV: "https://www.atestgaz.pl/produkt/zawor-odcinajacy-msv",
  "Teta SOLERT": "https://atestgaz.pl/produkt/teta-solert/",
  "Control V": "https://www.atestgaz.pl/produkt/sterownik-zaworu-control-v",
};
