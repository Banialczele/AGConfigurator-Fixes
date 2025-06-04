// // Ustawienie języka aplikacji
// function checkLang() {
//     let HREF = window.location.href;
//     if (HREF.includes("lang=pl") || !HREF.includes("lang")) {
//         return lang = "PL";
//     } else {
//         return lang = "EN";
//     }
// }

// let previousDataCount = 0;

// function translate() {
//     const data = document.querySelectorAll('[data-translate]');
//     const lang = checkLang();

//     for (let i = previousDataCount; i < data.length; i++) {
//         const element = data[i];
//         const key = element.getAttribute("data-translate");
//         const translation = TRANSLATION[lang]?.[key];
//         if (translation) {
//             element.textContent = translation;
//         }
//     }
//     previousDataCount = data.length;
// }