// document.querySelector(".notesBox").innerHTML = html;
import {
  showElement,
  hideElement,
  toggleElement,
} from "./utils/openAndCloseFunctions.js";

const openEditorBtn = document.querySelector(".openEditorBtn");
const noteEditor = document.querySelector(".noteEditor");
const hideEditorBtn = document.querySelector(".hideEditorBtn-js");
const dropMenuIcon = document.querySelector(".dropMenuIcon-js");
const dropMenu = document.querySelector(".dropMenu-js");
const inputNote = document.querySelector(".inputNote-js");
// const body = document.querySelector("body");
let opened = false;

const textArray = [];


function checkOpen(state) {
  opened = state;
  console.log(opened);
}

openEditorBtn.addEventListener("click", () => {
  showElement(noteEditor);
  textArray.push({
    index: textArray.length,
    note: "",
  });

  updateNote(textArray.length - 1);
});

hideEditorBtn.addEventListener("click", () => {
  hideElement(noteEditor);
  checkOpen();
});

dropMenuIcon.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleElement(dropMenu);

  document.addEventListener("click", (event) => {
    hideElement(dropMenu);
  });
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 625) hideElement(dropMenu);
});

function updateNote(index) {
  inputNote.oninput = () => {
    textArray[index].note = inputNote.value;
   
  };



}

