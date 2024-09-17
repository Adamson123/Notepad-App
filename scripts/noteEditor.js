import {
    addClass,
    removeClass,
    toggleElement,
} from "./utils/openAndCloseFunctions.js";
import getDate from "./utils/date.js";
import { notes, renderNotes, updateNotesInStorage } from "./renderNotes.js";
import { styleText, getTag } from "./utils/textEditFunctions.js";
import { listCenterFix } from "./utils/otherUtills.js";
import { markToolBeenUsed } from "./utils/otherUtills.js";

// Selecting elements from the DOM
export const openEditorBtn = document.querySelector(".openEditorBtn-js");
const hideEditorBtn = document.querySelector(".hideEditorBtn-js");
export const noteEditor = document.querySelector(".noteEditor");
export const inputNote = document.querySelector(".inputNote-js");
export const inputHeadText = document.querySelector(".inputHeadText-js");
export const created = document.querySelector(".created");
export const edited = document.querySelector(".edited");
const absTextFormatChild = document.querySelector(".absTextFormatChild");
const absTextFormatTool = document.querySelector(".absTextFormat");
const alignContent = document.querySelectorAll(".alignContent");
export const lists = document.querySelectorAll(".list");

export const toHeader = document.querySelectorAll(".toHeader");
export const formatText = document.querySelectorAll(".formatText");

const expandToolsMenu = document.querySelector(".expandToolsMenu");
const chevDown = document.querySelector(".chevDown");
export const insertLinkBtn = document.querySelector(".insertLink");
let expandedMenu = false;

let chevDir = -90;

expandToolsMenu.addEventListener("click", () => {
    toggleElement(absTextFormatChild, "heightChange");
    toggleElement(expandToolsMenu, "positionChange");
    toggleElement(inputNote, "inputNoteMarginTop");

    chevDir = chevDir === -90 ? 90 : -90;
    chevDown.style.transform = `rotateZ(${chevDir}deg)`;

    expandedMenu = expandedMenu === false ? true : false;
});

function changeClass(action) {
    action(absTextFormatChild, "heightChange");
    action(expandToolsMenu, "positionChange");
    action(inputNote, "inputNoteMarginTop");
}

//function that determines wether to show expandMenu btn or not
export function showExpandEditor() {
    const menuEnd = document.querySelector(".menuEnd");
    const bdClient = menuEnd.getBoundingClientRect();
    const absClient = absTextFormatChild.getBoundingClientRect();

    //show the expandMenu if absTextFormatChild didn't break
    if (bdClient.bottom > absClient.bottom) {
        removeClass(expandToolsMenu, "not-active");

        windowExpanded = false; /*set windowExpanded to false if the window collapse to where
    absTextFormatChild  breaks
    */
    } else {
        // close it if it does

        addClass(expandToolsMenu, "not-active");
        // changeClass(removeClass)

        windowExpanded = true; /*set windowExpanded to true if the window expands to where
    absTextFormatChild does not break
    */
    }
}

// Function to update the edited note in the array and close the editor
export function updateNoteAndBack(index) {
    hideEditorBtn.onclick = () => {
        removeClass(noteEditor, "editorActive");

        // addClass(noteEditor, 'noteAnimation')
        addClass(noteEditor, "editorNotActive");

        //update the edit date only of the note or head are different from the value
        // of the note and head of the html element

        const { note, header, dateEdited } = notes[index];

        if (note !== inputNote.innerHTML || header !== inputHeadText.value) {
            notes[index].dateEdited = `${getDate("hour")}:${getDate(
                "day"
            )}:${getDate("year")}`;
        }

        notes[index].header = inputHeadText.value;
        notes[index].note = inputNote.innerHTML;

        if (
            notes[index].note.trim() === "" &&
            notes[index].header.trim() === ""
        ) {
            notes.splice(index, 1);
        }

        renderNotes("");

        inputHeadText.value = "";
        inputNote.innerHTML = "";

        changeClass(removeClass);

        expandedMenu = false;
        chevDir = -90;
        chevDown.style.transform = `rotateZ(${chevDir}deg)`;
        updateNotesInStorage();
    };
}

// Event listener for opening editor and adding a new note

export function eventlistenerOnOpenEditor() {
    openEditorBtn.addEventListener("click", () => {
        removeClass(noteEditor, "editorNotActive");
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
        showExpandEditor();
        updateNotesInStorage();
    });
}

toHeader.forEach((i) => {
    i.addEventListener("click", () => {
        const htmlElement = i.dataset.element;
        styleText(htmlElement);
        //adjustTextFormatTool();
    });
});

formatText.forEach((i, index) => {
    i.addEventListener("click", () => {
        const element = i.dataset.element;

        //i.classList.toggle("toolIsActive");
        document.execCommand(element);
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const stringText = range.toString();
        if (!stringText.length) {
            document.execCommand("insertText", false, " ");
        }

        inputNote.focus();

        i.classList.toggle("toolIsActive");

        markToolBeenUsed();
    });
});

insertLinkBtn.addEventListener("click", () => {
    const promptVal = prompt("Enter Link");
    if (promptVal) {
        const selectedText = window.getSelection().toString();
        const a = document.createElement("a");
        a.href = promptVal;
        const linkText = `<a href="${promptVal}" target="_blank
  ">${selectedText}</a>`;

        document.execCommand("insertHTML", false, linkText);

        linkFunc();
        markToolBeenUsed();
    }
});

document.querySelector(".insertLink2").addEventListener("click", () => {
    document.execCommand("unlink", false, null);

    linkFunc();
});

let elementCentered = false;

const allInputNoteEvents = [
    "click",
    "input",
    "keydown",
    "keyup",
    "selectionchange",
    "selection",
];

allInputNoteEvents.forEach((e) => {
    inputNote.addEventListener(
        e,
        (event) => {
            activeAlignBtn(event);
        },
        true
    );
});

function activeAlignBtn(event) {
    const fElement = event.target;

    markToolBeenUsed();
    if (document.activeElement === inputNote) {
        if (window.getComputedStyle(fElement).textAlign === "left") {
            alignContent[0].classList.add("toolIsActive");
            removeClassFromOthers(0);
        } else if (window.getComputedStyle(fElement).textAlign === "center") {
            alignContent[1].classList.add("toolIsActive");
            removeClassFromOthers(1);
        } else if (window.getComputedStyle(fElement).textAlign === "right") {
            alignContent[2].classList.add("toolIsActive");
            removeClassFromOthers(2);
        }
    } else {
        removeClassFromOthers(3);
    }
}

function removeClassFromOthers(index) {
    alignContent.forEach((ele, int) => {
        if (int !== index) {
            ele.classList.remove("toolIsActive");
        } else {
            ele.classList.add("toolIsActive");
        }
    });
}

markToolBeenUsed();

lists.forEach((i) => {
    i.addEventListener("click", () => {
        const element = i.dataset.element;

        document.execCommand(element);

        listCenterFix("center");
        listCenterFix("right");
        listCenterFix("left");

        markToolBeenUsed();
    });
});

document.querySelectorAll(".alignContent").forEach((i, int) => {
    i.addEventListener("click", (event) => {
        const { element, listposition } = i.dataset;

        document.execCommand(element, false, null);
        inputNote.focus();
        alignContent[int].classList.add("toolIsActive");

        removeClassFromOthers(int);
    });
});

document.querySelector(".divider").addEventListener("click", () => {
    document.execCommand("insertHTML", false, "<hr>");
});

function linkFunc() {
    document.querySelectorAll("a").forEach((a, index) => {
        a.onclick = () => {
            window.open(a.href);
        };

        a.onselectionchange = () => {
            const pr = window.prompt(`Enter new Link`, a.href);
            a.href = pr;
        };
    });
}

let windowExpanded = false;
const absTextFormatChildHeight =
    absTextFormatChild.getBoundingClientRect().height;

window.addEventListener("resize", () => {
    //remove all class first
    changeClass(removeClass);

    //run function to see whether expandMenu to be opened
    showExpandEditor();

    //retrieve the menu state if it's opened before the window is expanded to width where
    // the absTextFormatChild does not break
    if (expandedMenu && !windowExpanded) {
        changeClass(addClass);
    }
});

document.querySelectorAll(".editAction").forEach((i) => {
    i.addEventListener("click", () => {
        const action = i.dataset.element;
        document.execCommand(action);
    });
});
