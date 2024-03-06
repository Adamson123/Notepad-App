// Importing necessary functions and data from external files
import {
  showElement,
  hideElement,
  toggleElement,
  displayMultiElement,
  closeMultiElement,
} from "./utils/openAndCloseFunctions.js";

//import { notes } from "../data/notes.js";
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

let notes = [];

//checks if dropmenu is open or closed
let menuClosed = true;

//triggers multiselecting by making the checkbox visible
//if it's true all checkbox class will be switched to active which makes them visible and vice versa
let multiSelecting = false;

// Function to render notes in the notes box

function renderNotes() {
  let html = "";

  //checks if there's any note availabe in the notes array
  if (notes.length !== 0) {
    notes.forEach((i, num) => {
      const { index, header, note, dateCreated, dateEdited, checked } = i;

      //parts of the notes that will be display on the outside of the notes
      let noteSnip = note.length <= 100 ? note : note.slice(0, 100);

      //if there's no header to display we will take from the first word of the note
      let headAlt = header === "" ? note.split(" ")[0] : header;

      //shortens the first word if it's too long
      let headAlt_2 =
        headAlt.length > 35 ? headAlt.slice(0, 27).concat("...") : headAlt;


      let checkClass = checked === false ? "check" : "checkActive";

      let newClass;
      if (multiSelecting === false) {
        newClass = "not-acive";
      } else {
        newClass = "active";
      }

      html += `
      <div class="note uniNote${num}">
        <div class="noteHead">${headAlt_2}</div>
        <div class="dateDiv">
          <div class="date">Created: ${dateCreated}</div>
          <div>Last Edited: ${dateEdited} </div>
        </div>
        <div class="textNote">
          ${noteSnip}
        </div>
        <div class="trashAndCheckNoteDiv">
          <span class="bi-trash deleteBtn"></span>
          <span class="checkNote ${newClass}"><!--<input type="checkbox" class="checkNoteBox"/>-->
          <span class="bi-check  ${checkClass}">
          </span>
          </span>
        </div>
      </div>
      `;
    });

    notesBox.innerHTML = html;
  }
  //if there are no notes display this 👇
  else {
    notesBox.innerHTML = `<div class='noNotes'>
    No notes available &nbsp;:(
  </div>`;
  }

  clickEventOnNotes();
  clickEventOnNotesDeleteIcons();
  clickEventOnNotesCheckBoxs();
}

// Initial rendering of notes
renderNotes();

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


function checksAndUnchecksNote(index) {

  //checking and unchecking notes checkbox

  if (notes[index].checked === true) {
    notes[index].checked = false;
  } else {
    notes[index].checked = true;
  }

  renderNotes();

  document.querySelector(".countCheckedNote").innerHTML = countCheckedNotes();
}


function multiSelectMode() {
  //making multiselecting menu visible
  showElement(onSelectMenu, "new-active");

  //sets multiSelecting mode to true to make checkbox visible
  multiSelecting = true;

  renderNotes();

  hideElement(dropMenu, "active");
}


//counts the amount of checked notes when multiselecting
function countCheckedNotes() {
  let checkedNotes = 0;

  notes.forEach((i, index) => {
    if (i.checked === true) {
      checkedNotes += 1;
    }
  });

  return checkedNotes;
}


//deletes all checked notes

function deleteAllSelectedNotes() {
  let notChecked = [];
  notes.forEach((i, index) => {
    if (i.checked !== true) {
      //gets all notes that are not checked
      notChecked.push(i);
    } else {
      //selecting and adding delete animation to the notes we want to delete
      const noteOnDelete = document.querySelector(`.uniNote${index}`);
      showElement(noteOnDelete, "delete");
    }
  });


  //giving delete animation time to play
  setTimeout(() => {

    //assign all notes that are not checked to notes array to perform delete
    notes = notChecked;

    
    
    document.querySelector(".countCheckedNote").innerHTML = countCheckedNotes();

    // automatically closing multiselect menu when there are nothing to delete
    if (notes.length === 0) {
      hideElement(onSelectMenu, "new-active");
      multiSelecting = false;
    }

    renderNotes();
  }, 500);
}


//adding eventlistener to all multiselect checkbox

function clickEventOnNotesCheckBoxs() {
  document.querySelectorAll(".checkNote").forEach((i, index) => {
    i.addEventListener("click", (event) => {
      event.stopPropagation();

      //calling the function that checks and unchecks notes
      checksAndUnchecksNote(index);
    });
  });
}


// Function to add click event on each note for editing

function clickEventOnNotes() {
  document.querySelectorAll(".note").forEach((i, index) => {
    i.onclick = () => {
      if (multiSelecting === false) {
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
        checksAndUnchecksNote(index);
      }
    };
  });
}

//adding evemtlistener to  all  deleteBtn
function clickEventOnNotesDeleteIcons() {
  document.querySelectorAll(".deleteBtn").forEach((i, index) => {
    i.onclick = (event) => {
      event.stopPropagation();
      notes.splice(index, 1);
      renderNotes();
      document.querySelector(".countCheckedNote").innerHTML =
        countCheckedNotes();
    };
  });
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
  if (menuClosed) {
    showElement(dropMenu, "active");

    document.addEventListener("click", (event) => {
      event.stopPropagation();

      hideElement(dropMenu, "active");

      menuClosed = true;
    });

    menuClosed = false;
  } else {
    hideElement(dropMenu, "active");
    menuClosed = true;
  }
});

// Event listener to close drop menu on window resize to a bigger screen

window.addEventListener("resize", () => {
  if (window.innerWidth >= 625) {
    hideElement(dropMenu, "active");
    menuClosed = true;
  } else {
    if (menuClosed === false) {
      showElement(dropMenu, "active");
    }
  }
});


//Triggers Multiselecting for small screens
document.querySelector(".multiselect_2").addEventListener("click", (event) => {
  //makes click child element to not affect parent element
  event.stopPropagation();
  multiSelectMode();
});

//Triggers Multiselecting for big screens
document.querySelector(".multiselect").addEventListener("click", (event) => {
  event.stopPropagation();
  multiSelectMode();
});


//cancel multiselecting and resets all checked notes to unchecked
cancel.addEventListener("click", () => {
  notes.forEach((i, index) => {
    i.checked = false;
  });

  closeMultiElement("checkNote", "active");

  multiSelecting = false;

  renderNotes();
  document.querySelector(".countCheckedNote").innerHTML = countCheckedNotes();
  hideElement(onSelectMenu, "new-active");
});




document.querySelector(".deleteAll-js").addEventListener("click", () => {
  

  deleteAllSelectedNotes();
});
