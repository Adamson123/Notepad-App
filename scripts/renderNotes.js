import getDate from "./utils/date.js";
import {
    inputNote,
    inputHeadText,
    created,
    edited,
    noteEditor,
    updateNoteAndBack,
    openEditorBtn,
    showExpandEditorTools,
    // dropMenu,
} from "./noteEditor.js";
import {
    addClass,
    removeClass,
    toggleElement,
} from "./utils/openAndCloseFunctions.js";

import {
    eventlistenerOnMultiselectBtn,
    checksAndUnchecksNote,
    countCheckedNotes,
    onSelectMenu,
    checkAllBox,
    updateCheckAllBox,
} from "./multiselecting.js";
import {
    deletedNotesSection,
    trashIcon,
    deletedNotesArray,
    updateDelNotesInStorage,
} from "./deletedNotes.js";
const date = `${getDate("hour")}:${getDate("day")}:${getDate("year")}`;
const searchBar = document.querySelector(".searchBar-js");
const searchBarSection = document.querySelector(".searchBarSection-js");
const searchNote = document.querySelectorAll(".searchIcon-js");
export const notesBox = document.querySelector(".notesBox-js");

export let notes = JSON.parse(localStorage.getItem("notes")) || [];

export const updateNotesInStorage = () => {
    localStorage.setItem("notes", JSON.stringify(notes));
};

export function textOnAlert(text) {
    const actionAlert = document.querySelector(".actionAlert-js");
    actionAlert.innerHTML = text;
    addClass(actionAlert, "opacityActive");

    setTimeout(() => {
        removeClass(actionAlert, "opacityActive");
    }, 1000);
}

let multiSelecting;

// Function to render notes in the notes box
export function renderNotes(parameter) {
    if (parameter === false || parameter === true) {
        multiSelecting = parameter;
    }

    let html = "";
    let searchBarValue = searchBar.value.trim(" ").toLocaleLowerCase();
    let foundMatch = false;

    //checks if there's any note availabe in the notes array
    if (notes.length > 0) {
        notes.forEach((i, num) => {
            i["index"] = num;

            const { header, note, dateCreated, dateEdited, checked, index } = i;

            //if there's no header to display we will take from the first word of the note

            const div = document.createElement("div");
            div.innerHTML = note;

            let headAlt = header === "" ? div.innerText.split(" ")[0] : header;

            //shortens the first word if it's too long to contain the note header
            let headAlt_2 =
                headAlt.length > 35
                    ? headAlt.slice(0, 27).concat("...")
                    : headAlt;

            // i.header = header === "" ? headAlt_2 : header;

            i["newHeader"] = header === "" ? headAlt_2 : header;

            let checkClass =
                checked === false ? "bi-square" : "bi-check-square";

            let newClass;
            newClass =
                multiSelecting === false ? (newClass = "not-acive") : "active";

            if (
                headAlt_2.toLocaleLowerCase().includes(searchBarValue) &&
                searchBarValue !== " "
            ) {
                foundMatch = true;
                html += `
        <div class="note uniNote${num}" data-index="${index}">
          <div class="noteHead">${i.newHeader}</div>
          <div class="dateDiv">
            <div class="date">Created: ${dateCreated}</div>
            <div>Last Edited: ${dateEdited} </div>
          </div>
          <div class="textNote">
            ${note}
          </div>
          <div class="trashAndCheckNoteDiv">
            <span class="bi-trash deleteBtn deleteBtn-js" data-index="${index}" title="Move to trash"></span>
            <span class="checkNote ${newClass} ${checkClass}">
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
      No notes are available &nbsp;:(
    </div>`;
    }

    clickEventOnNotes(multiSelecting);

    //for optimization while searching
    if (parameter !== "search") {
        clickEventOnNotesDeleteIcons();
        eventlistenerOnMultiselectBtn();
        eventlistenerOndeleteAllBtn();
    }
}

//filters notes base on search input

searchBar.addEventListener("keyup", () => {
    renderNotes("search");
});

//toggles searchBox
searchNote.forEach((i, index) => {
    i.addEventListener("click", () => {
        addClass(searchBarSection, "active_sec");
    });
});

document.querySelector(".cancelSearch-js").addEventListener("click", () => {
    removeClass(searchBarSection, "active_sec");
    searchBar.value = "";
    renderNotes("");
});

//adding evemtlistener to  all  deleteBtn
function clickEventOnNotesDeleteIcons() {
    document.querySelectorAll(".deleteBtn-js").forEach((i, index) => {
        i.onclick = (event) => {
            event.stopPropagation();

            /*getting the index of the note from dataset for precise 
      deleting of the note while searching since dataset won't be base on filtering*/
            const dataIndex = Number(i.dataset.index);

            deletedNotesArray.unshift(notes[dataIndex]);
            console.log(notes[dataIndex].index);
            notes.splice(dataIndex, 1);

            const noteOnDelete = document.querySelector(`.uniNote${dataIndex}`);

            textOnAlert("Moved To Trash");
            addClass(noteOnDelete, "delete");
            updateNotesInStorage();
            updateDelNotesInStorage();
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
            /*getting the index of the note from dataset for precise 
      opening and checking of the note while searching since dataset won't be base on filtering*/
            const dataIndex = Number(i.dataset.index);
            if (multiSelecting === false) {
                const { note, header, dateCreated, dateEdited } =
                    notes[dataIndex];

                inputNote.innerHTML = note;
                inputHeadText.value = header;
                created.innerHTML = dateCreated;
                edited.innerHTML = dateEdited;
                removeClass(noteEditor, "editorNotActive");
                addClass(noteEditor, "editorActive");
                updateNoteAndBack(dataIndex);
                showExpandEditorTools();
            } else {
                checksAndUnchecksNote(dataIndex);
            }
        };
    });
}

//deletes all checked notes

export function deleteAllSelectedNotes() {
    let notChecked = [];
    let checked = [];
    notes.forEach((i, index) => {
        if (i.checked !== true) {
            //gets all notes that are not checked
            notChecked.push(i);
        } else {
            checked.push(i);
            //selecting and adding delete animation to the notes we want to delete
            const noteOnDelete = document.querySelector(`.uniNote${index}`);
            addClass(noteOnDelete, "delete");
        }
    });

    if (checked.length > 0) {
        updateCheckAllBox(false);
        removeClass(checkAllBox, "bi-check-square");
        addClass(checkAllBox, "bi-square");
        deletedNotesArray.push(...checked);

        // console.table(...notChecked);
        notes = notChecked;
        countCheckedNotes();

        textOnAlert("Moved To Trash");

        //giving delete animation time to play
        updateNotesInStorage();
        updateDelNotesInStorage();
        setTimeout(() => {
            // automatically closes onSelectMenu menu when there are nothing to delete
            if (notes.length === 0) {
                removeClass(onSelectMenu, "new-active");
                renderNotes(false);
            }
            renderNotes("");
        }, 500);
    }
}

function eventlistenerOndeleteAllBtn() {
    document.querySelector(".deleteAll-js").addEventListener("click", () => {
        deleteAllSelectedNotes();
    });
}

export const bookIcon = document.querySelector(".bookIcon-js");
bookIcon.addEventListener("click", () => {
    removeClass(bookIcon, "icon-not-active");
    removeClass(trashIcon, "icon-active");
    removeClass(openEditorBtn, "not-active");
    removeClass(deletedNotesSection, "active");
    addClass(deletedNotesSection, "delNotActive");
    renderNotes(" ");
});
