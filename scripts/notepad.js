// Importing necessary functions and data from external files
import { menu } from "./menu.js";
import { renderNotes } from "./renderNotes.js";
import { eventlistenerOnOpenEditor } from "./noteEditor.js";
import { renderDelNotes } from "./deletedNotes.js";

eventlistenerOnOpenEditor();
renderNotes(false);
menu();
renderDelNotes();
