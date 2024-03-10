import { renderNotes, notes } from "./renderNotes.js";
import {
  showElement,
  hideElement,
  closeMultiElement,
} from "./utils/openAndCloseFunctions.js";

export const onSelectMenu = document.querySelector(".onSelectMenu-js");

export function checksAndUnchecksNote(index) {
  //checking and unchecking notes checkbox

  if (notes[index].checked === true) {
    notes[index].checked = false;
  } else {
    notes[index].checked = true;
  }

  renderNotes("");

  countCheckedNotes();
}

//counts the amount of checked notes when multiselecting
export function countCheckedNotes() {
  let checkedNotes = 0;

  notes.forEach((i, index) => {
    if (i.checked === true) {
      checkedNotes += 1;
    }
  });

  document.querySelector(".countCheckedNote").innerHTML = checkedNotes;
}

function multiSelectMode() {
  //making multiselecting menu visible
  showElement(onSelectMenu, "new-active");
  //sets multiSelecting mode to true to make checkbox visibl
  renderNotes(true);

}

//Triggers Multiselecting
export function eventlistenerOnMultiselectBtn() {
  document.querySelectorAll(".multiselect").forEach((i) => {
    i.addEventListener("click", (event) => {
      multiSelectMode();
    });
  });
}

//cancel multiselecting and resets all checked notes to unchecked
document.querySelector(".cancel").addEventListener("click", () => {
  notes.forEach((i, index) => {
    i.checked = false;
  });

  closeMultiElement("checkNote", "active");

  //   multiSelecting = false;

  renderNotes(false);
  countCheckedNotes();
  hideElement(onSelectMenu, "new-active");
});
