import getDate from "./utils/date.js";
import {
  addClass,
  removeClass,
  toggleElement,
} from "./utils/openAndCloseFunctions.js";
import { openEditorBtn } from "./noteEditor.js";
import { bookIcon, notes, textOnAlert } from "./renderNotes.js";
export const trashIcon = document.querySelector(".trashIcon-js");
export const deletedNotesSection = document.querySelector(
  ".deletedNotesSection-js"
);
const date = `${getDate("hour")}:${getDate("day")}:${getDate("year")}`;

export let deletedNotesArray = [
  // {
  //   header: "Seoul",
  //   note: `mollitia illum ad ab
  //   molestiae consequatur reiciendis cum eos eum, cumque possimus
  //   repellat officiis distinctio?`,
  //   dateCreated: `${date}`,
  //   dateEdited: `${date}`,
  //   dateDeleted: `${date}`,
  //   checked: false,
  //   index: 0
  // },
  // {
  //   header: "Dream",
  //   note:`Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit
  //   enim, rem accusantium temporibus non minus mollitia illum ad ab
  //   molestiae consequatur reiciendis cum eos eum, cumque possimus
  //   repellat officiis distinctio?
  //   `,
  //   dateCreated: `${date}`,
  //   dateEdited: `${date}`,
  //   dateDeleted: `${date}`,
  //   checked: false,
  //   index: 1
  // },
  // {
  //   header: "Trip",
  //   note: `king kong king okg kog king kong king okg kog king kong king okg
  //   kog king kong king okg kog king kong king okg kog
  //   kog king kong king okg kog king kong king okg
  //   kog king kong king okg kog king kong king okg kog
  //   `,
  //   dateCreated: `${date}`,
  //   dateEdited: `${date}`,
  //   dateDeleted: `${date}`,
  //   checked: false,
  //   index: 2
  // },
  // {
  //   header: "Abeg God",
  //   note: `usantium temporibus non minus mollitia illum ad ab
  //   molestiae consequatur reiciendis cum eos eum, cumque possimus
  //   repellat officiis distinctio?`,
  //   dateCreated: `${date}`,
  //   dateEdited: `${date}`,
  //   dateDeleted: `${date}`,
  //   checked: false,
  //   index: 3
  // }
];

function rotateChevron(index) {
  const chevron = document.querySelectorAll(".chevron");
  toggleElement(chevron[index], "chevActive");
}

function openSnip(index) {
  const noteSnip = document.querySelectorAll(".noteSnip");
  toggleElement(noteSnip[index], "hideSnip");
  toggleElement(noteSnip[index], "noteSnipActive");
}

export function renderDelNotes() {
  const deletedNote = document.querySelectorAll(".deletedNote");
  const allDelNotes = document.querySelector(".allDelNotes");
  let allColumns = "";
  if (deletedNotesArray.length >= 0) {
    deletedNotesArray.forEach((i, int) => {
      const { header, note, dateDeleted, checked } = i;

      i.checked = false;

      allColumns += `
      <div class="deletedNote delNote2">
      <div for="openNote3" class="deletedNLabel expandNote">
        <div class="title">
          <div>${header}</div>
        </div>
        <div class="del_ResDiv">
          <span class="bi-x deletePm deletePm" title="delete"></span>
  
          <img
            src="svgs/restore-svgrepo-com (1).svg"
            class="restoreSvg restoreSvg-js"
            title="restore"
          />
          <span class="bi-chevron-up chevron"></span>
        </div>
      </div>
  
      <div class="noteSnip hideSnip">
        ${note}
      </div>
    </div>
      `;
    });

    allDelNotes.innerHTML = allColumns;
  }

  if (deletedNotesArray.length > 0) {
    document.querySelector(".noDelNotes").style.display = "none";
  } else document.querySelector(".noDelNotes").style.display = "block";

  eventlistenerOnNotesLabel();
  eventlistenerOnDeletePm();
  eventlistenerOnRestoreSvg();
}

function eventlistenerOnNotesLabel() {
  const expandNote = document.querySelectorAll(".expandNote");
  expandNote.forEach((i, index) => {
    i.addEventListener("click", () => {
      rotateChevron(index);
      openSnip(index);
    });
  });
}

function eventlistenerOnDeletePm() {
  document.querySelectorAll(".deletePm").forEach((i, index) => {
    i.addEventListener("click", (event) => {
      event.stopImmediatePropagation();
      deletedNotesArray.splice(index, 1);

      textOnAlert("Deleted Permanently");

      renderDelNotes();
    });
  });
}

function eventlistenerOnRestoreSvg() {
  document.querySelectorAll(".restoreSvg").forEach((i, int) => {
    i.addEventListener("click", (event) => {
      event.stopImmediatePropagation();
      if (notes.length >= deletedNotesArray[int].index) {
        notes.splice(deletedNotesArray[int].index, 0, deletedNotesArray[int]);
      } else {
        notes.push(deletedNotesArray[int]);
      }

      deletedNotesArray.splice(int, 1);
      textOnAlert("Note Restored");

      renderDelNotes();
    });
  });
}

trashIcon.addEventListener("click", () => {
  addClass(bookIcon, "icon-not-active");
  addClass(trashIcon, "icon-active");
  addClass(openEditorBtn, "not-active");
  removeClass(deletedNotesSection, "delNotActive");
  addClass(deletedNotesSection, "active");

  renderDelNotes();
});

document.querySelector(".restoreAll").addEventListener("click", () => {
  if (deletedNotesArray.length > 0) {
    deletedNotesArray.forEach((i, int) => {
      notes.splice(i.index, 0, i);
    });
    textOnAlert("Note Restored");
    deletedNotesArray.length = 0;
    renderDelNotes();
  }
});

document.querySelector(".emptyTrash").addEventListener("click", () => {
  if (deletedNotesArray.length > 0) {
    deletedNotesArray.length = 0;
    textOnAlert("Note Deleted");
    renderDelNotes();
  }
});
