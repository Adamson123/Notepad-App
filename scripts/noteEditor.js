
import { showElement, hideElement } from "./utils/openAndCloseFunctions.js";
import getDate from "./utils/date.js";
import { notes , renderNotes} from "./renderNotes.js";

// Selecting elements from the DOM
const openEditorBtn = document.querySelector(".openEditorBtn-js");
const hideEditorBtn = document.querySelector(".hideEditorBtn-js");
export const noteEditor = document.querySelector(".noteEditor");
export const inputNote = document.querySelector(".inputNote-js");
export const inputHeadText = document.querySelector(".inputHeadText-js");
export const created = document.querySelector(".created");
export const edited = document.querySelector(".edited");

// Function to update the edited note in the array and close the editor
export function updateNoteAndBack(index) {
  hideEditorBtn.onclick = () => {
  hideElement(noteEditor, "editorActive");

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

    renderNotes("");

    inputHeadText.value = "";
    inputNote.textContent = "";
  };
}

// Event listener for opening editor and adding a new note

export function eventlistenerOnOpenEditor() {
  openEditorBtn.addEventListener("click", () => {
    showElement(noteEditor, "editorActive");

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
  });
}
