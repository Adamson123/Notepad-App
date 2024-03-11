import { showElement } from "./utils/openAndCloseFunctions.js";
import { hideElement } from "./utils/openAndCloseFunctions.js";
import { notesBox } from "./renderNotes.js";



const mainDiv = document.querySelector('.mainDiv')
const secondColor = [
  { color: "#50e6f1", percent: 0 },
  { color: "#a6a6de", percent: 50 },
  { color: "#ed91d0", percent: 100 },
];



function customizeColor() {
  const customizeThemeMenu = document.querySelector(".customizeThemeMenu-js");
  showElement(customizeThemeMenu, "customizeThemeActive");
  showElement(mainDiv, "noteBox-active");
}

function changeColor(element, color) {
  const body = document.body;
  body.style.setProperty(`${element}`, `${color}`);
}



export function customizeTheme() {
  //opens the customize theme menu
  document.querySelectorAll(".customizeTheme").forEach((i) => {
    i.addEventListener("click", () => {
      customizeColor();
    });
  });


  const bgColorInput = document.querySelector(".bgColor");
  const textColorInput = document.querySelector(".textColor");
  const noteColorInput = document.querySelector(".noteColor");



  document.querySelector(".hideCustomTheme").addEventListener("click", () => {
    const customizeThemeMenu = document.querySelector(".customizeThemeMenu-js");
    hideElement(customizeThemeMenu, "customizeThemeActive");
    hideElement(mainDiv, "noteBox-active");
  });
  

  bgColorInput.addEventListener("change", () => {
    changeColor("--main-color", bgColorInput.value);
  });

  textColorInput.addEventListener("change", () => {
    changeColor("--text-color", textColorInput.value);
  });

  noteColorInput.addEventListener("change", () => {
    changeColor("--notes-color", noteColorInput.value);
  });
  renderSecondColor();
}

function renderSecondColor() {
  let colorHtml = "";
  let colorCss = "";
  let combColor = "";

  secondColor.forEach((i, index) => {
    let { color, percent } = i;
    color = color.trim(" ");

    colorHtml += `<input type='color' value="${color}" class="secColors"/>`;
    combColor += `${color} ${percent}%,`;
    colorCss = `linear-gradient(90deg,${combColor.slice(
      0,
      combColor.lastIndexOf(",")
    )})`;
  });
  document.querySelector(`.allSecColors`).innerHTML = colorHtml;

  changeColor("--sec-color", colorCss);
  onInputEventOnColors();
}


function onInputEventOnColors() {
  document.querySelectorAll(".secColors").forEach((i, index) => {
    i.addEventListener("change", () => {
      secondColor[index].color = i.value;
      renderSecondColor();
    });
  });
}
