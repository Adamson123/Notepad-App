// Importing necessary functions and data from external files
import {
  showElement,
  hideElement,
  toggleElement,
} from "./utils/openAndCloseFunctions.js";

import { notes } from "../data/notes.js";

// Selecting elements from the DOM
const openEditorBtn = document.querySelector(".openEditorBtn");
const noteEditor = document.querySelector(".noteEditor");
const hideEditorBtn = document.querySelector(".hideEditorBtn-js");
const dropMenuIcon = document.querySelector(".dropMenuIcon-js");
const dropMenu = document.querySelector(".dropMenu-js");
const inputNote = document.querySelector(".inputNote-js");
const inputHeadText = document.querySelector(".inputHeadText-js");
const notesBox = document.querySelector(".notesBox-js");

// Function to update the edited note in the array and close the editor
function updateNoteAndBack(index) {
  hideEditorBtn.onclick = () => {
    hideElement(noteEditor, "new-active");

    notes[index].header = inputHeadText.value;
    notes[index].note = inputNote.value;
    if (notes[index].note === "" && notes[index].header === "") {
      notes.splice(index, 1);
    }

    renderNotes();

    inputHeadText.value = "";
    inputNote.value = "";
  };
}

// Event listener for opening editor and adding a new note
openEditorBtn.addEventListener("click", () => {
  showElement(noteEditor, "new-active");

  notes.push({
    index: notes.length,
    header: "",
    note: "",
  });

  updateNoteAndBack(notes.length - 1);
});

// Event listener for opening the drop menu on smaller devices
dropMenuIcon.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleElement(dropMenu, "active");

  document.addEventListener("click", (event) => {
    hideElement(dropMenu, "active");
  });
});

// Event listener to close drop menu on window resize to a bigger screen
window.addEventListener("resize", () => {
  if (window.innerWidth >= 625) hideElement(dropMenu, "active");
});

// Function to render notes in the notes box
function renderNotes() {
  let html = "";

  if (notes !== undefined) {
    notes.forEach((i, num) => {
      const { index, header, note } = i;

      let noteSnip = note.length <= 100 ? note : note.slice(0, 100);
      let headAlt = header === "" ? note.split(" ")[0] : header;
      let headAlt_2 =
        headAlt.length > 35 ? headAlt.slice(0, 27).concat("...") : headAlt;

      html += `
      <div class="note">
        <div class="noteHead">${headAlt_2}</div>
        <div class="dateDiv">
          <div class="date">8:24</div>
        </div>
        <div class="textNote">
          ${noteSnip}
        </div>
        <div class="calendarBox">
          <span class="bi-calendar"></span>
        </div>
      </div>
      `;
    });
  }

  notesBox.innerHTML = html;

  clickEventOnNotes();
}

// Initial rendering of notes
renderNotes();

// Function to add click event on each note for editing
function clickEventOnNotes() {
  document.querySelectorAll(".note").forEach((i, index) => {
    i.onclick = () => {
      const note = notes[index].note;
      const header = notes[index].header;

      inputNote.value = note;
      inputHeadText.value = header;

      showElement(noteEditor, "new-active");
      updateNoteAndBack(index);
    };
  });
}
