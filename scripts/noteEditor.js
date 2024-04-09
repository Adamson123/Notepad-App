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
const chevRight = document.querySelector(".chevRight-js");
const chevLeft = document.querySelector(".chevLeft-js");
const absTextFormatTool = document.querySelector(".absTextFormat");
const insertHTML = document.querySelector(".insertHTML-js");

const toHeader = document.querySelectorAll(".toHeader");
const insertHTMLElement = document.querySelectorAll(".insertHTMLElement");
const formatText = document.querySelectorAll(".formatText");
const insertHTMLElementMenu = document.querySelector(
  ".insertHTMLElementMenu-js"
);

addClass(absTextFormatTool, "not-active");
addClass(insertHTML, "not-active");
addClass(insertHTMLElementMenu, "not-active");
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

    if (notes[index].note === "" && notes[index].header === "") {
      notes.splice(index, 1);
    }

    renderNotes("");

    inputHeadText.value = "";
    inputNote.innerHTML = "";

    addClass(absTextFormatTool, "not-active");
    addClass(insertHTML, "not-active");
    addClass(insertHTMLElementMenu, "not-active");
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
  });
}

let adjustTool = false;
toHeader.forEach((i) => {
  i.addEventListener("click", () => {
    adjustTool = true;
    const htmlElement = i.dataset.element;
    styleText(htmlElement);
    adjustTextFormatTool();
  });
});

formatText.forEach((i) => {
  i.addEventListener("click", () => {
    const htmlElement = i.dataset.element;
    document.execCommand(htmlElement);
  });
});

function getCursor() {
  const selection = window.getSelection();

  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const span = document.createElement("span");

    range.insertNode(span);

    const rect = span.getBoundingClientRect();

    insertHTML.style.top = rect.top - 6 + "px";
    if (rect.bottom + 200 >= window.innerHeight) {
      insertHTMLElementMenu.style.top = rect.bottom - 195 + "px";
    } else {
      insertHTMLElementMenu.style.top = rect.bottom + 5 + "px";
    }

    insertHTMLElementMenu.style.left = rect.left + "px";

    span.parentNode.removeChild(span);
  }
}
function getCursorYPosition() {
  const selection = window.getSelection();

  // Check if there is a selection
  if (selection.rangeCount > 0) {
    const r = selection.getRangeAt(0);

    if (
      r.startContainer.textContent === "" &&
      r.endContainer.textContent === ""
    ) {
      removeClass(insertHTML, "not-active");
      getCursor();
    } else {
      addClass(insertHTML, "not-active");
      addClass(insertHTMLElementMenu, "not-active");
    }
  }
}

function adjustTextFormatTool() {
  const selection = window.getSelection();

  if (inputNote === document.activeElement || adjustTool === true) {
    const range = selection.getRangeAt(0);

    if (selection.toString().length > 0) {
      //absTextFormatTool.style.display = "flex";
      removeClass(absTextFormatTool, "not-active");
      const rect = range.getBoundingClientRect();
      absTextFormatTool.style.marginTop = 0 + "px";
      const windowWidth = window.innerWidth;

      let leftPosition = rect.left;
      let topPosition = rect.bottom;

      if (leftPosition + 350 > windowWidth) {
        leftPosition = windowWidth - 350;
      }

      absTextFormatTool.style.left = leftPosition + "px";
      absTextFormatTool.style.top = topPosition + "px";
    } else {
      addClass(absTextFormatTool, "not-active");
    }

    getCursorYPosition();
  }
  adjustTool = false;
}

window.addEventListener("resize", () => {
  if (inputNote === document.activeElement) {
    adjustTextFormatTool();
  } else {
    getCursor();
  }
});

insertHTML.addEventListener("click", () => {
  inputNote.focus();

  toggleElement(insertHTMLElementMenu, "not-active");

  getCursor();
  inputNote.blur();
});

inputNote.addEventListener("scroll", () => {
  if (inputNote === document.activeElement) {
    adjustTextFormatTool();
  } else {
    getCursor();
  }
});

["click", "mouseup", "keyup", "selectionchange", "input"].forEach((i) => {
  inputNote.addEventListener(i, () => {
    adjustTextFormatTool();

    addClass(insertHTMLElementMenu, "not-active");
  });
});

chevRight.addEventListener("click", () => {
  absTextFormatChild.scrollLeft += 50;
});

chevLeft.addEventListener("click", () => {
  absTextFormatChild.scrollLeft -= 50;
});

function insertHTMLTag(tag) {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);

  const h3 = document.createElement(tag);
  h3.innerHTML = "&nbsp;";

  range.insertNode(h3);

  const newRange = document.createRange();
  newRange.selectNodeContents(h3);
  newRange.collapse(false);
  selection.removeAllRanges();
  selection.addRange(newRange);
 
  
}

insertHTMLElement.forEach((i) => {
  i.addEventListener("click", () => {
    adjustTool = true;
    const htmlElement = i.dataset.element;
    insertHTMLTag(htmlElement);
    adjustTextFormatTool();
  });
});

document.querySelector(".test").addEventListener("click", () => {
  
 
});
