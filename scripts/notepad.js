// Importing necessary functions and data from external files
import { menu } from "./menu.js";
import { renderNotes } from "./renderNotes.js";
import { customizeTheme } from "./customizeTheme.js";
import { eventlistenerOnOpenEditor } from "./noteEditor.js";

eventlistenerOnOpenEditor();
renderNotes(false);
customizeTheme();
menu();
