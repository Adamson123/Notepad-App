import {
  addClass,
  removeClass,
  toggleElement,
} from "./utils/openAndCloseFunctions.js";
import getDate from "./utils/date.js";
import { notes, renderNotes } from "./renderNotes.js";
import { styleText } from "./utils/textEditFunctions.js";

// Selecting elements from the DOM
export const openEditorBtn = document.querySelector(".openEditorBtn-js");
const hideEditorBtn = document.querySelector(".hideEditorBtn-js");
export const noteEditor = document.querySelector(".noteEditor");
export const inputNote = document.querySelector(".inputNote-js");
export const inputHeadText = document.querySelector(".inputHeadText-js");
export const created = document.querySelector(".created");
export const edited = document.querySelector(".edited");
const absTextFormatChild = document.querySelector(".absTextFormatChild");
const absTextFormatTool = document.querySelector(".absTextFormat");

const toHeader = document.querySelectorAll(".toHeader");
const formatText = document.querySelectorAll(".formatText");

const expandToolsMenu = document.querySelector(".expandToolsMenu");
const chevDown = document.querySelector(".chevDown");
let expandedMenu = false;

let chevDir = -90;

expandToolsMenu.addEventListener("click", () => {
  toggleElement(absTextFormatChild, "heightChange");
  toggleElement(expandToolsMenu, "positionChange");
  toggleElement(inputNote, "inputNoteMarginTop");

  chevDir = chevDir === -90 ? 90 : -90;
  chevDown.style.transform = `rotateZ(${chevDir}deg)`;

  expandedMenu = expandedMenu === false ? true : false;

  // if (absTextFormatChild.classList.contains('heightChange')) {
  //   expandedMenu = true;
  // }else{
  //   expandedMenu = false
  // }
});

function changeClass(action) {
  action(absTextFormatChild, "heightChange");
  action(expandToolsMenu, "positionChange");
  action(inputNote, "inputNoteMarginTop");
}

// Function to update the edited note in the array and close the editor
export function updateNoteAndBack(index) {
  hideEditorBtn.onclick = () => {
    removeClass(noteEditor, "editorActive");

    //update the edit date only of the note or head are different from the value
    // of the note and head of the html element

    const { note, header, dateEdited } = notes[index];

    if (note !== inputNote.innerHTML || header !== inputHeadText.value) {
      notes[index].dateEdited = `${getDate("sec")}:${getDate(
        "minute"
      )}:${getDate("year")}`;
    }

    notes[index].header = inputHeadText.value;
    notes[index].note = inputNote.innerHTML;

    if (notes[index].note.trim() === "" && notes[index].header.trim() === "") {
      notes.splice(index, 1);
    }

    renderNotes("");

    inputHeadText.value = "";
    inputNote.innerHTML = "";

    changeClass(removeClass);

    expandedMenu = false;
    chevDir =-90
    chevDown.style.transform = `rotateZ(${chevDir}deg)`;
  };
}

// Event listener for opening editor and adding a new note

export function eventlistenerOnOpenEditor() {
  openEditorBtn.addEventListener("click", () => {
    addClass(noteEditor, "editorActive");

    const date = `${getDate("hour")}:${getDate("day")}:${getDate("year")}`;

    notes.push({
      header: "",
      note: "",
      dateCreated: `${date}`,
      dateEdited: `${date}`,
      checked: false,
    });

    created.innerHTML = date;
    edited.innerHTML = date;

    //tells the upadateAndBack function to update the latest note added
    updateNoteAndBack(notes.length - 1);
    showExpandEditor();
  });
}

toHeader.forEach((i) => {
  i.addEventListener("click", () => {
    const htmlElement = i.dataset.element;
    styleText(htmlElement);
    //adjustTextFormatTool();
  });
});

formatText.forEach((i, index) => {
  i.addEventListener("click", () => {
    const element = i.dataset.element
    

    document.execCommand(element);
    //adjustTextFormatTool();
  });
});

document.querySelector(".insertLink").addEventListener("click", () => {
  const promptVal = prompt("Enter Link");
  const selectedText = window.getSelection().toString();
  const a = document.createElement("a");
  a.href = promptVal;

  const linkText = `<a href="${promptVal}" target="_blank
  ">${selectedText}</a>`;

  document.execCommand("insertHTML", false, linkText);

  linkFunc();
});

document.querySelector(".insertLink2").addEventListener("click", () => {
  document.execCommand("unlink", false, null);

  linkFunc();
});

document.querySelectorAll(".list").forEach(i =>{
  i.addEventListener("click", () => {
    const element = i.dataset.element

    console.log(element);
    document.execCommand(element);
  });
})

document.querySelectorAll(".alignContent").forEach(i =>{
  i.addEventListener("click", () => {
    const element = i.dataset.element

    console.log(element);
    document.execCommand(element);
  });
})

document.querySelector('.divider').addEventListener('click',() =>{
  document.execCommand('insertHTML',false,'<hr>')
})



function linkFunc() {
  document.querySelectorAll("a").forEach((a, index) => {
    a.onclick = () => {
      window.open(a.href);
    };

    a.onselectionchange = () => {
      const pr = window.prompt(`Enter new Link`, a.href);
      a.href = pr;
    };
  });
}

let windowExpanded = false;
const absTextFormatChildHeight =
  absTextFormatChild.getBoundingClientRect().height;

export function showExpandEditor() {
  const menuEnd = document.querySelector(".menuEnd");
  const bdClient = menuEnd.getBoundingClientRect();
  const absClient = absTextFormatChild.getBoundingClientRect();

  //show the expandMenu if absTextFormatChild didn't break
  if (bdClient.bottom > absClient.bottom) {
    removeClass(expandToolsMenu, "not-active");

    windowExpanded = false; /*set windowExpanded to false if the window collapse to where
    absTextFormatChild  breaks
    */
  } else {
    // close it if it does

    addClass(expandToolsMenu, "not-active");
    // changeClass(removeClass)

    windowExpanded = true; /*set windowExpanded to true if the window expands to where
    absTextFormatChild does not break
    */
  }
}

showExpandEditor();

window.addEventListener("resize", () => {
  //remove all class first
  changeClass(removeClass);

  //run function to see whether expandMenu to be opened
  showExpandEditor();

  //retrieve the menu state if it's opened before the window is expanded to width where
  // the absTextFormatChild does not break
  if (expandedMenu && !windowExpanded) {
    changeClass(addClass);
  }
});

document.querySelectorAll(".editAction").forEach((i) => {
  i.addEventListener("click", () => {
    const action = i.dataset.element;
    document.execCommand(action);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  inputNote.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
});
