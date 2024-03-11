import getDate from "./utils/date.js";
import {
  inputNote,
  inputHeadText,
  created,
  edited,
  noteEditor,
  updateNoteAndBack,
  // dropMenu,
} from "./noteEditor.js";
import {
  showElement,
  hideElement,
  toggleElement,
} from "./utils/openAndCloseFunctions.js";

import {
  eventlistenerOnMultiselectBtn,
  checksAndUnchecksNote,
  countCheckedNotes,
  onSelectMenu,
} from "./multiselecting.js";

const date = `${getDate("sec")}:${getDate("minute")}:${getDate("year")}`;
const searchBar = document.querySelector(".searchBar-js");
const searchBarSection = document.querySelector(".searchBarSection-js");
const searchIcon = document.querySelector(".searchIcon-js");
export const notesBox = document.querySelector(".notesBox-js");

export let notes = [
  {
    index: 1,
    header: "Food",
    note: "king kong king okg kog",
    dateCreated: `${date}`,
    dateEdited: `${date}`,
    checked: false,
  },

  {
    index: 1,
    header: "Satty",
    note: `king kong king okg kog king kong king okg kog king kong king okg 
      kog king kong king okg kog king kong king okg kog
      kog king kong king okg kog king kong king okg 
      kog king kong king okg kog king kong king okg kog
      `,

    dateCreated: `${date}`,
    dateEdited: `${date}`,
    checked: false,
  },

  {
    index: 1,
    header: "Calm",
    note: "king kong king okg kog",
    dateCreated: `${date}`,
    dateEdited: `${date}`,
    checked: false,
  },
  {
    index: 1,
    header: "Sit",
    note: "king kong king okg kog",
    dateCreated: `${date}`,
    dateEdited: `${date}`,
    checked: false,
  },
];

let multiSelecting;

// Function to render notes in the notes box
export function renderNotes(multiselect) {
  if (multiselect === true || multiselect === false) {
    multiSelecting = multiselect;
  }

  let html = "";

  const searchBarValue = searchBar.value.trim(" ").toLowerCase();
  let foundMatch = false;

  //checks if there's any note availabe in the notes array
  if (notes.length !== 0) {
    notes.forEach((i, num) => {
      const { index, header, note, dateCreated, dateEdited, checked } = i;

      //if there's no header to display we will take from the first word of the note
      let headAlt = header === "" ? note.split(" ")[0] : header;

      //shortens the first word if it's too long to contain the note header
      let headAlt_2 =
        headAlt.length > 35 ? headAlt.slice(0, 27).concat("...") : headAlt;

      let checkClass = checked === false ? "check" : "checkActive";

      let newClass;
      if (multiSelecting === false) {
        newClass = "not-acive";
      } else {
        newClass = "active";
      }
      if (
        headAlt_2.toLocaleLowerCase().includes(searchBarValue) &&
        searchBarValue !== " "
      ) {
        foundMatch = true;
        html += `
        <div class="note uniNote${num}">
          <div class="noteHead">${headAlt_2}</div>
          <div class="dateDiv">
            <div class="date">Created: ${dateCreated}</div>
            <div>Last Edited: ${dateEdited} </div>
          </div>
          <div class="textNote">
            ${note}
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
      }
    });

    if (!foundMatch && searchBarValue !== " ") {
      notesBox.innerHTML = `<div class='noNotes'>
      No result found &nbsp;:(
    </div>`;
    } else {
      notesBox.innerHTML = html;
    }
  }
  //if there are no notes display this 👇
  else {
    notesBox.innerHTML = `<div class='noNotes'>
      No notes available &nbsp;:(
    </div>`;
  }

  clickEventOnNotes(multiSelecting);
  clickEventOnNotesDeleteIcons();
  eventlistenerOnMultiselectBtn();
  eventlistenerOndeleteAllBtn();
  searchNote();

}


//filters notes base on search input
function searchNote() {
  searchBar.addEventListener("input", () => {
    renderNotes("");
  });
}

//toggles searchBox
searchIcon.addEventListener("click", () => {
  toggleElement(searchBarSection, "active_sec");
  toggleElement(searchIcon, "icon-active");
  searchBar.value = "";
  renderNotes("");
});

//adding evemtlistener to  all  deleteBtn
function clickEventOnNotesDeleteIcons() {
  document.querySelectorAll(".deleteBtn").forEach((i, index) => {
    i.onclick = (event) => {
      event.stopPropagation();
      notes.splice(index, 1);
      const noteOnDelete = document.querySelector(`.uniNote${index}`);
      showElement(noteOnDelete, "delete");
      setTimeout(() => {
        renderNotes();
        countCheckedNotes();
      }, 500);
    };
  });
}


// Function to add click event on each note

function clickEventOnNotes(multiSelecting) {
  document.querySelectorAll(".note").forEach((i, index) => {
    i.onclick = () => {
      if (multiSelecting === false) {
        const note = notes[index].note;
        const header = notes[index].header;
        const dateCreated = notes[index].dateCreated;
        const dateEdited = notes[index].dateEdited;

        inputNote.innerHTML = note;
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

//deletes all checked notes

export function deleteAllSelectedNotes() {
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
    notes = notChecked;

    countCheckedNotes();

    // automatically closes multiselect menu when there are nothing to delete
    if (notes.length === 0) {
      hideElement(onSelectMenu, "new-active");
      renderNotes(false);
    }

    renderNotes("");
  }, 500);
}

function eventlistenerOndeleteAllBtn() {
  document.querySelector(".deleteAll-js").addEventListener("click", () => {
    deleteAllSelectedNotes();
  });
}