// Importing necessary functions and data from external files
import {
  showElement,
  hideElement,
  toggleElement,
  displayMultiElement,
  closeMultiElement,
} from "./utils/openAndCloseFunctions.js";

import { notes } from "../data/notes.js";

import getDate from "./utils/date.js";

// Selecting elements from the DOM
const openEditorBtn = document.querySelector(".openEditorBtn");
const noteEditor = document.querySelector(".noteEditor");
const hideEditorBtn = document.querySelector(".hideEditorBtn-js");
const dropMenuIcon = document.querySelector(".dropMenuIcon-js");
const dropMenu = document.querySelector(".dropMenu-js");
const inputNote = document.querySelector(".inputNote-js");
const inputHeadText = document.querySelector(".inputHeadText-js");
const notesBox = document.querySelector(".notesBox-js");
const created = document.querySelector(".created");
const onSelectMenu = document.querySelector(".onSelectMenu-js");
const edited = document.querySelector(".edited");
const cancel = document.querySelector(".cancel-js");

let closed = true;

let checking = false;

function renderNotes() {
  let html = "";

  if (notes !== undefined) {
    notes.forEach((i, num) => {
      const { index, header, note, dateCreated, dateEdited, checked } = i;

      let noteSnip = note.length <= 100 ? note : note.slice(0, 100);
      let headAlt = header === "" ? note.split(" ")[0] : header;
      let headAlt_2 =
        headAlt.length > 35 ? headAlt.slice(0, 27).concat("...") : headAlt;

      let checkClass = checked === false ? "check" : "checkActive";

      let newClass;
      if (checking === false) {
        newClass = "not-acive";
      } else {
        newClass = "active";
      }

      html += `
      <div class="note">
        <div class="noteHead">${headAlt_2}</div>
        <div class="dateDiv">
          <div class="date">Created: ${dateCreated}</div>
          <div>Last Edited: ${dateEdited} </div>
        </div>
        <div class="textNote">
          ${noteSnip}
        </div>
        <div class="calendarBox">
          <span class="bi-trash deleteBtn"></span>
          <span class="checkNote ${newClass}"><!--<input type="checkbox" class="checkNoteBox"/>-->
          <span class="bi-check  ${checkClass}">
          </span>
          </span>
        </div>
      </div>
      `;
    });
  }

  notesBox.innerHTML = html;

  clickEventOnNotes();
  deleteNote();
  checkNote();
  //displayMultiElement("checkNote", "active");
}

// Function to update the edited note in the array and close the editor
function updateNoteAndBack(index) {
  hideEditorBtn.onclick = () => {
    hideElement(noteEditor, "new-active");

    //update the edit date only of the note or head are different from the value
    // of the note and head of the html element
    if (
      notes[index].note !== inputNote.textContent ||
      notes[index].header !== inputHeadText.value
    ) {
      notes[index].dateEdited = `${getDate("sec")}:${getDate(
        "minute"
      )}:${getDate("year")}`;
    }

    notes[index].header = inputHeadText.value;
    notes[index].note = inputNote.textContent;

    if (notes[index].note === "" && notes[index].header === "") {
      notes.splice(index, 1);
    }

    renderNotes();

    inputHeadText.value = "";
    inputNote.textContent = "";
  };
}

// Event listener for opening editor and adding a new note
openEditorBtn.addEventListener("click", () => {
  showElement(noteEditor, "new-active");

  const date = `${getDate("sec")}:${getDate("minute")}:${getDate("year")}`;

  notes.push({
    index: notes.length,
    header: "",
    note: "",
    dateCreated: `${date}`,
    dateEdited: `${date}`,
    checked: false,
  });

  created.innerHTML = date;
  edited.innerHTML = date;

  updateNoteAndBack(notes.length - 1);
});

// Event listener for opening the drop menu on smaller devices
dropMenuIcon.addEventListener("click", (event) => {
  event.stopPropagation();
  if (closed) {
    showElement(dropMenu, "active");

    document.addEventListener("click", (event) => {
      event.stopPropagation();

      hideElement(dropMenu, "active");

      closed = true;
    });

    closed = false;
  } else {
    hideElement(dropMenu, "active");
    closed = true;
  }
});

// Event listener to close drop menu on window resize to a bigger screen

window.addEventListener("resize", () => {
  if (window.innerWidth >= 625) {
    hideElement(dropMenu, "active_sec");
  } else {
    showElement(dropMenu, "not-active_sec");
  }
});

// Function to render notes in the notes box

// Initial rendering of notes
renderNotes();

// Function to add click event on each note for editing
function clickEventOnNotes() {
  document.querySelectorAll(".note").forEach((i, index) => {
    i.onclick = () => {
      if (checking === false) {
        const note = notes[index].note;
        const header = notes[index].header;
        const dateCreated = notes[index].dateCreated;
        const dateEdited = notes[index].dateEdited;

        inputNote.textContent = note;
        inputHeadText.value = header;

        created.innerHTML = dateCreated;
        edited.innerHTML = dateEdited;
        showElement(noteEditor, "new-active");
        updateNoteAndBack(index);
      } else {
        if (notes[index].checked === true) {
          notes[index].checked = false;
        } else {
          notes[index].checked = true;
        }

        renderNotes();
        countCheckedNotes();
      }
    };
  });
}

function deleteNote() {
  document.querySelectorAll(".deleteBtn").forEach((i, index) => {
    i.addEventListener("click", (event) => {
      event.stopPropagation();
      notes.splice(index, 1);
      renderNotes();
      countCheckedNotes();
    });
  });
}

function checkNote() {
  document.querySelectorAll(".checkNote").forEach((i, index) => {
    i.addEventListener("click", (event) => {
      event.stopPropagation();

      if (notes[index].checked === true) {
        notes[index].checked = false;
      } else {
        notes[index].checked = true;
      }

      renderNotes();

      countCheckedNotes();
    });
  });
}

document.querySelector(".multiselect_2").addEventListener("click", (event) => {
  event.stopPropagation();

  showElement(onSelectMenu, "new-active");

  checking = true;

  renderNotes();
  hideElement(dropMenu, "active");
});

document.querySelector(".multiselect").addEventListener("click", (event) => {
  event.stopPropagation();

  showElement(onSelectMenu, "new-active");

  checking = true;

  renderNotes()
  hideElement(dropMenu, "active");
});

cancel.addEventListener("click", () => {
  notes.forEach((i, index) => {
    i.checked = false;
  });

  closeMultiElement("checkNote", "active");

  checking = false;

  renderNotes();
  countCheckedNotes();
  hideElement(onSelectMenu, "new-active");
});

function countCheckedNotes() {
  let checkedNotes = 0;

  notes.forEach((i, index) => {
    if (i.checked === true) {
      checkedNotes += 1;
    }
  });

  document.querySelector(".countCheckedNote").innerHTML = checkedNotes;
}
