// Ustawienie domyślnego języka widoku aplikacji
let lang = "pl";

// Główny obiekt zawierający dane utworzonego systemu
const systemData = {
  supplyType: `${PowerSupplies[0].type}`,
  devicesTypes: { detectors: [], signallers: [] },
  devices: [],
  bus: [],
};

// Obiekt inicjacyjny systemu
const initSystem = {
  supplyType: `${PowerSupplies[0].type}`,
  amountOfDetectors: 1,
  EWL: 15,
  detectorName: "",
  deviceType: "",
  gasDetected: `${STRUCTURE_TYPES[0].detection[0]}`,
  structureType: `${STRUCTURE_TYPES[0].type[lang]}`,
  batteryBackUp: "YES",
};

// Etykiety dla widoku aplikacji w obsługiwanych przez aplikację językach

// Ustawienie nasłuchiwania na przycisku mobilnego menu
function setMobileMenuClickEvent() {
  document
    .getElementById("navMobileActivationBtn")
    .addEventListener("click", () => {
      document
        .getElementById("configuratorNavMobile")
        .classList.toggle("active");
      document
        .querySelector(".navMobileActivationBtnIcon")
        .classList.toggle("active");
    });
}

function checkLang() {
  let HREF = window.location.href;
  if (HREF.includes(`lang=pl`) || !HREF.includes(`lang`)) {
    lang = "pl";
  } else if (HREF.includes(`lang=eng`)) {
    lang = "en";
  }
}

// Entry point aplikacji, generowanie całego widoku do wproadzenia danych
window.addEventListener("load", () => {
  setMobileMenuClickEvent();
  formInit();
  handleFormSubmit();
  setExportToCSVButtonEvent();
  setExportToJSONButtonEvent();
  // translate();
  console.log('afsd')
});

// Reset pozycji scrolla do początku strony
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
