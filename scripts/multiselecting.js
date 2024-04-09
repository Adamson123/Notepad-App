import { renderNotes, notes } from "./renderNotes.js";
import {
  addClass,
  removeClass,
  closeMultiElement,
} from "./utils/openAndCloseFunctions.js";

export const onSelectMenu = document.querySelector(".onSelectMenu-js");
export const checkAllBox = document.querySelector(".checkAllBox");
// let allNotesChecked = false;

//checks and unchecks notes
export function checksAndUnchecksNote(index) {

  if (notes[index].checked === true) {
    notes[index].checked = false;
  
  } else {
    notes[index].checked = true;
  }

  //if all the notes in the array are checked, run this and set allChecked to true
  if (notes.every((i) => i.checked === true)) {
    updateCheckAllBox(true)
    removeClass(checkAllBox, "bi-square");
    addClass(checkAllBox, "bi-check-square");
  }else{
  //if all the notes in the array are not checked, run this and set allChecked to false
    updateCheckAllBox(false);
    removeClass(checkAllBox, "bi-check-square");
    addClass(checkAllBox, "bi-square");
  }
  
  renderNotes("");

  countCheckedNotes();
}

function check_uncheckAllNotes(bool) {
  notes.forEach((i, index) => {
    i.checked = bool;
  });
}

export function updateCheckAllBox(allNotesChecked) {
  checkAllBox.addEventListener("click", () => {
    //if allChecked is false, run this and set it to true;
    if (allNotesChecked === false) {
      check_uncheckAllNotes(true);
      removeClass(checkAllBox, "bi-square");
      addClass(checkAllBox, "bi-check-square");
      allNotesChecked = true;
    } else {
     //if allChecked is true, run this and set it to false;
      check_uncheckAllNotes(false);
      removeClass(checkAllBox, "bi-check-square");
      addClass(checkAllBox, "bi-square");
      allNotesChecked = false;
    }

    renderNotes("");
    countCheckedNotes();
  });
}

updateCheckAllBox(false);

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
  addClass(onSelectMenu, "new-active");
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
  check_uncheckAllNotes(false);
  removeClass(checkAllBox, "bi-check-square");
  addClass(checkAllBox, "bi-square");
  updateCheckAllBox(false);

  closeMultiElement("checkNote", "active");

  renderNotes(false);
  countCheckedNotes();
  removeClass(onSelectMenu, "new-active");
});
